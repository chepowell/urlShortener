/*
  Warnings:

  - You are about to drop the column `createdAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `passwordHash` on the `User` table. All the data in the column will be lost.
  - Made the column `createdById` on table `Url` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Url" DROP CONSTRAINT "Url_createdById_fkey";

-- DropIndex
DROP INDEX "public"."Url_slug_idx";

-- AlterTable
ALTER TABLE "public"."Url" ALTER COLUMN "createdById" SET NOT NULL;

-- AlterTable
ALTER TABLE "public"."User" DROP COLUMN "createdAt",
DROP COLUMN "passwordHash",
ADD COLUMN     "password" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."Url" ADD CONSTRAINT "Url_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
