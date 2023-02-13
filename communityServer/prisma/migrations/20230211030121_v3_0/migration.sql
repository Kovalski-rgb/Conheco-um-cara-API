/*
  Warnings:

  - You are about to drop the column `moderatorsId` on the `Users` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Users` DROP FOREIGN KEY `Users_moderatorsId_fkey`;

-- AlterTable
ALTER TABLE `Users` DROP COLUMN `moderatorsId`;

-- CreateTable
CREATE TABLE `_ModeratorsToUsers` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_ModeratorsToUsers_AB_unique`(`A`, `B`),
    INDEX `_ModeratorsToUsers_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_ModeratorsToUsers` ADD CONSTRAINT `_ModeratorsToUsers_A_fkey` FOREIGN KEY (`A`) REFERENCES `Moderators`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ModeratorsToUsers` ADD CONSTRAINT `_ModeratorsToUsers_B_fkey` FOREIGN KEY (`B`) REFERENCES `Users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
