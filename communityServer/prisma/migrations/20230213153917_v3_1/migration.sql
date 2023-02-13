/*
  Warnings:

  - You are about to drop the `_CommunitiesToModerators` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ModeratorsToUsers` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `communitiesId` to the `Moderators` table without a default value. This is not possible if the table is not empty.
  - Added the required column `usersId` to the `Moderators` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `_CommunitiesToModerators` DROP FOREIGN KEY `_CommunitiesToModerators_A_fkey`;

-- DropForeignKey
ALTER TABLE `_CommunitiesToModerators` DROP FOREIGN KEY `_CommunitiesToModerators_B_fkey`;

-- DropForeignKey
ALTER TABLE `_ModeratorsToUsers` DROP FOREIGN KEY `_ModeratorsToUsers_A_fkey`;

-- DropForeignKey
ALTER TABLE `_ModeratorsToUsers` DROP FOREIGN KEY `_ModeratorsToUsers_B_fkey`;

-- AlterTable
ALTER TABLE `Moderators` ADD COLUMN `communitiesId` INTEGER NOT NULL,
    ADD COLUMN `usersId` INTEGER NOT NULL;

-- DropTable
DROP TABLE `_CommunitiesToModerators`;

-- DropTable
DROP TABLE `_ModeratorsToUsers`;

-- AddForeignKey
ALTER TABLE `Moderators` ADD CONSTRAINT `Moderators_usersId_fkey` FOREIGN KEY (`usersId`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Moderators` ADD CONSTRAINT `Moderators_communitiesId_fkey` FOREIGN KEY (`communitiesId`) REFERENCES `Communities`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
