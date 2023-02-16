/*
  Warnings:

  - You are about to drop the column `userId` on the `Products` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Services` table. All the data in the column will be lost.
  - Made the column `communitiesId` on table `Posts` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `Posts` DROP FOREIGN KEY `Posts_communitiesId_fkey`;

-- DropForeignKey
ALTER TABLE `Products` DROP FOREIGN KEY `Products_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Services` DROP FOREIGN KEY `Services_userId_fkey`;

-- AlterTable
ALTER TABLE `Posts` MODIFY `communitiesId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Products` DROP COLUMN `userId`;

-- AlterTable
ALTER TABLE `Services` DROP COLUMN `userId`;

-- AddForeignKey
ALTER TABLE `Posts` ADD CONSTRAINT `Posts_communitiesId_fkey` FOREIGN KEY (`communitiesId`) REFERENCES `Communities`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
