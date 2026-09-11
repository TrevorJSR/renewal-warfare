import type { Card, Faction } from '@/data/coreset'

export interface PlayerState {
  id: string
  faction: Faction
  deck: Card[]
  hand: Card[]
  assemblyLine: AssemblyCard[] // Catena di Montaggio
  shipment: ShipmentCard[] // Spedizione
  battlefield: BattlefieldCard[]
  base: BaseState
  pr: number // Punti Riciclo
  warehouse: number // Magazzino (capacità)
  maxWarehouse: number
  commandPosts: number
  fortificationSlots: FortificationSlot[]
}

export interface AssemblyCard {
  card: Card
  id: string
  createdAt: number
}

export interface ShipmentCard {
  card: Card
  id: string
  shippingTurnsRemaining: number
}

export interface BattlefieldCard {
  card: Card
  id: string
  damage?: number
  equipment?: Card[]
  vehicleCrew?: Card[]
  hasAttackedThisTurn?: boolean
}

export interface BaseState {
  armor: number // PA (Punti Armatura)
  maxArmor: number
  conquestTurns: number // TC (Turni di Conquista)
  maxConquestTurns: number
  isCompromised: boolean
  assemblySlots: number
  conquestZone: BattlefieldCard[] // Unità nemiche in conquista
}

export interface FortificationSlot {
  id: string
  card?: Card
  status: 'empty' | 'building' | 'active' | 'dismantling'
  constructionTurnsRemaining?: number
  initialConstructionTurns?: number
}

export type GamePhase = 'start' | 'operations' | 'combat' | 'verification' | 'end'

export interface GameState {
  id: string
  players: PlayerState[]
  currentPlayerIndex: number
  currentPhase: GamePhase
  turnNumber: number
  history: GameAction[]
  isGameOver: boolean
  winner?: string
}

export interface GameAction {
  playerIndex: number
  type: string
  payload: any
  timestamp: number
}

export interface CombatResolution {
  attacker: BattlefieldCard
  defender: BattlefieldCard
  attackerDice: number[]
  defenderDice: number[]
  attackerTotal: number
  defenderTotal: number
  winner: 'attacker' | 'defender'
  destroyed: 'attacker' | 'defender' | 'both'
  recyclePR: number
}
