-- AlterTable
ALTER TABLE "Contact" ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'New';

-- AlterTable
ALTER TABLE "QuoteRequest" ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'New';
