import GovermentBoard from "../components/GovernmentBoard";
import { getServerSupabaseClient } from "../data-service/supabaseServer";
export const dynamic = "force-dynamic";
export const revalidate = 0;
export default async function GovDashboardPage() {
  const supabase = await getServerSupabaseClient();
  const data = await supabase.from("reports").select("*");

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <GovermentBoard data={data} />
    </div>
  );
}
