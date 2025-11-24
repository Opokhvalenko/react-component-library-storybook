# React Component Library with Storybook
This project is a small **React + TypeScript** component library built with **Vite** and documented
in **Storybook**.
It implements three reusable UI components:
- a smart `Input`
- a `Toast` notification
- a nested `SidebarMenu`
All components are demonstrated in Storybook with different states and props, following the **Single
Responsibility Principle**: each component is responsible for a small piece of UI and its own
behaviour.
---
## Tech stack
- **React** + **TypeScript**
- **Vite** – dev server & build
- **Storybook 10** with Vite builder
- **ESLint + Prettier** – code quality & formatting
- **Biome** – additional static analysis
- **Vitest** (+ browser runner) – tests for stories and components
- **Framer Motion** – small slide / fade animations
---
## Getting started
Install dependencies:
```bash
npm install
```
Run Storybook:
```bash
npm run storybook
```
Storybook will be available at: **http://localhost:6006**

Run the Vite dev shell (simple app that just points to Storybook):

```bash
npm run dev # Vite dev server
```
Production builds:

```bash
npm run build # Production build
npm run build-storybook # Storybook static build to storybook-static/
```

Formatting & linting:

```bash
npm run lint # ESLint
npm run format # Prettier format
npm run format:check # Prettier check
npm run lint:biome    # Biome checks
```

Tests:

```bash
npm run test           # Vitest (storybook-based tests)
npm run test:coverage  # Vitest with coverage report
npm run typecheck      # TypeScript project type checking
npm run check          # full pipeline: lint + biome + typecheck + tests + builds
```
---
## Project structure
```text
src/
 components/
  Input/
   Input.tsx
   Input.css
  Toast/
   Toast.tsx
   Toast.css
   useAutoDismiss.ts
  SidebarMenu/
   SidebarMenu.tsx
   SidebarMenu.css
   SidebarMenuList.tsx
   SidebarMenu.types.ts
   useSidebarOpenItems.ts
 stories/
  Input.stories.tsx
  InputRHF.stories.tsx
  Toast.stories.tsx
  SidebarMenu.stories.tsx
 index.ts
```
- `components/*` – UI components + styles and small hooks
- `stories/*` – Storybook stories that document and showcase different states

All public exports go through `src/index.ts`:
```ts
export { default as Input } from "./components/Input/Input";
export { default as Toast } from "./components/Toast/Toast";
export { default as SidebarMenu } from "./components/SidebarMenu/SidebarMenu";
```
---
# Components
## Input
### Responsibility
Configurable text input component with:
- multiple types
- password visibility toggle
- optional clear button
- error state
### Key props
- `type?: "text" | "password" | "number" | "email"` (default: `"text"`)
- `value: string` – controlled value
- `onChange: (value: string) => void`
- `label?: string`
- `clearable?: boolean`
- `error?: string`
- ` ...rest – all other standard <input> props`
### Behaviour
- If `type="password"` – shows an eye icon button to toggle visibility.
- If `clearable` and there is a value – shows a small `×` button to clear input.
- When `error` is set – input border turns red and error text is displayed.
### Storybook
Group: **Form / Input**
Stories:
- **Text (clearable)** – text input with clear button
- **Password with toggle** – password input with visibility toggle
- **Number** – numeric input
- **With error** – input in an error state

---
## Toast
### Responsibility
Small notification that appears in the bottom-right corner and hides automatically after a given
duration.
### Key props
- `message: string`
- `type?: "success" | "error" | "info" | "warning"` (default: `"info"`)
- `duration?: number` – ms before auto-dismiss (default: `3000`)
- `onClose?: () => void`
- `showCloseButton?: boolean` – show manual close `×` (default: `true`)
### Behaviour
- Renders fixed at the bottom-right of the viewport.
- Uses a simple fade/slide-in animation.
- Automatically hides after `duration` ms and calls `onClose` if provided.
- Can also be closed manually via the close button.
### Storybook
Group: **Feedback / Toast**
Stories:
- **Success** – short duration success message
- **Error Long Duration** – error toast with longer duration
- **Playground (manual trigger)** – button that shows toast and lets you play with controls.
---
## SidebarMenu
### Responsibility
Right-sliding sidebar menu with optional nested items (1–2 levels) and backdrop click to close.
### Types
```ts
export interface SidebarMenuItem {
 id: string;
 label: string;
 children?: SidebarMenuItem[];
 onClick?: () => void;
}
export interface SidebarMenuProps {
 isOpen: boolean;
 onClose: () => void;
 items: SidebarMenuItem[];
 title?: string;
}
```
### Behaviour
- When `isOpen` is `true`, a dark overlay is shown and the panel slides in from the right.
- Clicking on the overlay calls `onClose` and closes the sidebar.
- Items with `children` act as accordion sections:
 - first click toggles open/closed state
 - nested items are rendered as an indented list.
### Storybook
Group: **Navigation / SidebarMenu**
Stories:
- **One-level menu (open)** – flat list of items
- **Two-level nested menu** – items with nested children and expandable sections
---
## Storybook organization
Stories are organized into high-level groups:
- **Form / Input**
- **Feedback / Toast**
- **Navigation / SidebarMenu**
Each story shows different prop configurations and component states to make it easy to review
behaviour without touching the code.
---
## Screenshots

Screenshots are stored in the `screenshots/` folder and show the requested states from the
assignment:
- Input component in different states
- Toast component variants (including error state)
- Sidebar menu (one-level and two-level)
- The components rendered inside the Storybook UI

### Input component

![Input states](./screenshots/input-states.png)

### Toast component

![Toast variants](./screenshots/toast-variants.png)

### Sidebar menu

![Sidebar states](./screenshots/sidebar-states.png)

### Toast (error state)

![Toast error](./screenshots/toast-variants-error.png)

### Sidebar menu (two-level)

![Sidebar two-level](./screenshots/sidebar-two-level.png)

### Input with React Hook Form

![Input + React Hook Form](./screenshots/input-rhf-email-validation.png)

---
## Notes on Single Responsibility
Each piece of the library focuses on a single responsibility:

- `Input` – controlled text input; small icon subcomponents handle password visibility and clear actions.
- `Toast` – presentational wrapper for a single notification, while `useAutoDismiss` owns the auto-dismiss lifecycle.
- `SidebarMenu` – shell component for overlay and animation; `SidebarMenuList` renders the nested tree; `useSidebarOpenItems` manages which items are expanded.

Storybook stories are responsible only for documentation and interactive examples, not for the core component logic. This separation makes the library easy to understand, test and extend.

## Quality checks

This component library has a small but solid quality gate:

- `npm run lint` – ESLint (TypeScript + React + Storybook rules).
- `npm run lint:biome` – additional static analysis via Biome.
- `npm run typecheck` – TypeScript project references build without emitting JS.
- `npm run test` – Vitest tests (including Storybook stories via the Storybook test runner).
- `npm run test:coverage` – runs tests with coverage report.
- `npm run build` – Vite production build for the demo shell.
- `npm run build-storybook` – builds the Storybook instance to `storybook-static`.
- `npm run check` – runs all of the above in sequence.

Before pushing a branch I usually run `npm run check` to ensure linting, type safety, tests and builds all pass.

### Bonus: React Hook Form integration

The story **“Form / Input with React Hook Form / Email field with validation”** shows how the `Input` component works as a controlled field inside `react-hook-form` using the `Controller` API and built-in validation.

### Bonus features

- Storybook Controls enabled for all components (Input, Toast, SidebarMenu).
- Additional story demonstrating integration with **React Hook Form**.
- `Toast` and `SidebarMenu` use **Framer Motion** for subtle slide/fade animations.