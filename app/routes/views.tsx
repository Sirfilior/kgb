import { Outlet } from "@remix-run/react";
import { useNavigate } from "@remix-run/react";
import { ArrowCircleLeftIcon } from "@heroicons/react/outline";

export default function PlanerIndex() {
  const navigate = useNavigate();
  return (
    <div className="relative">
      <div className="relative overflow-hidden">
        <div className="relative z-10 py-8 px-6">
          <button onClick={() => navigate(-1)}>
            <ArrowCircleLeftIcon className="h-8 w-8 text-primary" />
          </button>
        </div>
      </div>
      <Outlet />
    </div>
  );
}
