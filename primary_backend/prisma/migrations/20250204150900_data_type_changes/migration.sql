/*
  Warnings:

  - The primary key for the `ZapRun` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `ZapRun` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `zapRunId` on the `ZapRunOutbox` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "ZapRunOutbox" DROP CONSTRAINT "ZapRunOutbox_zapRunId_fkey";

-- AlterTable
ALTER TABLE "ZapRun" DROP CONSTRAINT "ZapRun_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "ZapRun_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "ZapRunOutbox" DROP COLUMN "zapRunId",
ADD COLUMN     "zapRunId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "ZapRunOutbox_zapRunId_key" ON "ZapRunOutbox"("zapRunId");

-- AddForeignKey
ALTER TABLE "ZapRunOutbox" ADD CONSTRAINT "ZapRunOutbox_zapRunId_fkey" FOREIGN KEY ("zapRunId") REFERENCES "ZapRun"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
