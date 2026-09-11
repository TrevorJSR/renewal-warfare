import type { BattlefieldCard, CombatResolution } from './types'

export class CombatSystem {
  private rollDice(count: number): number[] {
    const dice: number[] = []
    for (let i = 0; i < count; i++) {
      dice.push(Math.floor(Math.random() * 6) + 1)
    }
    return dice
  }

  private sumDice(dice: number[]): number {
    return dice.reduce((a, b) => a + b, 0)
  }

  resolveCombat(
    attacker: BattlefieldCard,
    defender: BattlefieldCard,
    isCombined: boolean = false
  ): CombatResolution {
    const attackerPower = attacker.card.power || 1
    const defenderPower = defender.card.power || 1

    const attackerDice = this.rollDice(attackerPower)
    const defenderDice = this.rollDice(defenderPower)

    let attackerTotal = this.sumDice(attackerDice)
    let defenderTotal = this.sumDice(defenderDice)

    // Bonus al difensore in Attacco Combinato
    if (isCombined) {
      defenderTotal += 1
    }

    // Resilienza: non è un numero, non aumenta power
    // Ma è usata nello spareggio (vedi regole)
    const attackerHasResilience = attacker.card.resilience || false
    const defenderHasResilience = defender.card.resilience || false

    let winner: 'attacker' | 'defender' = 'defender' // Default: difensore vince la parità

    if (attackerTotal > defenderTotal) {
      winner = 'attacker'
    } else if (attackerTotal === defenderTotal) {
      // Spareggio
      if (attackerHasResilience && !defenderHasResilience) {
        winner = 'attacker'
      } else {
        winner = 'defender'
      }
    }

    const destroyed: 'attacker' | 'defender' | 'both' = winner === 'attacker' ? 'defender' : 'attacker'

    // Calcolo PR da riciclo
    let recyclePR = 0
    if (destroyed === 'defender') {
      // floor(VR/2), minimo 1
      recyclePR = Math.max(1, Math.floor(defender.card.vr / 2))
    } else if (destroyed === 'attacker') {
      recyclePR = Math.max(1, Math.floor(attacker.card.vr / 2))
    }

    return {
      attacker,
      defender,
      attackerDice,
      defenderDice,
      attackerTotal,
      defenderTotal,
      winner,
      destroyed,
      recyclePR,
    }
  }

  resolveAttackSequence(
    attackers: BattlefieldCard[],
    defender: BattlefieldCard,
    combinedMode: boolean = false
  ): CombatResolution {
    if (combinedMode) {
      // Attacco Combinato
      const totalAttackerPower = attackers.reduce((sum, a) => sum + (a.card.power || 1), 0)
      const totalDefenderPower = defender.card.power || 1

      const attackerDice = this.rollDice(totalAttackerPower)
      const defenderDice = this.rollDice(totalDefenderPower)

      let attackerTotal = this.sumDice(attackerDice)
      let defenderTotal = this.sumDice(defenderDice)

      // Bonus al difensore: +1 per ogni attaccante
      defenderTotal += attackers.length

      const attackerHasResilience = attackers.some(a => a.card.resilience)
      const defenderHasResilience = defender.card.resilience || false

      let winner: 'attacker' | 'defender' = 'defender'

      if (attackerTotal > defenderTotal) {
        winner = 'attacker'
      } else if (attackerTotal === defenderTotal) {
        if (attackerHasResilience && !defenderHasResilience) {
          winner = 'attacker'
        } else {
          winner = 'defender'
        }
      }

      const destroyed: 'attacker' | 'defender' | 'both' = winner === 'attacker' ? 'defender' : 'attacker'

      let recyclePR = 0
      if (destroyed === 'defender') {
        recyclePR = Math.max(1, Math.floor(defender.card.vr / 2))
      } else if (destroyed === 'attacker') {
        recyclePR = Math.max(1, Math.floor(attackers[0].card.vr / 2))
      }

      return {
        attacker: attackers[0],
        defender,
        attackerDice,
        defenderDice,
        attackerTotal,
        defenderTotal,
        winner,
        destroyed,
        recyclePR,
      }
    } else {
      // Attacchi Distinti - risolviamo sequenzialmente
      // Per semplicità, eseguiamo il primo attacco
      return this.resolveCombat(attackers[0], defender, false)
    }
  }
}
