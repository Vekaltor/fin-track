# FinTrack

A personal finance tracker built to explore modern Angular, from standalone components and signals to the latest patterns introduced in Angular 17+.

After years of writing NgModule-based Angular, this project was a deliberate attempt to relearn the framework from scratch using only the new APIs. No `NgModule`, no `@Input()/@Output()` decorators, no class-based interceptors. Just the stuff that actually ships today.

The app itself lets you track bank accounts, browse transaction history, filter by category and see a spending breakdown by month.

---

## Concepts covered

- Standalone Components with no `NgModule` in sight
- Signals as the primary reactivity primitive (e.g. `signal`, `computed`, `effect`)
- New component API (e.g. `input`, `input.required`, `output`) replacing decorators
- New template syntax (e.g. `@if`, `@for`, `@empty`) replacing structural directives
- `inject()` function replacing constructor-based DI

---

## Stack

- Angular 21
- TypeScript
- RxJS
- TailwindCSS v.4.3

---

## Getting started

```bash
npm install
npx json-server --watch mock-api/db.json --port 3000
ng serve
```

LoginView: `jan@mail.com` / `haslo123`

## Preview

<img width="1265" height="899" alt="image" src="https://github.com/user-attachments/assets/f5427333-21eb-44bc-ab64-0d5e771f941e" />

<img width="1900" height="952" alt="image" src="https://github.com/user-attachments/assets/75dda1f2-053b-45f6-9671-849bb8b61ba1" />


