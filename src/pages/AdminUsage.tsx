import { Fragment, useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useAiQuota } from '@/hooks/useAiQuota';
import { Navbar } from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from 'sonner';
import { ArrowLeft, ChevronDown, ChevronRight, Loader2, Plus, RefreshCw, Search, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  adminListLogs,
  adminListUsage,
  adminSetQuota,
  type AdminLogEntry,
  type AdminUsageResponse,
  type AdminUsageRow,
} from '@/services/adminAi';

const errMsg = (e: unknown) => (e instanceof Error ? e.message : '');
const usd = (n: number) => `$${n.toFixed(n >= 1 ? 2 : 4)}`;
const fmtDate = (iso: string | null) =>
  iso ? new Date(iso).toLocaleString('hu-HU', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : '–';

/** Az elmúlt 12 hónap kulcsa (YYYY-MM), legújabb elöl – magyar idő szerint. */
const recentMonths = (): string[] => {
  const fmt = new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Budapest', year: 'numeric', month: '2-digit' });
  const [y, m] = fmt.format(new Date()).split('-').map(Number);
  return Array.from({ length: 12 }, (_, i) => {
    const d = new Date(Date.UTC(y, m - 1 - i, 1));
    return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}`;
  });
};

const monthLabel = (key: string) => {
  const [y, m] = key.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, 1)).toLocaleDateString('hu-HU', { year: 'numeric', month: 'long', timeZone: 'UTC' });
};

const AdminUsage = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { quota: myQuota, loading: quotaLoading } = useAiQuota(!!user);

  const months = useMemo(recentMonths, []);
  const currentMonth = months[0];
  const [month, setMonth] = useState(currentMonth);
  const [data, setData] = useState<AdminUsageResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');

  const [expanded, setExpanded] = useState<string | null>(null);
  const [logs, setLogs] = useState<Record<string, AdminLogEntry[] | 'loading'>>({});

  const [editRow, setEditRow] = useState<AdminUsageRow | null>(null);
  const [bonusInput, setBonusInput] = useState('');
  const [limitInput, setLimitInput] = useState('');
  const [noteInput, setNoteInput] = useState('');
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      setData(await adminListUsage(month));
      setLogs({});
      setExpanded(null);
    } catch (e) {
      toast.error(errMsg(e) || 'Nem sikerült betölteni a használati adatokat');
    } finally {
      setLoading(false);
    }
  }, [month]);

  const isAdmin = !!myQuota?.isAdmin;

  useEffect(() => {
    if (isAdmin) load();
  }, [isAdmin, load]);

  // Nem admin → vissza a vezérlőpultra (az adatok amúgy is csak adminnak jönnek a szerverről)
  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      navigate('/auth');
      return;
    }
    if (myQuota && !myQuota.isAdmin) navigate('/dashboard');
  }, [authLoading, user, myQuota, navigate]);

  const toggleLogs = async (uid: string) => {
    if (expanded === uid) {
      setExpanded(null);
      return;
    }
    setExpanded(uid);
    if (logs[uid]) return;
    setLogs((p) => ({ ...p, [uid]: 'loading' }));
    try {
      const entries = await adminListLogs(uid, month);
      setLogs((p) => ({ ...p, [uid]: entries }));
    } catch (e) {
      toast.error(errMsg(e) || 'Nem sikerült betölteni a naplót');
      setLogs((p) => {
        const n = { ...p };
        delete n[uid];
        return n;
      });
    }
  };

  const openEdit = (row: AdminUsageRow) => {
    setEditRow(row);
    setBonusInput(String(row.bonus || ''));
    setLimitInput(String(row.monthlyLimit));
    setNoteInput(row.note || '');
  };

  const saveQuota = async () => {
    if (!editRow) return;
    const bonus = bonusInput.trim() === '' ? 0 : Number(bonusInput);
    const limit = Number(limitInput);
    if (!Number.isInteger(bonus) || bonus < 0 || !Number.isInteger(limit) || limit < 0) {
      toast.error('Csak nemnegatív egész számot adj meg!');
      return;
    }
    setSaving(true);
    try {
      await adminSetQuota({
        uid: editRow.uid,
        // A pluszkeret mindig az aktuális hónapé – korábbi hónap nézetéből nem írjuk felül.
        bonusThisMonth: month === currentMonth ? bonus : undefined,
        monthlyLimit: limit,
        note: noteInput,
      });
      toast.success('Keret frissítve');
      setEditRow(null);
      await load();
    } catch (e) {
      toast.error(errMsg(e) || 'Nem sikerült menteni');
    } finally {
      setSaving(false);
    }
  };

  const rows = useMemo(() => {
    const q = search.trim().toLowerCase();
    const all = data?.rows || [];
    if (!q) return all;
    return all.filter((r) => (r.email || '').toLowerCase().includes(q) || (r.displayName || '').toLowerCase().includes(q));
  }, [data, search]);

  if (authLoading || quotaLoading || !myQuota || !isAdmin) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center py-20">
          <p className="text-muted-foreground">Betöltés...</p>
        </div>
      </div>
    );
  }

  const isCurrentMonth = month === currentMonth;
  const previewLimit = editRow
    ? (Number(limitInput) || 0) + (Number(bonusInput) || 0)
    : 0;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => navigate('/dashboard')}>
              <ArrowLeft className="mr-1 h-4 w-4" />
              Vissza
            </Button>
            <h1 className="font-display text-2xl font-extrabold tracking-tight flex items-center gap-2">
              <Shield className="h-6 w-6 text-amber-500" />
              AI használat
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <select
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="h-9 rounded-md border border-input bg-background px-3 text-sm"
              aria-label="Hónap"
            >
              {months.map((m) => (
                <option key={m} value={m}>
                  {monthLabel(m)}
                </option>
              ))}
            </select>
            <Button size="sm" variant="outline" onClick={load} disabled={loading}>
              <RefreshCw className={cn('h-4 w-4', loading && 'animate-spin')} />
            </Button>
          </div>
        </div>

        {/* Összesítő */}
        <div className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-4">
          {[
            { label: 'Generálások', value: data ? String(data.totals.calls) : '–' },
            { label: 'Becsült költség', value: data ? usd(data.totals.costUsd) : '–' },
            { label: 'Aktív tanárok', value: data ? `${data.totals.activeTeachers} / ${data.rows.length}` : '–' },
            { label: 'Tokenek', value: data ? data.totals.tokens.toLocaleString('hu-HU') : '–' },
          ].map((s) => (
            <Card key={s.label}>
              <CardContent className="p-4">
                <p className="text-xs text-muted-foreground">{s.label}</p>
                <p className="mt-1 text-2xl font-bold tabular-nums">{s.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-3 space-y-0">
            <CardTitle className="text-base">
              Tanárok – {monthLabel(month)}
              {data && <span className="ml-2 text-xs font-normal text-muted-foreground">alap keret: {data.defaultLimit}/hó</span>}
            </CardTitle>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Keresés név vagy e-mail…" value={search} onChange={(e) => setSearch(e.target.value)} className="pl-8 h-9" />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {loading && !data ? (
              <div className="flex justify-center py-12">
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-8" />
                      <TableHead>Tanár</TableHead>
                      <TableHead className="min-w-[160px]">Felhasznált / keret</TableHead>
                      <TableHead className="text-right">Költség</TableHead>
                      <TableHead>Utolsó használat</TableHead>
                      <TableHead className="text-right" />
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {rows.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={6} className="py-8 text-center text-muted-foreground">
                          Nincs találat
                        </TableCell>
                      </TableRow>
                    )}
                    {rows.map((r) => {
                      const pct = r.limit > 0 ? Math.min(100, Math.round((r.used / r.limit) * 100)) : 100;
                      const exhausted = r.used >= r.limit;
                      const rowLogs = logs[r.uid];
                      return (
                        <Fragment key={r.uid}>
                          <TableRow className="cursor-pointer" onClick={() => toggleLogs(r.uid)}>
                            <TableCell>
                              {expanded === r.uid ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                            </TableCell>
                            <TableCell>
                              <div className="font-medium">{r.displayName || r.email?.split('@')[0] || 'Névtelen'}</div>
                              <div className="text-xs text-muted-foreground">{r.email}</div>
                              {r.note && <div className="mt-0.5 text-xs italic text-muted-foreground">{r.note}</div>}
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center justify-between text-xs tabular-nums">
                                <span className={cn(exhausted && 'font-semibold text-destructive')}>
                                  {r.used} / {r.limit}
                                </span>
                                <span className="flex gap-1">
                                  {r.bonus > 0 && <Badge variant="secondary" className="h-4 px-1 text-[10px]">+{r.bonus}</Badge>}
                                  {r.failed > 0 && <Badge variant="outline" className="h-4 px-1 text-[10px]">{r.failed} hiba</Badge>}
                                </span>
                              </div>
                              <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                                <div
                                  className={cn('h-full rounded-full', exhausted ? 'bg-destructive' : pct >= 80 ? 'bg-amber-500' : 'bg-primary')}
                                  style={{ width: `${pct}%` }}
                                />
                              </div>
                            </TableCell>
                            <TableCell className="text-right tabular-nums">{usd(r.costUsd)}</TableCell>
                            <TableCell className="text-xs text-muted-foreground whitespace-nowrap">{fmtDate(r.lastUsedAt)}</TableCell>
                            <TableCell className="text-right">
                              <Button
                                size="sm"
                                variant={exhausted ? 'default' : 'outline'}
                                className="h-8"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  openEdit(r);
                                }}
                              >
                                <Plus className="mr-1 h-3.5 w-3.5" />
                                Keret
                              </Button>
                            </TableCell>
                          </TableRow>
                          {expanded === r.uid && (
                            <TableRow className="bg-muted/20 hover:bg-muted/20">
                              <TableCell />
                              <TableCell colSpan={5} className="py-3">
                                {rowLogs === 'loading' || !rowLogs ? (
                                  <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                                ) : rowLogs.length === 0 ? (
                                  <p className="text-xs text-muted-foreground">Ebben a hónapban nem generált.</p>
                                ) : (
                                  <div className="space-y-1">
                                    {rowLogs.map((l) => (
                                      <div key={l.id} className="flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs">
                                        <span className="w-24 shrink-0 text-muted-foreground">{fmtDate(l.createdAt)}</span>
                                        <span className={cn('min-w-0 flex-1 truncate', !l.success && 'text-destructive')}>
                                          {l.subject ? `${l.subject} · ` : ''}
                                          {l.topic || '–'}
                                          {!l.success && l.error ? ` — ${l.error}` : ''}
                                        </span>
                                        <span className="tabular-nums text-muted-foreground">{l.numQuestions} kérdés</span>
                                        <span className="w-16 text-right tabular-nums">{usd(l.costUsd)}</span>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </TableCell>
                            </TableRow>
                          )}
                        </Fragment>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>

        <p className="mt-3 text-xs text-muted-foreground">
          A költség becsült érték a tokenszám alapján (gpt-5.5 listaár). A pontos összeget az OpenAI számlázási felülete mutatja.
        </p>
      </div>

      <Dialog open={!!editRow} onOpenChange={(o) => !o && setEditRow(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Keret módosítása</DialogTitle>
            <DialogDescription>
              {editRow?.displayName || editRow?.email} – ebben a hónapban {editRow?.used} generálást használt.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {isCurrentMonth ? (
            <div className="space-y-2">
              <Label htmlFor="bonus">Pluszkeret erre a hónapra ({monthLabel(currentMonth)})</Label>
              <Input id="bonus" type="number" min={0} value={bonusInput} onChange={(e) => setBonusInput(e.target.value)} placeholder="0" />
              <div className="flex gap-2">
                {[10, 25, 50].map((n) => (
                  <Button
                    key={n}
                    type="button"
                    size="sm"
                    variant="outline"
                    className="h-7"
                    onClick={() => setBonusInput(String((Number(bonusInput) || 0) + n))}
                  >
                    +{n}
                  </Button>
                ))}
              </div>
              <p className="text-xs text-muted-foreground">A következő hónapban magától megszűnik.</p>
            </div>
            ) : (
              <p className="text-xs text-amber-500">
                Korábbi hónapot nézel: pluszkeretet csak az aktuális hónapra adhatsz. A tartós keret itt is módosítható.
              </p>
            )}

            <div className="space-y-2">
              <Label htmlFor="limit">Tartós havi keret</Label>
              <Input id="limit" type="number" min={0} value={limitInput} onChange={(e) => setLimitInput(e.target.value)} />
              <p className="text-xs text-muted-foreground">Alapértelmezés: {data?.defaultLimit ?? 100}. 0 = letiltva.</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="note">Megjegyzés (csak neked látszik)</Label>
              <Input id="note" value={noteInput} onChange={(e) => setNoteInput(e.target.value)} maxLength={300} placeholder="pl. projekthét miatt kért többet" />
            </div>

            {isCurrentMonth && (
              <div className="rounded-md bg-muted/40 px-3 py-2 text-sm">
                Új keret ebben a hónapban: <strong>{previewLimit}</strong>
                {editRow && <span className="text-muted-foreground"> (felhasznált: {editRow.used})</span>}
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setEditRow(null)}>
              Mégse
            </Button>
            <Button onClick={saveQuota} disabled={saving}>
              {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Mentés
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminUsage;
