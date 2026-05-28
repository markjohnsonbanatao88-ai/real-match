import { AdminLayout } from "@/components/admin/AdminLayout";
import { applications, auditLogs, complaints, members, payments, verificationEvents } from "@/lib/mock-data";

export default function AdminOverviewPage() {
  const stats = [
    { label: "Applications", value: applications.length },
    { label: "Members", value: members.length },
    { label: "Verification events", value: verificationEvents.length },
    { label: "Payments", value: payments.length },
    { label: "Complaints", value: complaints.length },
    { label: "Audit logs", value: auditLogs.length }
  ];

  return (
    <AdminLayout title="Compliance dashboard overview">
      <div className="card-grid three">
        {stats.map((stat) => (
          <article className="card" key={stat.label}>
            <p className="eyebrow">{stat.label}</p>
            <p className="price">{stat.value}</p>
          </article>
        ))}
      </div>
      <p className="scope-note">
        This dashboard uses mock data only. Do not treat it as a live admin system until authentication, authorization,
        database storage, audit logging, and privacy controls are implemented.
      </p>
    </AdminLayout>
  );
}
