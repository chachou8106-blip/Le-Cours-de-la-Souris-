#!/bin/bash

# Script pour déployer l'application en staging sur Cloudflare
# Utilisation: ./scripts/deploy-staging.sh

set -e

echo "🚀 Déploiement de Le Cours de la Souris en staging..."

# Vérifier que pnpm et wrangler sont installés
if ! command -v pnpm &> /dev/null; then
    echo "❌ pnpm n'est pas installé. Veuillez l'installer avec: npm install -g pnpm"
    exit 1
fi

if ! command -v wrangler &> /dev/null; then
    echo "❌ Wrangler CLI n'est pas installé. Veuillez l'installer avec: npm install -g wrangler"
    exit 1
fi

# Installer les dépendances
if [ ! -d "node_modules" ]; then
    echo "📦 Installation des dépendances..."
    pnpm install
fi

# Builder le frontend
echo "🌐 Build du frontend..."
pnpm --filter @cours-de-la-souris/web build

# Builder le worker
echo "☁️  Build du worker..."
pnpm --filter @cours-de-la-souris/worker build

# Appliquer les migrations de la base de données
echo "🗃️  Application des migrations..."
./scripts/db-migrate.sh staging

# Peupler la base de données (si nécessaire)
read -p "Voulez-vous peupler la base de données avec des données de démonstration ? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "🌱 Peuplement de la base de données..."
    ./scripts/db-seed.sh staging
fi

# Déployer le worker sur Cloudflare
echo "☁️  Déploiement du worker sur Cloudflare (staging)..."
cd apps/worker
wrangler deploy --env staging
cd ../..

# Déployer le frontend sur Cloudflare Pages
echo "🌐 Déploiement du frontend sur Cloudflare Pages (staging)..."
# wrangler pages deploy apps/web/dist --project-name cours-de-la-souris-staging --env staging

echo "✅ Déploiement en staging terminé !"
echo "🔗 URL: https://staging.coursdelasouris.fr"