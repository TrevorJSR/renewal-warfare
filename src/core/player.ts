import type { Card, Faction } from '@/data/coreset'
import type { PlayerState, AssemblyCard, ShipmentCard, BattlefieldCard } from './types'

export class Player {
  id: string
  faction: Faction
  state: PlayerState

  constructor(id: string, faction: Faction, deck: Card[]) {
    this.id = id
    this.faction = faction

    // Shuffle deck
    const shuffledDeck = [...deck].sort(() => Math.random() - 0.5)
    const startingHand = shuffledDeck.splice(0, 5)

    this.state = {
      id,
      faction,
      deck: shuffledDeck,
      hand: startingHand,
      assemblyLine: [],
      shipment: [],
      battlefield: [],
      base: {
        armor: 8,
        maxArmor: 8,
        conquestTurns: 4,
        maxConquestTurns: 4,
        isCompromised: false,
        assemblySlots: 3,
        conquestZone: [],
      },
      pr: 5, // PR iniziali
      warehouse: 0,
      maxWarehouse: 15,
      commandPosts: 1,
      fortificationSlots: [
        { id: 'fort-1', status: 'empty' },
        { id: 'fort-2', status: 'empty' },
      ],
    }
  }

  drawCard(): Card | undefined {
    if (this.state.deck.length === 0) return undefined
    return this.state.deck.shift()
  }

  addPR(amount: number) {
    this.state.pr += amount
    // Eccedenza al magazzino
    const total = this.state.warehouse + this.state.pr
    if (total > this.state.maxWarehouse) {
      this.state.warehouse = this.state.maxWarehouse
      this.state.pr = total - this.state.maxWarehouse
    } else {
      this.state.warehouse += amount
      this.state.pr = 0
    }
  }

  removePR(amount: number): boolean {
    if (this.state.pr >= amount) {
      this.state.pr -= amount
      return true
    }
    return false
  }

  playCard(card: Card): boolean {
    const handIndex = this.state.hand.findIndex(c => c.id === card.id)
    if (handIndex === -1) return false

    this.state.hand.splice(handIndex, 1)
    return true
  }

  discardCard(card: Card): number {
    const handIndex = this.state.hand.findIndex(c => c.id === card.id)
    if (handIndex === -1) return 0

    this.state.hand.splice(handIndex, 1)
    return card.vr // Ritorna VR della carta scartata
  }

  addToAssemblyLine(card: Card): boolean {
    if (this.state.assemblyLine.length >= this.state.base.assemblySlots) {
      return false
    }

    this.state.assemblyLine.push({
      card,
      id: `${card.id}-${Date.now()}`,
      createdAt: Date.now(),
    })

    return true
  }

  moveToShipment(assemblyCard: AssemblyCard): ShipmentCard {
    const shipmentCard: ShipmentCard = {
      card: assemblyCard.card,
      id: assemblyCard.id,
      shippingTurnsRemaining: assemblyCard.card.cost,
    }

    this.state.assemblyLine = this.state.assemblyLine.filter(ac => ac.id !== assemblyCard.id)
    this.state.shipment.push(shipmentCard)

    return shipmentCard
  }

  advanceShipment(): ShipmentCard[] {
    // Rimuovi 1 turno da tutte le carte in spedizione
    this.state.shipment.forEach(card => {
      card.shippingTurnsRemaining--
    })

    // Raccogli le carte pronte
    const deployed: ShipmentCard[] = []
    this.state.shipment = this.state.shipment.filter(card => {
      if (card.shippingTurnsRemaining <= 0) {
        deployed.push(card)
        return false
      }
      return true
    })

    return deployed
  }

  addToBattlefield(card: Card): BattlefieldCard {
    const battlefieldCard: BattlefieldCard = {
      card,
      id: `${card.id}-${Date.now()}`,
      damage: 0,
      equipment: [],
      vehicleCrew: [],
      hasAttackedThisTurn: false,
    }

    this.state.battlefield.push(battlefieldCard)
    return battlefieldCard
  }

  removeFromBattlefield(id: string): BattlefieldCard | undefined {
    const index = this.state.battlefield.findIndex(bc => bc.id === id)
    if (index === -1) return undefined

    return this.state.battlefield.splice(index, 1)[0]
  }

  accelerateShipment(shipmentCard: ShipmentCard, prSpent: number): boolean {
    if (prSpent < 1) return false

    shipmentCard.shippingTurnsRemaining -= prSpent
    if (shipmentCard.shippingTurnsRemaining < 0) {
      shipmentCard.shippingTurnsRemaining = 0
    }

    return this.removePR(prSpent)
  }

  resetAttackStates() {
    this.state.battlefield.forEach(card => {
      card.hasAttackedThisTurn = false
    })
  }

  damagBase(damage: number) {
    this.state.base.armor -= damage
    if (this.state.base.armor < 0) {
      this.state.base.armor = 0
      this.state.base.isCompromised = true
    }
  }

  repairBase(prSpent: number): boolean {
    if (prSpent < 2) return false
    if (this.state.base.armor >= this.state.base.maxArmor) return false

    if (!this.removePR(prSpent)) return false

    this.state.base.armor = Math.min(
      this.state.base.armor + 1,
      this.state.base.maxArmor
    )

    return true
  }
}
