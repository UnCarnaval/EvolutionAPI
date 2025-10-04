-- AlterTable
-- Add default now() and @updatedAt to Setting.updatedAt column
-- This allows Prisma to auto-update the timestamp on record modifications

-- No actual ALTER needed since PostgreSQL defaults are handled by Prisma
-- This is a schema-only change that affects Prisma Client generation

