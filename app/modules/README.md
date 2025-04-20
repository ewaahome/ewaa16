# Modular Structure Documentation

This folder contains the restructured application modules, organized by feature/domain.

## Module Structure

Each module follows a consistent structure:

```
module/
  ├── api/                 # API routes specific to this module
  │   └── [dynamic]/       # Dynamic API routes
  ├── components/          # React components used in this module
  ├── actions/             # Server actions for data fetching
  └── page.tsx             # The main page component
```

## Modules

### Reservations

Handles property reservations including:
- Creating new reservations
- Canceling reservations
- Viewing reservations on properties you own

### Trips

Manages user trips including:
- Viewing trips you've booked
- Canceling your upcoming trips

### Listings

Handles property listings including:
- Creating new listings
- Viewing listing details
- Managing your own properties

### Favorites

Manages user favorite properties:
- Adding properties to favorites
- Removing properties from favorites
- Viewing all favorite properties

### Properties

Manages properties owned by the current user:
- Viewing all properties you own
- Managing property details
- Handling property reservations

### Auth

Handles user authentication:
- User registration
- User login
- OAuth providers (Google, GitHub)
- Session management 