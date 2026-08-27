import type { Account, Freeze } from "./types";

export function availableOf(a: Account): number {
  return a.ledgerCents - a.pendingCents;
}

export function applyFreeze(a: Account, _f: Freeze): Account {
  return { ...a, status: "frozen", availableCents: 0 };
}

export function bookPending(a: Account, cents: number): Account {
  return {
    ...a,
    pendingCents: a.pendingCents + cents,
    availableCents: a.ledgerCents - (a.pendingCents + cents),
  };
}
