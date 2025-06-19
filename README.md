# CircularIQ - Sustainability Platform

CircularIQ is a comprehensive platform for African businesses to track plastic usage, ensure regulatory compliance, and build sustainability intelligence. This application helps businesses understand their environmental impact and meet local regulations like Kenya's EMCA and EPR laws.

![CircularIQ Screenshot](/public/visual-reference/CircularIQ.png)

## Features

- **Data Collection & Validation**: Easily track and validate plastic usage data through manual entry or bulk CSV uploads
- **Regulatory Compliance**: Automatically assess your compliance with local environmental regulations
- **Sustainability Analytics**: Visualize your environmental impact and track progress over time
- **Reporting Tools**: Generate reports for regulatory submissions and internal stakeholders
- **Team Collaboration**: Multiple user accounts with role-based permissions

## Prerequisites

- Node.js v16+ and npm
- Supabase account (for database and authentication)

## Environment Setup

1. Clone this repository
2. Create a `.env` file in the project root with the following variables:

```
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_key
```

Note: The script will also accept the following Nuxt-prefixed environment variable names:
```
NUXT_PUBLIC_SUPABASE_URL=your_supabase_url
NUXT_PUBLIC_SUPABASE_KEY=your_supabase_anon_key
NUXT_SUPABASE_SERVICE_KEY=your_supabase_service_key
```

## Quick Start

The easiest way to get started is to use our setup script:

```bash
# Make sure the script is executable
chmod +x setup.sh

# Run the setup script
./setup.sh
```

Or use the npm shortcut:

```bash
npm run setup
```

This interactive script will:
1. Create a `.env` file from the template if needed
2. Install dependencies
3. Optionally seed the database
4. Optionally start the development server

## Manual Installation

If you prefer a manual setup:

1. Copy `.env.example` to `.env` and fill in your Supabase credentials
2. Install dependencies:
   ```bash
   npm install
   ```
3. Seed the database:
   ```bash
   npm run seed
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## Database Setup

### Schema Deployment

To set up the database schema in your Supabase project:

1. Initialize the database with required functions:
   ```bash
   npm run db:init
   ```
   
   This will attempt to create the needed SQL function. If it fails due to permissions, follow the instructions to create it manually in the Supabase SQL Editor:
   ```sql
   create or replace function exec_sql(sql text)
   returns void
   language plpgsql
   security definer
   as $$
   begin
     execute sql;
   end;
   $$;
   ```

2. Deploy the schema using our script:
   ```bash
   # Preview the schema changes without applying them
   npm run db:schema:dry

   # Apply the schema to your Supabase instance
   npm run db:schema
   ```

3. Seed the database with sample data:
   ```bash
   node server/scripts/seed-database.js
   ```

4. Test the database connection:
   ```bash
   node server/scripts/test-connection.js
   ```

For detailed information about the database schema, refer to [/supabase/README.md](/supabase/README.md).

### Demo Credentials

After seeding the database, you can log in with the following demo account:
- Email: demo@circulariq.com
- Password: Password123

## Development Server

Start the development server on `http://localhost:3000`:

```bash
npm run dev
```

## Production Deployment

Build the application for production:

```bash
npm run build
```

Start the production server:

```bash
npm run start
```

## Project Structure

- `/components`: Reusable Vue components
- `/composables`: Shared Vue composable functions
- `/layouts`: Page layouts (dashboard, default)
- `/pages`: Application routes and views
- `/server`: Server-side code (API routes, database interactions)
- `/stores`: Pinia state stores
- `/utils`: Utility functions

## Technology Stack

- [Nuxt 3](https://nuxt.com) - Vue.js framework
- [Supabase](https://supabase.com) - Backend services (database, auth)
- [Pinia](https://pinia.vuejs.org/) - State management
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [ApexCharts](https://apexcharts.com/) - Data visualization

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
