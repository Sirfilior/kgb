import { SearchIcon, PlusIcon } from "@heroicons/react/solid";
import { Link } from "@remix-run/react";

export default function NewNotePage() {
  return (
    <>
      <div className="absolute inset-x-0 top-8 flex flex-col items-center justify-center">
        <h1 className="text-xl">Gottesdienst planen</h1>
      </div>
      <div className="relative mt-8 mb-8 flex-1 py-4 px-5">
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
          <div className="p-5 text-center">
            Neue Gottesdienste können entweder über Vorlagen bestehender- oder
            über eine manuelle Konfiguration- erstellt werden.
          </div>
          <div className="flex justify-center gap-3">
            <Link
              to="/views/planer/neu"
              className="inline-flex items-center rounded-2xl border border-transparent bg-pastel px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-pastel focus:outline-none focus:ring-2 focus:ring-pastel focus:ring-offset-2"
            >
              <PlusIcon className="-ml-1 mr-3 h-5 w-5" aria-hidden="true" />
              Neu
            </Link>
            <Link
              type="button"
              to="/views/planer/template"
              className="inline-flex items-center rounded-2xl border border-transparent bg-pastel px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-pastel focus:outline-none focus:ring-2 focus:ring-pastel focus:ring-offset-2"
            >
              <SearchIcon className="-ml-1 mr-3 h-5 w-5" aria-hidden="true" />
              Vorlage
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
