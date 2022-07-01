import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useCatch, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { HeartIcon, MusicNoteIcon } from "@heroicons/react/outline";
import liedImg from "../../../images/lied.png";

import type { Gottesdienst } from "~/models/gottesdienst.server";
import { getGottesdienst } from "~/models/gottesdienst.server";
import clsx from "clsx";

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
  const [activeStep, setActiveStep] = useState(0);
  const cancelButtonRef = useRef(null);

  function onKeydown(event: KeyboardEvent) {
    if (event.key === "n") {
      setActiveStep(activeStep + 1);
    }
  }
  useEffect(() => {
    window.addEventListener("keydown", onKeydown);
    return () => {
      window.removeEventListener("keydown", onKeydown);
    };
  });

  return (
    <div className="mx-6 mb-8">
      <div className="absolute inset-x-0 top-8 flex flex-col items-center justify-center">
        <h2>Gottesdienst</h2>
        <h1 className="text-xl">{gottesdienst.title}</h1>
      </div>
      <div className="relative">
        <div className="">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Sie werden von Fabian Weiss durch den Gottesdienst geführt.
          </h3>
          <button className="mt-3 inline-flex items-center justify-center rounded border border-transparent bg-pastel px-2.5 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-pastel-dark focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
            Weitere Mitwirkende
          </button>
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
            <div className="overflow-hidden">
              <div
                className={clsx(
                  "rounded-xl bg-white px-4 py-2",
                  activeStep === 0 && "border-2 border-pastel"
                )}
              >
                <div className="flex justify-between">
                  <h3 className="text-sm font-medium leading-6 text-gray-900">
                    Einzug
                  </h3>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      className="inline-flex items-center rounded border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Lied
                    </button>
                    <HeartIcon className="h-5 w-5 flex-shrink-0 text-gray-300" />
                  </div>
                </div>
                <div>
                  <p>Ein Lied, Str 1-4</p>
                </div>
                <div className="text-center">
                  <button
                    className="mt-3 inline-flex items-center justify-center rounded border border-transparent bg-pastel px-2.5 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-pastel-dark focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    onClick={() => setOpen(true)}
                  >
                    Mitsingen
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-3">
            <div className="overflow-hidden">
              <div
                className={clsx(
                  "rounded-xl bg-white px-4 py-2",
                  activeStep === 1 && "border-2 border-pastel"
                )}
              >
                <div className="flex justify-between">
                  <h3 className="text-sm font-medium leading-6 text-gray-900">
                    Begrüssung
                  </h3>
                  <div className="flex items-center gap-2">
                    <HeartIcon className="h-5 w-5 flex-shrink-0 text-gray-300" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-3">
            <div className="overflow-hidden">
              <div
                className={clsx(
                  "rounded-xl bg-white px-4 py-2",
                  activeStep === 2 && "border-2 border-pastel"
                )}
              >
                <div className="flex justify-between">
                  <h3 className="text-sm font-medium leading-6 text-gray-900">
                    Einführung
                  </h3>
                  <div className="flex items-center gap-2">
                    <HeartIcon className="h-5 w-5 flex-shrink-0 text-gray-300" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-3">
            <div className="overflow-hidden">
              <div
                className={clsx(
                  "rounded-xl bg-white px-4 py-2",
                  activeStep === 3 && "border-2 border-pastel"
                )}
              >
                <div className="flex justify-between">
                  <h3 className="text-sm font-medium leading-6 text-gray-900">
                    Besinnung & Kyrie
                  </h3>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      className="inline-flex items-center rounded border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Ruf
                    </button>
                    <HeartIcon className="h-5 w-5 flex-shrink-0 text-gray-300" />
                  </div>
                </div>
                <div className="pt-2">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                </div>
              </div>
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
                Wortgottesdienst
              </h3>
            </div>
          </div>
          <div className="mt-3">
            <div className="overflow-hidden">
              <div
                className={clsx(
                  "rounded-xl bg-white px-4 py-2",
                  activeStep === 4 && "border-2 border-pastel"
                )}
              >
                <div className="flex justify-between">
                  <h3 className="text-sm font-medium leading-6 text-gray-900">
                    Erste Lesung
                  </h3>
                  <div className="flex items-center gap-2">
                    <HeartIcon className="h-5 w-5 flex-shrink-0 text-gray-300" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="" aria-hidden="true">
        <div className="py-5">
          <div className="border-t border-gray-200" />
        </div>
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
            <div className="flex min-h-full items-center justify-center p-1 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative my-8 w-full transform overflow-hidden rounded-lg bg-white p-6 px-4 pt-5 pb-4 text-left shadow-xl transition-all">
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
                        Ein Lied, Str 1-4
                      </Dialog.Title>
                      <div className="mt-2">
                        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                          <img className="h-full" src={liedImg} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md border border-transparent bg-pastel px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-pastel focus:outline-none focus:ring-2 focus:ring-pastel focus:ring-offset-2 sm:col-start-2 sm:text-sm"
                      onClick={() => setOpen(false)}
                    >
                      Fertig
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
