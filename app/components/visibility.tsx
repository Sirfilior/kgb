import { Disclosure } from "@headlessui/react";

export default function VisibileButtons() {
  return (
    <fieldset>
      <div className="mt-4 space-y-4">
        <Disclosure>
          <Disclosure.Button className="relative flex items-start" as="div">
            <div className="flex h-5 items-center">
              <input
                id="visible"
                name="visibility"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-pastel focus:ring-pastel"
              />
            </div>

            <div className="ml-3 text-sm">
              <span className="font-medium text-gray-700">
                Sichtbar für Teilnehmer/innen
              </span>
              <p className="text-gray-500">
                Besucher sehen diesen Abschnitt in der App
              </p>
            </div>
          </Disclosure.Button>
          <Disclosure.Panel>
            <div className="relative flex items-start">
              <div className="flex h-5 items-center">
                <input
                  id="beforeG"
                  name="start"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-pastel focus:ring-pastel"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="beforeG" className="font-medium text-gray-700">
                  Vor Gottesdienst
                </label>
              </div>
            </div>
            <div className="relative flex items-start">
              <div className="flex h-5 items-center">
                <input
                  id="duringG"
                  name="start"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-pastel focus:ring-pastel"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="duringG" className="font-medium text-gray-700">
                  Während des Gottesdienstes
                </label>
              </div>
            </div>
            <div className="relative flex items-start">
              <div className="flex h-5 items-center">
                <input
                  id="afterG"
                  name="start"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-pastel focus:ring-pastel"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="afterG" className="font-medium text-gray-700">
                  Nach dem Gottesdienst
                </label>
              </div>
            </div>
          </Disclosure.Panel>
        </Disclosure>
      </div>
    </fieldset>
  );
}
