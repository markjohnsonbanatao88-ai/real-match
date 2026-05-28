import { AdminLayout } from "@/components/admin/AdminLayout";
import { AdminTable } from "@/components/admin/AdminTables";
import { applications } from "@/lib/mock-data";

export default function ApplicationsPage() {
  return (
    <AdminLayout title="Applications">
      <AdminTable rows={applications} />
    </AdminLayout>
  );
}
