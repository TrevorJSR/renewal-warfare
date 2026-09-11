import type { PlayerState, BattlefieldCard } from './types'
import type { Game } from './game'
import type { Card } from '@/data/coreset'

export interface EvaluationScore {
  score: number
  reasoning: string
}

export class PositionEvaluator {
  /**
   * Valuta la posizione tattica di un giocatore
   * Più alto = migliore per il giocatore
   */
  evaluatePosition(playerState: PlayerState, opponentState: PlayerState): number {
    let score = 0

    // Base Health (importante)
    const healthDiff = (playerState.base.armor - opponentState.base.armor) * 10
    score += healthDiff

    // Risorse (PR nel warehouse)
    const prAdvantage = (playerState.pr - opponentState.pr) * 5
    score += prAdvantage

    // Unità in campo (numero)
    const unitAdvantage = (playerState.battlefield.length - opponentState.battlefield.length) * 15
    score += unitAdvantage

    // Potenza media in campo
    const playerAvgPower =
      playerState.battlefield.length > 0
        ? playerState.battlefield.reduce((sum, u) => sum + (u.card.power || 1), 0) / playerState.battlefield.length
        : 0
    const opponentAvgPower =
      opponentState.battlefield.length > 0
        ? opponentState.battlefield.reduce((sum, u) => sum + (u.card.power || 1), 0) / opponentState.battlefield.length
        : 0
    const powerAdvantage = (playerAvgPower - opponentAvgPower) * 8
    score += powerAdvantage

    // Carte in Spedizione (futuro)
    const shipmentAdvantage = (playerState.shipment.length - opponentState.shipment.length) * 3
    score += shipmentAdvantage

    // Pericolo di Conquista
    if (playerState.base.isCompromised) {
      score -= playerState.base.conquestTurns * 50 // Molto grave
    }
    if (opponentState.base.isCompromised) {
      score += opponentState.base.conquestTurns * 50 // Ottimo
    }

    return score
  }

  /**
   * Valuta l'impatto di giocare una carta
   */
  evaluateCardPlay(card: Card, playerState: PlayerState, opponentState: PlayerState): number {
    let score = 0

    // Cost vs Benefit
    if (card.cost <= 2) score += 5 // Rapida
    if (card.power && card.power >= 3) score += 10 // Potente
    if (card.vr >= 4) score += 5 // Buon riciclo

    // Tipo di carta
    switch (card.type) {
      case 'unit':
        score += card.power || 1 // Preferisci unità potenti
        break
      case 'elite':
        score += 20 // Elite sono molto preziose
        break
      case 'vehicle':
        score += 15
        break
      case 'equipment':
        score += 8
        break
      case 'fortification':
        score += 10
        break
      case 'technology':
        score += 5
        break
    }

    // Situazione
    if (playerState.base.isCompromised && card.type === 'fortification') {
      score += 25 // Costruire difese è prioritario
    }

    if (opponentState.base.isCompromised && card.type === 'unit') {
      score += 30 // Unità per conquistare
    }

    return score
  }

  /**
   * Valuta se è conveniente scartare una carta
   */
  evaluateCardDiscard(card: Card, playerState: PlayerState): number {
    // Scarta carte a basso VR quando hai pochi PR
    if (playerState.pr < 5) {
      return card.vr // Priorità al VR
    }

    // Altrimenti mantieni le carte
    return -100
  }
}

export class DecisionMaker {
  evaluator: PositionEvaluator

  constructor() {
    this.evaluator = new PositionEvaluator()
  }

  /**
   * IA sceglie quale azione fare durante Operations
   */
  chooseOperation(game: Game, aiPlayerIndex: number): 'play' | 'discard' | 'attack' | 'pass' {
    const aiPlayer = game.players[aiPlayerIndex]
    const opponent = game.players[1 - aiPlayerIndex]

    // Se non hai risorse e la mano non aiuta, passa
    if (aiPlayer.state.pr < 1 && aiPlayer.state.hand.length < 2) {
      return 'pass'
    }

    // Priorità: giocare carte
    if (aiPlayer.state.assemblyLine.length < aiPlayer.state.base.assemblySlots && aiPlayer.state.hand.length > 0) {
      return 'play'
    }

    // Se devi difenderti, scarta per PR
    if (opponent.state.base.isCompromised && aiPlayer.state.pr < 5) {
      return 'discard'
    }

    return 'pass'
  }

  /**
   * IA sceglie quale carta giocare
   */
  chooseCardToPlay(game: Game, aiPlayerIndex: number): string | null {
    const aiPlayer = game.players[aiPlayerIndex]
    const opponent = game.players[1 - aiPlayerIndex]

    if (aiPlayer.state.hand.length === 0) return null

    // Valuta ogni carta e scegli la migliore
    let bestCardId: string | null = null
    let bestScore = -Infinity

    for (const card of aiPlayer.state.hand) {
      const score = this.evaluator.evaluateCardPlay(card, aiPlayer.state, opponent.state)
      if (score > bestScore) {
        bestScore = score
        bestCardId = card.id
      }
    }

    return bestCardId
  }

  /**
   * IA sceglie quale carta scartare
   */
  chooseCardToDiscard(game: Game, aiPlayerIndex: number): string | null {
    const aiPlayer = game.players[aiPlayerIndex]

    if (aiPlayer.state.hand.length === 0) return null

    // Scarta la carta con VR più basso
    let worstCardId = aiPlayer.state.hand[0].id
    let worstVR = aiPlayer.state.hand[0].vr

    for (const card of aiPlayer.state.hand) {
      if (card.vr < worstVR) {
        worstVR = card.vr
        worstCardId = card.id
      }
    }

    return worstCardId
  }

  /**
   * IA sceglie quale unità attaccare o se attaccare la base
   */
  chooseAttackTarget(
    game: Game,
    aiPlayerIndex: number,
    attackerBattlefieldId: string
  ): { type: 'unit' | 'base'; targetId?: string } {
    const aiPlayer = game.players[aiPlayerIndex]
    const opponent = game.players[1 - aiPlayerIndex]
    const attacker = aiPlayer.state.battlefield.find(u => u.id === attackerBattlefieldId)

    if (!attacker) return { type: 'base' }

    // Se la base è compromessa, preferisci conquistare
    if (opponent.state.base.isCompromised && opponent.state.base.conquestZone.length < 2) {
      return { type: 'unit' } // Segnale per entrare in conquista
    }

    // Se il difensore ha unità, attacca la più debole
    if (opponent.state.battlefield.length > 0) {
      const weakestUnit = opponent.state.battlefield.reduce((weakest, current) => {
        return (current.card.power || 1) < (weakest.card.power || 1) ? current : weakest
      })
      return { type: 'unit', targetId: weakestUnit.id }
    }

    // Se nessuna unità in campo, attacca la base
    return { type: 'base' }
  }

  /**
   * IA decide se accelerare una spedizione con PR
   */
  shouldAccelerateShipment(game: Game, aiPlayerIndex: number): boolean {
    const aiPlayer = game.players[aiPlayerIndex]
    const opponent = game.players[1 - aiPlayerIndex]

    // Se sei in vantaggio, accelera per vittoria più veloce
    const evaluation = this.evaluator.evaluatePosition(aiPlayer.state, opponent.state)
    if (evaluation > 30) {
      return aiPlayer.state.pr >= 1
    }

    // Se sei in svantaggio, accumula PR per difesa
    if (evaluation < -30) {
      return false
    }

    // Neutrale: accelera se hai spedizioni importanti
    return aiPlayer.state.shipment.length > 2 && aiPlayer.state.pr >= 2
  }

  /**
   * IA decide se riparare la base
   */
  shouldRepairBase(game: Game, aiPlayerIndex: number): boolean {
    const aiPlayer = game.players[aiPlayerIndex]

    // Se sotto grave pericolo e hai PR, ripara
    if (aiPlayer.state.base.armor <= 2 && aiPlayer.state.pr >= 2) {
      return true
    }

    return false
  }
}
