-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `KhachHang` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `hoTen` VARCHAR(255) NOT NULL,
    `tuoi` INTEGER NOT NULL,
    `gmail` VARCHAR(50) NOT NULL,
    `sdt` VARCHAR(20) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `NhanVien` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `hoTen` VARCHAR(50) NOT NULL,
    `tuoi` INTEGER NOT NULL,
    `gmail` VARCHAR(50) NOT NULL,
    `sdt` VARCHAR(20) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `NhanVien_VaiTro` (
    `NhanVienId` INTEGER NOT NULL,
    `VaiTroId` INTEGER NOT NULL,

    PRIMARY KEY (`NhanVienId`, `VaiTroId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `VaiTro` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tenVaiTro` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `NhanVien_VaiTro` ADD CONSTRAINT `NhanVien_VaiTro_NhanVienId_fkey` FOREIGN KEY (`NhanVienId`) REFERENCES `NhanVien`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `NhanVien_VaiTro` ADD CONSTRAINT `NhanVien_VaiTro_VaiTroId_fkey` FOREIGN KEY (`VaiTroId`) REFERENCES `VaiTro`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
