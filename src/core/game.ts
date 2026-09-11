import type { Card, Faction } from '@/data/coreset'
import type { GameState, PlayerState, GamePhase } from './types'
import { Player } from './player'
import { CombatSystem } from './combat'

export class Game {
  id: string
  state: GameState
  players: Player[]
  combatSystem: CombatSystem

  constructor(id: string, player1Faction: Faction, player2Faction: Faction, deck1: Card[], deck2: Card[]) {
    this.id = id
    this.players = [
      new Player('player1', player1Faction, deck1),
      new Player('player2', player2Faction, deck2),
    ]
    this.combatSystem = new CombatSystem()

    this.state = {
      id,
      players: this.players.map(p => p.state),
      currentPlayerIndex: 0,
      currentPhase: 'start',
      turnNumber: 1,
      history: [],
      isGameOver: false,
    }
  }

  getCurrentPlayer(): Player {
    return this.players[this.state.currentPlayerIndex]
  }

  getOpponent(): Player {
    return this.players[1 - this.state.currentPlayerIndex]
  }

  startPhase(phase: GamePhase) {
    this.state.currentPhase = phase

    switch (phase) {
      case 'start':
        this.handleStartPhase()
        break
      case 'operations':
        // Operations phase - giocatore esegue azioni
        break
      case 'combat':
        // Combat phase - giocatore sceglie attacchi
        break
      case 'verification':
        this.handleVerificationPhase()
        break
      case 'end':
        this.handleEndPhase()
        break
    }
  }

  private handleStartPhase() {
    const player = this.getCurrentPlayer()

    // Avanzamenti di Spedizione
    const deployedCards = player.advanceShipment()
    deployedCards.forEach(shipment => {
      const battlefieldCard = player.addToBattlefield(shipment.card)
      // Risolvi effetto di schieramento se presente
      this.log(`${shipment.card.name} entra in campo`)
    })

    // Reset attacchi del turno precedente
    player.resetAttackStates()
  }

  private handleVerificationPhase() {
    const player = this.getCurrentPlayer()

    // Verifica conquista
    if (player.state.base.isCompromised && player.state.base.conquestZone.length > 0) {
      player.state.base.conquestTurns--
      this.log(`Base compromessa: -1 TC (rimangono ${player.state.base.conquestTurns})`)

      if (player.state.base.conquestTurns <= 0) {
        this.endGame(this.getOpponent())
        return
      }
    }

    // Gestione eccedenza PR
    if (player.state.warehouse > player.state.maxWarehouse) {
      player.state.warehouse = player.state.maxWarehouse
    }
  }

  private handleEndPhase() {
    // Pulisci durate
    // Avanza turno
    this.state.turnNumber++
    this.state.currentPlayerIndex = 1 - this.state.currentPlayerIndex

    // Ricomincia dal prossimo giocatore
    this.state.currentPhase = 'start'
  }

  playCard(cardId: string, targetSlot?: string): boolean {
    const player = this.getCurrentPlayer()
    const card = player.state.hand.find(c => c.id === cardId)

    if (!card) return false

    // Costo: 1 Slot di Montaggio
    if (player.state.assemblyLine.length >= player.state.base.assemblySlots) {
      return false
    }

    player.playCard(card)
    player.addToAssemblyLine(card)

    // Muovi subito in Spedizione
    const assemblyCard = player.state.assemblyLine[player.state.assemblyLine.length - 1]
    player.moveToShipment(assemblyCard)

    this.log(`${card.name} giocato nella Catena di Montaggio`)
    return true
  }

  discardCard(cardId: string): boolean {
    const player = this.getCurrentPlayer()
    const card = player.state.hand.find(c => c.id === cardId)

    if (!card) return false

    const vr = player.discardCard(card)
    player.addPR(vr)

    this.log(`${card.name} scartato: +${vr} PR`)
    return true
  }

  accelerateShipment(shipmentId: string, prSpent: number): boolean {
    const player = this.getCurrentPlayer()
    const shipment = player.state.shipment.find(s => s.id === shipmentId)

    if (!shipment) return false
    if (prSpent > 1) return false // Max 1 PR per carta per turno

    return player.accelerateShipment(shipment, prSpent)
  }

  attackWithUnit(attackerBattlefieldId: string, defenderBattlefieldId: string) {
    const player = this.getCurrentPlayer()
    const opponent = this.getOpponent()

    const attacker = player.state.battlefield.find(c => c.id === attackerBattlefieldId)
    const defender = opponent.state.battlefield.find(c => c.id === defenderBattlefieldId)

    if (!attacker || !defender) return false
    if (attacker.hasAttackedThisTurn) return false

    const resolution = this.combatSystem.resolveCombat(attacker, defender, false)

    attacker.hasAttackedThisTurn = true

    if (resolution.destroyed === 'defender') {
      opponent.removeFromBattlefield(defenderBattlefieldId)
      player.addPR(resolution.recyclePR)
      this.log(`${attacker.card.name} distrugge ${defender.card.name}: +${resolution.recyclePR} PR`)
    } else {
      player.removeFromBattlefield(attackerBattlefieldId)
      this.log(`${attacker.card.name} viene distrutto da ${defender.card.name}`)
    }

    return true
  }

  attackBase(attackerBattlefieldId: string) {
    const player = this.getCurrentPlayer()
    const opponent = this.getOpponent()

    // Regola: Base non attaccabile se esiste almeno 1 unità avversaria in Campo
    if (opponent.state.battlefield.length > 0) {
      this.log('Base non attaccabile mentre il difensore ha unità in Campo')
      return false
    }

    const attacker = player.state.battlefield.find(c => c.id === attackerBattlefieldId)
    if (!attacker) return false

    // Ogni unità infligge normalmente 1 PA
    const damage = 1

    opponent.damagBase(damage)
    this.log(`${attacker.card.name} attacca la Base: -${damage} PA`)

    if (!opponent.state.base.isCompromised) {
      this.log(`Base avversaria: ${opponent.state.base.armor} PA rimasti`)
    } else {
      this.log(`Base avversaria compromessa! Turni di Conquista: ${opponent.state.base.conquestTurns}`)
    }

    return true
  }

  enterConquestZone(attackerBattlefieldId: string): boolean {
    const player = this.getCurrentPlayer()
    const opponent = this.getOpponent()

    const attacker = player.state.battlefield.find(c => c.id === attackerBattlefieldId)
    if (!attacker) return false

    if (!opponent.state.base.isCompromised) return false

    // Limite: max 2 unità, max 1 Elite
    const eliteCount = opponent.state.base.conquestZone.filter(c => c.card.type === 'elite').length
    const isElite = attacker.card.type === 'elite'

    if (opponent.state.base.conquestZone.length >= 2) return false
    if (isElite && eliteCount >= 1) return false

    opponent.state.base.conquestZone.push(attacker)
    player.state.battlefield = player.state.battlefield.filter(c => c.id !== attackerBattlefieldId)

    this.log(`${attacker.card.name} entra nella Zona Conquista`)
    return true
  }

  endGame(winner: Player) {
    this.state.isGameOver = true
    this.state.winner = winner.id
    this.log(`${winner.id} ha vinto la partita!`)
  }

  private log(message: string) {
    this.state.history.push({
      playerIndex: this.state.currentPlayerIndex,
      type: 'log',
      payload: { message },
      timestamp: Date.now(),
    })
  }
}
