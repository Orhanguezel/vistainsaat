'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

type Comment = {
  id: string;
  author_name: string;
  content: string;
  image_url?: string | null;
  created_at: string;
  likes_count: number;
};

type Props = {
  targetType: string;
  targetId: string;
  apiBaseUrl: string;
  locale: string;
};

export function ProjectComments({ targetType, targetId, apiBaseUrl, locale }: Props) {
  const isEn = locale.startsWith('en');
  const [comments, setComments] = useState<Comment[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  /* Load comments on first render */
  const loadComments = useCallback(async () => {
    if (loaded) return;
    setLoading(true);
    try {
      const res = await fetch(
        `${apiBaseUrl}/comments?target_type=${targetType}&target_id=${targetId}&limit=50`,
      );
      if (res.ok) {
        const data = await res.json();
        setComments(Array.isArray(data) ? data : data?.items ?? []);
      }
    } catch { /* silent */ }
    setLoaded(true);
    setLoading(false);
  }, [apiBaseUrl, targetType, targetId, loaded]);

  /* Auto-load on mount */
  useEffect(() => {
    if (!loaded && !loading) {
      loadComments();
    }
  }, [loaded, loading, loadComments]);

  /* Submit comment */
  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      const form = formRef.current;
      if (!form || submitting) return;

      const fd = new FormData(form);
      const authorName = (fd.get('author_name') as string)?.trim();
      const content = (fd.get('content') as string)?.trim();
      if (!content) return;

      setSubmitting(true);
      setSuccess(false);

      try {
        const body: Record<string, string> = {
          target_type: targetType,
          target_id: targetId,
          author_name: authorName || (isEn ? 'Guest' : 'Misafir'),
          content,
        };
        if (imagePreview) body.image_url = imagePreview;

        const res = await fetch(`${apiBaseUrl}/comments`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });

        if (res.ok) {
          setSuccess(true);
          form.reset();
          setImagePreview(null);
          // Reload comments
          setLoaded(false);
        }
      } catch { /* silent */ }
      setSubmitting(false);
    },
    [apiBaseUrl, targetType, targetId, isEn, submitting, imagePreview],
  );

  /* Image preview (base64 for display only — real upload would go through storage API) */
  const handleImageSelect = useCallback(() => {
    fileRef.current?.click();
  }, []);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setImagePreview(reader.result as string);
    reader.readAsDataURL(file);
  }, []);

  const removeImage = useCallback(() => {
    setImagePreview(null);
    if (fileRef.current) fileRef.current.value = '';
  }, []);

  const formatDate = (iso: string) => {
    try {
      return new Date(iso).toLocaleDateString(locale, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return iso;
    }
  };

  // Deterministic viewing count based on targetId to avoid hydration mismatch
  const viewingBase = useRef(
    targetId.split('').reduce((sum, ch) => sum + ch.charCodeAt(0), 0) % 13 + 3,
  );
  const viewingCount = Math.max(comments.length, viewingBase.current);

  return (
    <div style={{ marginTop: 48 }}>
      <style>{`
        .pc-header{display:flex;align-items:center;justify-content:space-between;border-bottom:2px solid var(--color-text-primary);padding-bottom:12px;margin-bottom:20px}
        .pc-title{font-family:var(--font-heading);font-size:22px;font-weight:700;color:var(--color-text-primary)}
        .pc-viewing{display:flex;align-items:center;gap:6px;font-size:13px;color:#4caf50;font-weight:500}
        .pc-guest{font-size:13px;color:var(--color-text-muted);margin-bottom:16px}
        .pc-guest b{color:var(--color-text-primary)}
        .pc-auth{font-size:13px;color:var(--color-text-muted)}
        .pc-auth a{color:var(--color-text-primary);text-decoration:none;font-weight:600}
        .pc-auth a:hover{text-decoration:underline}
        .pc-form{display:flex;gap:12px;align-items:flex-start;margin-bottom:24px}
        .pc-avatar{width:40px;height:40px;border-radius:50%;background:#e57373;display:flex;align-items:center;justify-content:center;flex-shrink:0;position:relative}
        .pc-avatar svg{color:#fff}
        .pc-avatar-dot{position:absolute;bottom:0;right:0;width:10px;height:10px;border-radius:50%;background:#4caf50;border:2px solid var(--color-bg)}
        .pc-input-wrap{flex:1;border:1px solid var(--color-border);border-radius:4px;overflow:hidden;transition:border-color .15s}
        .pc-input-wrap:focus-within{border-color:var(--color-brand)}
        .pc-input{width:100%;padding:12px 14px;border:none;background:var(--color-bg);color:var(--color-text-primary);font-size:14px;font-family:inherit;resize:none;min-height:44px;outline:none}
        .pc-input::placeholder{color:var(--color-text-muted)}
        .pc-input-bar{display:flex;align-items:center;justify-content:space-between;padding:6px 10px;border-top:1px solid var(--color-border)}
        .pc-input-actions{display:flex;gap:4px}
        .pc-input-btn{width:32px;height:32px;display:flex;align-items:center;justify-content:center;border:none;background:none;cursor:pointer;color:var(--color-text-muted);border-radius:4px;transition:all .15s}
        .pc-input-btn:hover{background:var(--color-bg-muted);color:var(--color-text-primary)}
        .pc-submit{padding:6px 16px;background:var(--color-brand);color:#fff;border:none;border-radius:2px;font-size:13px;font-weight:600;cursor:pointer;transition:opacity .15s}
        .pc-submit:hover{opacity:.9}
        .pc-submit:disabled{opacity:.5;cursor:not-allowed}
        .pc-name-input{width:100%;padding:8px 14px;border:none;border-bottom:1px solid var(--color-border);background:var(--color-bg);color:var(--color-text-primary);font-size:13px;font-family:inherit;outline:none}
        .pc-name-input::placeholder{color:var(--color-text-muted)}
        .pc-img-preview{position:relative;margin:8px 14px;display:inline-block}
        .pc-img-preview img{max-height:100px;border-radius:4px}
        .pc-img-remove{position:absolute;top:-6px;right:-6px;width:20px;height:20px;border-radius:50%;background:var(--color-text-primary);color:var(--color-bg);border:none;cursor:pointer;font-size:12px;display:flex;align-items:center;justify-content:center}
        .pc-empty{text-align:center;padding:40px 20px;color:var(--color-text-muted)}
        .pc-empty-icon{margin:0 auto 12px;width:48px;height:48px;border-radius:50%;background:var(--color-bg-muted);display:flex;align-items:center;justify-content:center}
        .pc-empty-title{font-size:14px;font-weight:600;color:var(--color-text-secondary);margin-bottom:4px}
        .pc-empty-sub{font-size:13px;color:var(--color-brand)}
        .pc-comment{display:flex;gap:12px;padding:16px 0;border-bottom:1px solid var(--color-border)}
        .pc-comment:last-child{border-bottom:none}
        .pc-c-avatar{width:36px;height:36px;border-radius:50%;background:var(--color-bg-muted);display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:14px;font-weight:700;color:var(--color-brand)}
        .pc-c-name{font-size:13px;font-weight:700;color:var(--color-text-primary)}
        .pc-c-date{font-size:12px;color:var(--color-text-muted);margin-left:8px}
        .pc-c-text{font-size:14px;line-height:1.6;color:var(--color-text-secondary);margin-top:4px}
        .pc-c-img{margin-top:8px;max-width:300px;border-radius:4px}
        .pc-success{padding:12px 16px;background:var(--color-bg-secondary);border:1px solid var(--color-border);border-radius:4px;font-size:13px;color:var(--color-text-secondary);margin-bottom:16px}
      `}</style>

      {/* Header */}
      <div className="pc-header">
        <span className="pc-title">{isEn ? 'Conversation' : 'Yorumlar'}</span>
        <span className="pc-viewing">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>
          {viewingCount} {isEn ? 'Viewing' : 'Görüntülüyor'}
        </span>
      </div>

      {/* Guest info */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <span className="pc-guest">
          {isEn ? 'Commenting as ' : 'Şu şekilde yorum yapılıyor: '}
          <b>{isEn ? 'Guest' : 'Misafir'}</b>
        </span>
        <span className="pc-auth">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ verticalAlign: '-2px', marginRight: 4 }}><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>
          <a href="#">{isEn ? 'Log in' : 'Giriş yap'}</a>
          {' | '}
          <a href="#">{isEn ? 'Sign up' : 'Kayıt ol'}</a>
        </span>
      </div>

      {/* Success message */}
      {success && (
        <div className="pc-success">
          {isEn
            ? 'Your comment has been submitted and is pending approval.'
            : 'Yorumunuz gönderildi ve onay bekliyor.'}
        </div>
      )}

      {/* Comment form */}
      <form ref={formRef} onSubmit={handleSubmit} className="pc-form">
        <div className="pc-avatar">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
          <span className="pc-avatar-dot" />
        </div>
        <div className="pc-input-wrap" style={{ flex: 1 }}>
          <input
            type="text"
            name="author_name"
            className="pc-name-input"
            placeholder={isEn ? 'Your name (optional)' : 'Adınız (isteğe bağlı)'}
            maxLength={255}
          />
          <textarea
            name="content"
            className="pc-input"
            placeholder={isEn ? 'Be the first to comment...' : 'İlk yorumu siz yazın...'}
            rows={2}
          />
          {/* Image preview */}
          {imagePreview && (
            <div className="pc-img-preview">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={imagePreview} alt="preview" />
              <button type="button" className="pc-img-remove" onClick={removeImage}>×</button>
            </div>
          )}
          <div className="pc-input-bar">
            <div className="pc-input-actions">
              {/* Emoji */}
              <button type="button" className="pc-input-btn" title={isEn ? 'Emoji' : 'Emoji'}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>
              </button>
              {/* Photo */}
              <button type="button" className="pc-input-btn" title={isEn ? 'Photo' : 'Fotoğraf'} onClick={handleImageSelect}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>
              </button>
              {/* GIF */}
              <button type="button" className="pc-input-btn" title="GIF">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="4" width="20" height="16" rx="2"/><text x="6" y="16" fontSize="9" fill="currentColor" stroke="none" fontWeight="700">GIF</text></svg>
              </button>
            </div>
            <button type="submit" className="pc-submit" disabled={submitting}>
              {submitting
                ? (isEn ? 'Sending...' : 'Gönderiliyor...')
                : (isEn ? 'Comment' : 'Yorum Yap')}
            </button>
          </div>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
        </div>
      </form>

      {/* Comments list */}
      {loading && (
        <div style={{ textAlign: 'center', padding: 20, color: 'var(--color-text-muted)', fontSize: 13 }}>
          {isEn ? 'Loading comments...' : 'Yorumlar yükleniyor...'}
        </div>
      )}

      {loaded && comments.length === 0 && !loading && (
        <div className="pc-empty">
          <div className="pc-empty-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: 'var(--color-text-muted)' }}>
              <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
            </svg>
          </div>
          <div className="pc-empty-title">
            {isEn
              ? 'No one seems to have shared their thoughts on this topic yet'
              : 'Henüz bu konu hakkında düşüncelerini paylaşan olmamış'}
          </div>
          <div className="pc-empty-sub">
            {isEn
              ? 'Leave a comment so your voice will be heard first.'
              : 'İlk yorumu siz yazın, sesiniz ilk duyulsun.'}
          </div>
        </div>
      )}

      {comments.length > 0 && (
        <div>
          {comments.map((c) => (
            <div key={c.id} className="pc-comment">
              <div className="pc-c-avatar">
                {c.author_name.charAt(0).toUpperCase()}
              </div>
              <div style={{ flex: 1 }}>
                <div>
                  <span className="pc-c-name">{c.author_name}</span>
                  <span className="pc-c-date">{formatDate(c.created_at)}</span>
                </div>
                <div className="pc-c-text">{c.content}</div>
                {c.image_url && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img className="pc-c-img" src={c.image_url} alt={`${c.author_name} image`} />
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
