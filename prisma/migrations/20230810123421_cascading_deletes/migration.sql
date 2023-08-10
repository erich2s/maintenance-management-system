-- DropForeignKey
ALTER TABLE "Report" DROP CONSTRAINT "Report_createdById_fkey";

-- DropForeignKey
ALTER TABLE "Report" DROP CONSTRAINT "Report_locationId_fkey";

-- DropForeignKey
ALTER TABLE "Report" DROP CONSTRAINT "Report_typeId_fkey";

-- AlterTable
ALTER TABLE "Report" ALTER COLUMN "createdById" DROP NOT NULL,
ALTER COLUMN "locationId" DROP NOT NULL,
ALTER COLUMN "typeId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "Type"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE SET NULL ON UPDATE CASCADE;
