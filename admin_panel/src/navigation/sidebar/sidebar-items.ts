// =============================================================
// FILE: src/navigation/sidebar/sidebar-items.ts
// FINAL — GuezelWebDesign — Sidebar items (labels are dynamic via site_settings.ui_admin)
// - Dashboard base: /admin/dashboard
// - Admin pages: /admin/...  (route group "(admin)" URL'e dahil olmaz)
// =============================================================

import {
  Award,
  BarChart,
  Bell,
  BookOpen,
  Bot,
  Briefcase,

  ClipboardList,
  Cog,
  DollarSign,
  Contact2,
  Database,
  FileSearch,
  FileText,
  FolderOpen,
  Folders,
  HardDrive,
  Headphones,
  HelpCircle,
  Images,
  Layers,
  LayoutDashboard,
  Mail,
  Menu,
  MessageCircle,
  MessageSquare,
  Newspaper,
  Package,
  Send,
  Settings,
  Users,
  Wrench,
  type LucideIcon,
} from 'lucide-react';
import type { TranslateFn } from '@/i18n';

export interface NavSubItem {
  title: string;
  url: string;
  icon?: LucideIcon;
  comingSoon?: boolean;
  newTab?: boolean;
  isNew?: boolean;
}

export interface NavMainItem {
  title: string;
  url: string;
  icon?: LucideIcon;
  subItems?: NavSubItem[];
  comingSoon?: boolean;
  newTab?: boolean;
  isNew?: boolean;
}

export interface NavGroup {
  id: number;
  label?: string;
  items: NavMainItem[];
}

export type AdminNavItemKey =
  | 'dashboard'
  | 'site_settings'
  | 'custom_pages'
  | 'categories'
  | 'subcategories'
  | 'products'
  | 'sparepart'
  | 'services'
  | 'sliders'
  | 'menu_items'
  | 'footer_sections'
  | 'faqs'
  | 'contacts'
  | 'reviews'
  | 'mail'
  | 'users'
  | 'email_templates'
  | 'notifications'
  | 'storage'
  | 'db'
  | 'audit'

  | 'reports'
  | 'offers'
  | 'catalog_requests'
  | 'support'
  | 'telegram'
  | 'chat'
  | 'references'

  | 'vista_projects'
  | 'vista_categories'
  | 'vista_gallery'
  | 'vista_offers'
  | 'vista_blog'
  | 'vista_blog_comments'
  | 'vista_corporate'
  | 'vista_legal'
  | 'vista_settings'
  | 'newsletter'
  | 'email_templates';

export type AdminNavGroupKey = 'general' | 'content' | 'vista_insaat' | 'vista_content' | 'marketing' | 'communication' | 'system';

export type AdminNavConfigItem = {
  key: AdminNavItemKey;
  url: string;
  icon?: LucideIcon;
};

export type AdminNavConfigGroup = {
  id: number;
  key: AdminNavGroupKey;
  items: AdminNavConfigItem[];
};

export const adminNavConfig: AdminNavConfigGroup[] = [
  {
    id: 1,
    key: 'general',
    items: [{ key: 'dashboard', url: '/admin/dashboard', icon: LayoutDashboard }],
  },
  {
    id: 2,
    key: 'vista_insaat',
    items: [
      { key: 'vista_projects', url: '/admin/products?type=vistainsaat', icon: Layers },
      { key: 'vista_categories', url: '/admin/categories?module=vistainsaat', icon: Folders },
      { key: 'vista_gallery', url: '/admin/gallery', icon: Images },
      { key: 'services', url: '/admin/services', icon: Briefcase },
      { key: 'references', url: '/admin/references', icon: Award },
      { key: 'vista_offers', url: '/admin/offer?module=vistainsaat', icon: DollarSign },
      { key: 'contacts', url: '/admin/contacts', icon: Contact2 },
    ],
  },
  {
    id: 4,
    key: 'vista_content',
    items: [
      { key: 'vista_blog', url: '/admin/custompage?module=vistainsaat_blog', icon: Newspaper },
      { key: 'vista_blog_comments', url: '/admin/comments', icon: MessageSquare },
      { key: 'vista_corporate', url: '/admin/custompage?module=vistainsaat_about', icon: FileText },
      { key: 'vista_legal', url: '/admin/custompage?module=vistainsaat_legal', icon: FileSearch },
    ],
  },
  {
    id: 3,
    key: 'system',
    items: [
      { key: 'users', url: '/admin/users', icon: Users },
      { key: 'email_templates', url: '/admin/email-templates', icon: Mail },
      { key: 'notifications', url: '/admin/notifications', icon: Bell },
      { key: 'storage', url: '/admin/storage', icon: HardDrive },
      { key: 'audit', url: '/admin/audit', icon: FileSearch },
      { key: 'vista_settings', url: '/admin/site-settings', icon: Settings },
    ],
  },
  {
    id: 5,
    key: 'marketing',
    items: [
      { key: 'newsletter', url: '/admin/newsletter', icon: Mail },
    ],
  },
];

export type AdminNavCopy = {
  labels: Record<AdminNavGroupKey, string>;
  items: Record<AdminNavItemKey, string>;
};

// Fallback titles for when translations are missing
const FALLBACK_TITLES: Record<AdminNavItemKey, string> = {
  dashboard: 'Dashboard',
  site_settings: 'Site Settings',
  custom_pages: 'Custom Pages',
  categories: 'Categories',
  subcategories: 'Subcategories',
  products: 'Products',
  sparepart: 'Spare Parts',
  services: 'Services',
  sliders: 'Sliders',
  menu_items: 'Menu Items',
  footer_sections: 'Footer Sections',
  faqs: 'FAQs',
  offers: 'Offers',
  catalog_requests: 'Catalog Requests',
  contacts: 'Contacts',
  reviews: 'Reviews',
  mail: 'Mail',
  users: 'Users',
  email_templates: 'E-posta Şablonları',
  notifications: 'Notifications',
  support: 'Support Tickets',
  storage: 'Storage',
  db: 'Database',
  audit: 'Audit',

  reports: 'Reports',
  telegram: 'Telegram',
  chat: 'Chat & AI',
  references: 'References',

  vista_projects: 'Projeler',
  vista_categories: 'Kategoriler',
  vista_gallery: 'Galeri',
  vista_offers: 'Teklifler',
  vista_blog: 'Haberler',
  vista_blog_comments: 'Haber Yorumları',
  vista_corporate: 'Kurumsal Sayfalar',
  vista_legal: 'Yasal Sayfalar',
  vista_settings: 'Site Ayarları',
  newsletter: 'Bülten Aboneleri',
};

export function buildAdminSidebarItems(
  copy?: Partial<AdminNavCopy> | null,
  t?: TranslateFn,
): NavGroup[] {
  const labels = copy?.labels ?? ({} as AdminNavCopy['labels']);
  const items = copy?.items ?? ({} as AdminNavCopy['items']);

  return adminNavConfig.map((group) => {
    // 1. Try copy.labels[group.key]
    // 2. Try t(`admin.sidebar.groups.${group.key}`)
    // 3. Fallback to empty (or key)
    const label =
      labels[group.key] || (t ? t(`admin.sidebar.groups.${group.key}` as any) : '') || '';

    return {
      id: group.id,
      label,
      items: group.items.map((item) => {
        // 1. Try copy.items[item.key]
        // 2. Try t(`admin.dashboard.items.${item.key}`)
        // 3. Fallback to FALLBACK_TITLES
        // 4. Fallback to key
        const title =
          items[item.key] ||
          (t ? t(`admin.dashboard.items.${item.key}` as any) : '') ||
          FALLBACK_TITLES[item.key] ||
          item.key;

        return {
          title,
          url: item.url,
          icon: item.icon,
        };
      }),
    };
  });
}
