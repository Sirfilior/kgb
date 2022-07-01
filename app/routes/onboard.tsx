import { Form, Links, useLoaderData } from "@remix-run/react";
import {
  ActionFunction,
  json,
  LoaderFunction,
  redirect,
} from "@remix-run/node";
import { requireUserId } from "~/session.server";
import {
  getKirchgemeindenList,
  getKirchgemeindenForUser,
} from "~/models/gottesdienst.server";
import { setUserKirchgemeinde } from "~/models/user.server";

import cloudsImg from "../images/woodwork.jpeg";

import stylesheetUrl from "../styles/home-animations.css";

export function links() {
  return [{ rel: "stylesheet", href: stylesheetUrl }];
}

type LoaderData = {
  kirchgemeindenList: Awaited<ReturnType<typeof getKirchgemeindenList>>;
  userKirchgemeinden: Awaited<ReturnType<typeof getKirchgemeindenList>>;
};

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await requireUserId(request);
  const userKirchgemeinden = await getKirchgemeindenForUser({ userId });
  const kirchgemeindenList = await getKirchgemeindenList();
  return json<LoaderData>({ kirchgemeindenList, userKirchgemeinden });
};

type ActionData = {
  errors?: {
    title?: string;
    body?: string;
  };
};

export const action: ActionFunction = async ({ request }) => {
  const userId = await requireUserId(request);
  const formData = await request.formData();
  const selectedChurch = formData.getAll("selectedChurch");
  const churches = JSON.stringify(selectedChurch);
  await setUserKirchgemeinde(userId, JSON.parse(churches));

  return redirect(`/besucherlist`);
};

export default function Onboarding() {
  const { kirchgemeindenList, userKirchgemeinden } =
    useLoaderData() as LoaderData;
  return (
    <div className="relative flex min-h-full flex-col justify-center overflow-hidden">
      <Links />
      <header className="">
        <div className="absolute inset-0 flex justify-center">
          <div className="absolute h-[500px] w-[500px] -translate-y-[210px] transform overflow-hidden rounded-full border-4 border-bg ring-4 ring-pastel">
            <img
              className="homeImg absolute h-full max-w-none"
              alt="c"
              src={cloudsImg}
            />
          </div>
        </div>
        <div className="relative mx-auto w-full max-w-md px-8 pt-64">
          <h1 className="text-4xl tracking-tight text-primary sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
            <span className="block font-medium xl:inline">
              Ihre Kirchgemeinden
            </span>
            <span className="block font-extrabold xl:inline">auswählen</span>
          </h1>
        </div>
      </header>
      <div className="relative mx-auto w-full max-w-md px-8">
        <Form method="post" className="space-y-6">
          <input type="hidden" name="test" value="1" />
          <fieldset>
            <legend className="text-lg font-medium text-gray-900">
              Kirchgemeinde in Ihrer Nähe
            </legend>
            <div className="mt-4 divide-y divide-gray-200 border-t border-b border-gray-200">
              {kirchgemeindenList.map((kirche, Idx) => (
                <div key={Idx} className="relative flex items-start py-4">
                  <div className="min-w-0 flex-1 text-sm">
                    <label
                      htmlFor={`person-${kirche.id}`}
                      className="select-none font-medium text-gray-700"
                    >
                      {kirche.name}
                    </label>
                  </div>
                  <div className="ml-3 flex h-5 items-center">
                    <input
                      id={`person-${kirche.id}`}
                      value={kirche.id}
                      defaultChecked={userKirchgemeinden.some(
                        (k) => k.id === kirche.id
                      )}
                      name="selectedChurch"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-pastel focus:ring-pastel"
                    />
                  </div>
                </div>
              ))}
            </div>
          </fieldset>
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full rounded-2xl bg-pastel  py-2 px-4 text-white hover:bg-pastel focus:bg-pastel"
            >
              Abschliessen
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}
