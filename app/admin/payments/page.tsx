import { AdminLayout } from "@/components/admin/AdminLayout";
import { AdminTable } from "@/components/admin/AdminTables";
import { payments } from "@/lib/mock-data";

export default function PaymentRecordsPage() {
  return (
    <AdminLayout title="Payment records">
      <AdminTable rows={payments} />
    </AdminLayout>
  );
}
