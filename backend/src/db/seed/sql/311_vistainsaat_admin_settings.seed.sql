
-- =============================================================
-- FILE: 041_admin_settings.sql (Vista İnşaat)
-- Admin Panel UI Configurations (Theme, Layout, Page Meta)
-- =============================================================

SET NAMES utf8mb4;
SET time_zone = '+00:00';

INSERT INTO `site_settings` (`id`, `key`, `locale`, `value`, `created_at`, `updated_at`)
VALUES
-- =============================================================
-- GLOBAL: Admin UI Defaults (Theme/Layout)
-- =============================================================
(
  UUID(),
  'ui_admin_config',
  '*',
  CAST(JSON_OBJECT(
    'default_locale', 'tr',
    'theme', JSON_OBJECT(
      'mode', 'light',
      'preset', 'zinc',
      'font', 'inter'
    ),
    'layout', JSON_OBJECT(
      'sidebar_variant', 'inset',
      'sidebar_collapsible', 'icon',
      'navbar_style', 'sticky',
      'content_layout', 'centered'
    ),
    'branding', JSON_OBJECT(
      'app_name', 'Vista İnşaat Admin Panel',
      'app_copyright', 'Vista İnşaat',
      'html_lang', 'tr',
      'theme_color', '#b8a98a',
      'favicon_16', '/favicon/favicon-16.png',
      'favicon_32', '/favicon/favicon-32.png',
      'apple_touch_icon', '/favicon/apple-touch-icon.png',
      'meta', JSON_OBJECT(
        'title', 'Vista İnşaat Admin Panel',
        'description', 'Vista İnşaat için ürün, galeri, teklif, blog ve site ayarlarını yöneten admin paneli.',
        'og_url', 'https://www.vistainsaat.com',
        'og_title', 'Vista İnşaat Admin Panel',
        'og_description', 'Vista İnşaat projeleri için içerik, medya, teklif ve site ayarı yönetim ekranı.',
        'og_image', '/logo/png/vista_logo_512.png',
        'twitter_card', 'summary_large_image'
      )
    )
  ) AS CHAR CHARACTER SET utf8mb4),
  NOW(3),
  NOW(3)
),

-- =============================================================
-- LOCALIZED: Admin Page Meta (TR)
-- =============================================================
(
  UUID(),
  'ui_admin_pages',
  'tr',
  CAST(JSON_OBJECT(
    'dashboard', JSON_OBJECT(
      'title', 'Özet Paneli',
      'description', 'Sistem genel bakış ve metrikler',
      'metrics', JSON_ARRAY('products', 'gallery', 'services', 'offers', 'contacts', 'references', 'categories', 'custom_pages', 'reviews', 'newsletter', 'users', 'email_templates', 'site_settings', 'menu_items', 'sliders', 'footer_sections', 'storage')
    ),
    'users', JSON_OBJECT(
      'title', 'Kullanıcı Yönetimi',
      'description', 'Sistem kullanıcılarını yönet'
    ),
    'offers', JSON_OBJECT(
      'title', 'Teklif Talepleri',
      'description', 'Gelen teklif talepleri ve yönetimi'
    ),
    'products', JSON_OBJECT(
      'title', 'Projeler',
      'description', 'Vista İnşaat projeleri'
    ),
    'gallery', JSON_OBJECT(
      'title', 'Galeri',
      'description', 'Proje görselleri ve galeri yönetimi'
    ),
    'categories', JSON_OBJECT(
      'title', 'Kategoriler',
      'description', 'Proje kategori yönetimi'
    ),
    'services', JSON_OBJECT(
      'title', 'Hizmetler',
      'description', 'İnşaat hizmetleri'
    ),
    'reviews', JSON_OBJECT(
      'title', 'Değerlendirmeler',
      'description', 'Müşteri yorumları ve onaylama'
    ),
    'site_settings', JSON_OBJECT(
      'title', 'Site Ayarları',
      'description', 'Genel site konfigürasyonu'
    )
  ) AS CHAR CHARACTER SET utf8mb4),
  NOW(3),
  NOW(3)
),

-- =============================================================
-- LOCALIZED: Admin Page Meta (EN)
-- =============================================================
(
  UUID(),
  'ui_admin_pages',
  'en',
  CAST(JSON_OBJECT(
    'dashboard', JSON_OBJECT(
      'title', 'Dashboard Overview',
      'description', 'System overview and metrics',
      'metrics', JSON_ARRAY('products', 'gallery', 'services', 'offers', 'contacts', 'references', 'categories', 'custom_pages', 'reviews', 'newsletter', 'users', 'email_templates', 'site_settings', 'menu_items', 'sliders', 'footer_sections', 'storage')
    ),
    'users', JSON_OBJECT(
      'title', 'User Management',
      'description', 'Manage system users'
    ),
    'offers', JSON_OBJECT(
      'title', 'Offer Requests',
      'description', 'Incoming offer requests and management'
    ),
    'products', JSON_OBJECT(
      'title', 'Projects',
      'description', 'Vista Construction projects'
    ),
    'gallery', JSON_OBJECT(
      'title', 'Gallery',
      'description', 'Project images and gallery management'
    ),
    'categories', JSON_OBJECT(
      'title', 'Categories',
      'description', 'Project category management'
    ),
    'services', JSON_OBJECT(
      'title', 'Services',
      'description', 'Construction services'
    ),
    'reviews', JSON_OBJECT(
      'title', 'Reviews',
      'description', 'Customer reviews and moderation'
    ),
    'site_settings', JSON_OBJECT(
      'title', 'Site Settings',
      'description', 'General site configuration'
    )
  ) AS CHAR CHARACTER SET utf8mb4),
  NOW(3),
  NOW(3)
),

-- =============================================================
-- LOCALIZED: Admin Page Meta (DE)
-- =============================================================
(
  UUID(),
  'ui_admin_pages',
  'de',
  CAST(JSON_OBJECT(
    'dashboard', JSON_OBJECT(
      'title', 'Übersicht',
      'description', 'Systemübersicht und Metriken',
      'metrics', JSON_ARRAY('products', 'gallery', 'services', 'offers', 'contacts', 'references', 'categories', 'custom_pages', 'reviews', 'newsletter', 'users', 'email_templates', 'site_settings', 'menu_items', 'sliders', 'footer_sections', 'storage')
    ),
    'users', JSON_OBJECT(
      'title', 'Benutzerverwaltung',
      'description', 'Systembenutzer verwalten'
    ),
    'offers', JSON_OBJECT(
      'title', 'Angebotsanfragen',
      'description', 'Eingehende Angebotsanfragen und Verwaltung'
    ),
    'products', JSON_OBJECT(
      'title', 'Projekte',
      'description', 'Vista Bau Projekte'
    ),
    'gallery', JSON_OBJECT(
      'title', 'Galerie',
      'description', 'Projektbilder und Galerieverwaltung'
    ),
    'categories', JSON_OBJECT(
      'title', 'Kategorien',
      'description', 'Projektkategorieverwaltung'
    ),
    'services', JSON_OBJECT(
      'title', 'Dienstleistungen',
      'description', 'Baudienstleistungen'
    ),
    'reviews', JSON_OBJECT(
      'title', 'Bewertungen',
      'description', 'Kundenbewertungen und Moderation'
    ),
    'site_settings', JSON_OBJECT(
      'title', 'Seiteneinstellungen',
      'description', 'Allgemeine Seitenkonfiguration'
    )
  ) AS CHAR CHARACTER SET utf8mb4),
  NOW(3),
  NOW(3)
)

ON DUPLICATE KEY UPDATE
  `value`      = VALUES(`value`),
  `updated_at` = VALUES(`updated_at`);
