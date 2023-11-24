import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { getPhotoUserCookie } from "~/utils/session.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  try {
    const user = await getPhotoUserCookie(request);
    return json({ name: user.name });
  } catch (err) {
    console.error(err);
    return json({ name: null });
  }
};
export default function PhotoLayout() {
  const data = useLoaderData<typeof loader>();
  return (
    <div>
      <nav className="border-b p-4 flex items-center gap-4">
        <img src="/logo_sc.png" width={50} height={50} alt="Logo" />
        <b className="text-lg text-red-500">SC Technical App</b>
        <div className="flex-grow"></div>
        <p>
          <b>Name:</b> {data.name}
        </p>
        <button className="bg-red-100 text-red-900 rounded-md px-4 py-2 text-sm font-medium hover:bg-red-200 transition-colors duration-200">
          Sign out
        </button>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
