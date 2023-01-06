-- CreateTable
CREATE TABLE "Contract" (
    "id" TEXT NOT NULL,
    "abi" JSONB NOT NULL,
    "address" TEXT NOT NULL,
    "networkName" TEXT NOT NULL,
    "explorerUrl" TEXT NOT NULL,
    "networkSlug" TEXT NOT NULL,
    "chainId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Contract_pkey" PRIMARY KEY ("id")
);
