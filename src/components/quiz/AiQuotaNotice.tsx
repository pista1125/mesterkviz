import { cn } from '@/lib/utils';
import type { QuotaInfo } from '@/services/ai';

/** „Ebben a hónapban: 27 / 100 AI generálás” sáv, elfogyott keretnél figyelmeztetéssel. */
export const AiQuotaNotice = ({ quota, className }: { quota: QuotaInfo | null; className?: string }) => {
  if (!quota) return null;
  const exhausted = quota.remaining <= 0;
  const pct = quota.limit > 0 ? Math.min(100, Math.round((quota.used / quota.limit) * 100)) : 100;

  return (
    <div
      className={cn(
        'rounded-lg border px-3 py-2 text-xs',
        exhausted ? 'border-destructive/40 bg-destructive/10 text-destructive' : 'border-border bg-muted/30 text-muted-foreground',
        className
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <span>
          Ebben a hónapban: <strong className="text-foreground">{quota.used}</strong> / {quota.limit} AI generálás
        </span>
        {!exhausted && <span>{quota.remaining} maradt</span>}
      </div>
      <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-muted">
        <div
          className={cn('h-full rounded-full', exhausted ? 'bg-destructive' : pct >= 80 ? 'bg-amber-500' : 'bg-primary')}
          style={{ width: `${pct}%` }}
        />
      </div>
      {exhausted && (
        <p className="mt-1.5">
          Elfogyott a havi keret. Kérj bővítést az adminisztrátortól, vagy várd meg a következő hónapot.
        </p>
      )}
    </div>
  );
};
