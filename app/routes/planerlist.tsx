import { Links, useLoaderData } from "@remix-run/react";
import { ActionFunction, json, LoaderFunction } from "@remix-run/node";
import Bevorstehend from "~/components/bevorstehend";
import Vergangen from "~/components/vergangen";
import cloudsImg from "../images/altar.jpeg";

import stylesheetUrl from "../styles/home-animations.css";

import {
  getGottesdienstListItems,
  startGottesdienst,
} from "~/models/gottesdienst.server";

type LoaderData = {
  gottesdienste: Awaited<ReturnType<typeof getGottesdienstListItems>>;
};

const pastGottesdienst = [
  {
    id: "past",
    createdAt: new Date(),
    updatedAt: new Date(),
    date: "Sontag 07. Juni 2022",
    time: "15:00",
    place: "Martinskirche",
    entries: 102,
    title: "Hochfest",
    running: false,
    type: "Hochfest",
    assignees: "Martin, Anna, Max",
    book: "Rise up",
    music: "",
    special: "",
    kirchgemeindeId: "1",
    likes: 20,
    liked: true,
    comments: 5,
  },
];

export const loader: LoaderFunction = async ({ request }) => {
  const gottesdienste = await getGottesdienstListItems();
  return json<LoaderData>({ gottesdienste });
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const gd = formData.get("start");
  if (typeof gd !== "string") {
    return false;
  }
  await startGottesdienst(gd);
  return true;
};

export function links() {
  return [{ rel: "stylesheet", href: stylesheetUrl }];
}

export default function Index() {
  const { gottesdienste } = useLoaderData() as LoaderData;
  return (
    <div className="relative flex flex-1 flex-col">
      <main className="flex-1">
        <div className="overflow-hidden px-12">
          <Links />
          <header className="relative">
            <div className="relative py-16">
              <h1 className="font-serif tracking-tight text-primary sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
                <span className="block text-5xl xl:inline">
                  Willkommen zurück,
                </span>
                <span className="block text-6xl xl:inline">Fabian</span>
              </h1>
              <div className="mt-10">
                <div className="w-3/5 rounded-lg shadow-lg">
                  <a
                    href="/views/planer/choose"
                    className="flex items-center justify-center rounded-2xl border border-transparent bg-contrast px-8 py-3 text-base font-medium uppercase text-white hover:bg-pastel hover:text-white md:py-4 md:text-lg"
                  >
                    Neuer Gottesdienst
                  </a>
                </div>
              </div>
            </div>
          </header>
          <div className="relative">
            <Bevorstehend gottesdienste={gottesdienste} view="mitwirkend" />
            <Vergangen gottesdienste={pastGottesdienst} view="mitwirkend" />
          </div>
        </div>
      </main>
      <footer className="py-5"></footer>
    </div>
  );
}
