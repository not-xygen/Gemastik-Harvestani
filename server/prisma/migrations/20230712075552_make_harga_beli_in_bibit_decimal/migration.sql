/*
  Warnings:

  - Changed the type of `harga_beli` on the `Bibit` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Bibit" DROP COLUMN "harga_beli",
ADD COLUMN     "harga_beli" DECIMAL(65,30) NOT NULL;
