-- AlterTable
ALTER TABLE `Communities` ADD COLUMN `description` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Users` MODIFY `id` INTEGER NOT NULL;
