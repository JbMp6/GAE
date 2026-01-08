# GAE - Plan d'Actions Correctives

> **Date d'analyse** : 8 janvier 2026  
> **Statut** : En attente de corrections

---

## 🔴 PRIORITÉ CRITIQUE - Sécurité

### 1. Sécuriser l'upload de fichiers
**Fichier** : `gae/app/recrutement/page.tsx`  
**Problème** : Aucune validation des fichiers uploadés (CV, lettre de motivation)

**Actions** :
- [ ] Créer `gae/lib/fileValidation.ts` avec :
  - Validation du type MIME (PDF, DOC, DOCX uniquement)
  - Limitation de taille (max 5MB)
  - Scan du contenu malveillant
- [ ] Implémenter l'upload vers Supabase Storage
- [ ] Générer des noms de fichiers sécurisés (UUID)
- [ ] Ajouter la gestion d'erreurs utilisateur

```typescript
// À créer : gae/lib/fileValidation.ts
const ALLOWED_TYPES = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
const MAX_SIZE = 5 * 1024 * 1024; // 5MB
```

### 2. Vérifier l'exposition des secrets
**Fichiers** : `.env.local`, `gae/lib/supabase.ts`

**Actions** :
- [ ] Vérifier que `.env.local` est dans `.gitignore`
- [ ] S'assurer qu'aucune clé API n'est exposée côté client
- [ ] Utiliser les variables d'environnement Next.js correctement (`NEXT_PUBLIC_` uniquement pour le client)
- [ ] Créer un fichier `.env.example` pour la documentation

---

## 🟡 PRIORITÉ HAUTE - Cohérence du Code

### 3. Renommer les dossiers (incohérence FR/EN)
**Problème** : Nommage incohérent des dossiers

**Actions** :
- [ ] Renommer `gae/componentes/` → `gae/components/`
- [ ] Renommer `gae/staticComponentes/` → `gae/staticComponents/`
- [ ] Mettre à jour tous les imports dans les fichiers

```bash
# Commandes à exécuter
cd gae
mv componentes components
mv staticComponentes staticComponents
# Puis mise à jour des imports
```

### 4. Unifier la gestion d'état
**Fichier** : `gae/app/recrutement/page.tsx`  
**Problème** : Duplication avec `currentView` et `mobileStep`

**Actions** :
- [ ] Créer un seul état unifié
- [ ] Simplifier la logique de navigation
- [ ] Supprimer la redondance

```typescript
// Solution proposée
type RecrutementStep = 'home' | 'list' | 'offre-detail' | 'postuler';
const [step, setStep] = useState<RecrutementStep>('home');
```

### 5. Créer un système de typage centralisé
**Actions** :
- [ ] Créer `gae/types/index.ts` pour les types partagés
- [ ] Déplacer `OffreRecrutement`, `ButtonRecrutementProps`, etc.
- [ ] Typer correctement les props de `FormulaireContact`

---

## 🟠 PRIORITÉ MOYENNE - Maintenabilité

### 6. Découper le composant RecrutementPage
**Fichier** : `gae/app/recrutement/page.tsx` (250+ lignes)

**Actions** :
- [ ] Créer `gae/components/recrutement/OffresList.tsx`
- [ ] Créer `gae/components/recrutement/OffreDetail.tsx`
- [ ] Créer `gae/components/recrutement/PostulerForm.tsx`
- [ ] Créer `gae/components/recrutement/ButtonRecrutement.tsx`
- [ ] Refactoriser la page principale

### 7. Externaliser les classes CSS longues
**Problème** : Classes Tailwind trop longues et répétitives

**Actions** :
- [ ] Créer `gae/app/globals.css` avec des classes custom via `@layer`
- [ ] Extraire les styles répétitifs
- [ ] Simplifier les className

```css
/* Exemple à ajouter dans globals.css */
@layer components {
  .offre-item {
    @apply font-futura text-2xl w-full h-20 pl-5 border-b-5 border-white flex items-center cursor-pointer transition-all;
  }
}
```

### 8. Créer un fichier de configuration
**Actions** :
- [ ] Créer `gae/config/constants.ts`
- [ ] Déplacer les magic numbers et strings hardcodés

```typescript
// gae/config/constants.ts
export const RECRUITMENT_CONFIG = {
  MAX_FILE_SIZE: 5 * 1024 * 1024,
  ALLOWED_FILE_TYPES: ['application/pdf', 'application/msword'],
  LAYOUT: {
    SIDEBAR_WIDTH: '40%',
    CONTENT_WIDTH: '60%',
  },
} as const;

export const TEXTS = {
  FR: {
    RECRUITMENT_TITLE: "Nos offres d'emploi & de stage",
    APPLY: "POSTULER",
    BACK_TO_LIST: "← Retour aux offres",
    // ...
  },
} as const;
```

### 9. Améliorer la gestion d'erreurs
**Fichiers** : Tous les composants avec appels API

**Actions** :
- [ ] Ajouter un état d'erreur UI dans `RecrutementPage`
- [ ] Créer un composant `ErrorMessage.tsx`
- [ ] Afficher des messages d'erreur utilisateur
- [ ] Ajouter un système de retry

```typescript
const [error, setError] = useState<string | null>(null);
const [isLoading, setIsLoading] = useState(false);

// Dans fetchOffres
catch (error) {
  setError('Impossible de charger les offres. Veuillez réessayer.');
  console.error(error);
}
```

### 10. Optimiser les images Next.js
**Fichier** : `gae/app/recrutement/page.tsx`

**Actions** :
- [ ] Ajouter la prop `sizes` à toutes les images
- [ ] Ajouter des placeholders blur
- [ ] Vérifier le format des images (utiliser WebP)

```typescript
<Image
  src="/img/elec.jpg"
  alt="Recrutement Illustration"
  fill
  sizes="(max-width: 1280px) 100vw, 60vw"
  placeholder="blur"
  blurDataURL="data:image/..."
  className="object-cover"
/>
```

---

## 🔵 PRIORITÉ BASSE - Améliorations

### 11. Retirer le scroll automatique intrusif
**Fichier** : `gae/app/recrutement/page.tsx`

**Actions** :
- [ ] Évaluer si le scroll automatique est nécessaire
- [ ] Si oui, ajouter une option de désactivation
- [ ] Sinon, supprimer le useEffect

### 12. Ajouter des tests
**Actions** :
- [ ] Installer Jest et React Testing Library
- [ ] Configurer les tests dans Next.js
- [ ] Créer des tests pour les composants critiques
- [ ] Tester la validation des fichiers

### 13. Mettre en place un système i18n (optionnel)
**Actions** :
- [ ] Installer `next-intl` ou équivalent
- [ ] Externaliser tous les textes
- [ ] Préparer pour le multilingue

### 14. Documenter les composants
**Actions** :
- [ ] Ajouter JSDoc à tous les composants
- [ ] Documenter les props
- [ ] Créer un Storybook (optionnel)

---

## 📋 Checklist de Conformité au Cahier des Charges

### TypeScript
- [ ] ✅ TypeScript activé partout
- [ ] ❌ Vérifier qu'il n'y a pas de `any`
- [ ] ❌ Mode strict activé dans `tsconfig.json`

### Architecture
- [ ] ❌ Renommer les dossiers (componentes → components)
- [ ] ❌ Séparer les composants UI / logique métier
- [ ] ❌ Un composant = une responsabilité

### Performance
- [ ] ❌ Optimiser les images (`sizes`, `placeholder`)
- [ ] ❌ Lazy loading pour les composants lourds
- [ ] ❌ Vérifier le score Lighthouse

### Accessibilité
- [ ] ❌ Tester la navigation clavier
- [ ] ❌ Vérifier les contrastes
- [ ] ❌ Ajouter les ARIA labels manquants

### Qualité
- [ ] ❌ Ajouter des tests
- [ ] ❌ Props documentées (JSDoc)
- [ ] ❌ Gestion d'erreurs complète

---

## 🎯 Plan d'Exécution Recommandé

### Phase 1 - Sécurité (1-2 jours)
1. Implémenter la validation des fichiers
2. Sécuriser l'upload vers Supabase
3. Vérifier les variables d'environnement

### Phase 2 - Cohérence (2-3 jours)
4. Renommer les dossiers
5. Refactoriser la gestion d'état
6. Créer le système de typage centralisé

### Phase 3 - Maintenabilité (3-5 jours)
7. Découper RecrutementPage
8. Externaliser les CSS
9. Créer le fichier de configuration
10. Améliorer la gestion d'erreurs

### Phase 4 - Améliorations (optionnel)
11. Optimiser les images
12. Ajouter des tests
13. i18n si nécessaire

---

## 📊 Indicateurs de Réussite

- [ ] Aucune faille de sécurité détectée
- [ ] Code coverage > 70% (si tests implémentés)
- [ ] Lighthouse score > 90
- [ ] 0 warnings ESLint
- [ ] Architecture cohérente et maintenable
- [ ] Documentation complète

---

**Dernière mise à jour** : 8 janvier 2026
