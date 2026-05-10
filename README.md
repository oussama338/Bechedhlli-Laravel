# Bechedhli Solar Energy

Application de gestion pour Bechedhli Solar Energy (ERP interne).

## Structure

```
Bechedhli-frontend/   → React + Vite (frontend)
bechedhli-backend/    → Laravel API (backend)
```

## Prérequis

- PHP 8.2+ avec extensions `pdo_sqlite`
- Composer
- Node.js 18+
- npm

## Installation & Lancement

### 1. Backend (Laravel)

```bash
cd bechedhli-backend
composer install
cp .env.example .env   # ou utiliser le .env existant
php artisan key:generate
php artisan migrate --seed
php artisan serve --port=8000
```

L'API tourne sur `http://localhost:8000/api`

### 2. Frontend (React)

```bash
cd Bechedhli-frontend
npm install
npm run dev
```

Le frontend tourne sur `http://localhost:5173`

Les appels à `/api/*` sont automatiquement proxyfiés vers le backend Laravel (configuré dans `vite.config.js`).

## API Endpoints

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET/POST | `/api/employees` | Liste / Créer employés |
| GET/PUT/DELETE | `/api/employees/{id}` | Détail / Modifier / Supprimer |
| GET/POST | `/api/stock` | Liste / Créer articles |
| GET/PUT/DELETE | `/api/stock/{id}` | Détail / Modifier / Supprimer |
| GET/POST | `/api/clients` | Liste / Créer clients |
| GET/PUT/DELETE | `/api/clients/{id}` | Détail / Modifier / Supprimer |
| GET/POST | `/api/orders` | Liste / Créer commandes |
| POST | `/api/orders/{id}/mark-received` | Marquer commande reçue |
| GET/POST | `/api/delivery-notes` | Liste / Créer BL |
| GET | `/api/delivery-notes/next-id` | Prochain numéro BL |
| POST | `/api/delivery-notes/{id}/mark-delivered` | Marquer livré |
| POST | `/api/delivery-notes/{id}/mark-invoiced` | Marquer facturé |
