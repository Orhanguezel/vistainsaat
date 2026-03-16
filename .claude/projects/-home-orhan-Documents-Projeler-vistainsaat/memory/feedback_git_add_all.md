---
name: git_add_all_always
description: User wants git add . always - never partial staging
type: feedback
---

Her zaman `git add .` kullan, asla dosya seçerek ekleme yapma.

**Why:** Kullanıcı kısmi commit'lerden nefret ediyor. Dosya seçerek stage etmek prod'a eksik gönderime neden oluyor, bu da login/register gibi kritik özelliklerin çalışmamasına yol açıyor.

**How to apply:** Commit yaparken her zaman `git add .` kullan. `.env` gibi hassas dosyalar zaten `.gitignore`'da olmalı.
