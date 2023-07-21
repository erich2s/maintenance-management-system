/*
  Warnings:

  - You are about to drop the column `phone` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `address` to the `Repair` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `Repair` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Repair` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "User_phone_key";

-- AlterTable
ALTER TABLE "Repair" ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "phone" TEXT NOT NULL,
ADD COLUMN     "type" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "phone";

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
