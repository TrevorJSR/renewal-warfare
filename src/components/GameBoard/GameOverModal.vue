<template>
  <Teleport to="body">
    <div class="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div class="card p-12 bg-gradient-to-b from-slate-800 to-slate-900 border-4 border-gold-500 max-w-xl w-full mx-4">
        <h1 class="font-display text-5xl font-black text-white mb-4 text-center">PARTITA TERMINATA</h1>

        <div class="text-center mb-8">
          <div class="text-2xl font-bold" :class="winner ? 'text-green-400' : 'text-red-400'">
            {{ winner ? '🎉 HAI VINTO!' : '💀 HAI PERSO!' }}
          </div>
        </div>

        <div class="bg-slate-700/50 rounded-lg p-6 mb-8">
          <div class="text-slate-300 text-center">
            <p>La tua Base è stata {{ winner ? 'salvata' : 'conquistata' }}</p>
          </div>
        </div>

        <div class="flex gap-4">
          <button @click="emit('play-again')" class="btn btn-primary flex-1">
            Gioca Ancora
          </button>
          <button @click="emit('go-to-menu')" class="btn btn-secondary flex-1">
            Menu Principale
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
interface Props {
  winner?: string
}

defineProps<Props>()
defineEmits<{
  'play-again': []
  'go-to-menu': []
}>()
</script>
