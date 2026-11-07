import { SUPPORT_EMAIL } from '@documenso/lib/constants/app';
import { Button } from '@documenso/ui/primitives/button';
import { Trans } from '@lingui/react/macro';
import { Link } from 'react-router';

/**
 * Privacy notice for signers (LGPD art. 9 / GDPR art. 13).
 * Written in Portuguese and English on purpose: the first users are in Brazil and the UK.
 * Retention period and controller details must be reviewed before any commercial use.
 */
export default function PrivacyNotice() {
  return (
    <div>
      <article className="prose dark:prose-invert">
        <h1>Aviso de privacidade / Privacy notice</h1>

        <h2>Português</h2>
        <h3>Quais dados coletamos</h3>
        <p>
          Para comprovar a sua assinatura eletrônica, registramos: nome, e-mail, endereço IP, navegador e dispositivo,
          data e hora de cada ação (envio, abertura, assinatura ou recusa) e a imagem ou texto da sua assinatura.
        </p>
        <h3>Para que usamos</h3>
        <p>
          Somente para executar a assinatura do documento e servir de prova da sua autenticidade e integridade. Base
          legal: execução de contrato e exercício regular de direitos (LGPD, art. 7º, V e VI).
        </p>
        <h3>Por quanto tempo guardamos</h3>
        <p>
          O documento assinado e a trilha de auditoria são guardados por 5 anos após a conclusão, para fins de prova. A
          trilha de auditoria não pode ser alterada. Depois desse prazo, os dados são excluídos.
        </p>
        <h3>Com quem compartilhamos</h3>
        <p>
          Com as outras partes do mesmo documento e com fornecedores necessários para o serviço (hospedagem, envio de
          e-mail e carimbo de tempo). Não vendemos dados. Os dados ficam em servidores na Alemanha (União Europeia)
          (transferência internacional, LGPD art. 33), com acesso restrito e conexões criptografadas.
        </p>
        <h3>Seus direitos</h3>
        <p>
          Você pode pedir acesso, correção ou uma cópia dos seus dados, ou tirar dúvidas, pelo e-mail{' '}
          <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>. Dados que servem de prova de um documento assinado
          podem ser mantidos até o fim do prazo acima.
        </p>

        <h2>English</h2>
        <h3>What we collect</h3>
        <p>
          To prove your electronic signature we record: name, email, IP address, browser and device, date and time of
          each action (sent, opened, signed or rejected) and your signature image or text.
        </p>
        <h3>Why</h3>
        <p>
          Only to carry out the signing and to prove its authenticity and integrity. Legal basis: performance of a
          contract and legal claims (UK/EU GDPR art. 6(1)(b) and (f)).
        </p>
        <h3>How long</h3>
        <p>
          The signed document and its audit trail are kept for 5 years after completion as evidence. The audit trail
          cannot be changed. After that period the data is deleted.
        </p>
        <h3>Who we share with</h3>
        <p>
          The other parties to the same document and the providers needed to run the service (hosting, email delivery
          and timestamping). We do not sell data. Data is stored on servers in Germany (European Union) (international
          transfer), with restricted access and encrypted connections.
        </p>
        <h3>Your rights</h3>
        <p>
          You can ask for access, correction or a copy of your data, or ask questions, at{' '}
          <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>. Data that is evidence of a signed document may be
          kept until the end of the period above.
        </p>
      </article>

      <div className="mt-8">
        <Button asChild>
          <Link to="/">
            <Trans>Back home</Trans>
          </Link>
        </Button>
      </div>
    </div>
  );
}
