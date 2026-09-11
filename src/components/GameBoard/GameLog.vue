<template>
  <div class="card p-6 bg-slate-800/50 border-2 border-slate-600 max-h-64 overflow-y-auto">
    <h3 class="font-display text-lg font-bold text-white mb-4">Log Partita</h3>
    <div class="space-y-2">
      <div v-for="(action, index) in history.slice().reverse()" :key="index" class="text-sm text-slate-300">
        <span class="text-slate-500">{{ formatTime(action.timestamp) }}</span>
        <span v-if="action.type === 'log'" class="ml-2">{{ action.payload.message }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { GameAction } from '@/core/types'

interface Props {
  history: GameAction[]
}

defineProps<Props>()

function formatTime(timestamp: number): string {
  const date = new Date(timestamp)
  return date.toLocaleTimeString('it-IT')
}
</script>
