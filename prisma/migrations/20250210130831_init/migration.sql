-- CreateTable
CREATE TABLE `Equipamento` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `quantidade` INTEGER NOT NULL,
    `criadoEm` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Emprestimo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `usuario` VARCHAR(191) NOT NULL,
    `departamento` VARCHAR(191) NOT NULL,
    `dataEmprestimo` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `responsavelEmprestimo` VARCHAR(191) NOT NULL,
    `devolvido` BOOLEAN NOT NULL DEFAULT false,
    `dataDevolucao` DATETIME(3) NULL,
    `responsavelDevolucao` VARCHAR(191) NULL,
    `equipamentoId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Emprestimo` ADD CONSTRAINT `Emprestimo_equipamentoId_fkey` FOREIGN KEY (`equipamentoId`) REFERENCES `Equipamento`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
