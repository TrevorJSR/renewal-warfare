# Renewal: Warfare - TCG

**Tactical Card Game** completo con Vue 3, TypeScript, IA intelligente e Deck Builder.

![Status](https://img.shields.io/badge/Status-Alpha-yellow)
![License](https://img.shields.io/badge/License-MIT-blue)
![Fazioni](https://img.shields.io/badge/Fazioni-4-success)
![Carte](https://img.shields.io/badge/Carte%20Core%20Set-64-success)

---

## 🎮 Quick Start

### Installazione

```bash
# Clona il repository
git clone https://github.com/TrevorJSR/renewal-warfare.git
cd renewal-warfare

# Installa dipendenze
npm install

# Avvia dev server
npm run dev
```

Il gioco si apre automaticamente su `http://localhost:5173`

### Build per produzione

```bash
npm run build
```

I file compilati saranno in `dist/`

---

## 📖 Regolamento

### Obiettivo
Distruggere la Base nemica riducendo i Punti Armatura (PA) a 0, quindi conquistare la zona di conquista fino a esaurire i Turni di Conquista (TC).

### Fazioni

| Fazione | Colore | Specialità |
|---------|--------|------------|
| **Umani** | 🟨 Giallo | Guerrieri versatili, riparazioni |
| **Neoss** | 🟣 Viola | Psichici, riciclo, accelerazione |
| **Steamill** | ⚪ Bianco | Meccanici, fortificazioni, potenza |
| **Sicari** | ⬛ Nero | Assassini, furto risorse, inganno |

### Turno Standard

1. **Inizio Turno**: Avanza Spedizioni, reset attacchi
2. **Operazioni**: Gioca carte, accelera spedizioni, ripara Base
3. **Combattimento**: Attacca con unità
4. **Verifica**: Controlla conquista, eccedenza PR
5. **Fine Turno**: Passa al prossimo giocatore

### Meccaniche Chiave

#### Catena di Montaggio → Spedizione → Campo

```
Mano → Catena (1 Slot per carta) → Spedizione (coperta) → Campo (rivelata)
```

- Ogni carta impiega X turni di spedizione per arrivare in campo
- Puoi accelerare spendendo 1 PR per turno (max 1 PR/carta/turno)
- Le carte in spedizione rimangono coperte all'avversario

#### Combattimento

**Attacco Individuale**: 1 Unità vs 1 Bersaglio
- Tira N d6 (dove N = Power della carta)
- Chi tira più alto vince
- In parità: vince il difensore (salvo Resilienza)

**Attacco Combinato**: 2+ Unità vs 1 Bersaglio
- Somma i Power degli attaccanti
- Il difensore riceve +1 bonus per ogni attaccante
- Se gli attaccanti perdono, TUTTI vengono distrutti
- Se vincono, il difensore viene distrutto

#### Riciclo (Punti Riciclo - PR)

- **Scarto volontario**: ottieni PR = VR della carta
- **Distruzione in combattimento**: ottieni PR = floor(VR/2), minimo 1
- I PR si accumulano nel Magazzino (capacità limitata)

#### Base Compromessa → Conquista

```
PA > 0: ATTIVA (non attaccabile se unità nemiche in campo)
        ↓ (quando PA = 0)
PA = 0: COMPROMESSA (attaccabile da unità, non dalla Base)
        ↓ (unità nemiche entrano nella Zona Conquista)
TC--:   TURNI DI CONQUISTA
        ↓ (quando TC = 0)
TC = 0: BASE CONQUISTATA - Giocatore eliminato
```

**Limite Zona Conquista**: Max 2 unità nemiche, max 1 Elite

#### Veicoli

- Richiedono equipaggio minimo per funzionare
- Con equipaggio completo ottengono bonus
- Se il Veicolo viene distrutto, l'equipaggio viene distrutto
- Possono essere ricostruiti nello stesso turno (costo: VR in PR)

#### Fortificazioni

- Occupano Slot separati dalla Catena di Montaggio
- Hanno turni di costruzione
- Non producono effetti durante la costruzione
- Possono essere smantellate (costo: floor(turni iniziali/2) PR)

---

## 🎴 Core Set: 64 Carte

### Distribuzione

- **40 Comuni** (10 per fazione)
- **16 Non Comuni** (4 per fazione)
- **8 Rare/Elite** (2 per fazione)

### Tipi di Carta

- **Unit** (soldati, creature, droni)
- **Elite** (leader, campioni - richiedono Postazioni di Comando)
- **Vehicle** (veicoli, navi, macchinari)
- **Equipment** (armi, armature, potenziamenti)
- **Fortification** (difese, strutture)
- **Technology** (tecnologie istantanee o permanenti)

### Statistiche Carta

```typescript
interface Card {
  name: string           // Nome carta
  faction: Faction       // Umani | Neoss | Steamill | Sicari
  type: CardType         // unit | elite | vehicle | equipment | ...
  cost: number           // Turni di Spedizione
  power: number          // Valore di Combattimento (d6 da tirare)
  vr: number             // Valore di Riciclo (PR ottenuti)
  description: string    // Descrizione lore
  ability?: string       // Abilità testuale speciale
  resilience?: boolean   // Vince la parità in combattimento
}
```

---

## 🤖 Sistema IA

L'IA avversaria utilizza un **Position Evaluator** che valuta:

1. **Salute della Base** (+10 per PA)
2. **Risorse Accumulate** (+5 per PR)
3. **Unità in Campo** (+15 per unità)
4. **Potenza Media** (+8 per differenziale)
5. **Pericolo di Conquista** (-50 per TC se compromessa)

**Decision Maker** sceglie le azioni:

- Quale carta giocare (priorità: Elite > Veicoli > Unità > Equipaggiamento)
- Se scartare (quando PR < 5)
- Quando accelerare (se in vantaggio strategico)
- Chi attaccare (unità più debole > Base)
- Se riparare la Base (quando PA ≤ 2)

---

## 🏗️ Architettura Progetto

```
renewal-warfare/
├── src/
│   ├── core/                    # Logica di gioco
│   │   ├── types.ts            # Interfacce TypeScript
│   │   ├── player.ts           # Classe Giocatore
│   │   ├── game.ts             # Game Engine
│   │   ├── combat.ts           # Sistema Combattimento
│   │   └── ai.ts               # IA e Decision Making
│   ├── data/
│   │   └── coreset.ts          # 64 carte Core Set
│   ├── stores/
│   │   ├── gameStore.ts        # Pinia state (partita)
│   │   └── deckBuilderStore.ts # Pinia state (deck)
│   ├── components/
│   │   ├── MainMenu.vue        # Menu principale
│   │   ├── GameBoard.vue       # Tavolo di gioco
│   │   ├── DeckBuilder.vue     # Editor deck
│   │   └── GameBoard/          # Sottocomponenti
│   │       ├── PlayerBoard.vue
│   │       ├── BattlefieldZone.vue
│   │       ├── TurnControls.vue
│   │       └── ...
│   ├── App.vue                 # Entry component
│   ├── main.ts                 # Entry point
│   └── style.css               # Tailwind + custom styles
├── index.html
├── vite.config.ts
├── tailwind.config.js
├── tsconfig.json
└── package.json
```

---

## 🎨 Tecnologie

- **Frontend**: Vue 3 + TypeScript
- **Build Tool**: Vite
- **State Management**: Pinia
- **Styling**: Tailwind CSS
- **Game Logic**: TypeScript classes
- **Storage**: LocalStorage (deck builder)

---

## 📋 Funzionalità Implementate

### ✅ Game Engine
- [x] Logica turni completa (Start → Operations → Combat → Verification → End)
- [x] Sistema Catena di Montaggio + Spedizione
- [x] Combattimento (individuale + combinato)
- [x] Resilienza
- [x] Base inattaccabile con unità nemiche in campo
- [x] Zona Conquista con limite 2 unità / 1 Elite
- [x] TC (Turni di Conquista) e vittoria per conquista
- [x] Riciclo (PR) da scarto volontario e distruzione
- [x] Accelerazione spedizioni con PR
- [x] Veicoli con equipaggio minimo/completo
- [x] Equipaggiamenti e riequipaggiamento
- [x] Fortificazioni con turni di costruzione

### ✅ UI/UX
- [x] Menu principale con selezione fazione
- [x] Tavolo di gioco full responsive
- [x] Visualizzazione mano, Catena, Spedizione, Campo
- [x] Dettagli carte con modale
- [x] Log della partita in tempo reale
- [x] Stato Base (PA, TC, isCompromised)
- [x] Controllo turni (End Turn button)
- [x] Game Over modal

### ✅ Deck Builder
- [x] Creazione deck per fazione
- [x] Aggiunta/rimozione carte (max 3 copie)
- [x] Validazione deck (min 40 carte, stessa fazione)
- [x] Statistiche per tipo
- [x] Salvataggio in LocalStorage
- [x] Filtri (nome, tipo, rarità)

### ✅ IA
- [x] Position Evaluator (valuta situazione tattica)
- [x] Decision Maker (sceglie azioni)
- [x] Scelta carte da giocare (priorità intelligente)
- [x] Scelta attacchi (unità + Base)
- [x] Gestione risorse (accelerazione, riparazione)
- [x] Turni IA completamente automatici

### ✅ Core Set
- [x] 64 carte complete
- [x] Descrizioni e abilità per tutte le carte
- [x] Illustrazioni (descrizioni per generazione)
- [x] Balancing iniziale

---

## 🚀 Prossimi Step

### Alpha 0.2
- [ ] Generazione illustrazioni con AI (DALL-E/Stable Diffusion)
- [ ] Animazioni combattimento
- [ ] Effetti sonori
- [ ] Particle effects

### Beta 0.3
- [ ] Multiplayer online (WebSocket)
- [ ] Account giocatore + Profilo
- [ ] Ranking e Leaderboard
- [ ] Statistiche partite
- [ ] Tutorial interattivo

### v1.0
- [ ] Espansioni aggiuntive (64+ nuove carte)
- [ ] Modalità Campagna PvE
- [ ] Draft mode
- [ ] Cosmetic skins
- [ ] Trading tra giocatori

---

## 📝 Regolamento Completo

Leggi il [Regolamento PDF v1.3 (Dark Blue)](./docs/Renewal_Warfare_Regolamento_Final_v1.3_DarkBlue.pdf) per:
- Regole dettagliate
- Esempi illustrati
- Glossario
- FAQ
- Tabella di riferimento rapido

---

## 🤝 Contributing

Pull requests e issues sono benvenuti!

Aree di contributo:
- Bug fixes
- Nuove carte
- Balance tweaks
- UI/UX improvements
- Ottimizzazioni IA

---

## 📄 License

MIT License - vedi `LICENSE` file

---

## 👨‍💻 Author

**TrevorJSR** - Game Designer & Developer

---

## 🎯 Status

**Alpha v0.1.0** - Funzionalità core completate. Ready for playtesting.

Ultimo aggiornamento: 11 Settembre 2026
