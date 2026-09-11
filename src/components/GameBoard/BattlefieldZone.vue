<template>
  <div class="card p-6 bg-gradient-to-b from-slate-800 to-slate-900 border-2 border-slate-600">
    <h2 class="font-display text-2xl font-bold text-white mb-6">Campo di Battaglia</h2>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Avversario Campo -->
      <div>
        <h3 class="text-sm font-bold text-slate-400 mb-4 uppercase">⚔️ Unità Avversarie</h3>
        <div class="grid grid-cols-2 gap-4">
          <div v-if="opponentBattlefield.length === 0" class="col-span-2 text-center text-slate-500 py-8">
            Nessuna unità in campo
          </div>
          <div v-for="unit in opponentBattlefield" :key="unit.id"
            class="bg-red-900/30 border-2 border-red-600 rounded-lg p-4 cursor-pointer hover:border-red-400 hover:bg-red-900/50 transition-all"
          >
            <div class="font-semibold text-white truncate">{{ unit.card.name }}</div>
            <div class="text-xs text-slate-300 mt-2">
              <div>⚔️ Power: {{ unit.card.power }}</div>
              <div v-if="unit.equipment?.length" class="text-amber-400">⚙️ Eq: {{ unit.equipment.length }}</div>
            </div>
            <button @click="$emit('attack-unit', unit.id)"
              class="mt-2 btn btn-sm btn-primary w-full text-xs py-1"
            >
              Attacca
            </button>
          </div>
        </div>
      </div>

      <!-- Giocatore Campo -->
      <div>
        <h3 class="text-sm font-bold text-slate-400 mb-4 uppercase">🛡️ Le Mie Unità</h3>
        <div class="grid grid-cols-2 gap-4">
          <div v-if="playerBattlefield.length === 0" class="col-span-2 text-center text-slate-500 py-8">
            Schiera unità
          </div>
          <div v-for="unit in playerBattlefield" :key="unit.id"
            class="bg-blue-900/30 border-2 border-blue-600 rounded-lg p-4"
            :class="{ 'opacity-50': unit.hasAttackedThisTurn }"
          >
            <div class="font-semibold text-white truncate">{{ unit.card.name }}</div>
            <div class="text-xs text-slate-300 mt-2">
              <div>⚔️ Power: {{ unit.card.power }}</div>
              <div v-if="unit.hasAttackedThisTurn" class="text-orange-400">⏹ Ha attaccato</div>
              <div v-if="unit.equipment?.length" class="text-amber-400">⚙️ Eq: {{ unit.equipment.length }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Zona Conquista -->
      <div v-if="opponentConquestZone.length > 0" class="lg:col-span-2">
        <h3 class="text-sm font-bold text-red-400 mb-4 uppercase">🏴 Zona Conquista Nemico</h3>
        <div class="grid grid-cols-4 gap-4">
          <div v-for="unit in opponentConquestZone" :key="unit.id"
            class="bg-red-950/50 border-2 border-red-700 rounded-lg p-4"
          >
            <div class="font-semibold text-red-300">{{ unit.card.name }}</div>
            <div class="text-xs text-red-400 mt-1">In conquista...</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { BattlefieldCard } from '@/core/types'

interface Props {
  playerBattlefield: BattlefieldCard[]
  opponentBattlefield: BattlefieldCard[]
  opponentConquestZone: BattlefieldCard[]
}

defineProps<Props>()
defineEmits<{
  'attack-unit': [unitId: string]
  'attack-base': [unitId: string]
}>()
</script>
