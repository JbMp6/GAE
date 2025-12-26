# GAE

# Cahier des charges  
## Composposants Next.js + Tailwind CSS v4 + GSAP

---

## 1. Objectif

Ce document définit les règles et contraintes à respecter pour le développement de composants UI avec :

- **Next.js**
- **Tailwind CSS v4**
- **GSAP**

Objectifs :
- Cohérence visuelle et technique
- Performance optimale
- Code maintenable et réutilisable
- Animations maîtrisées
- Accessibilité respectée

---

## 2. Stack technique

### Technologies obligatoires
- Next.js (App Router recommandé)
- React 18+
- Tailwind CSS **v4**
- GSAP
- TypeScript (obligatoire)

### Outils
- ESLint
- Prettier
- Node.js LTS

---

## 3. Architecture des composants

### Organisation recommandée
```
/components
  /ui
    Button.tsx
    Card.tsx
  /layout
    Header.tsx
    Footer.tsx
  /animations
    fadeIn.ts
    scrollReveal.ts
```

### Principes
- Un composant = une responsabilité
- Séparation UI / logique métier
- Animations découplées quand possible
- Composants réutilisables par défaut

---

## 4. Règles Next.js

### Server / Client Components
- Les composants utilisant GSAP doivent être déclarés :
```ts
"use client"
```
- Limiter les Client Components au strict nécessaire

### Optimisation
- Utilisation de `next/image`
- Utilisation de `next/font`
- Lazy loading pour les composants lourds

---

## 5. Règles Tailwind CSS v4

### Principes généraux
- Tailwind CSS v4 obligatoire
- Approche **CSS-first**
- Design **light uniquement**
- ❌ Aucun dark mode

### Configuration
- `tailwind.config.ts` minimal
- Tokens définis via CSS (`@theme`)
- Pas de logique JS complexe

### Styles
- Classes Tailwind uniquement
- CSS custom autorisé uniquement via `@layer`

```css
@layer components {
  .btn-primary {
    @apply px-4 py-2 rounded-lg font-medium;
  }
}
```

### Design system
- Variables CSS comme source de vérité
- Palette light figée
- Breakpoints standards Tailwind v4
- ❌ Interdiction des classes `dark:`

---

## 6. Règles GSAP

### Bonnes pratiques
- `gsap.context()` obligatoire
- Cleanup au unmount
- `useLayoutEffect` recommandé

### Performance
- Privilégier `transform` et `opacity`
- ScrollTrigger uniquement si nécessaire
- Animations fluides (60fps)

### Accessibilité
- Respect de `prefers-reduced-motion`
- Animations non bloquantes

---

## 7. Accessibilité (a11y)

- WCAG 2.1
- Navigation clavier
- Focus visible
- Contrastes suffisants (light)

---

## 8. Performance

- Lighthouse > 90
- Pas de CLS
- Pas de reflow inutile

---

## 9. Qualité & tests

- TypeScript strict
- ❌ Pas de `any`
- Props documentées
- Tests recommandés

---

## 10. Documentation des composants

Chaque composant doit inclure :
- Description
- Props
- Variantes
- Exemple d’utilisation

---

## 11. Critères de validation

- Responsive
- Accessible
- Réutilisable
- Performant

---

## 12. Évolutivité

- Animations extensibles
- Design system scalable
- Compatibilité Next.js future

---

**Fin du cahier des charges**
