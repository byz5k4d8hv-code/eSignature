import type { ExtendedDocumentStatus } from '@documenso/prisma/types/extended-document-status';
import { SignatureIcon } from '@documenso/ui/icons/signature';
import { cn } from '@documenso/ui/lib/utils';
import type { MessageDescriptor } from '@lingui/core';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { CheckCircle2, Clock, File, TimerOff, XCircle } from 'lucide-react';
import type { LucideIcon } from 'lucide-react/dist/lucide-react';
import type { HTMLAttributes } from 'react';

type FriendlyStatus = {
  label: MessageDescriptor;
  labelExtended: MessageDescriptor;
  icon?: LucideIcon;
  color: string;
};

export const FRIENDLY_STATUS_MAP: Record<ExtendedDocumentStatus, FriendlyStatus> = {
  PENDING: {
    label: msg`Pending`,
    labelExtended: msg`Document pending`,
    icon: Clock,
    color: 'text-blue-600 dark:text-blue-300',
  },
  COMPLETED: {
    label: msg`Completed`,
    labelExtended: msg`Document completed`,
    icon: CheckCircle2,
    color: 'text-[#059E79] dark:text-[#06D6A0]', // CodSign turquoise
  },
  DRAFT: {
    label: msg`Draft`,
    labelExtended: msg`Document draft`,
    icon: File,
    color: 'text-yellow-500 dark:text-yellow-200',
  },
  REJECTED: {
    label: msg`Rejected`,
    labelExtended: msg`Document rejected`,
    icon: XCircle,
    color: 'text-red-500 dark:text-red-300',
  },
  CANCELLED: {
    label: msg`Cancelled`,
    labelExtended: msg`Document cancelled`,
    icon: XCircle,
    color: 'text-red-500 dark:text-red-300',
  },
  EXPIRED: {
    label: msg`Expired`,
    labelExtended: msg`Document expired`,
    icon: TimerOff,
    color: 'text-orange-500 dark:text-orange-300',
  },
  INBOX: {
    label: msg`Inbox`,
    labelExtended: msg`Document inbox`,
    icon: SignatureIcon,
    color: 'text-muted-foreground',
  },
  ALL: {
    label: msg`All`,
    labelExtended: msg`Document All`,
    color: 'text-muted-foreground',
  },
};

export type DocumentStatusProps = HTMLAttributes<HTMLSpanElement> & {
  status: ExtendedDocumentStatus;
  inheritColor?: boolean;
  pill?: boolean;
};

// CodSign: pill look used in the documents table.
const STATUS_PILL: Record<string, string> = {
  COMPLETED:
    'border-[#06D6A0]/30 bg-[#06D6A0]/10 text-[#047857] dark:border-[#06D6A0]/25 dark:bg-[#06D6A0]/10 dark:text-[#34E3B5]',
  PENDING:
    'border-[#2563EB]/30 bg-[#2563EB]/10 text-[#1D4ED8] dark:border-[#3B82F6]/25 dark:bg-[#3B82F6]/10 dark:text-[#7DB4FF]',
  DRAFT: 'border-yellow-500/30 bg-yellow-500/10 text-yellow-700 dark:text-yellow-200',
  REJECTED: 'border-red-500/30 bg-red-500/10 text-red-600 dark:text-red-300',
};

export const DocumentStatus = ({ className, status, inheritColor, pill, ...props }: DocumentStatusProps) => {
  const { _ } = useLingui();

  const { label, icon: Icon, color } = FRIENDLY_STATUS_MAP[status];

  return (
    <span
      className={cn(
        'flex items-center',
        pill && 'w-fit rounded-full border px-3 py-1 font-medium text-sm',
        pill && (STATUS_PILL[status] ?? 'border-border bg-muted text-muted-foreground'),
        className,
      )}
      {...props}
    >
      {Icon && (
        <Icon
          className={cn('mr-2 inline-block h-4 w-4', {
            [color]: !inheritColor && !pill,
          })}
        />
      )}
      {_(label)}
    </span>
  );
};
