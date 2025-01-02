/*
  Warnings:

  - You are about to drop the column `trrgierId` on the `Zap` table. All the data in the column will be lost.
  - Added the required column `triggerId` to the `Zap` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Zap" DROP COLUMN "trrgierId",
ADD COLUMN     "triggerId" TEXT NOT NULL;
