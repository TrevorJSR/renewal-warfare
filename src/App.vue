<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
    <component :is="currentView" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import MainMenu from './components/MainMenu.vue'
import GameBoard from './components/GameBoard.vue'
import DeckBuilder from './components/DeckBuilder.vue'

type View = 'menu' | 'game' | 'deckbuilder'

const currentView = ref<View>('menu')

// Global navigation
window.navigationController = {
  goToGame: () => currentView.value = 'game',
  goToMenu: () => currentView.value = 'menu',
  goToDeckBuilder: () => currentView.value = 'deckbuilder',
}
</script>

<style scoped>
</style>
