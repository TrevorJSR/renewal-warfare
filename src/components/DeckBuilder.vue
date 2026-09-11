<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="flex justify-between items-center mb-8">
        <h1 class="font-display text-4xl font-black text-white">Deck Builder</h1>
        <button @click="goToMenu" class="btn btn-secondary">← Menu</button>
      </div>

      <!-- Deck Selection / Creation -->
      <div v-if="!deckStore.currentDeck" class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div v-for="faction in ['humans', 'neoss', 'steamill', 'sicari']" :key="faction"
          @click="createNewDeck(faction as Faction)"
          :class="getFactionBg(faction as Faction)"
          class="card cursor-pointer p-8 text-center hover:scale-105 transform transition-all duration-300"
        >
          <div class="text-4xl mb-2 capitalize">{{ faction }}</div>
          <p class="text-slate-300">Crea nuovo mazzo</p>
        </div>
      </div>

      <!-- Deck Editor -->
      <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Left: Available Cards -->
        <div class="lg:col-span-2">
          <div class="card p-6 mb-6">
            <h2 class="font-display text-2xl font-bold text-white mb-4">Carte Disponibili</h2>

            <!-- Filters -->
            <div class="flex gap-4 mb-6 flex-wrap">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Cerca carta..."
                class="flex-1 min-w-48 bg-slate-700 border border-slate-600 rounded px-4 py-2 text-white placeholder-slate-400"
              />
              <select v-model="selectedType" class="bg-slate-700 border border-slate-600 rounded px-4 py-2 text-white">
                <option value="">Tutti i tipi</option>
                <option value="unit">Unità</option>
                <option value="elite">Elite</option>
                <option value="vehicle">Veicolo</option>
                <option value="equipment">Equipaggiamento</option>
                <option value="fortification">Fortificazione</option>
                <option value="technology">Tecnologia</option>
              </select>
              <select v-model="selectedRarity" class="bg-slate-700 border border-slate-600 rounded px-4 py-2 text-white">
                <option value="">Tutte le rarità</option>
                <option value="common">Comune</option>
                <option value="uncommon">Non Comune</option>
                <option value="rare">Rara</option>
              </select>
            </div>

            <!-- Cards Grid -->
            <div class="grid grid-cols-2 sm:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
              <div v-for="card in filteredCards" :key="card.id"
                class="bg-slate-700 border-2 border-slate-600 rounded p-3 cursor-pointer hover:border-amber-400 transition-all"
                @click="addCardToDeck(card)"
              >
                <div class="text-xs font-bold text-amber-300 mb-1 truncate">{{ card.name }}</div>
                <div class="text-xs text-slate-300 mb-2">
                  <div>Power: {{ card.power }}</div>
                  <div>VR: {{ card.vr }}</div>
                </div>
                <div class="text-xs text-slate-400">{{ card.type }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right: Deck Info & Cards -->
        <div class="lg:col-span-1">
          <!-- Deck Stats -->
          <div class="card p-6 mb-6">
            <h2 class="font-display text-xl font-bold text-white mb-4">{{ deckStore.currentDeck?.name }}</h2>

            <div class="space-y-4">
              <div>
                <div class="text-sm text-slate-400">Carte nel mazzo</div>
                <div class="text-2xl font-bold text-white">{{ deckStore.currentDeck?.cards.length || 0 }}/60</div>
              </div>

              <div>
                <div class="text-sm text-slate-400 mb-2">Per tipo</div>
                <div class="space-y-1 text-sm">
                  <div v-for="(count, type) in deckStore.typeStats" :key="type" class="flex justify-between text-slate-300">
                    <span class="capitalize">{{ type }}</span>
                    <span>{{ count }}</span>
                  </div>
                </div>
              </div>

              <div class="flex gap-2">
                <button @click="saveDeck" class="btn btn-primary flex-1">
                  Salva
                </button>
                <button @click="resetDeck" class="btn btn-secondary flex-1">
                  Reset
                </button>
              </div>

              <button @click="startGameWithDeck" :disabled="!deckStore.isValidDeck"
                class="btn w-full"
                :class="deckStore.isValidDeck ? 'btn-primary' : 'opacity-50 cursor-not-allowed bg-slate-700'"
              >
                {{ deckStore.isValidDeck ? 'Gioca con questo mazzo' : 'Mazzo non valido' }}
              </button>
            </div>
          </div>

          <!-- Deck Cards -->
          <div class="card p-6">
            <h3 class="font-display text-lg font-bold text-white mb-4">Carte nel Mazzo</h3>
            <div class="space-y-2 max-h-96 overflow-y-auto">
              <div v-for="card in groupedDeckCards" :key="card.id"
                class="flex justify-between items-center bg-slate-700 p-2 rounded text-sm"
              >
                <div class="flex-1">
                  <div class="text-white">{{ card.name }}</div>
                  <div class="text-xs text-slate-400">{{ card.type }}</div>
                </div>
                <div class="flex items-center gap-2">
                  <span class="text-slate-300">{{ getCardCountInDeck(card.id) }}</span>
                  <button @click="removeCardFromDeck(card.id)" class="text-red-400 hover:text-red-300">
                    ×
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useDeckBuilderStore } from '@/stores/deckBuilderStore'
import { CORESET } from '@/data/coreset'
import type { Faction, Card } from '@/data/coreset'

const deckStore = useDeckBuilderStore()
const searchQuery = ref('')
const selectedType = ref('')
const selectedRarity = ref('')

const filteredCards = computed(() => {
  if (!deckStore.currentDeck) return []

  return CORESET.filter(card => {
    if (card.faction !== deckStore.currentDeck?.faction) return false
    if (searchQuery.value && !card.name.toLowerCase().includes(searchQuery.value.toLowerCase())) return false
    if (selectedType.value && card.type !== selectedType.value) return false
    if (selectedRarity.value && card.rarity !== selectedRarity.value) return false
    return true
  })
})

const groupedDeckCards = computed(() => {
  if (!deckStore.currentDeck) return []
  const seen = new Map<string, Card>()
  for (const card of deckStore.currentDeck.cards) {
    if (!seen.has(card.id)) {
      seen.set(card.id, card)
    }
  }
  return Array.from(seen.values())
})

function getFactionBg(faction: Faction): string {
  const colors: Record<Faction, string> = {
    humans: 'border-yellow-500 bg-yellow-900/30',
    neoss: 'border-purple-500 bg-purple-900/30',
    steamill: 'border-slate-300 bg-slate-300/10',
    sicari: 'border-slate-700 bg-slate-800/30',
  }
  return colors[faction]
}

function createNewDeck(faction: Faction) {
  deckStore.createDeck(`Mazzo ${faction}`, faction)
}

function addCardToDeck(card: Card) {
  deckStore.addCardToDeck(card)
}

function removeCardFromDeck(cardId: string) {
  deckStore.removeCardFromDeck(cardId, 1)
}

function getCardCountInDeck(cardId: string): number {
  if (!deckStore.currentDeck) return 0
  return deckStore.currentDeck.cards.filter(c => c.id === cardId).length
}

function saveDeck() {
  deckStore.saveDeck()
}

function resetDeck() {
  if (!deckStore.currentDeck) return
  deckStore.currentDeck.cards = []
  saveDeck()
}

function startGameWithDeck() {
  // TODO: Implementare avvio gioco con il deck selezionato
}

function goToMenu() {
  ;(window as any).navigationController.goToMenu()
}
</script>
