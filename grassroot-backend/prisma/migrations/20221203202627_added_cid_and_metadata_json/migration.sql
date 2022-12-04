-- AlterTable
ALTER TABLE "File" ADD COLUMN     "imageCid" TEXT,
ADD COLUMN     "metadata" JSONB,
ADD COLUMN     "metadataCid" TEXT;
