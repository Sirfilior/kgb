import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, Link, useCatch, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useRef, useState } from "react";
import { Dialog, Transition, Disclosure } from "@headlessui/react";
import { MusicNoteIcon } from "@heroicons/react/outline";

import type { Gottesdienst } from "~/models/gottesdienst.server";
import { getGottesdienst } from "~/models/gottesdienst.server";
import VisibileButtons from "~/components/visibility";

/* This example requires Tailwind CSS v2.0+ */
const songs = [
  {
    id: "036",
    title: "Ich sing dir mein Lied",
  },
  {
    id: "247",
    title: "Ein anderes Lied",
  },
  // More transactions...
];

type LoaderData = {
  gottesdienst: Gottesdienst;
};

export const loader: LoaderFunction = async ({ request, params }) => {
  invariant(params.gdid, "gd not found");

  const gottesdienst = await getGottesdienst({ id: params.gdid });
  if (!gottesdienst) {
    throw new Response("Not Found", { status: 404 });
  }
  return json<LoaderData>({ gottesdienst });
};

export default function NoteDetailsPage() {
  const { gottesdienst } = useLoaderData() as LoaderData;
  const [open, setOpen] = useState(false);

  const cancelButtonRef = useRef(null);

  return (
    <div className="mx-6 mb-8">
      <div className="absolute inset-x-0 top-8 flex flex-col items-center justify-center">
        <h2>Neuer Gottesdienst: {gottesdienst.title}</h2>
        <h1 className="text-xl">Inhalt des Gottesdienstes</h1>
      </div>
      <div className="relative">
        <div className="">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Details
          </h3>
        </div>
        <div className="mt-3">
          <div className="space-y-6 rounded-xl bg-white p-6 px-4 py-5">
            <div className="grid grid-cols-2">
              <p>{gottesdienst.date}</p>
              <p>{gottesdienst.time}</p>
              <p>{gottesdienst.assignees}</p>
              <p>{gottesdienst.book}</p>
              <p>{gottesdienst.music}</p>
              <p>{gottesdienst.special}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="" aria-hidden="true">
        <div className="py-5">
          <div className="border-t border-gray-200" />
        </div>
      </div>
      <div className="mt-5">
        <div className="">
          <div className="">
            <div className="">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Eröffnung
              </h3>
            </div>
          </div>
          <div className="mt-3">
            <form action="#" method="POST">
              <div className="overflow-hidden">
                <div className="space-y-6 rounded-xl bg-white p-6 px-4 py-5">
                  <div>
                    <h3 className="text-lg font-medium leading-6 text-gray-900">
                      Einzug
                    </h3>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setOpen(true)}
                      type="button"
                      className="inline-flex items-center justify-center rounded-2xl border border-transparent bg-pastel px-2.5 py-1.5 text-xs font-medium text-white shadow-sm"
                    >
                      Musikalische Begleitung
                    </button>
                    <button
                      onClick={() => setOpen(true)}
                      type="button"
                      className="inline-flex items-center justify-center rounded-2xl border border-transparent bg-pastel px-2.5 py-1.5 text-xs font-medium text-white shadow-sm"
                    >
                      Lied
                    </button>
                  </div>
                  <div>
                    <label
                      htmlFor="about"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Regieanweisungen
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="about"
                        name="about"
                        rows={3}
                        className="block w-full rounded-md border border-gray-300 shadow-sm focus:border-pastel focus:ring-pastel sm:text-sm"
                        defaultValue={""}
                      />
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      Notieren Sie hier Informationen für Mitwirkende, spezille
                      Vorkehrungen etc.
                    </p>
                  </div>
                  <div className="mt-2">
                    <VisibileButtons />
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className="mt-3">
            <form action="#" method="POST">
              <div className="overflow-hidden">
                <div className="space-y-6 rounded-xl bg-white p-6 px-4 py-5">
                  <div>
                    <h3 className="text-lg font-medium leading-6 text-gray-900">
                      Begrüssung
                    </h3>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setOpen(true)}
                      type="button"
                      className="inline-flex items-center justify-center rounded-2xl border border-transparent bg-pastel px-2.5 py-1.5 text-xs font-medium text-white shadow-sm"
                    >
                      Begrüssung durch
                    </button>
                  </div>
                  <div>
                    <label
                      htmlFor="about"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Regieanweisungen
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="about"
                        name="about"
                        rows={3}
                        className="block w-full rounded-md border border-gray-300 shadow-sm focus:border-pastel focus:ring-pastel sm:text-sm"
                        defaultValue={""}
                      />
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      Notieren Sie hier Informationen für Mitwirkende, spezille
                      Vorkehrungen etc.
                    </p>
                  </div>
                  <div className="mt-2">
                    <VisibileButtons />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="" aria-hidden="true">
        <div className="py-5">
          <div className="border-t border-gray-200" />
        </div>
      </div>
      <div className="mt-5">
        <div className="">
          <div className="">
            <div className="">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Wortgottesdienst
              </h3>
            </div>
          </div>
          <div className="mt-3">
            <form action="#" method="POST">
              <div className="overflow-hidden">
                <div className="space-y-6 rounded-xl bg-white p-6 px-4 py-5">
                  <div>
                    <h3 className="text-lg font-medium leading-6 text-gray-900">
                      Erste Lesung
                    </h3>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setOpen(true)}
                      type="button"
                      className="inline-flex items-center justify-center rounded-2xl border border-transparent bg-pastel px-2.5 py-1.5 text-xs font-medium text-white shadow-sm"
                    >
                      Lektorin
                    </button>
                  </div>
                  <div>
                    <label
                      htmlFor="about"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Passage / Text
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="about"
                        name="about"
                        rows={2}
                        className="block w-full rounded-md border border-gray-300 shadow-sm focus:border-pastel focus:ring-pastel sm:text-sm"
                        defaultValue={""}
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="about"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Regieanweisungen
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="about"
                        name="about"
                        rows={3}
                        className="block w-full rounded-md border border-gray-300 shadow-sm focus:border-pastel focus:ring-pastel sm:text-sm"
                        defaultValue={""}
                      />
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      Notieren Sie hier Informationen für Mitwirkende, spezille
                      Vorkehrungen etc.
                    </p>
                  </div>
                  <div className="mt-2">
                    <VisibileButtons />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="" aria-hidden="true">
        <div className="py-5">
          <div className="border-t border-gray-200" />
        </div>
      </div>
      <div className="mt-4 flex justify-around gap-3 pb-4">
        <button
          disabled
          className="flex items-center justify-center rounded-lg border border-transparent bg-gray-400 px-8 py-3 text-base font-medium uppercase text-gray-500 md:py-4"
        >
          Als Entwurf freigeben
        </button>
        <Link
          to="/planerlist"
          className="flex items-center justify-center rounded-lg border border-transparent bg-white px-8 py-3 text-base font-medium uppercase text-pastel hover:bg-pastel hover:text-white md:py-4"
        >
          Veröffentlichen
        </Link>
      </div>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={setOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                  <div>
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-pastel">
                      <MusicNoteIcon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="mt-3 text-center sm:mt-5">
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-6 text-gray-900"
                      >
                        Lied hinzufügen
                      </Dialog.Title>
                      <div className="mt-2">
                        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                          <table className="min-w-full divide-y divide-gray-300">
                            <thead className="bg-gray-50">
                              <tr>
                                <th
                                  scope="col"
                                  className="whitespace-nowrap py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                                >
                                  Nummber
                                </th>
                                <th
                                  scope="col"
                                  className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                                >
                                  Titel
                                </th>
                                <th
                                  scope="col"
                                  className="relative whitespace-nowrap py-3.5 pl-3 pr-4 sm:pr-6"
                                >
                                  <span className="sr-only">Edit</span>
                                </th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                              {songs.map((song) => (
                                <tr key={song.id}>
                                  <td className="whitespace-nowrap py-2 pl-4 pr-3 text-left text-sm text-gray-500 sm:pl-6">
                                    {song.id}
                                  </td>
                                  <td className="whitespace-nowrap px-2 py-2 text-left text-sm font-medium text-gray-900">
                                    {song.title}
                                  </td>
                                  <td className="relative whitespace-nowrap py-2 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                    <a
                                      href="#"
                                      className="text-indigo-600 hover:text-indigo-900"
                                    >
                                      Hinzufügen
                                      <span className="sr-only">
                                        , {song.id}
                                      </span>
                                    </a>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-2xl border border-transparent bg-pastel px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-pastel focus:outline-none focus:ring-2 focus:ring-pastel focus:ring-offset-2 sm:col-start-2 sm:text-sm"
                      onClick={() => setOpen(false)}
                    >
                      Hinzufügen
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-2xl border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-pastel focus:ring-offset-2 sm:col-start-1 sm:mt-0 sm:text-sm"
                      onClick={() => setOpen(false)}
                      ref={cancelButtonRef}
                    >
                      Abbrechen
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);

  return <div>An unexpected error occurred: {error.message}</div>;
}

export function CatchBoundary() {
  const caught = useCatch();

  if (caught.status === 404) {
    return (
      <div>
        <p>Noch kein Template vorhanden</p>
        <p>
          Könnte später von einem Benutzer erstellt werden. Nicht Teil dieser
          Demo
        </p>
      </div>
    );
  }

  throw new Error(`Unexpected caught response with status: ${caught.status}`);
}
