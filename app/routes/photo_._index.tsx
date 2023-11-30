import type { ActionFunction, MetaFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { setPhotoUserCookie } from "~/utils/session.server";

export const meta: MetaFunction = () => {
  return [{ title: "SC Technical App" }];
};

export const action: ActionFunction = async ({ request }) => {
  try {
    const data = await request.formData();
    const name = data.get("name") as string;
    const cookie = await setPhotoUserCookie({
      name,
    });
    return redirect("/photo/import", {
      headers: {
        "Set-Cookie": cookie,
      },
    });
  } catch (error) {
    return json({ message: "Error. Please try again" });
  }
};

export default function PhotoLoginPage() {
  const error = useActionData<typeof action>();
  return (
    <div className="h-screen flex flex-col md:flex-row gap-6">
      <div className="relative">
        <img
          src="/images/photo-landing.jpg"
          alt="Landing"
          className="max-h-[50vw] object-cover md:max-h-screen w-full md:max-w-none"
        />
        <a
          tabIndex={-1}
          target="_blank"
          href="https://unsplash.com/photos/black-nikon-dslr-camera-on-white-table-UCfTPw4nyr0?utm_content=creditShareLink&utm_medium=referral&utm_source=unsplash"
          className="absolute bottom-0 left-0 text-white text-sm p-4 opacity-50 hover:opacity-100"
          rel="noreferrer"
        >
          Photo by Damir Babacic on Unsplash
        </a>
      </div>
      <div className="relative flex flex-col justify-center p-8 gap-8 h-full flex-1 pb-20">
        <img
          src="/logo_sc.png"
          alt="SC Logo"
          className="-my-4 -mx-2"
          width={90}
          height={90}
        />
        <h1 className="text-red-600">SC Technical App</h1>
        <span className="border w-full" />
        <Form method="post" className="flex flex-col gap-4">
          <label htmlFor="name">Name</label>
          <input type="text" name="name" required />
          {error && <p className="text-red-600">{error.message}</p>}
          <button
            className="bg-red-600 text-white rounded w-full px-6 py-3 font-medium"
            type="submit"
          >
            Login
          </button>
        </Form>
        <span
          tabIndex={-1}
          className="absolute right-0 bottom-0 text-sm p-4 text-right text-gray-500"
        >
          Mini-Project Mode &copy; 2023 Lemasc
        </span>
      </div>
    </div>
  );
}
