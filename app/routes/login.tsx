import type {
  ActionFunction,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import {
  Form,
  Link,
  Links,
  useActionData,
  useSearchParams,
} from "@remix-run/react";
import * as React from "react";

import { createUserSession, getUserId } from "~/session.server";
import { verifyLogin } from "~/models/user.server";
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
  errors?: {
    email?: string;
    password?: string;
  };
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  const redirectTo = safeRedirect(formData.get("redirectTo"), "/onboard");
  const remember = formData.get("remember");

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

  const user = await verifyLogin(email, password);

  if (!user) {
    return json<ActionData>(
      { errors: { email: "Invalid email or password" } },
      { status: 400 }
    );
  }

  return createUserSession({
    request,
    userId: user.id,
    remember: remember === "on" ? true : false,
    redirectTo,
  });
};

export const meta: MetaFunction = () => {
  return {
    title: "Login",
  };
};

export default function LoginPage() {
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || "/onboard";
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
        <div className="relative mx-auto w-full max-w-md px-8 pt-64">
          <h1 className="text-4xl tracking-tight text-primary sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
            <span className="block font-serif xl:inline">
              Herzlich Willkommen
            </span>
            <span className="block font-serif font-bold xl:inline">
              Melden Sie sich an
            </span>
          </h1>
        </div>
      </header>
      <div className="relative  mx-auto mt-12 w-full max-w-md px-8">
        <Form method="post" className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email address
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
              Password
            </label>
            <div className="mt-1">
              <input
                id="password"
                ref={passwordRef}
                name="password"
                type="password"
                autoComplete="current-password"
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
            className="w-full rounded bg-pastel  py-2 px-4 text-white hover:bg-pastel focus:bg-pastel"
          >
            Log in
          </button>
          <div className="flex items-center justify-between">
            <div className="text-center text-sm text-gray-500">
              Noch kein Account?{" "}
              <Link
                className="text-pastel underline"
                to={{
                  pathname: "/join",
                  search: searchParams.toString(),
                }}
              >
                Registrieren
              </Link>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
}
