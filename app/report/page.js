import MapComponent from "../components/MapComponent";

import Reportproblem from "../components/Reportproblem";
import { getId } from "../data-service/actions";

export default async function ReportProblemPage() {
  const id = await getId();
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
      <Reportproblem id={id} />

      <div className="w-full md:w-7/12 lg:w-8/12 md:sticky md:top-0 md:h-screen p-4 md:p-0">
        <MapComponent />
      </div>
    </div>
  );
}
