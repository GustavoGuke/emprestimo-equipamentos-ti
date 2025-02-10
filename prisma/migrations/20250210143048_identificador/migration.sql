/*
  Warnings:

  - Added the required column `identificador` to the `Equipamento` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `equipamento` ADD COLUMN `identificador` VARCHAR(191) NOT NULL;
