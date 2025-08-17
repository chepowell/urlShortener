-- DropForeignKey
ALTER TABLE "public"."Url" DROP CONSTRAINT "Url_createdById_fkey";

-- AlterTable
ALTER TABLE "public"."Url" ADD COLUMN     "visits" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "createdById" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."Url" ADD CONSTRAINT "Url_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
