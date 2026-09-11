# Renewal: Warfare - TCG

**Tactical Card Game** completamente funzionante con Vue 3.

🎮 **Gioca ora**: Sfida l'IA in tempo reale
🃏 **64 Carte**: Core Set completo con 4 fazioni
🤖 **IA Intelligente**: Decision Making e Position Evaluation
⚙️ **Deck Builder**: Crea e personalizza i tuoi mazzi
📱 **Responsive**: Gioca su desktop, tablet, mobile

---

## 🚀 Avvia Subito

```bash
npm install
npm run dev
```

Si apre su `http://localhost:5173`

---

## 📚 Cosa Troverai

### ✅ Funzionalità Complete
- Game engine con turni completi (Start → Operations → Combat → Verification → End)
- Sistema Catena di Montaggio + Spedizione (carte coperte)
- Combattimento con d6 rolls (individuale + combinato)
- Resilienza, parità, bonus difensore
- Base inattaccabile con unità nemiche in campo
- **Zona Conquista** con limite 2 unità / 1 Elite
- **TC (Turni di Conquista)** - nuovo sistema di vittoria
- Riciclo PR da scarto volontario e distruzione
- Accelerazione spedizioni (1 PR/carta/turno)
- Veicoli con equipaggio minimo/completo
- Equipaggiamenti e riequipaggiamento
- Fortificazioni con turni di costruzione

### 🎨 UI Moderna
- Menu principale con selezione fazione
- Tavolo di gioco responsive e intuitivo
- Visualizzazione real-time: mano, Catena, Spedizione, Campo, Base
- Modale dettagli carte
- Log della partita live
- Game Over modal

### 🤖 IA Avanzata
- **Position Evaluator**: valuta PA, PR, unità, potenza, pericolo
- **Decision Maker**: sceglie azioni intelligentemente
- Priorità nell'ordine: Elite > Veicoli > Unità
- Scelta attacchi (unità debole → Base)
- Gestione risorse (accelerazione, riparazione intelligente)
- Turni completamente automatici

### 🃏 Deck Builder
- Creazione deck per fazione
- Max 3 copie per carta
- Validazione (min 40 carte, stessa fazione)
- Statistiche per tipo
- Salvataggio in LocalStorage
- Filtri avanzati

### 🎴 64 Carte Core Set
- 40 Comuni (10 per fazione: Umani, Neoss, Steamill, Sicari)
- 16 Non Comuni (4 per fazione)
- 8 Elite/Rare (2 per fazione)
- Descrizioni complete, abilità, illustrazioni (descrizioni)

---

## 🏗️ Stack Tecnologico

```
Vue 3 + TypeScript + Vite + Pinia + Tailwind CSS
```

- **Frontend**: Vue 3 Composition API
- **State**: Pinia stores (game + deck builder)
- **Styling**: Tailwind CSS
- **Build**: Vite (instant HMR)
- **Logica**: TypeScript classes (Player, Game, CombatSystem, IA)
- **Storage**: LocalStorage (deck persistence)

---

## 🎯 Regolamento Rapido

### Turno
1. **Inizio**: Avanza Spedizioni, reset attacchi
2. **Operazioni**: Gioca carte, accelera, ripara
3. **Combattimento**: Attacca con unità
4. **Verifica**: Controlla conquista
5. **Fine**: Passa turno

### Base: PA → Compromessa → Conquista
```
PA > 0 (ATTIVA)
   ↓ quando PA raggiunge 0
PA = 0 (COMPROMESSA)
   ↓ unità nemiche entrano in Zona Conquista
TC -- (Turni di Conquista)
   ↓ quando TC = 0
BASE CONQUISTATA - Giocatore eliminato
```

### Combattimento
- **Individuale**: 1 vs 1, tiri d6
- **Combinato**: 2+ attaccanti, il difensore riceve +1 per ogni attaccante
- Parità: vince il difensore (salvo Resilienza)
- Distruzione: ricicli floor(VR/2) PR, minimo 1

### Riciclo (PR - Punti Riciclo)
- **Scarto volontario**: PR = VR della carta
- **Distruzione**: PR = floor(VR/2)
- Max 15 PR in Magazzino
- Eccedenza a fine turno si perde

---

## 📂 Architettura

```
src/
├── core/                    # Game Logic
│   ├── types.ts            # TypeScript interfaces
│   ├── player.ts           # Player class
│   ├── game.ts             # Game engine
│   ├── combat.ts           # Combat system
│   └── ai.ts               # AI + Decision making
├── data/
│   └── coreset.ts          # 64 cards
├── stores/
│   ├── gameStore.ts        # Game state (Pinia)
│   └── deckBuilderStore.ts # Deck state (Pinia)
├── components/
│   ├── MainMenu.vue
│   ├── GameBoard.vue
│   ├── DeckBuilder.vue
│   └── GameBoard/          # Subcomponents
│       ├── PlayerBoard.vue
│       ├── BattlefieldZone.vue
│       ├── TurnControls.vue
│       ├── GameLog.vue
│       ├── GameOverModal.vue
│       └── CardDetailModal.vue
├── App.vue
└── main.ts
```

---

## 🎮 Come Giocare

### 1. Seleziona Fazione
Scegli tra **Umani** (giallo), **Neoss** (viola), **Steamill** (bianco), **Sicari** (nero)

### 2. Fase Operazioni (Il Tuo Turno)
- **Gioca Carte**: Clicca "Gioca" per aggiungere alla Catena
- **Scarta**: Clicca "Scarta" per ottenere PR immediati
- **Accelera**: Clicca su carta in Spedizione per accelerare (+1 PR)

### 3. Fase Combattimento
- Clicca su unità avversaria per attaccare
- Vinci/perdi il tiro d6
- Ottieni PR dalla distruzione avversaria

### 4. Termina Turno
- Clicca "Termina Turno"
- L'IA gioca automaticamente

### 5. Conquista
- Se Base nemica è Compromessa (PA = 0)
- Manda unità nella Zona Conquista
- Ogni turno senza unità nemiche: -1 TC
- TC = 0: Vittoria!

---

## 🎯 4 Fazioni

| Fazione | Forza | Debolezza | Strategia |
|---------|-------|-----------|----------|
| **Umani** | Versatili, riparazioni | Nessuna specialità | Control + Support |
| **Neoss** | Psichici, riciclo, accelerazione | Meno HP | Riciclo + Ritmo veloce |
| **Steamill** | Meccanici, fortificazioni, potenza | Costruzione lenta | Difesa + Offensive lenta |
| **Sicari** | Assassini, furto PR, inganno | Debolezza tattica | Disruption + Furto |

---

## 🚀 Deployment

### Build
```bash
npm run build
```

### Publish su GitHub Pages
```bash
git checkout -b deploy
npm run build
cp -r dist/* .
git add .
git commit -m "Deploy to GitHub Pages"
git push origin deploy:gh-pages
```

---

## 📝 Sviluppo

### Aggiungere una Nuova Carta

In `src/data/coreset.ts`:

```typescript
{
  id: 'HUM-U-011',
  name: 'Nuovo Soldato',
  faction: 'humans',
  type: 'unit',
  rarity: 'common',
  cost: 1,
  power: 2,
  vr: 2,
  description: 'Descrizione',
  ability: 'Effetto testuale',
  illustration: 'Descrizione per IA generazione immagini'
}
```

### Aggiungere un'Abilità Speciale

Modifica `src/core/game.ts` e aggiungi il check nell'effetto:

```typescript
if (card.ability?.includes('specifico testo')) {
  // Implementa effetto
}
```

---

## 🐛 Bug Reporting

Trova un bug? Apri un issue su GitHub con:
- Descrizione del problema
- Step per riprodurlo
- Screenshot/video
- Browser e OS

---

## 📄 License

MIT License - Vedi `LICENSE`

---

## 👨‍💻 Credits

**TrevorJSR** - Game Designer & Full Stack Developer

Based on:
- Regolamento originale Renewal: Warfare
- Lore canonico (Kal, Sicari, Neoss, Umani, Steamill, etc.)
- Design ispirato a Magic: The Gathering, Hearthstone, Legends of Runeterra

---

## 🎉 Status

**Alpha v0.1.0** - Core gameplay complete, ready for playtesting!

**Prossimo**: v0.2.0 con illustrazioni AI-generate e animazioni

Last Updated: 11 Settembre 2026
