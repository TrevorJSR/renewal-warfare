# Contributing to Renewal: Warfare

Grazie per l'interesse nel contribuire a Renewal: Warfare! 🎴

## Come Contribuire

### Bug Reports

1. Controlla se il bug è già segnalato
2. Apri un nuovo issue con:
   - **Titolo**: Breve descrizione
   - **Descrizione**: Dettagli del problema
   - **Step to Reproduce**: Come riprodurre
   - **Expected**: Cosa dovrebbe accadere
   - **Actual**: Cosa accade invece
   - **Environment**: Browser, OS, versione

### Feature Requests

1. Apri un issue con label `enhancement`
2. Descrivi il feature desiderato
3. Spiega perché è utile
4. Fornisci esempi di utilizzo

### Pull Requests

1. Fork il repository
2. Crea un branch: `git checkout -b feature/my-feature`
3. Fai i tuoi cambiamenti
4. Testa localmente: `npm run dev`
5. Commit: `git commit -m 'Add my feature'`
6. Push: `git push origin feature/my-feature`
7. Apri una Pull Request

## Setup Locale

```bash
# Clona il fork
git clone https://github.com/YOUR_USERNAME/renewal-warfare.git
cd renewal-warfare

# Installa dipendenze
npm install

# Avvia dev server
npm run dev

# Apri http://localhost:5173
```

## Code Style

- **TypeScript**: Strict mode abilitato
- **Vue**: Composition API + `<script setup>`
- **Naming**: camelCase per variabili, PascalCase per componenti/classi
- **Indentazione**: 2 spazi
- **Commenti**: In italiano, chiari e concisi

### Esempio

```typescript
// ❌ SBAGLIATO
const PlayerHealthBar = () => {
  let playerhealth = 100;
  return playerhealth;
}

// ✅ CORRETTO
const usePlayerHealth = () => {
  const playerHealth = ref(100)
  return { playerHealth }
}
```

## Testing

```bash
# Esegui dev server
npm run dev

# Testa manualmente le seguenti aree:
# 1. Menu principale (seleziona fazione)
# 2. Game board (gioca carta, attacca)
# 3. Deck builder (crea/modifica deck)
# 4. IA (turni automatici)
# 5. Combat system (tutti i casi)
```

## Aggiungere Nuove Carte

1. Apri `src/data/coreset.ts`
2. Aggiungi l'oggetto carta alla sezione fazione:

```typescript
{
  id: 'FAZ-T-###',         // FAZ: fazione (HUM/NEO/STE/SIC), T: tipo, ###: numero
  name: 'Card Name',
  faction: 'faction',
  type: 'unit',
  rarity: 'common',
  cost: 1,                 // Spedizione
  power: 2,               // Combattimento
  vr: 2,                  // Riciclo
  description: 'Lore text',
  ability: 'Effect text',
  illustration: 'AI prompt for image generation'
}
```

3. Testa che appaia nel Deck Builder
4. Gioca una partita per verificare il funzionamento

## Aggiungere Abilità Speciali

1. Scrivi l'effetto in linguaggio naturale nella carta
2. Implementa la logica in `src/core/game.ts` o `src/core/player.ts`
3. Testa con Deck Builder
4. Documenta nei commenti

## Aree Prioritarie per Contributi

### 🔴 Alta Priorità
- [ ] Illustrazioni generate via AI (DALL-E/Stable Diffusion)
- [ ] Animazioni combattimento
- [ ] Fix di edge cases nell'IA
- [ ] Miglioramenti UI mobile

### 🟡 Media Priorità
- [ ] Effetti sonori
- [ ] Particle effects
- [ ] Tutorial interattivo
- [ ] Statistiche partita

### 🟢 Bassa Priorità
- [ ] Cosmetic skins
- [ ] Temi UI alternativi
- [ ] Localizzazioni (EN, FR, ES, DE)

## Debugging

### Abilitare console di debug

```typescript
// In src/main.ts
if (import.meta.env.DEV) {
  window.__DEBUG__ = true
}
```

### Ispezionare lo stato del gioco

```javascript
// In browser console
window.__gameStore.game.value.state
window.__gameStore.currentPlayer.value.state
```

### Logging

```typescript
console.log('[GAME]', 'Message')
console.log('[AI]', 'Message')
console.log('[COMBAT]', 'Message')
```

## Licenza

Contribuendo, accetti che il tuo codice sia rilasciato sotto MIT License.

## Domande?

Apri una discussion o contatta il team! 👋
