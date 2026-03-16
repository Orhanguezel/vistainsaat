// =============================================================
// FILE: src/modules/email-templates/mailer.ts
// =============================================================
import { renderEmailTemplateByKey } from "./service";
import { sendVistaMail } from "@/core/vista-mail";

export interface SendTemplatedEmailOptions {
  to: string;
  key: string;
  locale?: string | null;
  params?: Record<string, unknown>;
  allowMissing?: boolean;
}

export async function sendTemplatedEmail(opts: SendTemplatedEmailOptions) {
  const { key, to, locale, params = {}, allowMissing = false } = opts;

  const rendered = await renderEmailTemplateByKey(key, params, locale);

  if (!rendered) {
    throw new Error(`email_template_not_found:${key}`);
  }

  if (!allowMissing && rendered.missing_variables.length > 0) {
    throw new Error(
      `email_template_missing_params:${key}:${rendered.missing_variables.join(",")}`,
    );
  }

  await sendVistaMail({
    to,
    subject: rendered.subject,
    html: rendered.html,
  });

  return rendered;
}
