/*
  Warnings:

  - You are about to drop the column `moderatorId` on the `user` table. All the data in the column will be lost.
  - You are about to drop the `_communitytouser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_producttoproducttypes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_servicetoservicetypes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `community` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `message` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `moderator` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `product` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `producttypes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `service` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `servicetypes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_communitytouser` DROP FOREIGN KEY `_CommunityToUser_A_fkey`;

-- DropForeignKey
ALTER TABLE `_communitytouser` DROP FOREIGN KEY `_CommunityToUser_B_fkey`;

-- DropForeignKey
ALTER TABLE `_producttoproducttypes` DROP FOREIGN KEY `_ProductToProductTypes_A_fkey`;

-- DropForeignKey
ALTER TABLE `_producttoproducttypes` DROP FOREIGN KEY `_ProductToProductTypes_B_fkey`;

-- DropForeignKey
ALTER TABLE `_servicetoservicetypes` DROP FOREIGN KEY `_ServiceToServiceTypes_A_fkey`;

-- DropForeignKey
ALTER TABLE `_servicetoservicetypes` DROP FOREIGN KEY `_ServiceToServiceTypes_B_fkey`;

-- DropForeignKey
ALTER TABLE `community` DROP FOREIGN KEY `Community_moderatorsId_fkey`;

-- DropForeignKey
ALTER TABLE `message` DROP FOREIGN KEY `Message_communityId_fkey`;

-- DropForeignKey
ALTER TABLE `post` DROP FOREIGN KEY `Post_communityId_fkey`;

-- DropForeignKey
ALTER TABLE `post` DROP FOREIGN KEY `Post_productId_fkey`;

-- DropForeignKey
ALTER TABLE `post` DROP FOREIGN KEY `Post_serviceId_fkey`;

-- DropForeignKey
ALTER TABLE `post` DROP FOREIGN KEY `Post_userId_fkey`;

-- DropForeignKey
ALTER TABLE `product` DROP FOREIGN KEY `Product_userId_fkey`;

-- DropForeignKey
ALTER TABLE `service` DROP FOREIGN KEY `Service_userId_fkey`;

-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `User_moderatorId_fkey`;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `moderatorId`;

-- DropTable
DROP TABLE `_communitytouser`;

-- DropTable
DROP TABLE `_producttoproducttypes`;

-- DropTable
DROP TABLE `_servicetoservicetypes`;

-- DropTable
DROP TABLE `community`;

-- DropTable
DROP TABLE `message`;

-- DropTable
DROP TABLE `moderator`;

-- DropTable
DROP TABLE `post`;

-- DropTable
DROP TABLE `product`;

-- DropTable
DROP TABLE `producttypes`;

-- DropTable
DROP TABLE `service`;

-- DropTable
DROP TABLE `servicetypes`;
