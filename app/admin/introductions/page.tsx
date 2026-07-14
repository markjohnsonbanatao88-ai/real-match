import { AdminLayout } from "@/components/admin/AdminLayout";
import { AdminTable } from "@/components/admin/AdminTables";
import { introductions } from "@/lib/mock-data";

export default function IntroductionsPage() {
  return (
    <AdminLayout title="Introductions">
      <AdminTable rows={introductions} />
    </AdminLayout>
  );
}
