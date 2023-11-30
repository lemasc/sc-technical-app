import type { LoaderFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getDrives, getSDCardFolders } from "~/utils/desktop/sd-card.server";

export const safeURLString = (str: string) => {
  return str.replace(/[^a-zA-Z0-9-_]/g, "");
};
export const action = async ({ request }: LoaderFunctionArgs) => {
  const data = await request.formData();
  const targetDrive = await getDrives().then((drives) =>
    drives.find((drive) => drive.device.includes(data.get("drive") as string))
  );
  if (data.get("drive")) {
    const mountpoint = safeURLString(
      targetDrive?.mountpoints?.[0].path as string
    );
    return redirect(`/photo/import/view?drive=${mountpoint}`);
  }
  return json([]);
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const drive = url.searchParams.get("drive");
  console.log(drive);
  if (typeof drive === "string" && drive.length === 1) {
    return json(await getSDCardFolders(drive));
  }
  return redirect("/photo/import");
};

export default function PhotoEditSession() {
  const data = useLoaderData<typeof loader>();

  console.log(data);
  return (
    <div className="flex flex-col gap-4">
      <h2>View SD card drive.</h2>
      <span>
        Select the target SD card drive to import photos on this computer.
      </span>
    </div>
  );
}
