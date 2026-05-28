import { AdminLayout } from "@/components/admin/AdminLayout";
import { AdminTable } from "@/components/admin/AdminTables";
import { complaints } from "@/lib/mock-data";

export default function ComplaintRecordsPage() {
  return (
    <AdminLayout title="Complaint records">
      <AdminTable rows={complaints} />
    </AdminLayout>
  );
}
