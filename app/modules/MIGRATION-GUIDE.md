# Migration Guide

This document provides guidelines for migrating the existing flat structure to a feature-based modular structure.

## Why Reorganize?

The reorganization offers several benefits:
- **Better Organization**: Code is grouped by feature rather than technical concern
- **Improved Maintainability**: Related code is kept together
- **Clear Boundaries**: Each module has a clear responsibility
- **Easier Navigation**: Developers can quickly find relevant code
- **Scalability**: New features can be added as modules without affecting existing code

## Migration Steps

### 1. Create Module Structure

Create the following directory structure for each feature:

```
app/modules/[feature-name]/
  ├── api/
  ├── components/
  ├── actions/
  └── page.tsx
```

### 2. Move API Routes

Move API routes from `app/api/[feature-name]/` to `app/modules/[feature-name]/api/`:

```bash
# Original location
app/api/reservations/route.ts
app/api/reservations/[reservationId]/route.ts

# New location
app/modules/reservations/api/route.ts
app/modules/reservations/api/[reservationId]/route.ts
```

### 3. Move Server Actions

Move server actions (data fetching functions) to the appropriate module:

```bash
# Original location
app/actions/getReservations.ts

# New location
app/modules/reservations/actions/getReservations.ts
```

### 4. Move Components

Move feature-specific components to the appropriate module:

```bash
# Original location
app/reservations/ReservationsClient.tsx

# New location
app/modules/reservations/components/ReservationsClient.tsx
```

### 5. Move Pages

Move page components to the root of each module:

```bash
# Original location
app/reservations/page.tsx

# New location
app/modules/reservations/page.tsx
```

### 6. Update Imports

Update import paths throughout the codebase to reflect the new structure:

```tsx
// Before
import getReservations from "@/app/actions/getReservations";

// After
import getReservations from "@/app/modules/reservations/actions/getReservations";
```

### 7. Ensure Backward Compatibility

To ensure backward compatibility during transition, consider:

1. Creating proxy files at the original locations that re-export from the new locations
2. Gradually migrating modules one at a time
3. Updating tests as you migrate each module

## Example Migration

Here's an example of migrating the Reservations feature:

1. Move API routes:
   - Move `app/api/reservations/route.ts` → `app/modules/reservations/api/route.ts`
   - Move `app/api/reservations/[reservationId]/route.ts` → `app/modules/reservations/api/[reservationId]/route.ts`

2. Move actions:
   - Move `app/actions/getReservations.ts` → `app/modules/reservations/actions/getReservations.ts`

3. Move components:
   - Move `app/reservations/ReservationsClient.tsx` → `app/modules/reservations/components/ReservationsClient.tsx`

4. Move page:
   - Move `app/reservations/page.tsx` → `app/modules/reservations/page.tsx`

5. Update imports in all affected files 