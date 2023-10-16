/*
  Warnings:

  - You are about to drop the column `petId` on the `adoption_requirements` table. All the data in the column will be lost.
  - You are about to drop the column `petId` on the `pet_gallery` table. All the data in the column will be lost.
  - You are about to drop the column `orgId` on the `pets` table. All the data in the column will be lost.
  - Added the required column `pet_id` to the `adoption_requirements` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pet_id` to the `pet_gallery` table without a default value. This is not possible if the table is not empty.
  - Added the required column `org_id` to the `pets` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "adoption_requirements" DROP CONSTRAINT "adoption_requirements_petId_fkey";

-- DropForeignKey
ALTER TABLE "pet_gallery" DROP CONSTRAINT "pet_gallery_petId_fkey";

-- DropForeignKey
ALTER TABLE "pets" DROP CONSTRAINT "pets_orgId_fkey";

-- AlterTable
ALTER TABLE "adoption_requirements" DROP COLUMN "petId",
ADD COLUMN     "pet_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "pet_gallery" DROP COLUMN "petId",
ADD COLUMN     "pet_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "pets" DROP COLUMN "orgId",
ADD COLUMN     "org_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_org_id_fkey" FOREIGN KEY ("org_id") REFERENCES "orgs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pet_gallery" ADD CONSTRAINT "pet_gallery_pet_id_fkey" FOREIGN KEY ("pet_id") REFERENCES "pets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "adoption_requirements" ADD CONSTRAINT "adoption_requirements_pet_id_fkey" FOREIGN KEY ("pet_id") REFERENCES "pets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
