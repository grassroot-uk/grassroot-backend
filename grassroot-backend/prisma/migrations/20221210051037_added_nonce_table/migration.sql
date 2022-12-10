-- CreateTable
CREATE TABLE "PendingNonce" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "address" TEXT,
    "nonce" TEXT NOT NULL,

    CONSTRAINT "PendingNonce_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PendingNonce_address_key" ON "PendingNonce"("address");
