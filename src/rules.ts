import type { Connector, Mandate } from "./types";

export function canLeaveDesign(c: Connector): boolean {
  if (c.color === "red") return false;
  if (c.status !== "design") return c.status !== "off";
  return c.licensedParty.trim().length > 0;
}

export function addConnectorAllowed(
  color: Connector["color"],
  kycTier: number,
  kycMin: number,
): { ok: boolean; reason: string } {
  if (color === "red") return { ok: false, reason: "red stays off" };
  if (kycTier < kycMin) return { ok: false, reason: "one missing KYC step" };
  return { ok: true, reason: "ok" };
}

export function spendAllowed(m: Mandate, amountCents: number, nowIso: string): boolean {
  if (m.status !== "live") return false;
  if (nowIso > m.validUntil || nowIso < m.validFrom) return false;
  return amountCents <= m.remainingCapCents;
}
