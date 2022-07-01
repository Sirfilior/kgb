import { Link, Links, useLoaderData } from "@remix-run/react";
import { json, LoaderFunction } from "@remix-run/node";
import {
  CalendarIcon,
  SearchIcon,
  DeviceMobileIcon,
} from "@heroicons/react/outline";
import Bevorstehend from "~/components/bevorstehend";
import Vergangen from "~/components/vergangen";
import cloudsImg from "../images/woodwork.jpeg";

import stylesheetUrl from "../styles/home-animations.css";

import {
  getGottesdienstListItems,
  getJoinedGottesdienste,
} from "~/models/gottesdienst.server";
import { requireUserId } from "~/session.server";

export function links() {
  return [{ rel: "stylesheet", href: stylesheetUrl }];
}

type LoaderData = {
  gottesdienste: Awaited<ReturnType<typeof getGottesdienstListItems>>;
  joinedGottesdienste: Awaited<ReturnType<typeof getJoinedGottesdienste>>;
};

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await requireUserId(request);
  const gottesdienste = await getGottesdienstListItems();
  const joinedGottesdienste = await getJoinedGottesdienste(userId);
  return json<LoaderData>({ gottesdienste, joinedGottesdienste });
};

export default function VisitorIndex() {
  const { gottesdienste, joinedGottesdienste } = useLoaderData() as LoaderData;
  return (
    <div className="relative flex flex-1 flex-col">
      <main className="relative flex-1 overflow-hidden">
        <div className="px-4 sm:px-12">
          <Links />
          <header className="">
            <div className="relative pt-20 pb-8">
              <h1 className="font-serif tracking-tight text-primary sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
                <span className="block text-3xl xl:inline">
                  Willkommen zurück,
                </span>
                <span className="block text-4xl xl:inline">Andriu</span>
              </h1>
              <div className="mt-10 flex justify-center gap-2">
                <Link
                  to="/views/find"
                  className="inline-flex items-center rounded-2xl border border-transparent bg-white px-5 py-6 text-sm font-medium text-pastel shadow-sm hover:bg-pastel hover:text-white focus:outline-none focus:ring-2 focus:ring-pastel-dark focus:ring-offset-2"
                >
                  <SearchIcon
                    className="-ml-1 mr-2 h-5 w-5"
                    aria-hidden="true"
                  />
                  Finden
                </Link>
                <Link
                  to="/views/heute"
                  className="inline-flex items-center rounded-2xl border border-transparent bg-white px-4 py-2 text-sm font-medium text-pastel shadow-sm hover:bg-pastel hover:text-white focus:outline-none focus:ring-2 focus:ring-pastel-dark focus:ring-offset-2"
                >
                  <CalendarIcon
                    className="-ml-1 mr-2 h-5 w-5"
                    aria-hidden="true"
                  />
                  Heute
                </Link>
                <button
                  type="button"
                  className="inline-flex items-center rounded-2xl border border-transparent bg-pastel px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-pastel hover:text-white focus:outline-none focus:ring-2 focus:ring-pastel-dark focus:ring-offset-2"
                >
                  <DeviceMobileIcon
                    className="-ml-1 mr-2 h-5 w-5"
                    aria-hidden="true"
                  />
                  Scan
                </button>
              </div>
            </div>
          </header>
          <div className="relative pt-3">
            <Bevorstehend view="visitor" gottesdienste={joinedGottesdienste} />
            <Vergangen view="visitor" gottesdienste={gottesdienste} />
          </div>
        </div>
      </main>
      <footer className="py-5"></footer>
    </div>
  );
}
