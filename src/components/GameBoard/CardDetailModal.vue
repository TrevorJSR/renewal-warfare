<template>
  <Teleport to="body">
    <div class="fixed inset-0 bg-black/80 flex items-center justify-center z-50" @click="emit('close')">
      <div class="card p-8 bg-gradient-to-b from-slate-800 to-slate-900 border-4 border-amber-500 max-w-md w-full mx-4" @click.stop>
        <h2 class="font-display text-2xl font-bold text-white mb-4">{{ card.name }}</h2>

        <div class="space-y-3 text-sm">
          <div>
            <span class="text-slate-400">Tipo:</span>
            <span class="text-white ml-2 capitalize">{{ card.type }}</span>
          </div>
          <div>
            <span class="text-slate-400">Fazione:</span>
            <span class="text-white ml-2 capitalize">{{ card.faction }}</span>
          </div>
          <div>
            <span class="text-slate-400">Rarità:</span>
            <span class="text-white ml-2 capitalize">{{ card.rarity }}</span>
          </div>
          <div v-if="card.power">
            <span class="text-slate-400">Power:</span>
            <span class="text-white ml-2">{{ card.power }}</span>
          </div>
          <div>
            <span class="text-slate-400">VR:</span>
            <span class="text-white ml-2">{{ card.vr }}</span>
          </div>
          <div>
            <span class="text-slate-400">Spedizione:</span>
            <span class="text-white ml-2">{{ card.cost }} turni</span>
          </div>
        </div>

        <div class="mt-6 pt-6 border-t border-slate-600">
          <p class="text-slate-300 text-sm">{{ card.description }}</p>
        </div>

        <div v-if="card.ability" class="mt-4 pt-4 border-t border-slate-600">
          <p class="text-amber-400 text-sm font-semibold mb-2">Abilità</p>
          <p class="text-slate-300 text-sm">{{ card.ability }}</p>
        </div>

        <button @click="emit('close')" class="btn btn-secondary w-full mt-6">
          Chiudi
        </button>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import type { Card } from '@/data/coreset'

interface Props {
  card: Card
}

defineProps<Props>()
defineEmits<{
  'close': []
}>()
</script>
