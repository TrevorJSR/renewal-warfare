# Renewal: Warfare - Changelog

## [0.1.0] - 2026-09-11

### Added
- ✨ **Game Engine Completo**
  - Implementazione logica turni (Start → Operations → Combat → Verification → End)
  - Sistema Catena di Montaggio con Spedizione coperta
  - Combattimento (individuale + combinato) con d6 rolls
  - Resilienza come abilità in parità
  - Base inattaccabile con unità nemiche in campo
  - Zona Conquista con limite 2 unità / 1 Elite
  - Sistema TC (Turni di Conquista) per vittoria
  - Riciclo PR da scarto e distruzione (floor(VR/2))
  - Accelerazione spedizioni (1 PR/turno max)
  - Veicoli con equipaggio minimo/completo
  - Equipaggiamenti e riequipaggiamento
  - Fortificazioni con turni costruzione

- 🎮 **UI/UX Vue 3**
  - Menu principale con selezione fazione
  - Tavolo di gioco responsive
  - Visualizzazione mano, Catena, Spedizione, Campo
  - Modale dettagli carte
  - Log partita real-time
  - Stato Base (PA, TC, Compromessa)
  - Controllo turni (End Turn)
  - Game Over modal

- 🛠️ **Deck Builder**
  - Creazione deck per fazione
  - Aggiunta/rimozione carte (max 3 copie)
  - Validazione deck (min 40, stessa fazione)
  - Statistiche per tipo carta
  - Salvataggio in LocalStorage
  - Filtri (nome, tipo, rarità)

- 🤖 **AI System**
  - Position Evaluator (valuta situazione tattica)
  - Decision Maker (sceglie azioni intelligentemente)
  - Scelta carte da giocare con priorità
  - Scelta attacchi (unità + Base)
  - Gestione risorse (accelerazione, riparazione)
  - Turni IA completamente automatici

- 🎴 **Core Set: 64 Carte**
  - 40 Comuni (10 per fazione)
  - 16 Non Comuni (4 per fazione)
  - 8 Rare/Elite (2 per fazione)
  - Descrizioni complete e abilità
  - Illustrazioni (descrizioni per generazione)

- 🏗️ **Stack Tecnologico**
  - Vue 3 + TypeScript
  - Vite con fast HMR
  - Pinia per state management
  - Tailwind CSS per styling
  - TypeScript classes per game logic

### Status
- [x] Game mechanics
- [x] UI implementation
- [x] AI first version
- [x] Deck builder MVP
- [x] Core Set complete
- [ ] Illustrazioni generate via AI
- [ ] Animazioni
- [ ] Multiplayer
- [ ] Account system

### Known Issues
- AI non ancora ottimizzata per vittoria rapida
- Alcune edge cases nel parsing effetti carte
- Mobile UI da migliorare

---

## Roadmap

### v0.2.0 (Beta)
- [ ] Generazione illustrazioni con IA
- [ ] Animazioni combattimento
- [ ] Effetti sonori
- [ ] Miglioramenti IA
- [ ] Tutorial

### v0.3.0
- [ ] Multiplayer online (WebSocket)
- [ ] Account system
- [ ] Ranking
- [ ] Statistics

### v1.0.0
- [ ] Espansioni
- [ ] Modalità campagna
- [ ] Draft mode
- [ ] Trading
