/*
  Warnings:

  - A unique constraint covering the columns `[address]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `address` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TypeCategory" AS ENUM ('CATEGORY', 'SUBCATEGORY');

-- AlterTable
ALTER TABLE "File" ADD COLUMN     "daoId" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "about" TEXT,
ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "participantOf" JSONB[];

-- CreateTable
CREATE TABLE "DAO" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "adminAddress" TEXT NOT NULL,
    "adminId" TEXT NOT NULL,
    "profilePicture" TEXT NOT NULL,
    "backgroundPicture" TEXT,
    "metadata" JSONB,
    "participants" TEXT[],
    "files" TEXT[],

    CONSTRAINT "DAO_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Social" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "userId" TEXT,
    "daoId" TEXT,
    "Other" JSONB,

    CONSTRAINT "Social_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Campaign" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT NOT NULL,
    "campaignId" INTEGER NOT NULL,
    "transactionHash" TEXT NOT NULL,
    "images" TEXT[],
    "videos" TEXT[],
    "tokenCurrency" TEXT NOT NULL,
    "tokenCurrencyAddress" TEXT NOT NULL,
    "minAmount" BIGINT NOT NULL,
    "goalAmount" BIGINT NOT NULL,
    "completionDate" BIGINT NOT NULL,
    "country" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "metadata" JSONB,
    "daoId" TEXT NOT NULL,
    "categoryId" TEXT,

    CONSTRAINT "Campaign_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "ownerId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "daoId" TEXT,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "ownerId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "daoId" TEXT,
    "daoIdSub" TEXT,
    "campaignCategoryId" TEXT,
    "campaignSubCategoryId" TEXT,
    "type" "TypeCategory" NOT NULL DEFAULT 'CATEGORY',

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Category_campaignCategoryId_key" ON "Category"("campaignCategoryId");

-- CreateIndex
CREATE UNIQUE INDEX "Category_campaignSubCategoryId_key" ON "Category"("campaignSubCategoryId");

-- CreateIndex
CREATE UNIQUE INDEX "User_address_key" ON "User"("address");

-- AddForeignKey
ALTER TABLE "DAO" ADD CONSTRAINT "DAO_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_daoId_fkey" FOREIGN KEY ("daoId") REFERENCES "DAO"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Social" ADD CONSTRAINT "Social_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Social" ADD CONSTRAINT "Social_daoId_fkey" FOREIGN KEY ("daoId") REFERENCES "DAO"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Campaign" ADD CONSTRAINT "Campaign_daoId_fkey" FOREIGN KEY ("daoId") REFERENCES "DAO"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tag" ADD CONSTRAINT "Tag_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tag" ADD CONSTRAINT "Tag_daoId_fkey" FOREIGN KEY ("daoId") REFERENCES "DAO"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_daoId_fkey" FOREIGN KEY ("daoId") REFERENCES "DAO"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_daoIdSub_fkey" FOREIGN KEY ("daoIdSub") REFERENCES "DAO"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_campaignCategoryId_fkey" FOREIGN KEY ("campaignCategoryId") REFERENCES "Campaign"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_campaignSubCategoryId_fkey" FOREIGN KEY ("campaignSubCategoryId") REFERENCES "Campaign"("id") ON DELETE SET NULL ON UPDATE CASCADE;
