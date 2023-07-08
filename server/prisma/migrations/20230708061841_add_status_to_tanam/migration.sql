/*
  Warnings:

  - Added the required column `status` to the `Tanam` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "StatusTanam" AS ENUM ('Planning', 'Executing', 'Closed');

-- AlterTable
ALTER TABLE "Tanam" ADD COLUMN     "status" "StatusTanam" NOT NULL;
