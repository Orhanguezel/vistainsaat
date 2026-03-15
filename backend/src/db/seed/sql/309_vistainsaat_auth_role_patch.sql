-- role column zaten 001_auth_schema.sql'de oluşturuluyor.
-- Sadece user_roles tablosundan senkron yapıyoruz.
SET @col_exists = (
  SELECT COUNT(*) FROM information_schema.columns
  WHERE table_schema = DATABASE() AND table_name = 'users' AND column_name = 'role'
);
SET @sql = IF(@col_exists = 0,
  "ALTER TABLE users ADD COLUMN role ENUM('admin','moderator','user') NOT NULL DEFAULT 'user' AFTER phone",
  'SELECT 1'
);
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

UPDATE users u
LEFT JOIN (
  SELECT
    ur.user_id,
    CASE
      WHEN MAX(CASE WHEN ur.role = 'admin' THEN 1 ELSE 0 END) = 1 THEN 'admin'
      WHEN MAX(CASE WHEN ur.role = 'moderator' THEN 1 ELSE 0 END) = 1 THEN 'moderator'
      ELSE 'user'
    END AS primary_role
  FROM user_roles ur
  GROUP BY ur.user_id
) r ON r.user_id = u.id
SET u.role = COALESCE(r.primary_role, 'user');
