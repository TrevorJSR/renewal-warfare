<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
    <div class="max-w-full">
      <!-- Header con info partita -->
      <div class="flex justify-between items-center mb-6 px-4">
        <div>
          <h1 class="font-display text-3xl font-black text-white">RENEWAL: WARFARE</h1>
          <p class="text-slate-400">Turno {{ gameStore.gameState?.turnNumber }} | Fase: {{ gameStore.gameState?.currentPhase }}</p>
        </div>
        <button @click="goToMenu" class="btn btn-secondary">⏹ Abbandona</button>
      </div>

      <!-- Main Game Board -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <!-- Avversario (in alto) -->
        <div class="lg:col-span-3">
          <PlayerBoard
            :player="gameStore.opponent"
            :is-current-player="false"
            :is-player-perspective="false"
          />
        </div>

        <!-- Zona centrale: Battlefield -->
        <div class="lg:col-span-3">
          <BattlefieldZone
            :player-battlefield="gameStore.currentPlayer?.state.battlefield || []"
            :opponent-battlefield="gameStore.opponent?.state.battlefield || []"
            :opponent-conquest-zone="gameStore.opponent?.state.base.conquestZone || []"
            @attack-unit="attackUnit"
            @attack-base="attackBase"
          />
        </div>

        <!-- Giocatore (in basso) -->
        <div class="lg:col-span-3">
          <PlayerBoard
            :player="gameStore.currentPlayer"
            :is-current-player="true"
            :is-player-perspective="true"
            @play-card="playCard"
            @discard-card="discardCard"
            @accelerate-shipment="accelerateShipment"
          />
        </div>

        <!-- Info Turno & Controlli -->
        <div class="lg:col-span-3">
          <TurnControls
            :is-player-turn="gameStore.isPlayerTurn"
            :current-phase="gameStore.gameState?.currentPhase"
            @end-turn="endTurn"
          />
        </div>
      </div>

      <!-- Game Log -->
      <div v-if="gameStore.gameState?.history.length" class="mt-6 px-4">
        <GameLog :history="gameStore.gameState.history" />
      </div>

      <!-- Game Over Modal -->
      <GameOverModal
        v-if="gameStore.gameState?.isGameOver"
        :winner="gameStore.gameState.winner"
        @play-again="playAgain"
        @go-to-menu="goToMenu"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGameStore } from '@/stores/gameStore'
import PlayerBoard from './GameBoard/PlayerBoard.vue'
import BattlefieldZone from './GameBoard/BattlefieldZone.vue'
import TurnControls from './GameBoard/TurnControls.vue'
import GameLog from './GameBoard/GameLog.vue'
import GameOverModal from './GameBoard/GameOverModal.vue'

const gameStore = useGameStore()

function playCard(cardId: string) {
  if (!gameStore.isPlayerTurn) return
  gameStore.playCard(cardId)
}

function discardCard(cardId: string) {
  if (!gameStore.isPlayerTurn) return
  gameStore.discardCard(cardId)
}

function accelerateShipment(shipmentId: string, prSpent: number) {
  if (!gameStore.isPlayerTurn) return
  gameStore.accelerateShipment(shipmentId, prSpent)
}

function attackUnit(attackerId: string, defenderId: string) {
  if (!gameStore.isPlayerTurn) return
  gameStore.attackWithUnit(attackerId, defenderId)
}

function attackBase(attackerId: string) {
  if (!gameStore.isPlayerTurn) return
  gameStore.attackBase(attackerId)
}

function endTurn() {
  if (!gameStore.isPlayerTurn) return
  gameStore.endTurn()
}

function playAgain() {
  // Ricomincia con stesse fazioni
  const playerFaction = gameStore.currentPlayer?.state.faction
  const opponentFaction = gameStore.opponent?.state.faction
  if (playerFaction && opponentFaction) {
    gameStore.startGame(playerFaction, opponentFaction)
  }
}

function goToMenu() {
  ;(window as any).navigationController.goToMenu()
}
</script>
