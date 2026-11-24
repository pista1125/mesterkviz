import { httpsCallable } from 'firebase/functions';
import { functions } from '@/integrations/firebase/config';

export interface AdminUsageRow {
  uid: string;
  email: string | null;
  displayName: string | null;
  createdAt: string | null;
  used: number;
  failed: number;
  limit: number;
  monthlyLimit: number;
  bonus: number;
  note: string;
  promptTokens: number;
  completionTokens: number;
  costUsd: number;
  lastUsedAt: string | null;
}

export interface AdminUsageResponse {
  month: string;
  defaultLimit: number;
  rows: AdminUsageRow[];
  totals: { calls: number; costUsd: number; tokens: number; activeTeachers: number };
}

export interface AdminLogEntry {
  id: string;
  success: boolean;
  subject: string | null;
  topic: string;
  numQuestions: number;
  promptTokens: number;
  completionTokens: number;
  costUsd: number;
  error: string | null;
  createdAt: string | null;
}

export const adminListUsage = async (month?: string): Promise<AdminUsageResponse> => {
  const fn = httpsCallable<{ month?: string }, AdminUsageResponse>(functions, 'adminListUsage');
  return (await fn({ month })).data;
};

export const adminSetQuota = async (params: {
  uid: string;
  bonusThisMonth?: number;
  monthlyLimit?: number;
  note?: string;
}): Promise<void> => {
  const fn = httpsCallable(functions, 'adminSetQuota');
  await fn(params);
};

export const adminListLogs = async (uid: string, month?: string): Promise<AdminLogEntry[]> => {
  const fn = httpsCallable<{ uid: string; month?: string }, { logs: AdminLogEntry[] }>(functions, 'adminListLogs');
  return (await fn({ uid, month })).data.logs;
};
