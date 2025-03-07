# FOMO Frontend Guidelines

## Build/Dev Commands
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Code Style

### Imports
- React imports first
- Next.js imports second
- Third-party libraries next
- Local components/utils last
- Group imports with newlines

### Naming
- Components: PascalCase (EngagementOverview, Header)
- Functions/variables: camelCase (connectWallet, useIsMobile)
- Constants: UPPER_CASE (MOBILE_BREAKPOINT)
- Data fetching: prefix with "get" (getSolBalance)

### Component Structure
- "use client" directive when needed
- State at top of component
- Return JSX at end
- Use shadcn/ui components with Tailwind CSS
- Follow type-safe practices with TypeScript strict mode

### Error Handling
- Use try/catch for async operations
- Include descriptive error messages
- Provide fallback values
- Implement loading states

### CSS/Styling
- Use Tailwind with shadcn/ui component library
- Follow color system in tailwind.config.ts
- Use CSS variables for themeable values