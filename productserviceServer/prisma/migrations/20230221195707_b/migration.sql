-- DropForeignKey
ALTER TABLE `producttype` DROP FOREIGN KEY `ProductType_id_fkey`;

-- AlterTable
ALTER TABLE `products` ADD COLUMN `productTypeId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Products` ADD CONSTRAINT `Products_productTypeId_fkey` FOREIGN KEY (`productTypeId`) REFERENCES `ProductType`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
