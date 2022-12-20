/*
  Warnings:

  - You are about to drop the column `Other` on the `Social` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Social" DROP COLUMN "Other",
ADD COLUMN     "other" JSONB;
