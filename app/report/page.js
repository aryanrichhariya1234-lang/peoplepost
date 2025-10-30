import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import MapComponent from "../components/MapComponent";
import { getServerSupabaseClient } from "../data-service/supabaseServer";
import { redirect } from "next/navigation";
import Reportproblem from "../components/Reportproblem";

export default async function ReportProblemPage() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
      {/* LEFT SIDE: Form & Report Details (40% on Desktop, 100% on Mobile) */}
      <Reportproblem />

      {/* RIGHT SIDE: Interactive Map Placeholder (60% on Desktop, Stacks on Mobile) */}
      <div className="w-full md:w-7/12 lg:w-8/12 md:sticky md:top-0 md:h-screen p-4 md:p-0">
        {/* Map Placeholder is now part of MediaHandler to allow interaction */}
        <MapComponent />
      </div>
    </div>
  );
}
