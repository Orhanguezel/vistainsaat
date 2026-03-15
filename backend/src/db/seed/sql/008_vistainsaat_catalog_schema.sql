-- =============================================================
-- FILE: 296_vistainsaat_catalog_schema.sql
-- Vista İnşaat — Catalog Schema (categories, category_i18n, catalog_requests)
-- =============================================================

SET NAMES utf8mb4;
SET time_zone = '+00:00';
SET FOREIGN_KEY_CHECKS = 0;

-- -------------------------------------------------------------
-- 1) categories (BASE)
-- -------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `categories` (
  `id`              CHAR(36)     NOT NULL,
  `module_key`      VARCHAR(64)  NOT NULL DEFAULT 'general',
  `image_url`        LONGTEXT     NULL,
  `storage_asset_id` CHAR(36)     NULL,
  `alt`              VARCHAR(255) NULL,
  `icon`             VARCHAR(255) NULL,
  `is_active`       TINYINT(1)   NOT NULL DEFAULT 1,
  `is_featured`     TINYINT(1)   NOT NULL DEFAULT 0,
  `display_order`   INT          NOT NULL DEFAULT 0,
  `created_at`      DATETIME(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at`      DATETIME(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `categories_module_idx` (`module_key`),
  KEY `categories_active_idx` (`is_active`),
  KEY `categories_featured_idx` (`is_featured`),
  KEY `categories_order_idx` (`display_order`),
  KEY `categories_storage_asset_idx` (`storage_asset_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -------------------------------------------------------------
-- 2) category_i18n (I18N — i18n_data dahil, ALTER yok)
-- -------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `category_i18n` (
  `category_id` CHAR(36)     NOT NULL,
  `locale`      VARCHAR(8)   NOT NULL DEFAULT 'tr',
  `name`        VARCHAR(255) NOT NULL,
  `slug`        VARCHAR(255) NOT NULL,
  `description` TEXT         NULL,
  `alt`         VARCHAR(255) NULL,
  `i18n_data`   LONGTEXT     NULL,
  `created_at`  DATETIME(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at`  DATETIME(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`category_id`, `locale`),
  UNIQUE KEY `category_i18n_locale_slug_uq` (`locale`, `slug`),
  KEY `category_i18n_locale_idx` (`locale`),
  KEY `category_i18n_name_idx` (`name`),
  CONSTRAINT `fk_category_i18n_category`
    FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -------------------------------------------------------------
-- 3) catalog_requests
-- -------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `catalog_requests` (
  `id`                CHAR(36)      NOT NULL,
  `status`            ENUM('new','sent','failed','archived') NOT NULL DEFAULT 'new',
  `locale`            VARCHAR(10)   DEFAULT NULL,
  `country_code`      CHAR(2)       DEFAULT NULL,
  `customer_name`     VARCHAR(255)  NOT NULL,
  `company_name`      VARCHAR(255)  DEFAULT NULL,
  `email`             VARCHAR(255)  NOT NULL,
  `phone`             VARCHAR(50)   DEFAULT NULL,
  `message`           LONGTEXT      DEFAULT NULL,
  `consent_marketing` TINYINT(1)    NOT NULL DEFAULT 0,
  `consent_terms`     TINYINT(1)    NOT NULL DEFAULT 0,
  `admin_notes`       LONGTEXT      DEFAULT NULL,
  `email_sent_at`     DATETIME(3)   DEFAULT NULL,
  `created_at`        DATETIME(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at`        DATETIME(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `catalog_requests_status_created_idx` (`status`, `created_at`),
  KEY `catalog_requests_email_idx` (`email`),
  KEY `catalog_requests_locale_idx` (`locale`),
  KEY `catalog_requests_country_idx` (`country_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

SET FOREIGN_KEY_CHECKS = 1;
