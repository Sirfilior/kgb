import { ChatIcon, HeartIcon } from "@heroicons/react/solid";
import type { ActionFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { createGottesdienst } from "~/models/gottesdienst.server";

const templates = [
  {
    title: "Eucharistiefeier",
    date: "Sontag 19.Juni 2022",
    place: "Marienkirche",
    likes: 3,
    comments: 4,
    desc: "Enim non culpa magna eiusmod fugiat nisi sunt eiusmod incididunt minim aute laboris velit. Proident nisi amet eu velit cupidatat esse proident Lorem. In qui excepteur irure elit aliqua minim irure incididunt enim sit. Aute et proident eiusmod cupidatat. Fugiat consectetur adipisicing mollit enim pariatur consectetur. Tempor quis sunt aliquip veniam. Sit velit veniam commodo commodo dolor laboris officia excepteur proident magna.",
  },
  {
    title: "Werktagmesse",
    date: "Sontag 19. Juni 2022",
    place: "Marienkirche",
    likes: 3,
    comments: 4,
    desc: "Commodo in officia ut elit in amet veniam sunt incididunt nulla esse laboris ad. Anim voluptate dolor cillum exercitation nostrud eiusmod labore laborum ullamco. Labore Lorem sint deserunt reprehenderit ut incididunt officia consequat sit dolor minim non in. Eiusmod id enim consequat excepteur nulla do ex magna sit ipsum veniam id. Incididunt ad mollit Lorem aliqua ea excepteur nulla veniam quis. Id exercitation sit ut exercitation aliqua et aliquip ad esse excepteur sunt. Ea cupidatat irure dolor laborum sunt adipisicing reprehenderit consequat ipsum.",
  },
  {
    title: "Hochfest",
    date: "Sontag 19. Juni 2022",
    place: "Marienkirche",
    likes: 3,
    comments: 4,
    desc: "Do proident esse quis cupidatat aliqua ea amet officia quis nisi reprehenderit. Nulla ad excepteur non velit et aliquip velit sunt officia cillum dolore nostrud id qui. Velit labore excepteur ullamco excepteur commodo aliquip id sunt adipisicing anim veniam dolor. Do cupidatat eiusmod eiusmod veniam consectetur ex. Aliqua tempor commodo ex irure ad voluptate labore eiusmod proident. Ex nulla labore proident exercitation eiusmod deserunt in do. Nostrud nulla ex commodo ex.",
  },
];

type ActionData = {
  errors?: {
    title?: string;
    body?: string;
  };
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const type = formData.get("template");

  if (typeof type !== "string" || type.length === 0) {
    return json<ActionData>(
      { errors: { title: "Type is required" } },
      { status: 400 }
    );
  }

  const gottesdienst = await createGottesdienst({
    type,
    date: "Sontag 19. Juni 2022",
    time: "18:00",
    assignees: "",
    book: "Basisbuch",
    music: "Das sind Regeianweisungen aus einer Vorlage",
    special: "Das sind Spezielle Anweisungen aus einer Vorlage",
  });

  return redirect(`/views/planer/${gottesdienst.id}`);
};

export default function () {
  return (
    <div className="mx-6 mb-8">
      <div className="absolute inset-x-0 top-8 flex flex-col items-center justify-center">
        <h2>Gottesdienst planen</h2>
        <h1 className="text-xl">Vorlage auswählen</h1>
      </div>
      <div className="text-primary">Filtern (nicht implementiert)</div>
      <div className="mx-auto mt-4 grid max-w-none grid-cols-1 gap-5 sm:grid-cols-2">
        {templates.map((templates) => (
          <div
            key={templates.title}
            className="rounded-lg bg-white p-6 shadow-lg"
          >
            <div className="flex flex-col justify-between">
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div className="">
                    <p className="text-sm font-medium text-pastel">
                      {templates.date}
                    </p>
                    <p className="text-sm font-medium text-pastel">
                      {templates.place}
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex items-center gap-1">
                      <span className="text-gray-500">
                        {templates.comments}
                      </span>
                      <ChatIcon className="h-5 w-5 flex-shrink-0 text-gray-300" />
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-gray-500">{templates.likes}</span>
                      <HeartIcon className="h-5 w-5 flex-shrink-0 text-gray-300" />
                    </div>
                  </div>
                </div>
                <div className="mt-2 block">
                  <p className="text-xl font-semibold text-gray-900">
                    {templates.title}
                  </p>
                  <p className="text-gray-900">{templates.desc}</p>
                </div>
                <div className="mt-2 flex justify-center">
                  <Form method="post">
                    <button
                      type="submit"
                      name="template"
                      value={templates.title}
                      className="inline-flex items-center justify-center rounded-2xl border border-transparent bg-pastel px-2.5 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-pastel-dark focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Auswählen
                    </button>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
