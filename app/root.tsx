import type {
  LinksFunction,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import tailwindStylesheetUrl from "./styles/tailwind.css";
import { getUser } from "./session.server";
import { MenuIcon, XIcon } from "@heroicons/react/solid";
import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: tailwindStylesheetUrl },
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    {
      rel: "preconnect",
      href: "https://fonts.gstatic.com",
    },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700&family=Volkhov:wght@400;700&display=swap",
    },
  ];
};

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Kirchengesangsbuch",
  viewport: "width=device-width,initial-scale=1",
});

type LoaderData = {
  user: Awaited<ReturnType<typeof getUser>>;
};

export const loader: LoaderFunction = async ({ request }) => {
  return json<LoaderData>({
    user: await getUser(request),
  });
};

export default function App() {
  const [open, setOpen] = useState(false);
  return (
    <html lang="en" className="h-full">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="h-full bg-bg">
        <div className="absolute top-8 right-7 z-30">
          <MenuIcon
            className="h-8 w-8 cursor-pointer text-primary"
            aria-hidden="true"
            onClick={() => setOpen(true)}
          />
        </div>
        <div className="h-full w-full">
          <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={setOpen}>
              <div className="fixed inset-0" />

              <div className="fixed inset-0 overflow-hidden">
                <div className="absolute inset-0 overflow-hidden">
                  <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                    <Transition.Child
                      as={Fragment}
                      enter="transform transition ease-in-out duration-500 sm:duration-700"
                      enterFrom="translate-x-full"
                      enterTo="translate-x-0"
                      leave="transform transition ease-in-out duration-500 sm:duration-700"
                      leaveFrom="translate-x-0"
                      leaveTo="translate-x-full"
                    >
                      <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                        <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                          <div className="px-4 sm:px-6">
                            <div className="flex items-start justify-between">
                              <Dialog.Title className="text-lg font-medium text-gray-900">
                                {" "}
                                Navigation{" "}
                              </Dialog.Title>
                              <div className="ml-3 flex h-7 items-center">
                                <button
                                  type="button"
                                  className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-pastel focus:ring-offset-2"
                                  onClick={() => setOpen(false)}
                                >
                                  <span className="sr-only">Close panel</span>
                                  <XIcon
                                    className="h-6 w-6"
                                    aria-hidden="true"
                                  />
                                </button>
                              </div>
                            </div>
                          </div>
                          <div className="relative mt-6 flex-1 px-4 sm:px-6">
                            <div className="mt-6 flex flex-col gap-3">
                              <Link
                                to="/planerlist"
                                onClick={() => setOpen(false)}
                                className="hover:bg-grey-300 hover:text-grey-500 flex items-center justify-center rounded-2xl border border-transparent bg-pastel px-8 py-3 text-base font-medium uppercase text-white md:py-4 md:text-lg"
                              >
                                Mitwirkende
                              </Link>
                              <Link
                                to="/besucherlist"
                                onClick={() => setOpen(false)}
                                className="hover:bg-grey-300 hover:text-grey-500 flex items-center justify-center rounded-2xl border border-transparent bg-pastel px-8 py-3 text-base font-medium uppercase text-white md:py-4 md:text-lg"
                              >
                                Besucher
                              </Link>
                            </div>
                          </div>
                        </div>
                      </Dialog.Panel>
                    </Transition.Child>
                  </div>
                </div>
              </div>
            </Dialog>
          </Transition.Root>
          <Outlet />
        </div>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
