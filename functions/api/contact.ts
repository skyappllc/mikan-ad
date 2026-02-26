interface Env {
  RESEND_API_KEY: string;
  CONTACT_TO_EMAIL?: string;
  CONTACT_FROM_EMAIL?: string;
}

const VALID_INQUIRY_TYPES = new Set(['advertising', 'posting', 'system-dev', 'other']);

const INQUIRY_LABELS: Record<string, string> = {
  advertising: '広告プランニング・媒体手配',
  posting:     'ポスティングサービス',
  'system-dev': 'システム開発・Webアプリ',
  other:       'その他のご相談',
};

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json',
} as const;

function json(body: object, status = 200): Response {
  return new Response(JSON.stringify(body), { status, headers: CORS_HEADERS });
}

export async function onRequestPost(context: { request: Request; env: Env }): Promise<Response> {
  const { request, env } = context;

  // JSON パース
  let body: Record<string, string>;
  try {
    body = await request.json();
  } catch {
    return json({ success: false, error: '不正なリクエストです。' }, 400);
  }

  const { name, email, company, inquiry_type, message, _honey, _timestamp } = body;

  // ハニーポット判定（偽の成功を返してボットを混乱させる）
  if (_honey) {
    return json({ success: true, message: 'お問い合わせを受け付けました。' });
  }

  // タイムスタンプ判定（3秒未満の送信はボット扱い）
  const ts = parseInt(_timestamp ?? '0', 10);
  if (Number.isFinite(ts) && Date.now() - ts < 3000) {
    return json({ success: true, message: 'お問い合わせを受け付けました。' });
  }

  // バリデーション
  const errors: string[] = [];

  if (!name?.trim() || name.trim().length > 100) {
    errors.push('お名前は1〜100文字で入力してください。');
  }
  if (!email?.trim() || !EMAIL_RE.test(email.trim())) {
    errors.push('正しいメールアドレスを入力してください。');
  }
  if (company && company.trim().length > 100) {
    errors.push('会社名は100文字以内で入力してください。');
  }
  if (!inquiry_type || !VALID_INQUIRY_TYPES.has(inquiry_type)) {
    errors.push('お問い合わせ種別を選択してください。');
  }
  if (!message?.trim() || message.trim().length < 10 || message.trim().length > 2000) {
    errors.push('お問い合わせ内容は10〜2000文字で入力してください。');
  }

  if (errors.length > 0) {
    return json({ success: false, error: errors.join(' ') }, 422);
  }

  if (!env.RESEND_API_KEY) {
    return json({ success: false, error: 'サーバー設定エラーが発生しました。直接メールにてご連絡ください。' }, 500);
  }

  // メール送信
  const toEmail   = env.CONTACT_TO_EMAIL   ?? 'contact@skyapp.dev';
  const fromEmail = env.CONTACT_FROM_EMAIL ?? 'onboarding@resend.dev';
  const inquiryLabel = INQUIRY_LABELS[inquiry_type] ?? inquiry_type;

  const safeName    = escapeHtml(name.trim());
  const safeEmail   = escapeHtml(email.trim());
  const safeCompany = company?.trim() ? escapeHtml(company.trim()) : '（未入力）';
  const safeInquiry = escapeHtml(inquiryLabel);
  const safeMessage = escapeHtml(message.trim()).replace(/\n/g, '<br>');

  const htmlBody = `
<h2 style="font-family:sans-serif;color:#1A1A1A;">お問い合わせが届きました</h2>
<table border="1" cellpadding="8" cellspacing="0" style="border-collapse:collapse;width:100%;max-width:600px;font-family:sans-serif;">
  <tr>
    <th style="background:#f5f5f5;text-align:left;width:30%;white-space:nowrap;">お名前</th>
    <td>${safeName}</td>
  </tr>
  <tr>
    <th style="background:#f5f5f5;text-align:left;white-space:nowrap;">メールアドレス</th>
    <td><a href="mailto:${safeEmail}">${safeEmail}</a></td>
  </tr>
  <tr>
    <th style="background:#f5f5f5;text-align:left;white-space:nowrap;">会社名</th>
    <td>${safeCompany}</td>
  </tr>
  <tr>
    <th style="background:#f5f5f5;text-align:left;white-space:nowrap;">種別</th>
    <td>${safeInquiry}</td>
  </tr>
  <tr>
    <th style="background:#f5f5f5;text-align:left;white-space:nowrap;">内容</th>
    <td style="white-space:pre-wrap;">${safeMessage}</td>
  </tr>
</table>
<p style="color:#888;font-size:12px;margin-top:16px;font-family:sans-serif;">
  このメールは株式会社みかん コーポレートサイトから自動送信されています。
</p>
`.trim();

  const textBody = [
    'お問い合わせが届きました',
    '',
    `お名前: ${name.trim()}`,
    `メールアドレス: ${email.trim()}`,
    `会社名: ${company?.trim() || '（未入力）'}`,
    `種別: ${inquiryLabel}`,
    '',
    '内容:',
    message.trim(),
  ].join('\n');

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from:     fromEmail,
        to:       [toEmail],
        reply_to: email.trim(),
        subject:  `【お問い合わせ】${inquiryLabel} - ${name.trim()}様`,
        html:     htmlBody,
        text:     textBody,
      }),
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      console.error('Resend API error:', res.status, errData);
      return json({ success: false, error: 'メール送信に失敗しました。直接メールにてご連絡ください。' }, 500);
    }

    return json({
      success: true,
      message: 'お問い合わせを受け付けました。\n担当者より速やかにご連絡いたします。',
    });
  } catch (err) {
    console.error('Fetch error:', err);
    return json({ success: false, error: 'ネットワークエラーが発生しました。しばらく経ってから再度お試しください。' }, 500);
  }
}

export async function onRequestOptions(): Promise<Response> {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin':  '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
