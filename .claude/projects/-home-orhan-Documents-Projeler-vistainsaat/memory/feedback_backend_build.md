---
name: backend_needs_build
description: Backend runs from dist/ - always run bun run build before PM2 restart on prod
type: feedback
---

Prod backend PM2'de `dist/index.js` çalıştırır, src/ değil. Her backend değişikliğinde prod deploy'da `bun run build` çalıştırılmalı.

**Why:** src/ güncellense bile dist/ eski kalır, PM2 restart eski kodu çalıştırır. Bu yüzden notifications/unread-count düzeltmesi prod'a yansımadı.

**How to apply:** Prod deploy sırası: `git pull` → `bun run build` (backend) → `pm2 restart`. Her zaman build adımını atlamadan yap.
