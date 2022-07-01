import type {
  ActionFunction,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/node";
import { Links } from "@remix-run/react";
import { json, redirect } from "@remix-run/node";
import { Form, Link, useActionData, useSearchParams } from "@remix-run/react";
import * as React from "react";

import { getUserId, createUserSession } from "~/session.server";

import { createUser, getUserByEmail } from "~/models/user.server";
import { safeRedirect, validateEmail } from "~/utils";

import cloudsImg from "../images/woodwork.jpeg";

import stylesheetUrl from "../styles/home-animations.css";

export function links() {
  return [{ rel: "stylesheet", href: stylesheetUrl }];
}

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await getUserId(request);
  if (userId) return redirect("/");
  return json({});
};

interface ActionData {
  errors: {
    email?: string;
    password?: string;
  };
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  const redirectTo = "/onboard";

  if (!validateEmail(email)) {
    return json<ActionData>(
      { errors: { email: "Email is invalid" } },
      { status: 400 }
    );
  }

  if (typeof password !== "string" || password.length === 0) {
    return json<ActionData>(
      { errors: { password: "Password is required" } },
      { status: 400 }
    );
  }

  if (password.length < 8) {
    return json<ActionData>(
      { errors: { password: "Password is too short" } },
      { status: 400 }
    );
  }

  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    return json<ActionData>(
      { errors: { email: "A user already exists with this email" } },
      { status: 400 }
    );
  }

  const user = await createUser(email, password);

  return createUserSession({
    request,
    userId: user.id,
    remember: false,
    redirectTo,
  });
};

export const meta: MetaFunction = () => {
  return {
    title: "Sign Up",
  };
};

export default function Join() {
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") ?? undefined;
  const actionData = useActionData() as ActionData;
  const emailRef = React.useRef<HTMLInputElement>(null);
  const passwordRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (actionData?.errors?.email) {
      emailRef.current?.focus();
    } else if (actionData?.errors?.password) {
      passwordRef.current?.focus();
    }
  }, [actionData]);

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
        <div className="relative mx-auto w-full max-w-md px-8 pt-48">
          <h1 className="text-4xl tracking-tight text-primary sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
            <span className="block font-serif xl:inline">
              Herzlich Willkommen
            </span>
            <span className="block font-serif font-bold xl:inline">
              Zur Registrierung
            </span>
          </h1>
        </div>
      </header>
      <div className="relative mx-auto mt-12 w-full max-w-md px-8">
        <Form method="post" className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Adresse
            </label>
            <div className="mt-1">
              <input
                ref={emailRef}
                id="email"
                required
                autoFocus={true}
                name="email"
                type="email"
                autoComplete="email"
                aria-invalid={actionData?.errors?.email ? true : undefined}
                aria-describedby="email-error"
                className="w-full rounded border border-gray-500 px-2 py-1 text-lg"
              />
              {actionData?.errors?.email && (
                <div className="pt-1 text-red-700" id="email-error">
                  {actionData.errors.email}
                </div>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Passwort
            </label>
            <div className="mt-1">
              <input
                id="password"
                ref={passwordRef}
                name="password"
                type="password"
                autoComplete="new-password"
                aria-invalid={actionData?.errors?.password ? true : undefined}
                aria-describedby="password-error"
                className="w-full rounded border border-gray-500 px-2 py-1 text-lg"
              />
              {actionData?.errors?.password && (
                <div className="pt-1 text-red-700" id="password-error">
                  {actionData.errors.password}
                </div>
              )}
            </div>
          </div>

          <input type="hidden" name="redirectTo" value={redirectTo} />
          <button
            type="submit"
            className="w-full rounded-2xl bg-pastel  py-2 px-4 text-white hover:bg-pastel focus:bg-pastel"
          >
            Registrieren
          </button>
          <div className="flex items-center justify-center">
            <div className="text-center text-sm text-gray-500">
              Bereits registiert?{" "}
              <Link
                className="text-pastel underline"
                to={{
                  pathname: "/login",
                  search: searchParams.toString(),
                }}
              >
                Melden Sie sich an
              </Link>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
}
