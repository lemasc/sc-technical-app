import type { LoaderFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { getPhotoUserCookie } from "~/utils/session.server";

export const loader: LoaderFunction = async ({ request }) => {
  const user = await getPhotoUserCookie(request);
  if (!user.editSession) {
    return redirect("/photo/edit/session/select");
  }
  return json({});
};

export default function PhotoEditSession() {
  return <div>Test</div>;
}
