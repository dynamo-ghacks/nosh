/*
  Warnings:

  - You are about to drop the column `userId` on the `Destination` table. All the data in the column will be lost.
  - Added the required column `address` to the `Destination` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Destination" DROP CONSTRAINT "Destination_userId_fkey";

-- AlterTable
ALTER TABLE "Destination" DROP COLUMN "userId",
ADD COLUMN     "address" TEXT NOT NULL,
ALTER COLUMN "tags" SET DATA TYPE TEXT[];

-- AlterTable
ALTER TABLE "Review" ALTER COLUMN "tags" SET DATA TYPE TEXT[];
