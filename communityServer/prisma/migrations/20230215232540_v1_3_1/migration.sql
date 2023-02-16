-- DropForeignKey
ALTER TABLE `Posts` DROP FOREIGN KEY `Posts_communitiesId_fkey`;

-- AlterTable
ALTER TABLE `Posts` MODIFY `communitiesId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Posts` ADD CONSTRAINT `Posts_communitiesId_fkey` FOREIGN KEY (`communitiesId`) REFERENCES `Communities`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
