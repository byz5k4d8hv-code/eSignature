import { cn } from '@documenso/ui/lib/utils';
import type { LucideIcon } from 'lucide-react/dist/lucide-react';
import { Link } from 'react-router';

export type CardMetricProps = {
  icon?: LucideIcon;
  title: string;
  value?: string | number;
  className?: string;
  children?: React.ReactNode;
  testId?: string;
  /** CodSign: when set, the whole card links to this page. */
  href?: string;
};

export const CardMetric = ({ icon: Icon, title, value, className, children, testId, href }: CardMetricProps) => {
  const card = (
    <div
      className={cn(
        'h-32 max-h-32 max-w-full overflow-hidden rounded-lg border border-border bg-background shadow shadow-transparent duration-200 hover:shadow-border/80',
        className,
      )}
    >
      <div className="flex h-full max-h-full flex-col px-4 pt-4 pb-6 sm:px-4 sm:pt-4 sm:pb-8">
        <div className="flex items-start">
          {Icon && (
            <div className="mr-2 h-4 w-4">
              <Icon className="h-4 w-4 text-muted-foreground" />
            </div>
          )}

          <h3 className="mb-2 flex items-end font-medium text-sm leading-tight">{title}</h3>
        </div>

        {children || (
          <p className="mt-auto font-semibold text-4xl text-foreground leading-8" data-testid={testId}>
            {typeof value === 'number' ? value.toLocaleString('en-US') : value}
          </p>
        )}
      </div>
    </div>
  );

  if (!href) {
    return card;
  }

  return (
    <Link
      to={href}
      className="block rounded-lg transition-colors hover:[&>div]:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      {card}
    </Link>
  );
};
