# GGEA

GGEA (Garage Général Electronique Automobile) est une application web de présentation et de réservation pour un service de checking et de diagnostic automobile à domicile à Kinshasa, en République démocratique du Congo.

Le site présente les services proposés, leurs tarifs, les témoignages clients et un formulaire permettant de demander une intervention. Il est construit avec Next.js et React, en privilégiant une interface responsive et accessible.

## Prérequis

- Node.js 20.9 ou une version ultérieure
- npm (fourni avec Node.js)
- Git, pour cloner et versionner le projet

Vérifier les versions installées :

```bash
node --version
npm --version
```

## Installation et démarrage

Cloner le dépôt, installer les dépendances, puis lancer le serveur de développement :

```bash
git clone https://github.com/fordimalanda/ggea
cd ggea
npm install
npm run dev
```

Le site est ensuite disponible à l'adresse [http://localhost:3000](http://localhost:3000).

Commandes disponibles :

| Commande | Description |
| --- | --- |
| `npm run dev` | Lance Next.js en mode développement avec rechargement à chaud. |
| `npm run build` | Génère le build de production. |
| `npm start` | Démarre le serveur Next.js à partir du build généré. |
| `npm run lint` | Exécute ESLint sur le projet. |

## Variables d'environnement

La version actuelle ne lit aucune variable d'environnement : aucun fichier `.env` n'est nécessaire pour démarrer le projet.

Si une intégration externe est ajoutée, créer un fichier `.env.local` à la racine du projet et y déclarer les valeurs nécessaires :

```dotenv
# Exemple uniquement : remplacer par les variables réellement utilisées.
NEXT_PUBLIC_EXAMPLE_URL=https://example.com
EXAMPLE_API_KEY=valeur-locale
```

Ne jamais committer de secret ou de clé privée. Les variables destinées au navigateur doivent être préfixées par `NEXT_PUBLIC_`; les autres doivent rester côté serveur. Ajouter toute nouvelle variable documentée dans cette section et dans un éventuel fichier `.env.example`.

## Architecture

```text
ggea/
├── public/                    # Ressources statiques
├── src/
│   ├── app/                   # App Router, layout, page d'accueil et styles globaux
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── sections/          # Sections fonctionnelles de la page d'accueil
│   │   │   ├── Hero.tsx
│   │   │   ├── ContactGrid.tsx
│   │   │   ├── ServicesSection.tsx
│   │   │   ├── BookingForm.tsx
│   │   │   ├── Testimonials.tsx
│   │   │   └── Footer.tsx
│   │   └── ui/                # Composants UI réutilisables
│   └── lib/                   # Utilitaires partagés
├── eslint.config.mjs          # Configuration ESLint
├── next.config.ts             # Configuration Next.js
├── package.json               # Scripts et dépendances
└── tsconfig.json              # Configuration TypeScript
```

La page d'accueil est assemblée dans `src/app/page.tsx`. Les composants propres à une grande partie de cette page se trouvent dans `src/components/sections`, tandis que les primitives réutilisables sont regroupées dans `src/components/ui`. L'alias `@/` pointe vers `src/`.

## Qualité de code

Avant de soumettre une pull request, exécuter au minimum :

```bash
npm run lint
npx tsc --noEmit
npm run build
```

ESLint applique les règles Next.js Core Web Vitals et TypeScript. TypeScript est configuré en mode strict et vérifie les types sans produire de fichiers (`--noEmit`). Le build de production permet de détecter les erreurs de compilation et de génération propres à Next.js.

Les changements doivent rester cohérents avec l'architecture existante, conserver la compatibilité responsive et inclure les vérifications adaptées au comportement modifié.
