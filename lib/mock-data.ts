import type {
  Application,
  AuditLog,
  Complaint,
  Introduction,
  Member,
  Payment,
  VerificationEvent
} from "@/lib/types";

export const applications: Application[] = [
  {
    id: "app_001",
    fullName: "Sample Applicant",
    email: "sample@example.com",
    country: "United Kingdom",
    status: "Under Review",
    consentStatus: "Service contact consent recorded",
    riskLevel: "Low",
    createdAt: "2026-05-28"
  }
];

export const members: Member[] = [
  {
    id: "mem_001",
    displayName: "Sample Member A",
    country: "United Kingdom",
    verificationStatus: "Mock verified",
    visibilityStatus: "Private",
    riskLevel: "Low"
  },
  {
    id: "mem_002",
    displayName: "Sample Member B",
    country: "Spain",
    verificationStatus: "Mock verified",
    visibilityStatus: "Private",
    riskLevel: "Low"
  }
];

export const introductions: Introduction[] = [
  {
    id: "intro_001",
    memberAId: "mem_001",
    memberBId: "mem_002",
    matchmaker: "Matchmaker (mock)",
    status: "Both Accepted",
    mutualConsent: true,
    createdAt: "2026-05-29"
  }
];

export const verificationEvents: VerificationEvent[] = [
  {
    id: "ver_001",
    memberId: "mem_001",
    verificationType: "Manual review placeholder",
    reviewer: "Compliance owner",
    result: "Mock approved",
    documentDeletedAt: "2026-05-28T10:00:00Z",
    deletionProofReference: "mock-log-001",
    notes: "No real documents are stored in this MVP."
  }
];

export const payments: Payment[] = [
  {
    id: "pay_001",
    memberId: "mem_001",
    amount: 299,
    currency: "GBP",
    feeType: "Matchmaking Membership",
    status: "Mock pending"
  }
];

export const complaints: Complaint[] = [
  {
    id: "cmp_001",
    complainantId: "mem_001",
    issueType: "Mock conduct review",
    severity: "Medium",
    actionTaken: "Document and escalate",
    status: "Open"
  }
];

export const auditLogs: AuditLog[] = [
  {
    id: "aud_001",
    actor: "system",
    action: "Created preview mock record",
    target: "admin-dashboard",
    timestamp: "2026-05-28T10:00:00Z"
  }
];
