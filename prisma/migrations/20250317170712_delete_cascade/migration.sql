-- DropForeignKey
ALTER TABLE `emprestimo` DROP FOREIGN KEY `Emprestimo_equipamentoId_fkey`;

-- DropIndex
DROP INDEX `Emprestimo_equipamentoId_fkey` ON `emprestimo`;

-- AddForeignKey
ALTER TABLE `Emprestimo` ADD CONSTRAINT `Emprestimo_equipamentoId_fkey` FOREIGN KEY (`equipamentoId`) REFERENCES `Equipamento`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
