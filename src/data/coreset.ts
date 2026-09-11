// Card type definitions and core set data

export type Faction = 'humans' | 'neoss' | 'steamill' | 'sicari'
export type CardType = 'unit' | 'elite' | 'vehicle' | 'equipment' | 'fortification' | 'technology'
export type Rarity = 'common' | 'uncommon' | 'rare'

export interface Card {
  id: string
  name: string
  faction: Faction
  type: CardType
  rarity: Rarity
  cost: number // Spedizione (Turni)
  power: number // Valore di Combattimento
  vr: number // Valore di Riciclo
  description: string
  ability?: string // Effetto testuale
  resilience?: boolean
  illustration: string // Descrizione per generazione immagini
  minEquipCrew?: number // Per Veicoli
  maxEquipCrew?: number // Per Veicoli
  constructionTurns?: number // Per Fortificazioni
}

export const CORESET: Card[] = [
  // ========== UMANI (Giallo) ==========
  // Comuni Umani
  {
    id: 'HUM-U-001',
    name: 'Soldato di Fanteria',
    faction: 'humans',
    type: 'unit',
    rarity: 'common',
    cost: 1,
    power: 2,
    vr: 2,
    description: 'Unità base. Versatile e affidabile.',
    ability: 'Nessuna abilità speciale.',
    illustration: 'Soldato umano in uniforme tattica moderna, fucile d\'assalto, elmetto protettivo, in posizione di combattimento in un ambiente urbano post-apocalittico'
  },
  {
    id: 'HUM-U-002',
    name: 'Tiratore Scelto',
    faction: 'humans',
    type: 'unit',
    rarity: 'common',
    cost: 2,
    power: 3,
    vr: 3,
    description: 'Specialista della precisione.',
    ability: 'Attacco da distanza. +1 POWER se nessun\'altra unità lo supporta.',
    illustration: 'Cecchino umano su una posizione elevata, mirino tattico, ghillie suit, paesaggio urbano distrutto sullo sfondo'
  },
  {
    id: 'HUM-U-003',
    name: 'Ingegnere di Battaglia',
    faction: 'humans',
    type: 'unit',
    rarity: 'common',
    cost: 2,
    power: 2,
    vr: 3,
    description: 'Supporta le difese.',
    ability: 'Durante le Operazioni, ripara 1 PA della Base per 1 PR.',
    illustration: 'Ingegnere umano con tuta tattica, zaino tecnologico, strumenti di riparazione, scena di costruzione post-bellica'
  },
  {
    id: 'HUM-U-004',
    name: 'Ricognitore',
    faction: 'humans',
    type: 'unit',
    rarity: 'common',
    cost: 1,
    power: 1,
    vr: 1,
    description: 'Veloce e silenzioso.',
    ability: 'Accelera di 1 Turno di Spedizione tutte le carte nella Catena di Montaggio per 1 PR.',
    illustration: 'Scout umano leggero, equipaggiamento minimo, postura agile, ambienti deserti post-nucleari'
  },
  {
    id: 'HUM-U-005',
    name: 'Medico da Campo',
    faction: 'humans',
    type: 'unit',
    rarity: 'common',
    cost: 1,
    power: 1,
    vr: 2,
    description: 'Sostiene le truppe.',
    ability: 'Quando una tua unità viene scartata per volontà, ottieni +1 PR aggiuntivo.',
    illustration: 'Medico militare umano con equipaggiamento medico, banda bianca sul braccio, clinica da campo improvvisata'
  },
  {
    id: 'HUM-U-006',
    name: 'Comandante Tattico',
    faction: 'humans',
    type: 'unit',
    rarity: 'common',
    cost: 2,
    power: 2,
    vr: 3,
    description: 'Coordina le operazioni.',
    ability: 'Quando entra in Campo, una carta nella Catena di Montaggio accelera di 1 Turno gratuitamente.',
    illustration: 'Ufficiale umano con mappa tattica olografica, comunicatore avanzato, uniforme da comando, centro operativo'
  },
  {
    id: 'HUM-U-007',
    name: 'Ariete Pesante',
    faction: 'humans',
    type: 'unit',
    rarity: 'common',
    cost: 3,
    power: 4,
    vr: 4,
    description: 'Forza bruta concentrata.',
    ability: 'Nessuna abilità speciale.',
    illustration: 'Soldato umano massicciamente armato, armatura pesante, arma a due mani devastante, centro di una zona di guerra'
  },
  {
    id: 'HUM-U-008',
    name: 'Tecnico di Potenziamento',
    faction: 'humans',
    type: 'unit',
    rarity: 'common',
    cost: 2,
    power: 2,
    vr: 2,
    description: 'Aumenta le prestazioni.',
    ability: 'Quando entra in Campo, puoi installare 1 Equipaggiamento su una unità in Campo senza pagare il costo di Spedizione.',
    illustration: 'Tecnico umano con visore AR, strumenti di modifica, laboratorio high-tech, armamenti potenziati sugli scaffali'
  },
  {
    id: 'HUM-U-009',
    name: 'Soldato di Rinforzo',
    faction: 'humans',
    type: 'unit',
    rarity: 'common',
    cost: 1,
    power: 2,
    vr: 2,
    description: 'Rinforzi rapidi.',
    ability: 'Nessuna abilità speciale.',
    illustration: 'Soldato umano fresco di reclutamento, equipaggiamento standard, espressione determinata, campo di addestramento'
  },
  {
    id: 'HUM-U-010',
    name: 'Artificiere',
    faction: 'humans',
    type: 'unit',
    rarity: 'common',
    cost: 2,
    power: 3,
    vr: 3,
    description: 'Esperto in esplosivi.',
    ability: 'Quando attacca, se distrugge il bersaglio, ottieni +1 PR aggiuntivo dal riciclo.',
    illustration: 'Artificiere umano con zaino di esplosivi, detonatori avanzati, zona di esplosione dietro, fumo e fuoco'
  },

  // Non Comuni Umani
  {
    id: 'HUM-NC-001',
    name: 'Colonnello di Ferro',
    faction: 'humans',
    type: 'unit',
    rarity: 'uncommon',
    cost: 3,
    power: 4,
    vr: 4,
    description: 'Veterano di mille battaglie.',
    ability: 'Resilienza. Quando attacca, +1 POWER per ogni altra unità in Campo.',
    illustration: 'Ufficiale superiore umano con decorazioni e cicatrici, armatura da comandante, sguardo stoico, sfondo di battaglia epica'
  },
  {
    id: 'HUM-NC-002',
    name: 'Elicottero da Ricognizione',
    faction: 'humans',
    type: 'vehicle',
    rarity: 'uncommon',
    cost: 2,
    power: 2,
    vr: 4,
    minEquipCrew: 1,
    maxEquipCrew: 2,
    description: 'Veicolo aereo leggero.',
    ability: 'Con 2 equipaggio, +2 POWER. Attacco: nessun bonus al difensore in Attacco Combinato.',
    illustration: 'Elicottero tattico umano, paint job militare, rotori in movimento, cielo tempestoso su zona di conflitto'
  },
  {
    id: 'HUM-NC-003',
    name: 'Scudo Energetico',
    faction: 'humans',
    type: 'equipment',
    rarity: 'uncommon',
    cost: 1,
    power: 0,
    vr: 3,
    description: 'Protezione tattica.',
    ability: 'L\'unità equipaggiata ottiene +2 al risultato di difesa in combattimento.',
    illustration: 'Scudo energetico blu brillante, geometria esagonale, effetto luminoso, equipaggio che lo indossa brilla di tecnologia'
  },
  {
    id: 'HUM-NC-004',
    name: 'Torretta di Difesa',
    faction: 'humans',
    type: 'fortification',
    rarity: 'uncommon',
    cost: 0,
    power: 3,
    vr: 5,
    constructionTurns: 2,
    description: 'Fortificazione offensiva.',
    ability: 'Quando completata, può attaccare 1 volta per turno come unità autonoma. POWER 3.',
    illustration: 'Torretta armata automatica, torretta girevole, munizioni esplose tutt\'intorno, perimetro difensivo'
  },

  // Elite Umani
  {
    id: 'HUM-E-001',
    name: 'Generale Invincibile',
    faction: 'humans',
    type: 'elite',
    rarity: 'rare',
    cost: 4,
    power: 5,
    vr: 6,
    description: 'Comandante supremo umano.',
    ability: 'Resilienza. Tutte le altre tue unità ricevono +1 POWER. Quando entra, ripara 2 PA della Base gratuitamente.',
    illustration: 'Generale umano in full combat armor, decorazioni d\'oro, aura di comando, retroescena di vittoria militare'
  },
  {
    id: 'HUM-E-002',
    name: 'Assalitore Potenziato',
    faction: 'humans',
    type: 'elite',
    rarity: 'rare',
    cost: 3,
    power: 5,
    vr: 5,
    description: 'Guerriero umano biopotenziato.',
    ability: 'Resilienza. Attacchi combinati: +1 POWER per ogni alleato che attacca con lui.',
    illustration: 'Guerriero umano con potenziamenti bionici, muscoli artificiali luminosi, armatura nera e oro, tempesta di fuoco intorno'
  },

  // ========== NEOSS (Viola) ==========
  // Comuni Neoss
  {
    id: 'NEO-U-001',
    name: 'Drone di Sorveglianza',
    faction: 'neoss',
    type: 'unit',
    rarity: 'common',
    cost: 1,
    power: 1,
    vr: 1,
    description: 'Occhi e orecchi della rete Neoss.',
    ability: 'Quando entra in Campo, guarda il top del tuo mazzo (4 carte).',
    illustration: 'Drone Neoss sferico, sensori olografici, luci viola pulsanti, ambiente high-tech futuristico'
  },
  {
    id: 'NEO-U-002',
    name: 'Guerriero Cibernetico',
    faction: 'neoss',
    type: 'unit',
    rarity: 'common',
    cost: 2,
    power: 3,
    vr: 3,
    description: 'Soldato Neoss potenziato.',
    ability: 'Quando entra in Campo, scarta fino a 2 carte dalla mano. Per ogni carta scartata, ottieni 1 PR.',
    illustration: 'Cyborg Neoss con incorporamenti metallici viola, occhi luminosi, postura aggressiva, laboratorio biologico dietro'
  },
  {
    id: 'NEO-U-003',
    name: 'Intelligenza Artificiale',
    faction: 'neoss',
    type: 'unit',
    rarity: 'common',
    cost: 2,
    power: 2,
    vr: 4,
    description: 'Controllore di processi.',
    ability: 'Ogni turno, accelera una carta nella Spedizione di 1 Turno gratuitamente.',
    illustration: 'Interfaccia IA Neoss, geroglifici viola digitali, ologrammi complessi, centro di controllo futuristico'
  },
  {
    id: 'NEO-U-004',
    name: 'Assimilatore Biologico',
    faction: 'neoss',
    type: 'unit',
    rarity: 'common',
    cost: 2,
    power: 2,
    vr: 3,
    description: 'Organismo ibrido Neoss.',
    ability: 'Quando una unità nemica viene distrutta, ottieni 1 PR aggiuntivo dal riciclo.',
    illustration: 'Creatura ibrida Neoss, tessuti biologici e metallo fuso, forme organiche distorte, colori viola neon'
  },
  {
    id: 'NEO-U-005',
    name: 'Sentinella Energetica',
    faction: 'neoss',
    type: 'unit',
    rarity: 'common',
    cost: 1,
    power: 2,
    vr: 2,
    description: 'Guardiano di energia pura.',
    ability: 'Nessuna abilità speciale.',
    illustration: 'Essere energetico Neoss, corpo di plasma viola, circuiti luminosi, emanazioni di energia'
  },
  {
    id: 'NEO-U-006',
    name: 'Replicatore di Materia',
    faction: 'neoss',
    type: 'unit',
    rarity: 'common',
    cost: 3,
    power: 2,
    vr: 5,
    description: 'Assembla risorse.',
    ability: 'Quando entra in Campo, ottieni 3 PR.',
    illustration: 'Unità di replicazione Neoss, tecnologia di trasporto molecolare, cristalli viola brillanti, laboratorio futuristico'
  },
  {
    id: 'NEO-U-007',
    name: 'Dreadnought Neoss',
    faction: 'neoss',
    type: 'unit',
    rarity: 'common',
    cost: 3,
    power: 4,
    vr: 4,
    description: 'Arma tattica Neoss.',
    ability: 'Nessuna abilità speciale.',
    illustration: 'Corazzata spaziale Neoss, design angolare viola, armamenti multipli, stella fuori distante sullo sfondo'
  },
  {
    id: 'NEO-U-008',
    name: 'Interferenza Quantica',
    faction: 'neoss',
    type: 'unit',
    rarity: 'common',
    cost: 2,
    power: 1,
    vr: 2,
    description: 'Distorce le comunicazioni.',
    ability: 'Gli attacchi combinati contro di te ricevono -1 al risultato totale.',
    illustration: 'Onda di interferenza quantica Neoss, geometria frattale, distorsione dello spaziotempo, colori viola sfumati'
  },
  {
    id: 'NEO-U-009',
    name: 'Esploratore Neoss',
    faction: 'neoss',
    type: 'unit',
    rarity: 'common',
    cost: 1,
    power: 1,
    vr: 1,
    description: 'Pioniere Neoss.',
    ability: 'Nessuna abilità speciale.',
    illustration: 'Scout Neoss, mantello energetico, strumenti di rilevamento, paesaggio alieno viola'
  },
  {
    id: 'NEO-U-010',
    name: 'Sintetizzatore di Danno',
    faction: 'neoss',
    type: 'unit',
    rarity: 'common',
    cost: 2,
    power: 3,
    vr: 3,
    description: 'Convertitore di energia cinetica.',
    ability: 'Quando questa unità infligge danno alla Base nemica, il danno è +1.',
    illustration: 'Arma Neoss di trasformazione energetica, cristalli viola concentrati, onde di plasma, bersaglio illuminato'
  },

  // Non Comuni Neoss
  {
    id: 'NEO-NC-001',
    name: 'Sovramind Neoss',
    faction: 'neoss',
    type: 'unit',
    rarity: 'uncommon',
    cost: 3,
    power: 3,
    vr: 5,
    description: 'Intelligenza collettiva suprema.',
    ability: 'Resilienza. Quando entra, scegli una carta nella Spedizione avversaria e ritardala di 1 Turno.',
    illustration: 'Sovramind Neoss, rete neurale gigante, cervello cristallino viola, interfaccia multidimensionale'
  },
  {
    id: 'NEO-NC-002',
    name: 'Corazzata Psichica',
    faction: 'neoss',
    type: 'vehicle',
    rarity: 'uncommon',
    cost: 3,
    power: 4,
    vr: 5,
    minEquipCrew: 1,
    maxEquipCrew: 2,
    description: 'Nave da battaglia psichica.',
    ability: 'Con equipaggio completo: gli attacchi combinati contro di te ricevono -1 al risultato.',
    illustration: 'Corazzata psichica Neoss, design futuristico, effetti mentali visibili, spazio cosmico viola'
  },
  {
    id: 'NEO-NC-003',
    name: 'Amplificatore Mentale',
    faction: 'neoss',
    type: 'equipment',
    rarity: 'uncommon',
    cost: 1,
    power: 0,
    vr: 3,
    description: 'Potenzia le abilità psichiche.',
    ability: 'L\'unità equipaggiata ha Resilienza.',
    illustration: 'Corona mentale Neoss, cristalli pulsanti viola, onde mentali emesse, equipaggio meditativo'
  },
  {
    id: 'NEO-NC-004',
    name: 'Laboratorio Biologico',
    faction: 'neoss',
    type: 'fortification',
    rarity: 'uncommon',
    cost: 0,
    power: 0,
    vr: 4,
    constructionTurns: 2,
    description: 'Genera risorse biologiche.',
    ability: 'Quando completato, all\'inizio di ogni tuo turno ottieni 1 PR.',
    illustration: 'Laboratorio biologico Neoss, contenitori di gel viola brillante, creature mutanti, vetri luminescenti'
  },

  // Elite Neoss
  {
    id: 'NEO-E-001',
    name: 'Imperatore Neoss',
    faction: 'neoss',
    type: 'elite',
    rarity: 'rare',
    cost: 4,
    power: 5,
    vr: 6,
    description: 'Sovrano della collettività Neoss.',
    ability: 'Resilienza. Quando attacca, tutte le unità Neoss in Campo ricevono +1 POWER fino alla fine del turno.',
    illustration: 'Imperatore Neoss con corona energetica, aura di potere telepatico, corte biologica dietro, universo viola'
  },
  {
    id: 'NEO-E-002',
    name: 'Ascendente Psichico',
    faction: 'neoss',
    type: 'elite',
    rarity: 'rare',
    cost: 3,
    power: 4,
    vr: 5,
    description: 'Essere di pura energia psichica.',
    ability: 'Resilienza. Quando una carta nemica viene scartata, ottieni 1 PR.',
    illustration: 'Ascendente psichico Neoss, corpo di pura energia mentale, onde cerebrali visuali, penetrazione della realtà'
  },

  // ========== STEAMILL/WAVERS (Bianco) ==========
  // Comuni Steamill
  {
    id: 'STE-U-001',
    name: 'Operaio Steamill',
    faction: 'steamill',
    type: 'unit',
    rarity: 'common',
    cost: 1,
    power: 1,
    vr: 1,
    description: 'Lavoratore della comunità Steamill.',
    ability: 'Quando entra, accelera una carta nella Spedizione di 1 Turno gratuitamente.',
    illustration: 'Operaio Steamill con vesti bianche da lavoro, attrezzi steampunk, fabbrica vittoriana futuristica'
  },
  {
    id: 'STE-U-002',
    name: 'Ingegnere Meccanico',
    faction: 'steamill',
    type: 'unit',
    rarity: 'common',
    cost: 2,
    power: 2,
    vr: 3,
    description: 'Maestro della meccanica.',
    ability: 'Quando entra, puoi costruire una Fortificazione gratuitamente senza pagarne i PR se hai Slot disponibile.',
    illustration: 'Ingegnere Steamill con goggles, attrezzi ingranati, fucile a vapore, laboratorio steampunk'
  },
  {
    id: 'STE-U-003',
    name: 'Soldato a Vapore',
    faction: 'steamill',
    type: 'unit',
    rarity: 'common',
    cost: 2,
    power: 3,
    vr: 3,
    description: 'Guerriero Steamill armato.',
    ability: 'Nessuna abilità speciale.',
    illustration: 'Soldato Steamill in armatura a vapore, pistolet a pressione, mantello bianco, città industriale vittoriana'
  },
  {
    id: 'STE-U-004',
    name: 'Pilota di Corazzata',
    faction: 'steamill',
    type: 'unit',
    rarity: 'common',
    cost: 2,
    power: 2,
    vr: 2,
    description: 'Esperto in veicoli pesanti.',
    ability: 'Aumenta il POWER di 1 Veicolo Steamill di +1 quando lo equipaggia.',
    illustration: 'Pilota Steamill con casco completo, seduto in cabina di guida, leve di controllo steampunk'
  },
  {
    id: 'STE-U-005',
    name: 'Inventore Eccentrico',
    faction: 'steamill',
    type: 'unit',
    rarity: 'common',
    cost: 1,
    power: 1,
    vr: 2,
    description: 'Genio creativo Steamill.',
    ability: 'Quando scartato volontariamente, ottieni +1 PR aggiuntivo.',
    illustration: 'Inventore Steamill eccentrico con barba, occhiali ingranditori, laboratorio pieno di invenzioni'
  },
  {
    id: 'STE-U-006',
    name: 'Tiratore d\'Aria Compressa',
    faction: 'steamill',
    type: 'unit',
    rarity: 'common',
    cost: 2,
    power: 3,
    vr: 2,
    description: 'Specialista di armi ad aria compressa.',
    ability: 'Quando attacca, il difensore riceve -1 al risultato se non ha Resilienza.',
    illustration: 'Tiratore Steamill con fucile ad aria compressa, tubi pressurizzati, clouds di vapore, ambiente industriale'
  },
  {
    id: 'STE-U-007',
    name: 'Corazziero Pesante',
    faction: 'steamill',
    type: 'unit',
    rarity: 'common',
    cost: 3,
    power: 4,
    vr: 4,
    description: 'Armatura pesante Steamill.',
    ability: 'Nessuna abilità speciale.',
    illustration: 'Guerriero pesante Steamill in armatura a ingranaggi, mantello bianco, arma d\'assedio steampunk'
  },
  {
    id: 'STE-U-008',
    name: 'Alchimista Steamill',
    faction: 'steamill',
    type: 'unit',
    rarity: 'common',
    cost: 2,
    power: 2,
    vr: 3,
    description: 'Maestro di scienze applicate.',
    ability: 'Quando entra, scarta fino a 1 carta dalla mano. Ottieni PR pari al VR della carta scartata.',
    illustration: 'Alchimista Steamill con mantello, fiale colorate, pentola ribollente, fumo e reazioni chimiche'
  },
  {
    id: 'STE-U-009',
    name: 'Sentinella Meccanica',
    faction: 'steamill',
    type: 'unit',
    rarity: 'common',
    cost: 1,
    power: 2,
    vr: 2,
    description: 'Custode automatico.',
    ability: 'Nessuna abilità speciale.',
    illustration: 'Robot sentinella Steamill, corpo metallico bianco, occhi luminosi, postura vigile, torretta di guardia'
  },
  {
    id: 'STE-U-010',
    name: 'Tecnico di Rifornimento',
    faction: 'steamill',
    type: 'unit',
    rarity: 'common',
    cost: 1,
    power: 1,
    vr: 2,
    description: 'Gestisce le risorse.',
    ability: 'Aumenta la capacità del Magazzino della Base di +2 PR mentre è in Campo.',
    illustration: 'Tecnico Steamill con equipaggiamento di rifornimento, scatole di munizioni, base di approvvigionamento'
  },

  // Non Comuni Steamill
  {
    id: 'STE-NC-001',
    name: 'Maestro Artigiano',
    faction: 'steamill',
    type: 'unit',
    rarity: 'uncommon',
    cost: 3,
    power: 3,
    vr: 4,
    description: 'Capolavoro della comunità Steamill.',
    ability: 'Resilienza. Quando entra, installa gratuitamente 1 Equipaggiamento su di te o su un\'altra unità Steamill.',
    illustration: 'Maestro Artigiano Steamill con vesti di comando, simbolo di maestria, officina brillante dietro'
  },
  {
    id: 'STE-NC-002',
    name: 'Corazzata a Vapore',
    faction: 'steamill',
    type: 'vehicle',
    rarity: 'uncommon',
    cost: 3,
    power: 4,
    vr: 5,
    minEquipCrew: 2,
    maxEquipCrew: 3,
    description: 'Nave da guerra Steamill.',
    ability: 'Con equipaggio minimo (2), POWER 4. Con equipaggio completo (3), POWER 5 e +1 al risultato di difesa.',
    illustration: 'Corazzata a vapore Steamill, chaminee fumanti, torrette, design vittoriano futuristico, oceano tempestoso'
  },
  {
    id: 'STE-NC-003',
    name: 'Prototipo di Potenza',
    faction: 'steamill',
    type: 'equipment',
    rarity: 'uncommon',
    cost: 2,
    power: 0,
    vr: 4,
    description: 'Potenziatore meccanico.',
    ability: 'L\'unità equipaggiata riceve +2 POWER.',
    illustration: 'Motore Steamill aumentato, ingranaggi massici, vapore pulsante, energia cinetica visibile'
  },
  {
    id: 'STE-NC-004',
    name: 'Centrale Energetica',
    faction: 'steamill',
    type: 'fortification',
    rarity: 'uncommon',
    cost: 0,
    power: 0,
    vr: 5,
    constructionTurns: 3,
    description: 'Fornisce energia costante.',
    ability: 'Quando completata, all\'inizio di ogni tuo turno ottieni 2 PR.',
    illustration: 'Centrale energetica Steamill, turbine rotanti, vapore denso, energia che fluisce, illuminazione azzurra'
  },

  // Elite Steamill
  {
    id: 'STE-E-001',
    name: 'Arcamestro Steamill',
    faction: 'steamill',
    type: 'elite',
    rarity: 'rare',
    cost: 4,
    power: 5,
    vr: 6,
    description: 'Leggenda vivente della comunità.',
    ability: 'Resilienza. Tutte le Fortificazioni Steamill costruite richiedono 1 Turno in meno. Quando entra, ripara 2 PA della Base.',
    illustration: 'Arcamestro Steamill con corona di ingranaggi, mantello di comando, figura maestosa, officina leggendaria'
  },
  {
    id: 'STE-E-002',
    name: 'Cavaliere Meccanico',
    faction: 'steamill',
    type: 'elite',
    rarity: 'rare',
    cost: 3,
    power: 5,
    vr: 5,
    description: 'Guerriero in armatura vivente.',
    ability: 'Resilienza. Quando attacca in Attacco Combinato, riceve +2 POWER.',
    illustration: 'Cavaliere Steamill in armatura meccanica gigante, lancia a vapore, corazza di ingranaggi, gloria del passato'
  },

  // ========== SICARI (Nero) ==========
  // Comuni Sicari
  {
    id: 'SIC-U-001',
    name: 'Assassino Ombra',
    faction: 'sicari',
    type: 'unit',
    rarity: 'common',
    cost: 1,
    power: 2,
    vr: 2,
    description: 'Specialista dell\'ombra.',
    ability: 'Quando entra, puoi scartare una carta dalla mano dell\'avversario a caso.',
    illustration: 'Assassino Sicari in nero completo, lame nere, ombre intorno, ambiente urbano notturno'
  },
  {
    id: 'SIC-U-002',
    name: 'Ladro Notturno',
    faction: 'sicari',
    type: 'unit',
    rarity: 'common',
    cost: 2,
    power: 2,
    vr: 3,
    description: 'Predone della notte.',
    ability: 'Quando distrugge un\'unità, ottieni 1 PR aggiuntivo dal riciclo.',
    illustration: 'Ladro Sicari con equipaggiamento furtivo, ganci, cappa nera, tetto di città illuminata'
  },
  {
    id: 'SIC-U-003',
    name: 'Samurai Oscuro',
    faction: 'sicari',
    type: 'unit',
    rarity: 'common',
    cost: 2,
    power: 3,
    vr: 3,
    description: 'Guerriero del Codice Sicari.',
    ability: 'Nessuna abilità speciale.',
    illustration: 'Samurai Sicari con katana nera, kimono oscuro, cicatrici di onore, tempio tradizionale distrutto'
  },
  {
    id: 'SIC-U-004',
    name: 'Veleno Mortale',
    faction: 'sicari',
    type: 'unit',
    rarity: 'common',
    cost: 1,
    power: 1,
    vr: 2,
    description: 'Esperto di tossine.',
    ability: 'Quando attacca, il difensore riceve -2 al risultato di difesa se non ha Resilienza.',
    illustration: 'Avvelenatore Sicari con fiale di veleno, labbra scure, aura tossica verde, laboratorio chimico'
  },
  {
    id: 'SIC-U-005',
    name: 'Killer Professionista',
    faction: 'sicari',
    type: 'unit',
    rarity: 'common',
    cost: 2,
    power: 3,
    vr: 3,
    description: 'Assassino di classe superiore.',
    ability: 'Resilienza.',
    illustration: 'Sicario professionista con tuta tattica nera, viso parzialmente coperto, bersaglio sullo sfondo'
  },
  {
    id: 'SIC-U-006',
    name: 'Spia della Notte',
    faction: 'sicari',
    type: 'unit',
    rarity: 'common',
    cost: 1,
    power: 1,
    vr: 1,
    description: 'Raccoglitore di informazioni.',
    ability: 'Quando entra, guarda 3 carte dal top del mazzo avversario.',
    illustration: 'Spia Sicari con equipaggiamento di sorveglianza, mantello scuro, occhi penetranti, ombra sulla parete'
  },
  {
    id: 'SIC-U-007',
    name: 'Guerriero Oscuro',
    faction: 'sicari',
    type: 'unit',
    rarity: 'common',
    cost: 3,
    power: 4,
    vr: 4,
    description: 'Incarnazione della loro causa.',
    ability: 'Nessuna abilità speciale.',
    illustration: 'Guerriero Sicari massiccio, armatura nera, arma grande e malvagia, tempesta oscura intorno'
  },
  {
    id: 'SIC-U-008',
    name: 'Ingannevole Traditore',
    faction: 'sicari',
    type: 'unit',
    rarity: 'common',
    cost: 2,
    power: 1,
    vr: 2,
    description: 'Esperto di inganno.',
    ability: 'Quando entra, scegli una unità avversaria e riduce il suo POWER di -1 fino alla fine del turno.',
    illustration: 'Traditore Sicari con veste doppiofondo, spada nascosta, sguardo ingannevole, due volti'
  },
  {
    id: 'SIC-U-009',
    name: 'Sentinella Senza Pietà',
    faction: 'sicari',
    type: 'unit',
    rarity: 'common',
    cost: 1,
    power: 2,
    vr: 2,
    description: 'Guardiano crudele.',
    ability: 'Nessuna abilità speciale.',
    illustration: 'Sentinella Sicari impassibile, armatura nera, postura minacciosa, fortezza oscura sullo sfondo'
  },
  {
    id: 'SIC-U-010',
    name: 'Collezionista di Anime',
    faction: 'sicari',
    type: 'unit',
    rarity: 'common',
    cost: 2,
    power: 2,
    vr: 4,
    description: 'Raccoglitore di vittime.',
    ability: 'Quando una unità viene distrutta, ottieni 1 PR aggiuntivo.',
    illustration: 'Collezionista Sicari con trofei oscuri, aura spettrale, anima prigioniera intorno, aria di morte'
  },

  // Non Comuni Sicari
  {
    id: 'SIC-NC-001',
    name: 'Maestro dei Sicari',
    faction: 'sicari',
    type: 'unit',
    rarity: 'uncommon',
    cost: 3,
    power: 3,
    vr: 5,
    description: 'Leader supremo dei Sicari.',
    ability: 'Resilienza. Quando entra, scegli una carta nella Catena di Montaggio avversaria e ritardala di 1 Turno.',
    illustration: 'Maestro Sicari con mantello lungo, volto mezzo nascosto, aura di autorità malvagia, trono di ossa'
  },
  {
    id: 'SIC-NC-002',
    name: 'Airship Predone',
    faction: 'sicari',
    type: 'vehicle',
    rarity: 'uncommon',
    cost: 2,
    power: 2,
    vr: 4,
    minEquipCrew: 1,
    maxEquipCrew: 2,
    description: 'Nave pirata dell\'aria.',
    ability: 'Quando attacca, se vince, rubate 1 PR dal Magazzino avversario per ogni 2 POWER.',
    illustration: 'Airship predone Sicari, vela nera, cannoni, cielo tempestoso, città in fiamme sotto'
  },
  {
    id: 'SIC-NC-003',
    name: 'Veleno Eterno',
    faction: 'sicari',
    type: 'equipment',
    rarity: 'uncommon',
    cost: 1,
    power: 0,
    vr: 3,
    description: 'Tossina letale permanente.',
    ability: 'Quando l\'unità equipaggiata attacca, il difensore riceve -1 al risultato di difesa.',
    illustration: 'Veleno nero brillante in una ampolla, fumo tossico verde, formula alchemica, morte incorporata'
  },
  {
    id: 'SIC-NC-004',
    name: 'Fortezza Oscura',
    faction: 'sicari',
    type: 'fortification',
    rarity: 'uncommon',
    cost: 0,
    power: 0,
    vr: 4,
    constructionTurns: 2,
    description: 'Baluardo del male.',
    ability: 'Quando completata, le unità Sicari in Campo ricevono +1 POWER.',
    illustration: 'Fortezza Sicari nera, merlature aguzze, torri dritte, aura di malvagità, fuoco infernale'
  },

  // Elite Sicari
  {
    id: 'SIC-E-001',
    name: 'Signore del Crimine',
    faction: 'sicari',
    type: 'elite',
    rarity: 'rare',
    cost: 4,
    power: 5,
    vr: 6,
    description: 'Sovrano assoluto dei Sicari.',
    ability: 'Resilienza. Tutte le tue unità Sicari ricevono +1 POWER. Quando entra, ruba 3 PR dal Magazzino avversario.',
    illustration: 'Signore del Crimine Sicari con corona di spine, trono di oscurità, potere assoluto nell\'aria, regno di caos'
  },
  {
    id: 'SIC-E-002',
    name: 'Assassina Fantasma',
    faction: 'sicari',
    type: 'elite',
    rarity: 'rare',
    cost: 3,
    power: 4,
    vr: 5,
    description: 'Killer immortale e invisibile.',
    ability: 'Resilienza. Quando attacca, se vince, l\'unità bersaglio rimane distrutta anche se il controllo cambia.',
    illustration: 'Assassina Fantasma Sicari, corpo semi-trasparente, lame di luce negra, notte assoluta intorno'
  }
]

// Export utility functions
export const getCardsByFaction = (faction: Faction): Card[] => 
  CORESET.filter(card => card.faction === faction)

export const getCardsByType = (type: CardType): Card[] =>
  CORESET.filter(card => card.type === type)

export const getCardsByRarity = (rarity: Rarity): Card[] =>
  CORESET.filter(card => card.rarity === rarity)

export const getCardById = (id: string): Card | undefined =>
  CORESET.find(card => card.id === id)
