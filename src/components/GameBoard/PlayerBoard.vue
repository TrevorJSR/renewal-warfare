<template>
  <div class="card p-6 bg-gradient-to-r from-slate-800 to-slate-900 border-2" :class="borderColor">
    <div class="grid grid-cols-4 gap-4">
      <!-- Base Info -->
      <div class="col-span-1">
        <div class="mb-4">
          <div class="text-sm text-slate-400">Base</div>
          <div class="flex items-center gap-2">
            <div class="text-2xl font-bold" :class="baseHealthColor">{{ player?.state.base.armor }}</div>
            <div class="text-xs text-slate-400">/ {{ player?.state.base.maxArmor }}</div>
          </div>
          <div class="text-xs text-slate-400 mt-1">
            <div v-if="player?.state.base.isCompromised" class="text-red-400">🚨 Compromessa</div>
            <div v-else class="text-green-400">✓ Attiva</div>
          </div>
        </div>

        <!-- Conquest Turns -->
        <div v-if="player?.state.base.isCompromised" class="mb-4">
          <div class="text-sm text-slate-400">TC Rimanenti</div>
          <div class="text-xl font-bold text-red-400">{{ player?.state.base.conquestTurns }}</div>
        </div>

        <!-- Risorse -->
        <div class="mb-4">
          <div class="text-sm text-slate-400">PR / Magazzino</div>
          <div class="text-lg font-bold text-yellow-400">
            {{ player?.state.pr }} / {{ player?.state.warehouse }}
          </div>
          <div class="text-xs text-slate-500">Max: {{ player?.state.maxWarehouse }}</div>
        </div>
      </div>

      <!-- Catena di Montaggio -->
      <div class="col-span-1">
        <div class="text-sm text-slate-400 mb-2 font-bold">Catena di Montaggio</div>
        <div class="space-y-2 max-h-64 overflow-y-auto">
          <div v-if="(player?.state.assemblyLine.length || 0) === 0" class="text-xs text-slate-500">
            Vuota
          </div>
          <div v-for="card in player?.state.assemblyLine" :key="card.id"
            class="bg-slate-700 border border-slate-600 rounded p-2 text-xs"
          >
            <div class="font-semibold text-white truncate">{{ card.card.name }}</div>
            <div class="text-slate-400">{{ card.card.cost }} turni</div>
          </div>
        </div>
      </div>

      <!-- Spedizione -->
      <div class="col-span-1">
        <div class="text-sm text-slate-400 mb-2 font-bold">Spedizione</div>
        <div class="space-y-2 max-h-64 overflow-y-auto">
          <div v-if="(player?.state.shipment.length || 0) === 0" class="text-xs text-slate-500">
            Nessuna
          </div>
          <div v-for="card in player?.state.shipment" :key="card.id"
            class="bg-slate-700 border border-slate-600 rounded p-2 text-xs cursor-pointer hover:border-amber-400"
            @click="isCurrentPlayer ? emit('accelerate-shipment', card.id, 1) : null"
          >
            <div class="font-semibold text-white truncate">{{ card.card.name }}</div>
            <div class="text-amber-300">📦 {{ card.shippingTurnsRemaining }} turni</div>
            <div v-if="isCurrentPlayer" class="text-slate-500 text-xs mt-1">Click per accelerare (+1 PR)</div>
          </div>
        </div>
      </div>

      <!-- Mano (solo per giocatore attuale) -->
      <div v-if="isCurrentPlayer" class="col-span-1">
        <div class="text-sm text-slate-400 mb-2 font-bold">Mano ({{ player?.state.hand.length }})</div>
        <div class="space-y-2 max-h-64 overflow-y-auto">
          <div v-for="card in player?.state.hand" :key="card.id"
            class="bg-gradient-to-r from-slate-700 to-slate-600 border border-slate-500 rounded p-2 text-xs cursor-pointer hover:border-white hover:from-slate-600 hover:to-slate-500 transition-all"
            @click="showCardDetail(card)"
          >
            <div class="font-semibold text-white truncate">{{ card.name }}</div>
            <div class="flex justify-between text-slate-300 mt-1">
              <span>⚔️ {{ card.power }}</span>
              <span>♻️ {{ card.vr }}</span>
            </div>
            <div class="flex gap-1 mt-2">
              <button @click.stop="emit('play-card', card.id)"
                class="btn btn-sm btn-primary flex-1 text-xs py-1 px-1"
              >
                Gioca
              </button>
              <button @click.stop="emit('discard-card', card.id)"
                class="btn btn-sm btn-secondary flex-1 text-xs py-1 px-1"
              >
                Scarta
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Card Detail Modal -->
    <CardDetailModal v-if="selectedCard" :card="selectedCard" @close="selectedCard = null" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { PlayerState } from '@/core/types'
import CardDetailModal from './CardDetailModal.vue'

interface Props {
  player?: PlayerState
  isCurrentPlayer: boolean
  isPlayerPerspective: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<{
  'play-card': [cardId: string]
  'discard-card': [cardId: string]
  'accelerate-shipment': [shipmentId: string, prSpent: number]
}>()

const selectedCard = ref<any>(null)

const baseHealthColor = computed(() => {
  if (!props.player) return 'text-slate-400'
  const health = props.player.base.armor
  const maxHealth = props.player.base.maxArmor
  const ratio = health / maxHealth

  if (ratio > 0.66) return 'text-green-400'
  if (ratio > 0.33) return 'text-yellow-400'
  return 'text-red-400'
})

const borderColor = computed(() => {
  if (!props.player) return 'border-slate-600'
  switch (props.player.faction) {
    case 'humans':
      return 'border-yellow-500/50'
    case 'neoss':
      return 'border-purple-500/50'
    case 'steamill':
      return 'border-slate-300/50'
    case 'sicari':
      return 'border-slate-700/50'
    default:
      return 'border-slate-600'
  }
})

function showCardDetail(card: any) {
  selectedCard.value = card
}
</script>
