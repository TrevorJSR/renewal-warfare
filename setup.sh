#!/bin/bash

# Renewal: Warfare - Development Setup Script
# Questo script configura l'ambiente di sviluppo

echo "🎴 Renewal: Warfare - Setup"
echo ""

# Controlla Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js non trovato. Installa Node.js 16+"
    exit 1
fi

echo "✅ Node.js versione: $(node --version)"
echo "✅ npm versione: $(npm --version)"
echo ""

# Installa dipendenze
echo "📋 Installazione dipendenze..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Errore durante l'installazione"
    exit 1
fi

echo ""
echo "✅ Setup completato!"
echo ""
echo "🚀 Avvia il dev server con:"
echo "   npm run dev"
echo ""
echo "📋 Build per produzione con:"
echo "   npm run build"
echo ""
