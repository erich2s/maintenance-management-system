/*
  Warnings:

  - Made the column `createdById` on table `Report` required. This step will fail if there are existing NULL values in that column.
  - Made the column `locationId` on table `Report` required. This step will fail if there are existing NULL values in that column.
  - Made the column `typeId` on table `Report` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Report" DROP CONSTRAINT "Report_createdById_fkey";

-- DropForeignKey
ALTER TABLE "Report" DROP CONSTRAINT "Report_locationId_fkey";

-- DropForeignKey
ALTER TABLE "Report" DROP CONSTRAINT "Report_typeId_fkey";

-- AlterTable
ALTER TABLE "Report" ALTER COLUMN "createdById" SET NOT NULL,
ALTER COLUMN "locationId" SET NOT NULL,
ALTER COLUMN "typeId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "Type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
