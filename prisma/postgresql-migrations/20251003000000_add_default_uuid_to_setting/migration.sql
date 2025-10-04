-- AlterTable
-- Add default uuid() to Setting.id column
-- This allows Prisma to auto-generate UUIDs for new Setting records

-- No actual ALTER needed since PostgreSQL defaults are not enforced at DB level
-- Prisma will handle UUID generation in the application layer with @default(uuid())

-- This is a schema-only change that affects Prisma Client generation

