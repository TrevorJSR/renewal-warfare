# Renewal: Warfare - Debugging Guide

## Quick Debugging

### 1. Controllare lo Stato del Gioco

```javascript
// In browser console (F12)
const store = window.__gameStore || {}
store.gameState          // Stato attuale della partita
store.currentPlayer      // Giocatore attuale
store.opponent           // Avversario
```

### 2. Ispezionare una Carta

```javascript
const card = store.currentPlayer?.state.hand[0]
console.log({
  name: card?.name,
  power: card?.power,
  vr: card?.vr,
  ability: card?.ability
})
```

### 3. Controllare Risorse

```javascript
console.log('PR:', store.currentPlayer?.state.pr)
console.log('Magazzino:', store.currentPlayer?.state.warehouse)
console.log('Base PA:', store.currentPlayer?.state.base.armor)
console.log('Base TC:', store.currentPlayer?.state.base.conquestTurns)
```

### 4. Ispezionare Spedizione

```javascript
store.currentPlayer?.state.shipment.forEach((ship, idx) => {
  console.log(`[${idx}]`, ship.card.name, '- Turni rimasti:', ship.shippingTurnsRemaining)
})
```

### 5. Vedere tutti i d6 lanciati nell'ultimo combattimento

```javascript
const lastCombat = store.gameState?.history.filter(a => a.type === 'combat').pop()
console.log('Ultimo combattimento:', lastCombat?.payload)
```

## Common Issues

### Carta non entra in campo

**Causa**: Potrebbe essere bloccata dalla Catena di Montaggio piena

```javascript
console.log('Slot Catena:', store.currentPlayer?.state.assemblyLine.length)
console.log('Slot Totali:', store.currentPlayer?.state.base.assemblySlots)
```

**Soluzione**: Attendi che le carte completino la spedizione

### IA non attacca

**Causa**: IA in fase diversa da "combat" o niente unità in campo

```javascript
console.log('Fase attuale:', store.gameState?.currentPhase)
console.log('Unità IA:', store.opponent?.state.battlefield.length)
```

### Base non si ripara

**Causa**: PR insufficienti o Base non Compromessa

```javascript
console.log('PR disponibili:', store.currentPlayer?.state.pr)
console.log('Base compromessa:', store.currentPlayer?.state.base.isCompromised)
console.log('PA attuali:', store.currentPlayer?.state.base.armor)
```

## Performance Debugging

### Misurare tempo di rendering

```javascript
console.time('Game Render')
// ... esegui azione ...
console.timeEnd('Game Render')
```

### Vedere quanti componenti Vue sono renderizzati

```javascript
// Apri Vue DevTools browser extension
// Seleziona un componente e ispezionalo
```

## Network Debugging (Future)

Quando aggiungeremo multiplayer online:

```javascript
// Monitorare connessione WebSocket
console.log('WS Status:', window.__ws?.readyState)
console.log('WS Messages:', window.__wsMessages)
```

## Testing Scenarios

### Scenario 1: Combattimento Semplice

```javascript
// 1. Gioca Unità (2 power)
store.playCard(store.currentPlayer?.state.hand[0].id)

// 2. Termina turno (carta entra in spedizione)
store.endTurn()

// 3. IA turno (carta entra in campo)
store.endTurn()

// 4. Attacca con Unità
const myUnit = store.currentPlayer?.state.battlefield[0]
const enemyUnit = store.opponent?.state.battlefield[0]
store.attackWithUnit(myUnit.id, enemyUnit.id)
```

### Scenario 2: Conquista

```javascript
// 1. Riduci PA avversario a 0
store.opponent?.state.base.armor = 0
store.opponent?.state.base.isCompromised = true

// 2. Manda Unità in Conquista
const myUnit = store.currentPlayer?.state.battlefield[0]
store.enterConquestZone(myUnit.id)

// 3. Verifica che TC scali
console.log('TC:', store.opponent?.state.base.conquestTurns)
```

### Scenario 3: Riciclo

```javascript
// 1. Scarta carta
store.discardCard(store.currentPlayer?.state.hand[0].id)

// 2. Controlla PR aumentati
console.log('PR dopo scarto:', store.currentPlayer?.state.pr)
```

## Log Levels

Modifica `src/core/game.ts` per abilitare logging:

```typescript
const LOG_LEVEL = {
  DEBUG: 'debug',
  INFO: 'info',
  WARN: 'warn',
  ERROR: 'error'
}

function log(level, message) {
  if (level === 'debug' && !window.__DEBUG__) return
  console.log(`[${level.toUpperCase()}]`, message)
}
```

## Browser DevTools Tips

### Vue DevTools
1. Installa estensione Chrome/Firefox
2. Ispeziona componenti Vue
3. Modifica props e state in real-time
4. Timeline di rendering

### Performance Tab
1. Apri DevTools > Performance
2. Registra una partita
3. Analizza bottleneck
4. Controlla se ai è troppo lenta

## Getting Help

Se il debugging non risolve il problema:

1. Apri un issue con:
   - Screenshot/video
   - Console errors
   - State dump (`JSON.stringify(store.gameState)`)
   - Browser + versione

2. Fornisci step-by-step per riprodurre

Buon debugging! 🐛
