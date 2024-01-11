-- CreateTable
CREATE TABLE `events` (
    `id` CHAR(36) NOT NULL,
    `slug` VARCHAR(255) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `description` TEXT NULL,
    `date` DATETIME(3) NOT NULL,
    `view_path` VARCHAR(255) NOT NULL,
    `view_data` JSON NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `events_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `event_guest` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `event_id` CHAR(36) NOT NULL,
    `guest_id` CHAR(36) NOT NULL,
    `number_of_attendees` INTEGER UNSIGNED NOT NULL DEFAULT 1,
    `view_path` VARCHAR(255) NULL,
    `view_data` JSON NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `guests` (
    `id` CHAR(36) NOT NULL,
    `slug` VARCHAR(255) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `domicile` VARCHAR(255) NOT NULL,
    `phone_number` VARCHAR(255) NULL,
    `description` TEXT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `guests_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `messages` (
    `id` CHAR(36) NOT NULL,
    `event_guest_id` INTEGER UNSIGNED NOT NULL,
    `content` TEXT NOT NULL,
    `presence_status` ENUM('yes', 'no', 'maybe') NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `messages_event_guest_id_key`(`event_guest_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `presences` (
    `id` CHAR(36) NOT NULL,
    `event_guest_id` INTEGER UNSIGNED NOT NULL,
    `status` ENUM('yes', 'no', 'maybe') NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `presences_event_guest_id_key`(`event_guest_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `event_guest` ADD CONSTRAINT `event_guest_event_id_fkey` FOREIGN KEY (`event_id`) REFERENCES `events`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `event_guest` ADD CONSTRAINT `event_guest_guest_id_fkey` FOREIGN KEY (`guest_id`) REFERENCES `guests`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `messages` ADD CONSTRAINT `messages_event_guest_id_fkey` FOREIGN KEY (`event_guest_id`) REFERENCES `event_guest`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `presences` ADD CONSTRAINT `presences_event_guest_id_fkey` FOREIGN KEY (`event_guest_id`) REFERENCES `event_guest`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
