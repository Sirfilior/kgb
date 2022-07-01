import { Form, Link } from "@remix-run/react";
import clsx from "clsx";
import { Gottesdienst } from "~/models/user.server";

export default function Bevorstehend({
  view,
  gottesdienste,
}: {
  view: string;
  gottesdienste: Gottesdienst[] | null;
}) {
  return (
    <div className="mt-4">
      <h2 className="flex items-center gap-3">
        <span className="h-0.5 w-5 bg-pastel"></span>
        <span className="text-xl">
          {view === "visitor"
            ? "Meine nächsten Gottesdienste"
            : "Bevorstehende Gottesdienste"}
        </span>
      </h2>
      <div className="mx-auto mt-4 grid max-w-none grid-cols-1 gap-5 sm:grid-cols-2">
        {gottesdienste &&
          gottesdienste.map((post) => (
            <div
              key={post.title}
              className="flex justify-between rounded-lg bg-white p-6 shadow-lg"
            >
              <div className="flex flex-col justify-between">
                <div className="flex-1">
                  <p className="text-sm font-thin">{post.date}</p>
                  <p className="text-sm font-thin">{post.place}</p>
                  <div className="mt-2 block">
                    <p className="text-md font-medium text-pastel">
                      {post.title}
                    </p>
                    <p className="mt-3 text-base text-gray-500">
                      {post.entries} nehmen teil
                    </p>
                  </div>
                </div>
              </div>
              {view === "visitor" ? (
                <VisitorBtn post={post} />
              ) : (
                <EditorBtn post={post} />
              )}
            </div>
          ))}
      </div>
    </div>
  );
}

function EditorBtn({ post }: { post: any }) {
  return (
    <div className="flex flex-col justify-between">
      <span className="inline-flex items-center justify-center rounded-2xl bg-gray-100 px-2.5 py-0.5 text-sm font-medium text-gray-800">
        {post.running ? "Veröffentlicht" : "Entwurf"}
      </span>
      <div className="flex flex-col gap-2">
        <Link
          to={`/views/planer/${post.id}/`}
          type="button"
          className="inline-flex min-w-[110px] items-center justify-center rounded-2xl border border-transparent bg-pastel px-2.5 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-pastel-dark focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          {post.running ? "Anzeigen" : "Bearbeiten"}
        </Link>
        {!post.running && (
          <Form method="post" action="/planerlist">
            <button
              type="submit"
              name="start"
              value={post.id}
              className="inline-flex min-w-[110px] items-center justify-center rounded-2xl  border border-transparent bg-pastel px-2.5 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-pastel-dark focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Beginnen
            </button>
          </Form>
        )}
      </div>
    </div>
  );
}

function VisitorBtn({ post }: { post: any }) {
  return (
    <div className="flex flex-col gap-3">
      <Link
        to={`/views/besucher/${post.id}/`}
        className={clsx(
          "inline-flex items-center justify-center rounded-md  bg-pastel px-2.5 py-0.5 text-sm font-medium text-white"
        )}
      >
        Zum Gottesdienst
      </Link>
    </div>
  );
}
