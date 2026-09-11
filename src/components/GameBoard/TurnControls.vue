<template>
  <div class="card p-6 bg-gradient-to-r from-slate-800 to-slate-900 border-2 border-slate-600">
    <div class="flex justify-between items-center">
      <div>
        <div class="text-sm text-slate-400">{{ isPlayerTurn ? 'Il tuo turno' : 'Turno avversario' }}</div>
        <div class="text-lg font-bold" :class="isPlayerTurn ? 'text-green-400' : 'text-slate-400'">
          {{ currentPhase }}
        </div>
      </div>

      <div class="space-x-2">
        <button v-if="isPlayerTurn" @click="emit('end-turn')" class="btn btn-primary px-6">
          Termina Turno →
        </button>
        <button v-else class="btn btn-secondary px-6 cursor-not-allowed opacity-50">
          ⏳ Attesa...
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { GamePhase } from '@/core/types'

interface Props {
  isPlayerTurn: boolean
  currentPhase?: GamePhase
}

const props = defineProps<Props>()
defineEmits<{
  'end-turn': []
}>()
</script>
