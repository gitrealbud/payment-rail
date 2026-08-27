export type HolderName = "KOHO" | "Peoples" | "EQ";

export type KycTier = "T0" | "T1" | "T2" | "T3" | "T4";

export type ConnectorColor = "green" | "yellow" | "red" | "experimental";

export type ConnectorStatus = "design" | "contracted" | "live" | "off";

export type Rail =
  | "interac"
  | "eft"
  | "pad"
  | "card"
  | "cash"
  | "prepaid_card"
  | "payout_card"
  | "processor"
  | "experimental";

export interface Holder {
  name: HolderName;
}

export interface Account {
  id: string;
  ownerId: string;
  name: string;
  category: string;
  ledgerCents: number;
  availableCents: number;
  pendingCents: number;
  kycTier: KycTier;
  holder: HolderName;
  status: "open" | "frozen" | "closed";
}

export interface Connector {
  id: string;
  name: string;
  rail: Rail;
  direction: "in" | "out" | "both";
  audience: "human" | "business" | "developer" | "agent";
  holdMode: "transit" | "stored" | "pending_risk";
  kycMin: KycTier;
  licensedParty: string;
  color: ConnectorColor;
  status: ConnectorStatus;
  experimental: boolean;
  feeCopy: string;
  etaCopy: string;
  cancelRightsCopy: string;
}

export interface Mandate {
  principalId: string;
  agentId: string;
  amountCapCents: number;
  remainingCapCents: number;
  allowlist: string[];
  validFrom: string;
  validUntil: string;
  status: "draft" | "live" | "frozen" | "revoked" | "spent";
  auditEvents: string[];
}

export interface Freeze {
  target: "payment" | "account" | "set";
  source: "sponsor" | "overlay";
  at: string;
  reason: string;
  appliedSameSecond: true;
}

export interface ReconLine {
  ourId: string;
  sponsorId: string;
  amountCents: number;
  state: "pending" | "posted" | "mismatch";
  fileDate: string;
}
