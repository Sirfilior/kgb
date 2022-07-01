import { StarIcon, HeartIcon, ChatIcon } from "@heroicons/react/solid";
import { Link } from "@remix-run/react";
import clsx from "clsx";
import { Gottesdienst } from "~/models/user.server";

export default function Vergangen({
  view,
  gottesdienste,
}: {
  view: string;
  gottesdienste: Gottesdienst[];
}) {
  return (
    <div className="mt-12">
      <h2 className="flex items-center gap-3">
        <span className="h-0.5 w-5 bg-pastel"></span>
        <span className="text-xl">
          {view === "visitor"
            ? "Besuchte Gottesdienste"
            : "Vergangene Gottesdienste"}
        </span>
      </h2>
      <div className="mx-auto mt-4 grid max-w-none grid-cols-1 gap-5 pb-4 sm:grid-cols-2">
        {gottesdienste
          .filter((g) => g.liked && !g.running)
          .map((gottesdienste) => (
            <div
              key={gottesdienste.title}
              className="flex justify-between rounded-2xl bg-white p-6 shadow-lg"
            >
              <div className="flex flex-col justify-between">
                <div className="flex-1">
                  <p className="text-sm font-thin">{gottesdienste.date}</p>
                  <p className="text-sm font-thin">{gottesdienste.place}</p>
                  <div className="mt-2 block">
                    <p className="text-md font-medium text-pastel">
                      {gottesdienste.title}
                    </p>
                    <p className="mt-3 text-base text-gray-500">
                      {gottesdienste.entries} nehmen teil
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end justify-between">
                <StarIcon
                  className={clsx(
                    "h-7 w-7 flex-shrink-0 cursor-pointer hover:text-yellow-500",
                    gottesdienste.liked ? "text-yellow-500" : "text-gray-300"
                  )}
                  aria-hidden="true"
                />
                <div className="flex flex-col gap-2">
                  <div className="flex gap-4">
                    <div className="flex items-center gap-1">
                      <span className="text-gray-500">
                        {gottesdienste.comments}
                      </span>
                      <ChatIcon className="h-5 w-5 flex-shrink-0 text-gray-300" />
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-gray-500">
                        {gottesdienste.likes}
                      </span>
                      <HeartIcon className="h-5 w-5 flex-shrink-0 text-gray-300" />
                    </div>
                  </div>
                  <Link
                    to={`/views/besucher/${gottesdienste.id}`}
                    type="button"
                    className="inline-flex items-center justify-center rounded-2xl border border-transparent bg-pastel px-2.5 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-pastel-dark focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Anzeigen
                  </Link>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
