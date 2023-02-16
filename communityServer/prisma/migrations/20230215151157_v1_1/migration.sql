/*
  Warnings:

  - You are about to drop the column `active` on the `Products` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Products` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `Products` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Products` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `Products` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Products` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `Products` table. All the data in the column will be lost.
  - You are about to drop the column `productType` on the `Products` table. All the data in the column will be lost.
  - You are about to drop the column `active` on the `Services` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Services` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `Services` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Services` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `Services` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Services` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `Services` table. All the data in the column will be lost.
  - You are about to drop the column `productType` on the `Services` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Products` DROP COLUMN `active`,
    DROP COLUMN `createdAt`,
    DROP COLUMN `deletedAt`,
    DROP COLUMN `description`,
    DROP COLUMN `image`,
    DROP COLUMN `name`,
    DROP COLUMN `price`,
    DROP COLUMN `productType`;

-- AlterTable
ALTER TABLE `Services` DROP COLUMN `active`,
    DROP COLUMN `createdAt`,
    DROP COLUMN `deletedAt`,
    DROP COLUMN `description`,
    DROP COLUMN `image`,
    DROP COLUMN `name`,
    DROP COLUMN `price`,
    DROP COLUMN `productType`;
