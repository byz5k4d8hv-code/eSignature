import { isSignupEnabledForProvider } from '@documenso/lib/constants/auth';
import { sendAccessRequest } from '@documenso/lib/server-only/auth/send-access-request';
import { Button } from '@documenso/ui/primitives/button';
import { Input } from '@documenso/ui/primitives/input';
import { Label } from '@documenso/ui/primitives/label';
import { Textarea } from '@documenso/ui/primitives/textarea';
import { Form, Link, redirect, useActionData, useNavigation } from 'react-router';
import { z } from 'zod';

import type { Route } from './+types/request-access';

/**
 * CodSign invite-only access: people ask for an account here, admins get an
 * email, and no account is created until an admin creates it.
 */
export function meta() {
  return [{ title: 'Pedir acesso - CodSign' }];
}

const ZRequestAccessSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().toLowerCase().email().max(200),
  message: z.string().trim().max(1000).optional(),
});

export function loader() {
  if (isSignupEnabledForProvider('email')) {
    throw redirect('/signup');
  }

  return null;
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();

  // Honeypot: real people never fill this hidden field.
  if (formData.get('website')) {
    return { ok: true as const };
  }

  const parsed = ZRequestAccessSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message') || undefined,
  });

  if (!parsed.success) {
    return { ok: false as const, error: 'Preencha seu nome e um e-mail válido.' };
  }

  try {
    await sendAccessRequest(parsed.data);
  } catch (err) {
    console.error('[request-access]', err);
    return { ok: false as const, error: 'Não foi possível enviar agora. Tente novamente mais tarde.' };
  }

  return { ok: true as const };
}

export default function RequestAccess() {
  const result = useActionData<typeof action>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  return (
    <div className="w-screen max-w-lg px-4">
      <div className="z-10 rounded-xl border border-border bg-card px-6 py-8 shadow-lg">
        <h1 className="font-semibold text-2xl">Pedir acesso</h1>
        <p className="mt-2 text-muted-foreground text-sm">
          O CodSign funciona por convite. Envie seu pedido e avisaremos por e-mail quando sua conta for liberada.
        </p>

        {result?.ok ? (
          <div className="mt-6 rounded-lg border border-[#06D6A0]/30 bg-[#06D6A0]/10 p-4 text-sm">
            Pedido enviado. Você receberá um e-mail quando a conta for criada.
          </div>
        ) : (
          <Form method="post" className="mt-6 flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="name">Nome</Label>
              <Input id="name" name="name" required maxLength={100} autoComplete="name" />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="email">E-mail</Label>
              <Input id="email" name="email" type="email" required maxLength={200} autoComplete="email" />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="message">Mensagem (opcional)</Label>
              <Textarea id="message" name="message" maxLength={1000} rows={3} />
            </div>

            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              className="hidden"
              aria-hidden="true"
            />

            {result && !result.ok && <p className="text-destructive text-sm">{result.error}</p>}

            <Button type="submit" loading={isSubmitting}>
              Enviar pedido
            </Button>
          </Form>
        )}

        <p className="mt-6 text-center text-muted-foreground text-sm">
          Já tem conta?{' '}
          <Link to="/signin" className="text-primary duration-200 hover:opacity-70">
            Entrar
          </Link>
        </p>
      </div>
    </div>
  );
}
