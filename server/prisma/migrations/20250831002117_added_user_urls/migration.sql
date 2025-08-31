/*
  Warnings:

  - You are about to drop the column `createdById` on the `Url` table. All the data in the column will be lost.
  - You are about to drop the column `visits` on the `Url` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Url` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Url" DROP CONSTRAINT "Url_createdById_fkey";

-- AlterTable
ALTER TABLE "public"."Url" DROP COLUMN "createdById",
DROP COLUMN "visits",
ADD COLUMN     "userId" TEXT NOT NULL,
ADD COLUMN     "visitCount" INTEGER NOT NULL DEFAULT 0;

-- AddForeignKey
ALTER TABLE "public"."Url" ADD CONSTRAINT "Url_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
