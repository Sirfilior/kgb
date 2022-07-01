import type { ActionFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, Link, useActionData } from "@remix-run/react";
import { Fragment, useState, useRef, useEffect } from "react";
import { Listbox, Transition, Combobox } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";

import { createGottesdienst } from "~/models/gottesdienst.server";
import { requireUserId } from "~/session.server";

const people = [
  { id: 1, name: "Wade Cooper" },
  { id: 2, name: "Arlene Mccoy" },
  { id: 3, name: "Devon Webb" },
  { id: 4, name: "Tom Cook" },
  { id: 5, name: "Tanya Fox" },
  { id: 6, name: "Hellen Schmidt" },
  { id: 7, name: "Caroline Schultz" },
  { id: 8, name: "Mason Heaney" },
  { id: 9, name: "Claudie Smitham" },
  { id: 10, name: "Emil Schaefer" },
];

const books = [
  { id: 0, name: "Bitte wählen.." },
  { id: 1, name: "Basisbuch" },
  { id: 2, name: "Rise up plus" },
  { id: 3, name: "Festkreis Advent" },
  { id: 4, name: "Andere" },
];

const types = [
  { id: 0, name: "Bitte wählen.." },
  { id: 1, name: "Eucharistiefeier" },
  { id: 2, name: "Andacht" },
  { id: 3, name: "Hochfest" },
  { id: 4, name: "Werktagmesse" },
];

const kgs = [
  { id: "1", name: "Solothurn" },
  { id: "2", name: "Erlinsbach" },
  { id: "3", name: "Fulenbach" },
  { id: "4", name: "Kienberg" },
  { id: "5", name: "Leimental" },
];

type ActionData = {
  errors?: {
    title?: string;
    body?: string;
  };
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const type = formData.get("title");
  const date = formData.get("body");
  const time = formData.get("body");
  const assignees = formData.get("body");
  const book = formData.get("body");
  const music = formData.get("body");
  const special = formData.get("body");
  const userId = "1";

  if (typeof type !== "string" || type.length === 0) {
    return json<ActionData>(
      { errors: { title: "Type is required" } },
      { status: 400 }
    );
  }
  if (typeof date !== "string" || date.length === 0) {
    return json<ActionData>(
      { errors: { title: "Type is required" } },
      { status: 400 }
    );
  }
  if (typeof time !== "string" || time.length === 0) {
    return json<ActionData>(
      { errors: { title: "Type is required" } },
      { status: 400 }
    );
  }
  if (typeof assignees !== "string" || assignees.length === 0) {
    return json<ActionData>(
      { errors: { title: "Type is required" } },
      { status: 400 }
    );
  }
  if (typeof book !== "string" || book.length === 0) {
    return json<ActionData>(
      { errors: { title: "Type is required" } },
      { status: 400 }
    );
  }
  if (typeof music !== "string" || music.length === 0) {
    return json<ActionData>(
      { errors: { title: "Type is required" } },
      { status: 400 }
    );
  }
  if (typeof special !== "string" || special.length === 0) {
    return json<ActionData>(
      { errors: { title: "Type is required" } },
      { status: 400 }
    );
  }

  const gottesdienst = await createGottesdienst({
    type,
    date,
    time,
    assignees,
    book,
    music,
    special,
  });

  return redirect(`/views/planer/${gottesdienst.id}`);
};

export default function NewNotePage() {
  const actionData = useActionData() as ActionData;
  const titleRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLTextAreaElement>(null);
  const [selectedBook, setSelectedBook] = useState(books[0]);
  const [selectedKg, setSelectedKg] = useState(kgs[0]);
  const [selectedPerson, setSelectedPerson] = useState([]);
  const [selectedType, setSelectedType] = useState(types[0]);
  const [query, setQuery] = useState("");

  const filteredPeople =
    query === ""
      ? people
      : people.filter((person) => {
          return person.name.toLowerCase().includes(query.toLowerCase());
        });

  useEffect(() => {
    if (actionData?.errors?.title) {
      titleRef.current?.focus();
    } else if (actionData?.errors?.body) {
      bodyRef.current?.focus();
    }
  }, [actionData]);

  return (
    <div className="mx-6 mb-8">
      <div className="absolute inset-x-0 top-8 flex flex-col items-center justify-center">
        <h2>Gottesdienst planen</h2>
        <h1 className="text-xl">Neuer Gottesdienst</h1>
      </div>
      <Form method="post" className="mt-5 space-y-8 divide-y divide-gray-200">
        <div className="space-y-8 divide-y divide-gray-200">
          <div>
            <div>
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Organisatorisches
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Bitte definieren Sie die organisatorische Struktur des
                Gottesdienstes.
              </p>
            </div>
            <div className="mt-6 ">
              <Listbox value={selectedType} onChange={setSelectedType}>
                {({ open }) => (
                  <>
                    <Listbox.Label className="block text-sm font-medium text-gray-700">
                      Gottesdienst-Typ
                    </Listbox.Label>
                    <div className="relative mt-1">
                      <Listbox.Button className="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-pastel focus:outline-none focus:ring-1 focus:ring-pastel sm:text-sm">
                        <span className="block truncate">
                          {selectedType.name}
                        </span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                          <SelectorIcon
                            className="h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                        </span>
                      </Listbox.Button>

                      <Transition
                        show={open}
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                          {types.map((type) => (
                            <Listbox.Option
                              key={type.id}
                              className={({ active }) =>
                                classNames(
                                  active
                                    ? "bg-pastel text-white"
                                    : "text-gray-900",
                                  "relative cursor-default select-none py-2 pl-8 pr-4"
                                )
                              }
                              value={type}
                            >
                              {({ selected, active }) => (
                                <>
                                  <span
                                    className={classNames(
                                      selected
                                        ? "font-semibold"
                                        : "font-normal",
                                      "block truncate"
                                    )}
                                  >
                                    {type.name}
                                  </span>

                                  {selected ? (
                                    <span
                                      className={classNames(
                                        active ? "text-white" : "text-pastel",
                                        "absolute inset-y-0 left-0 flex items-center pl-1.5"
                                      )}
                                    >
                                      <CheckIcon
                                        className="h-5 w-5"
                                        aria-hidden="true"
                                      />
                                    </span>
                                  ) : null}
                                </>
                              )}
                            </Listbox.Option>
                          ))}
                        </Listbox.Options>
                      </Transition>
                    </div>
                  </>
                )}
              </Listbox>
            </div>
            <div className="mt-6 ">
              <Listbox value={selectedKg} onChange={setSelectedKg}>
                {({ open }) => (
                  <>
                    <Listbox.Label className="block text-sm font-medium text-gray-700">
                      Kirchgemeinde
                    </Listbox.Label>
                    <div className="relative mt-1">
                      <Listbox.Button className="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-pastel focus:outline-none focus:ring-1 focus:ring-pastel sm:text-sm">
                        <span className="block truncate">
                          {selectedKg.name}
                        </span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                          <SelectorIcon
                            className="h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                        </span>
                      </Listbox.Button>

                      <Transition
                        show={open}
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                          {kgs.map((kg) => (
                            <Listbox.Option
                              key={kg.id}
                              className={({ active }) =>
                                classNames(
                                  active
                                    ? "bg-pastel text-white"
                                    : "text-gray-900",
                                  "relative cursor-default select-none py-2 pl-8 pr-4"
                                )
                              }
                              value={kg}
                            >
                              {({ selected, active }) => (
                                <>
                                  <span
                                    className={classNames(
                                      selected
                                        ? "font-semibold"
                                        : "font-normal",
                                      "block truncate"
                                    )}
                                  >
                                    {kg.name}
                                  </span>

                                  {selected ? (
                                    <span
                                      className={classNames(
                                        active ? "text-white" : "text-pastel",
                                        "absolute inset-y-0 left-0 flex items-center pl-1.5"
                                      )}
                                    >
                                      <CheckIcon
                                        className="h-5 w-5"
                                        aria-hidden="true"
                                      />
                                    </span>
                                  ) : null}
                                </>
                              )}
                            </Listbox.Option>
                          ))}
                        </Listbox.Options>
                      </Transition>
                    </div>
                  </>
                )}
              </Listbox>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Datum
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="first-name"
                    id="first-name"
                    autoComplete="given-name"
                    className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-pastel focus:outline-none focus:ring-1 focus:ring-pastel sm:text-sm"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="last-name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Zeit
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="last-name"
                    id="last-name"
                    autoComplete="family-name"
                    className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-pastel focus:outline-none focus:ring-1 focus:ring-pastel sm:text-sm"
                  />
                </div>
              </div>
            </div>
            <div className="mt-6 ">
              <Combobox
                as="div"
                value={selectedPerson}
                onChange={setSelectedPerson}
                multiple
                name="mitwirkende"
              >
                <Combobox.Label className="block text-sm font-medium text-gray-700">
                  Mitwirkende
                </Combobox.Label>
                <div className="relative mt-1">
                  <Combobox.Input
                    className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-pastel focus:outline-none focus:ring-1 focus:ring-pastel sm:text-sm"
                    onChange={(event) => setQuery(event.target.value)}
                    displayValue={(people: any) =>
                      people
                        .map((person: any) => (person ? person.name : ""))
                        .join(", ")
                    }
                  />
                  <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                    <SelectorIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </Combobox.Button>

                  {filteredPeople.length > 0 && (
                    <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                      {filteredPeople.map((person) => (
                        <Combobox.Option
                          key={person.id}
                          value={person}
                          className={({ active }) =>
                            classNames(
                              "relative cursor-default select-none py-2 pl-3 pr-9",
                              active ? "bg-pastel text-white" : "text-gray-900"
                            )
                          }
                        >
                          {({ active, selected }) => (
                            <>
                              <span
                                className={classNames(
                                  "block truncate",
                                  selected && "font-semibold"
                                )}
                              >
                                {person.name}
                              </span>

                              {selected && (
                                <span
                                  className={classNames(
                                    "absolute inset-y-0 right-0 flex items-center pr-4",
                                    active ? "text-white" : "text-pastel"
                                  )}
                                >
                                  <CheckIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                </span>
                              )}
                            </>
                          )}
                        </Combobox.Option>
                      ))}
                    </Combobox.Options>
                  )}
                </div>
              </Combobox>
            </div>

            <div className="mt-6 ">
              <Listbox value={selectedBook} onChange={setSelectedBook}>
                {({ open }) => (
                  <>
                    <Listbox.Label className="block text-sm font-medium text-gray-700">
                      Liederbuch
                    </Listbox.Label>
                    <div className="relative mt-1">
                      <Listbox.Button className="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-pastel focus:outline-none focus:ring-1 focus:ring-pastel sm:text-sm">
                        <span className="block truncate">
                          {selectedBook.name}
                        </span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                          <SelectorIcon
                            className="h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                        </span>
                      </Listbox.Button>

                      <Transition
                        show={open}
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                          {books.map((book) => (
                            <Listbox.Option
                              key={book.id}
                              className={({ active }) =>
                                classNames(
                                  active
                                    ? "bg-pastel text-white"
                                    : "text-gray-900",
                                  "relative cursor-default select-none py-2 pl-8 pr-4"
                                )
                              }
                              value={book}
                            >
                              {({ selected, active }) => (
                                <>
                                  <span
                                    className={classNames(
                                      selected
                                        ? "font-semibold"
                                        : "font-normal",
                                      "block truncate"
                                    )}
                                  >
                                    {book.name}
                                  </span>

                                  {selected ? (
                                    <span
                                      className={classNames(
                                        active ? "text-white" : "text-pastel",
                                        "absolute inset-y-0 left-0 flex items-center pl-1.5"
                                      )}
                                    >
                                      <CheckIcon
                                        className="h-5 w-5"
                                        aria-hidden="true"
                                      />
                                    </span>
                                  ) : null}
                                </>
                              )}
                            </Listbox.Option>
                          ))}
                        </Listbox.Options>
                      </Transition>
                    </div>
                  </>
                )}
              </Listbox>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4">
              <div>
                <label
                  htmlFor="about"
                  className="block text-sm font-medium text-gray-700"
                >
                  Musikalisches
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
              </div>
              <div>
                <label
                  htmlFor="about"
                  className="block text-sm font-medium text-gray-700"
                >
                  Spezielles
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
            </div>
          </div>
        </div>

        <div className="pt-5">
          <div className="flex justify-end">
            <button
              type="button"
              className="rounded-2xl border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-pastel focus:ring-offset-2"
            >
              Abbrechen
            </button>
            <Link
              to="/views/planer/1"
              className="ml-3 inline-flex justify-center rounded-2xl border border-transparent bg-pastel py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-pastel focus:outline-none focus:ring-2 focus:ring-pastel focus:ring-offset-2"
            >
              Weiter
            </Link>
          </div>
        </div>
      </Form>
    </div>
  );
}
