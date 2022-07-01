import { ChatIcon, HeartIcon } from "@heroicons/react/solid";
import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { joinGottesdienst } from "~/models/user.server";
import { requireUserId } from "~/session.server";

import {
  getKirchgemeindenForUserWithGottesdienste,
  getJoinedGottesdienste,
} from "~/models/gottesdienst.server";
import { useState } from "react";

type LoaderData = {
  kirchgemeinde: Awaited<
    ReturnType<typeof getKirchgemeindenForUserWithGottesdienste>
  >;
  joinedGottesdienste: Awaited<ReturnType<typeof getJoinedGottesdienste>>;
};

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await requireUserId(request);
  const kirchgemeinde = await getKirchgemeindenForUserWithGottesdienste(userId);
  const joinedGottesdienste = await getJoinedGottesdienste(userId);
  return json<LoaderData>({ kirchgemeinde, joinedGottesdienste });
};

type ActionData = {
  errors?: {
    title?: string;
    body?: string;
  };
};

export const action: ActionFunction = async ({ request }) => {
  console.log("ac");
  const formData = await request.formData();
  const userId = await requireUserId(request);
  const id = formData.get("gd");

  if (typeof id !== "string" || !id) {
    return json<ActionData>(
      { errors: { title: "Select Gottesdienst" } },
      { status: 400 }
    );
  }

  await joinGottesdienst(userId, id);
  return true;
};

export default function () {
  const { kirchgemeinde, joinedGottesdienste } = useLoaderData() as LoaderData;
  return (
    <div className="mx-6 mb-8">
      <div className="absolute inset-x-0 top-8 flex flex-col items-center justify-center">
        <h2>Gottesdienst Teilnehmen</h2>
        <h1 className="text-xl">Suchen</h1>
      </div>
      <div className="text-primary">Filtern (nicht implementiert)</div>
      <div className="mx-auto mt-4 grid max-w-none grid-cols-1 gap-5 sm:grid-cols-2">
        <nav className="h-full overflow-y-auto" aria-label="Directory">
          {kirchgemeinde.map((kg) => (
            <div key={kg.id} className="relative">
              <div className="sticky top-0 z-10 border-t border-b border-gray-200 bg-gray-50 px-6 py-1 text-sm font-medium text-gray-500">
                <h3>{kg.name}</h3>
              </div>
              <ul className="relative z-0 divide-y divide-gray-200">
                {kg.gottesdienste.map((gd) => (
                  <li key={gd.id} className="bg-white">
                    <div className="relative flex items-center space-x-3 px-6 py-5 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500 hover:bg-gray-50">
                      <div className="min-w-0 flex-1">
                        <div className="focus:outline-none">
                          <p className="text-sm font-medium text-gray-900">
                            {gd.title}
                          </p>
                          <p className="truncate text-sm text-gray-500">
                            {gd.date}
                          </p>
                        </div>
                      </div>
                      <div className="flex-shrink-0">
                        {joinedGottesdienste.some((jgd) => jgd.id === gd.id) ? (
                          <button
                            name="gd"
                            value={gd.id}
                            className="font-mediumhadow-sm inline-flex items-center justify-center rounded border border-transparent bg-gray-100 px-2.5 py-1.5 text-xs text-gray-500 hover:bg-pastel-dark focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                          >
                            Ich nehme teil
                          </button>
                        ) : (
                          <Form method="post">
                            <button
                              type="submit"
                              name="gd"
                              value={gd.id}
                              className="font-mediumhadow-sm inline-flex items-center justify-center rounded border border-transparent bg-pastel px-2.5 py-1.5 text-xs text-white hover:bg-pastel-dark focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                              Teilnehmen
                            </button>
                          </Form>
                        )}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
}
