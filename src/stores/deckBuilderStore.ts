import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Card, Faction } from '@/data/coreset'
import { CORESET } from '@/data/coreset'

export interface Deck {
  id: string
  name: string
  faction: Faction
  cards: Card[]
  createdAt: number
  updatedAt: number
}

export const useDeckBuilderStore = defineStore('deckBuilder', () => {
  const decks = ref<Deck[]>([])
  const currentDeck = ref<Deck | null>(null)

  const factionStats = computed(() => {
    if (!currentDeck.value) return {}
    const stats: Record<string, number> = {}
    currentDeck.value.cards.forEach(card => {
      stats[card.faction] = (stats[card.faction] || 0) + 1
    })
    return stats
  })

  const typeStats = computed(() => {
    if (!currentDeck.value) return {}
    const stats: Record<string, number> = {}
    currentDeck.value.cards.forEach(card => {
      stats[card.type] = (stats[card.type] || 0) + 1
    })
    return stats
  })

  const isValidDeck = computed(() => {
    if (!currentDeck.value) return false
    // Minimo 40 carte per deck
    if (currentDeck.value.cards.length < 40) return false
    // Tutte di una singola fazione
    const factions = new Set(currentDeck.value.cards.map(c => c.faction))
    return factions.size === 1
  })

  function createDeck(name: string, faction: Faction) {
    const newDeck: Deck = {
      id: `deck-${Date.now()}`,
      name,
      faction,
      cards: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    }
    decks.value.push(newDeck)
    currentDeck.value = newDeck
    return newDeck
  }

  function loadDeck(deckId: string) {
    const deck = decks.value.find(d => d.id === deckId)
    if (deck) {
      currentDeck.value = deck
    }
  }

  function addCardToDeck(card: Card, count: number = 1) {
    if (!currentDeck.value) return false
    if (card.faction !== currentDeck.value.faction) return false

    // Puoi avere max 3 copie della stessa carta
    const cardCount = currentDeck.value.cards.filter(c => c.id === card.id).length
    if (cardCount + count > 3) return false

    for (let i = 0; i < count; i++) {
      currentDeck.value.cards.push(card)
    }

    currentDeck.value.updatedAt = Date.now()
    saveDeck()
    return true
  }

  function removeCardFromDeck(cardId: string, count: number = 1) {
    if (!currentDeck.value) return false

    for (let i = 0; i < count; i++) {
      const index = currentDeck.value.cards.findIndex(c => c.id === cardId)
      if (index !== -1) {
        currentDeck.value.cards.splice(index, 1)
      }
    }

    currentDeck.value.updatedAt = Date.now()
    saveDeck()
    return true
  }

  function saveDeck() {
    if (!currentDeck.value) return
    localStorage.setItem(`deck-${currentDeck.value.id}`, JSON.stringify(currentDeck.value))
  }

  function loadDecksFromStorage() {
    // Carica tutti i deck salvati
    const keys = Object.keys(localStorage).filter(k => k.startsWith('deck-'))
    keys.forEach(key => {
      const deckData = localStorage.getItem(key)
      if (deckData) {
        try {
          const deck = JSON.parse(deckData)
          decks.value.push(deck)
        } catch (e) {
          console.error('Errore caricamento deck', e)
        }
      }
    })
  }

  function deleteDeck(deckId: string) {
    decks.value = decks.value.filter(d => d.id !== deckId)
    localStorage.removeItem(`deck-${deckId}`)
    if (currentDeck.value?.id === deckId) {
      currentDeck.value = null
    }
  }

  return {
    decks,
    currentDeck,
    factionStats,
    typeStats,
    isValidDeck,
    createDeck,
    loadDeck,
    addCardToDeck,
    removeCardFromDeck,
    saveDeck,
    loadDecksFromStorage,
    deleteDeck,
  }
})
