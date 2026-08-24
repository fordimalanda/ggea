import AdminDashboard from "./AdminDashboard";
import AdminLogin from "./AdminLogin";
import { getAdminSession } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const session = await getAdminSession();
  return session ? <AdminDashboard email={session.email} /> : <AdminLogin />;
}
