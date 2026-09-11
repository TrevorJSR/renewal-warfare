import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { Game } from '@/core/game'
import { DecisionMaker } from '@/core/ai'
import type { Card, Faction } from '@/data/coreset'
import { CORESET } from '@/data/coreset'

export const useGameStore = defineStore('game', () => {
  const game = ref<Game | null>(null)
  const gameStarted = ref(false)
  const aiEnabled = ref(true)
  const decisionMaker = new DecisionMaker()

  const currentPlayer = computed(() => game.value?.getCurrentPlayer())
  const opponent = computed(() => game.value?.getOpponent())
  const gameState = computed(() => game.value?.state)
  const isPlayerTurn = computed(() => {
    if (!game.value) return false
    return game.value.state.currentPlayerIndex === 0 // Assume giocatore è sempre index 0
  })

  function startGame(playerFaction: Faction, opponentFaction: Faction) {
    const playerDeck = CORESET.filter(c => c.faction === playerFaction)
    const opponentDeck = CORESET.filter(c => c.faction === opponentFaction)

    game.value = new Game(`game-${Date.now()}`, playerFaction, opponentFaction, playerDeck, opponentDeck)

    // Inizia il turno del giocatore
    game.value.startPhase('start')
    gameStarted.value = true
  }

  function playCard(cardId: string) {
    if (!game.value || !isPlayerTurn.value) return false
    return game.value.playCard(cardId)
  }

  function discardCard(cardId: string) {
    if (!game.value || !isPlayerTurn.value) return false
    return game.value.discardCard(cardId)
  }

  function accelerateShipment(shipmentId: string, prSpent: number) {
    if (!game.value || !isPlayerTurn.value) return false
    return game.value.accelerateShipment(shipmentId, prSpent)
  }

  function attackWithUnit(attackerBattlefieldId: string, defenderBattlefieldId: string) {
    if (!game.value || !isPlayerTurn.value) return false
    return game.value.attackWithUnit(attackerBattlefieldId, defenderBattlefieldId)
  }

  function attackBase(attackerBattlefieldId: string) {
    if (!game.value || !isPlayerTurn.value) return false
    return game.value.attackBase(attackerBattlefieldId)
  }

  function enterConquestZone(attackerBattlefieldId: string) {
    if (!game.value || !isPlayerTurn.value) return false
    return game.value.enterConquestZone(attackerBattlefieldId)
  }

  function endTurn() {
    if (!game.value) return false

    // Verifica
    game.value.startPhase('verification')

    if (game.value.state.isGameOver) return true

    // End
    game.value.startPhase('end')

    // Se è il turno dell'IA, fai muovere l'IA
    if (aiEnabled.value && !isPlayerTurn.value) {
      executeAITurn()
    }

    return true
  }

  function executeAITurn() {
    if (!game.value || isPlayerTurn.value) return

    // Fase di inizio
    game.value.startPhase('start')

    // Fase di Operazioni
    game.value.startPhase('operations')

    // IA esegue operazioni
    const aiPlayer = game.value.players[1]

    // Gioca carte se possibile
    while (aiPlayer.state.assemblyLine.length < aiPlayer.state.base.assemblySlots && aiPlayer.state.hand.length > 0) {
      const cardToPlay = decisionMaker.chooseCardToPlay(game.value, 1)
      if (cardToPlay) {
        game.value.playCard(cardToPlay)
      } else {
        break
      }
    }

    // Ripara se necessario
    if (decisionMaker.shouldRepairBase(game.value, 1)) {
      aiPlayer.repairBase(2)
    }

    // Fase di Combattimento
    game.value.startPhase('combat')

    // IA attacca con tutte le unità
    const aiPlayerIndex = 1
    for (const unit of [...aiPlayer.state.battlefield]) {
      if (!unit.hasAttackedThisTurn) {
        const target = decisionMaker.chooseAttackTarget(game.value, aiPlayerIndex, unit.id)
        if (target.type === 'base') {
          game.value.attackBase(unit.id)
        } else if (target.targetId) {
          game.value.attackWithUnit(unit.id, target.targetId)
        }
      }
    }

    // Fase di Verifica
    game.value.startPhase('verification')

    if (game.value.state.isGameOver) return

    // Fine turno
    game.value.startPhase('end')
  }

  return {
    game,
    gameStarted,
    aiEnabled,
    currentPlayer,
    opponent,
    gameState,
    isPlayerTurn,
    startGame,
    playCard,
    discardCard,
    accelerateShipment,
    attackWithUnit,
    attackBase,
    enterConquestZone,
    endTurn,
  }
})
