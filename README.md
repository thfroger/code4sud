# Code4Sud — Site web

Site officiel de l'association **Code4Sud**, fédération des écoles du numérique en région Sud (Marseille & Nice).

- **Production** : [code4sud.pages.dev](https://code4sud.pages.dev)
- **CMS** : [code4sud.pages.dev/admin](https://code4sud.pages.dev/admin)

---

## Stack technique

| Outil | Rôle |
|---|---|
| [Astro 4](https://astro.build) | Framework statique (SSG) |
| [Sveltia CMS](https://github.com/sveltia/sveltia-cms) | Interface d'administration (drop-in Decap CMS) |
| [Cloudflare Pages](https://pages.cloudflare.com) | Hébergement & déploiement continu |
| [Cloudflare Workers](https://workers.cloudflare.com) | Proxy OAuth GitHub pour le CMS (`sveltia-cms-auth`) |
| GitHub | Dépôt source & backend du CMS |

---

## Démarrage local

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # build de production dans dist/
npm run preview    # prévisualisation du build
```

---

## Déploiement

Tout push sur la branche `main` déclenche automatiquement un nouveau build sur Cloudflare Pages. Aucune action manuelle requise.

Les modifications faites via le CMS (`/admin`) créent un commit sur `main` → rebuild automatique.

---

## Structure du projet

```
src/
├── components/
│   ├── Hero.astro          # Section hero avec stats dynamiques
│   ├── Nav.astro           # Navigation sticky
│   ├── Footer.astro        # Pied de page
│   ├── SchoolsTicker.astro # Bandeau défilant des logos d'écoles
│   ├── SchoolsGrid.astro   # Grille des écoles (homepage)
│   ├── EventsList.astro    # Liste des événements
│   ├── RealisationsGrid.astro
│   ├── ArticlesGrid.astro
│   ├── PartnersGrid.astro
│   └── VideoSection.astro
├── content/
│   ├── config.ts           # Schémas Zod des collections
│   ├── schools/            # Fichiers .md — une école par fichier
│   ├── events/             # Fichiers .md — un événement par fichier
│   ├── articles/           # Fichiers .md — un article par fichier
│   ├── partners/           # Fichiers .yaml — un partenaire par fichier
│   └── realisations/       # Fichiers .md — une réalisation par fichier
├── layouts/
│   └── Base.astro          # Layout global (Nav + slot + Footer)
├── pages/
│   ├── index.astro         # Page d'accueil
│   ├── ecoles.astro        # /ecoles
│   ├── realisations.astro  # /realisations
│   ├── partenaires.astro   # /partenaires
│   ├── contact.astro       # /contact
│   ├── evenements/
│   │   ├── index.astro     # /evenements
│   │   └── [slug].astro    # /evenements/:slug
│   └── articles/
│       ├── index.astro     # /articles
│       └── [slug].astro    # /articles/:slug
└── styles/
    └── global.css          # Variables CSS (--b50 → --b900) + styles globaux
public/
├── admin/
│   ├── index.html          # Interface Sveltia CMS
│   └── config.yml          # Configuration des collections CMS
├── images/uploads/         # Images uploadées via le CMS
├── logo-code4sud.png       # Logo principal
└── _headers                # Headers de sécurité Cloudflare Pages
```

---

## Gestion du contenu

Tout le contenu est modifiable via le CMS à l'adresse `/admin`. Connexion avec le compte GitHub ayant accès au dépôt `thfroger/code4sud`.

### Ajouter un article depuis un post LinkedIn

Copier-coller le texte du post directement dans le chat Claude Code — l'article est créé et publié automatiquement (suppression des hashtags, emojis, mentions LinkedIn).

### Collections disponibles

| Collection | Format | Champs clés |
|---|---|---|
| **Écoles** | Markdown | nom, ville(s), logo, site, description, archivé |
| **Événements** | Markdown | titre, date, type(s), lieu, statut, image |
| **Articles** | Markdown | titre, date, catégorie, image de couverture |
| **Partenaires** | YAML | nom, logo, lien, actif |
| **Réalisations** | Markdown | titre, type, date, description, mis en avant |

### Écoles archivées

Cocher **"Ancienne école membre (archive)"** dans la fiche d'une école pour :
- la masquer de la page d'accueil et du compteur Hero
- la faire apparaître dans l'onglet **Archives** de la page `/ecoles`

---

## Palette de couleurs

```css
--b50:  #E6F1FB   /* Très clair */
--b100: #B5D4F4
--b200: #85B7EB
--b400: #378ADD   /* Accent principal */
--b600: #185FA5
--b800: #0C447C
--b900: #042C53   /* Fond sombre / texte principal */
```

---

## Authentification CMS

Le CMS utilise **GitHub OAuth via PKCE**, proxifié par un Cloudflare Worker :

- Worker : `sveltia-cms-auth.froger-thomas.workers.dev`
- GitHub OAuth App : callback configuré sur `/callback` du Worker
- Seuls les comptes GitHub ayant accès au dépôt peuvent se connecter

---

## Licence

Projet propriétaire — © 2026 Code4Sud, Association loi 1901.
