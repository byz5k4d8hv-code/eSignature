import { mailer } from '@documenso/email/mailer';
import { prisma } from '@documenso/prisma';
import { Role } from '@prisma/client';

import { NEXT_PUBLIC_WEBAPP_URL } from '../../constants/app';
import { DOCUMENSO_INTERNAL_EMAIL } from '../../constants/email';

export type SendAccessRequestOptions = {
  name: string;
  email: string;
  message?: string;
};

const escapeHtml = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/**
 * CodSign: signup is invite-only. Someone who wants an account fills in the
 * "request access" form; every admin gets an email. No account is created.
 */
export const sendAccessRequest = async ({ name, email, message }: SendAccessRequestOptions) => {
  const admins = await prisma.user.findMany({
    where: { roles: { has: Role.ADMIN }, disabled: false },
    select: { email: true },
  });

  if (admins.length === 0) {
    throw new Error('No admin user to notify');
  }

  const adminUrl = `${NEXT_PUBLIC_WEBAPP_URL()}/admin/users`;

  const text = [
    'Novo pedido de acesso ao CodSign',
    '',
    `Nome: ${name}`,
    `E-mail: ${email}`,
    `Mensagem: ${message || '-'}`,
    '',
    `Para liberar, crie a conta no painel Admin: ${adminUrl}`,
  ].join('\n');

  const html = `
    <div style="font-family: Inter, Arial, sans-serif; color: #0B3D5E; line-height: 1.5">
      <h2 style="margin: 0 0 12px">Novo pedido de acesso ao CodSign</h2>
      <p style="margin: 0"><strong>Nome:</strong> ${escapeHtml(name)}</p>
      <p style="margin: 0"><strong>E-mail:</strong> ${escapeHtml(email)}</p>
      <p style="margin: 0 0 16px"><strong>Mensagem:</strong> ${escapeHtml(message || '-')}</p>
      <p style="margin: 0">Nenhuma conta foi criada. Para liberar, crie a conta no
        <a href="${adminUrl}" style="color: #2563EB">painel Admin</a>.</p>
    </div>`;

  await mailer.sendMail({
    to: admins.map((admin) => admin.email),
    from: DOCUMENSO_INTERNAL_EMAIL,
    replyTo: email,
    subject: `CodSign: pedido de acesso de ${name}`,
    html,
    text,
  });
};
