/*
  Warnings:

  - You are about to drop the column `moderatorsId` on the `Communities` table. All the data in the column will be lost.
  - You are about to drop the column `communitiesId` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `isAdmin` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `telephone` on the `Users` table. All the data in the column will be lost.
  - Added the required column `code` to the `Communities` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Communities` DROP FOREIGN KEY `Communities_moderatorsId_fkey`;

-- DropForeignKey
ALTER TABLE `Users` DROP FOREIGN KEY `Users_communitiesId_fkey`;

-- AlterTable
ALTER TABLE `Communities` DROP COLUMN `moderatorsId`,
    ADD COLUMN `code` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Users` DROP COLUMN `communitiesId`,
    DROP COLUMN `email`,
    DROP COLUMN `isAdmin`,
    DROP COLUMN `name`,
    DROP COLUMN `telephone`;

-- CreateTable
CREATE TABLE `_CommunitiesToUsers` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_CommunitiesToUsers_AB_unique`(`A`, `B`),
    INDEX `_CommunitiesToUsers_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_CommunitiesToModerators` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_CommunitiesToModerators_AB_unique`(`A`, `B`),
    INDEX `_CommunitiesToModerators_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_CommunitiesToUsers` ADD CONSTRAINT `_CommunitiesToUsers_A_fkey` FOREIGN KEY (`A`) REFERENCES `Communities`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CommunitiesToUsers` ADD CONSTRAINT `_CommunitiesToUsers_B_fkey` FOREIGN KEY (`B`) REFERENCES `Users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CommunitiesToModerators` ADD CONSTRAINT `_CommunitiesToModerators_A_fkey` FOREIGN KEY (`A`) REFERENCES `Communities`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CommunitiesToModerators` ADD CONSTRAINT `_CommunitiesToModerators_B_fkey` FOREIGN KEY (`B`) REFERENCES `Moderators`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
