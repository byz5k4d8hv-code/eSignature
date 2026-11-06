import { NEXT_PUBLIC_WEBAPP_URL } from '@documenso/lib/constants/app';
import { i18n, type MessageDescriptor } from '@lingui/core';

export const appMetaTags = (title?: MessageDescriptor) => {
  const description =
    'CodSign: assinaturas eletrônicas simples, seguras e com prova completa (LGPD e GDPR). Electronic signatures with a full audit trail.';

  return [
    {
      title: title ? `${i18n._(title)} - CodSign` : 'CodSign',
    },
    {
      name: 'description',
      content: description,
    },
    {
      name: 'keywords',
      content: 'CodSign, assinatura eletrônica, electronic signature, LGPD, GDPR',
    },
    {
      name: 'author',
      content: 'CodSign',
    },
    {
      name: 'robots',
      content: 'index, follow',
    },
    {
      property: 'og:title',
      content: 'CodSign - Assinaturas Eletrônicas',
    },
    {
      property: 'og:description',
      content: description,
    },
    {
      property: 'og:image',
      content: `${NEXT_PUBLIC_WEBAPP_URL()}/opengraph-image.jpg`,
    },
    {
      property: 'og:type',
      content: 'website',
    },
    {
      name: 'twitter:card',
      content: 'summary_large_image',
    },
    {
      name: 'twitter:site',
      content: '@documenso',
    },
    {
      name: 'twitter:description',
      content: description,
    },
    {
      name: 'twitter:image',
      content: `${NEXT_PUBLIC_WEBAPP_URL()}/opengraph-image.jpg`,
    },
  ];
};
