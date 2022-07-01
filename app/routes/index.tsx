import { Link } from "@remix-run/react";
export default function Index() {
  return (
    <div className="relative mt-4 flex flex-1 flex-col">
      <main className="flex-1 py-10">
        <div className="mx-auto flex max-w-xl flex-col items-center">
          <h1 className="text-xl tracking-tight text-primary sm:text-3xl">
            Kirchengesangbuch
          </h1>
          <h2>Teil App - Prototyp</h2>
          <div className="mt-6 flex gap-3">
            <Link
              to="/planerlist"
              className="flex items-center justify-center rounded-lg border border-transparent bg-white px-8 py-3 text-base font-medium uppercase text-pastel hover:bg-pastel hover:text-white md:py-4 md:text-lg"
            >
              Mitwirkende
            </Link>
            <Link
              to="/besucherlist"
              className="flex items-center justify-center rounded-lg border border-transparent bg-white px-8 py-3 text-base font-medium uppercase text-pastel hover:bg-pastel hover:text-white md:py-4 md:text-lg"
            >
              Besucher
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
