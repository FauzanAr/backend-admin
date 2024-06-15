-- AlterTable
ALTER TABLE `TransactionList` ADD COLUMN `corporateDestinationId` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `userDestinationId` INTEGER NOT NULL DEFAULT 0;

-- AddForeignKey
ALTER TABLE `TransactionList` ADD CONSTRAINT `TransactionList_userDestinationId_fkey` FOREIGN KEY (`userDestinationId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TransactionList` ADD CONSTRAINT `TransactionList_corporateDestinationId_fkey` FOREIGN KEY (`corporateDestinationId`) REFERENCES `Corporate`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
