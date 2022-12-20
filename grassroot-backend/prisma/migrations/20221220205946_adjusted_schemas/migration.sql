/*
  Warnings:

  - You are about to drop the column `campaignCategoryId` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `campaignSubCategoryId` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `daoId` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `daoIdSub` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `daoId` on the `Tag` table. All the data in the column will be lost.
  - You are about to drop the column `ownerId` on the `Tag` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_campaignCategoryId_fkey";

-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_campaignSubCategoryId_fkey";

-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_daoIdSub_fkey";

-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_daoId_fkey";

-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "Tag" DROP CONSTRAINT "Tag_daoId_fkey";

-- DropForeignKey
ALTER TABLE "Tag" DROP CONSTRAINT "Tag_ownerId_fkey";

-- DropIndex
DROP INDEX "Category_campaignCategoryId_key";

-- DropIndex
DROP INDEX "Category_campaignSubCategoryId_key";

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "campaignCategoryId",
DROP COLUMN "campaignSubCategoryId",
DROP COLUMN "daoId",
DROP COLUMN "daoIdSub";

-- AlterTable
ALTER TABLE "Tag" DROP COLUMN "daoId",
DROP COLUMN "ownerId";

-- CreateTable
CREATE TABLE "_tags" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_category" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_subcategory" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_CategoryToDAO" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_tags_AB_unique" ON "_tags"("A", "B");

-- CreateIndex
CREATE INDEX "_tags_B_index" ON "_tags"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_category_AB_unique" ON "_category"("A", "B");

-- CreateIndex
CREATE INDEX "_category_B_index" ON "_category"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_subcategory_AB_unique" ON "_subcategory"("A", "B");

-- CreateIndex
CREATE INDEX "_subcategory_B_index" ON "_subcategory"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CategoryToDAO_AB_unique" ON "_CategoryToDAO"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoryToDAO_B_index" ON "_CategoryToDAO"("B");

-- AddForeignKey
ALTER TABLE "_tags" ADD CONSTRAINT "_tags_A_fkey" FOREIGN KEY ("A") REFERENCES "DAO"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_tags" ADD CONSTRAINT "_tags_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_category" ADD CONSTRAINT "_category_A_fkey" FOREIGN KEY ("A") REFERENCES "Campaign"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_category" ADD CONSTRAINT "_category_B_fkey" FOREIGN KEY ("B") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_subcategory" ADD CONSTRAINT "_subcategory_A_fkey" FOREIGN KEY ("A") REFERENCES "Campaign"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_subcategory" ADD CONSTRAINT "_subcategory_B_fkey" FOREIGN KEY ("B") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToDAO" ADD CONSTRAINT "_CategoryToDAO_A_fkey" FOREIGN KEY ("A") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToDAO" ADD CONSTRAINT "_CategoryToDAO_B_fkey" FOREIGN KEY ("B") REFERENCES "DAO"("id") ON DELETE CASCADE ON UPDATE CASCADE;
