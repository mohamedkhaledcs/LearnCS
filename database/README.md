# LearnCS Database Architecture

This directory is intended for organizing repository-level database documentation and SQL artifacts. 

**IMPORTANT**: LearnCS uses **Entity Framework Core** within the .NET backend as the single source of truth for the database schema. Do **not** duplicate schema definitions here manually.

## Core Setup

- **Provider**: PostgreSQL
- **ORM**: Entity Framework Core (EF Core)
- **Migrations Location**: Managed within the `LearnCS.Infrastructure` layer of the .NET backend.

## Structure of this Directory

This directory should be used for:

- `/schema/`: Any non-EF structural artifacts or diagrams documenting the schema.
- `/seed/`: Raw CSV or JSON data intended for seeding (which the EF Core seeder logic reads).
- `/procedures/`: Complex stored procedures that are better maintained as `.sql` files instead of pure EF Core migration strings.
- `/views/`: SQL View definitions if they are too complex for EF Core setup.
- `/legacy/`: Any legacy or deprecated SQL structures.

## Working with Migrations

Do not manually apply `.sql` files to change the schema unless they are wrapped inside an EF Core migration. 

To manage migrations from the backend:
1. Navigate to the API project directory (`cd src/LearnCS.API`).
2. Run standard EF Core commands, for example:
   - `dotnet ef migrations add <MigrationName> --project ../LearnCS.Infrastructure`
   - `dotnet ef database update`

## Environment Setup
Ensure your local environment provides a valid connection string to PostgreSQL. For development, a Docker-compose file (usually located in `/infra`) can be used to spin up a local PostgreSQL instance.

Example connection string (set this in your `appsettings.Development.json` or `.env` file):
`Host=localhost;Database=LearnCS;Username=postgres;Password=yourpassword`
