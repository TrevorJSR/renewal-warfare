<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="mb-12">
        <h1 class="font-display text-5xl font-black text-white mb-2">RENEWAL: WARFARE</h1>
        <p class="text-slate-400 text-lg">Tactical Card Game</p>
      </div>

      <!-- Menu Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- Gioca -->
        <div
          @click="navigateTo('game')
          class="card cursor-pointer hover:scale-105 transform transition-all duration-300 p-8 bg-gradient-to-br from-purple-900/50 to-slate-800/50 border-2 border-purple-500/50 hover:border-purple-400"
        >
          <div class="text-5xl mb-4">⚔️</div>
          <h2 class="font-display text-2xl font-bold text-white mb-2">Gioca</h2>
          <p class="text-slate-300 mb-4">Sfida l'IA in una partita 1v1</p>
          <div class="flex gap-4">
            <button v-for="faction in ['humans', 'neoss', 'steamill', 'sicari']" :key="faction"
              @click.stop="startGame(faction)"
              :class="getFactionClass(faction)"
              class="btn btn-sm text-xs py-1 px-2 flex-1 capitalize"
            >
              {{ faction }}
            </button>
          </div>
        </div>

        <!-- Deck Builder -->
        <div
          @click="navigateTo('deckbuilder')
          class="card cursor-pointer hover:scale-105 transform transition-all duration-300 p-8 bg-gradient-to-br from-amber-900/50 to-slate-800/50 border-2 border-amber-500/50 hover:border-amber-400"
        >
          <div class="text-5xl mb-4">🃏</div>
          <h2 class="font-display text-2xl font-bold text-white mb-2">Deck Builder</h2>
          <p class="text-slate-300 mb-4">Crea e personalizza i tuoi mazzi</p>
          <button @click.stop="navigateTo('deckbuilder')" class="btn btn-primary w-full">
            Apri Deck Builder
          </button>
        </div>

        <!-- Regolamento -->
        <a
          href="https://github.com/TrevorJSR/renewal-warfare#regolamento"
          target="_blank"
          class="card cursor-pointer hover:scale-105 transform transition-all duration-300 p-8 bg-gradient-to-br from-blue-900/50 to-slate-800/50 border-2 border-blue-500/50 hover:border-blue-400"
        >
          <div class="text-5xl mb-4">📖</div>
          <h2 class="font-display text-2xl font-bold text-white mb-2">Regolamento</h2>
          <p class="text-slate-300">Leggi le regole complete del gioco</p>
        </a>

        <!-- About -->
        <div class="card p-8 bg-gradient-to-br from-slate-700/50 to-slate-900/50 border-2 border-slate-600/50">
          <div class="text-5xl mb-4">ℹ️</div>
          <h2 class="font-display text-2xl font-bold text-white mb-2">About</h2>
          <p class="text-slate-300 text-sm">
            Gioco di carte collezionabili tattico. 4 fazioni, 64 carte Core Set, AI intelligente.
          </p>
          <div class="mt-4 pt-4 border-t border-slate-600">
            <p class="text-slate-400 text-xs">v0.1.0 | Alpha Build</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGameStore } from '@/stores/gameStore'
import type { Faction } from '@/data/coreset'

const gameStore = useGameStore()

const factionColors: Record<Faction, string> = {
  humans: 'bg-yellow-600 hover:bg-yellow-500 border-yellow-400',
  neoss: 'bg-purple-600 hover:bg-purple-500 border-purple-400',
  steamill: 'bg-slate-400 hover:bg-slate-300 text-black border-slate-300',
  sicari: 'bg-slate-900 hover:bg-slate-800 border-slate-700',
}

function getFactionClass(faction: Faction): string {
  return factionColors[faction]
}

function navigateTo(view: string) {
  ;(window as any).navigationController[`goTo${view.charAt(0).toUpperCase()}${view.slice(1)}`]()
}

function startGame(faction: Faction) {
  const opponentFaction: Faction = faction === 'humans' ? 'neoss' : 'humans'
  gameStore.startGame(faction, opponentFaction)
  navigateTo('game')
}
</script>
