# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

React Native component library built with TypeScript and Expo. The project provides fully customizable, production-ready UI components for React Native applications.

## Architecture

### Component Structure
- **Components** (`/components/`): Reusable UI components (Button, Input) with TypeScript interfaces and complete prop typing
- **Demo App** (`/app/`): Expo Router-based demonstration app showcasing component usage
- Each component follows a pattern of:
  - Discriminated unions for variants
  - Base props extended with native component props
  - Style composition functions for dynamic styling
  - Support for custom styling overrides

### Routing
Uses Expo Router with file-based routing:
- `app/_layout.tsx`: Root layout with Stack navigation
- `app/index.tsx`: Home screen with navigation links
- `app/button.tsx`: Button component showcase
- `app/input.tsx`: Input component showcase

## Development Commands

```bash
# Start development server
npm start

# Run on specific platforms
npm run ios      # iOS simulator
npm run android  # Android emulator
npm run web      # Web browser

# Linting
npm run lint

# Reset project (clean cache, reinstall)
npm run reset-project
```

## TypeScript Configuration

- Strict mode enabled
- Path alias configured: `@/*` maps to root directory
- Components use discriminated unions and intersection types for type safety

## Component Development Guidelines

When developing new components:
1. Create component in `/components/` directory
2. Use TypeScript interfaces with proper prop typing
3. Extend native React Native component props when appropriate
4. Implement style composition functions for variant support
5. Add demo screen in `/app/` directory
6. Follow existing patterns from Button and Input components

## Testing Components

To test component changes:
1. Run `npm start` to launch Expo development server
2. Press 'i' for iOS, 'a' for Android, or 'w' for web
3. Navigate to respective component demo screens
4. Hot reload is enabled - changes reflect immediately