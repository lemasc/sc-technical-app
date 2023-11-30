import type { LoaderFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useLoaderData, useSubmit } from "@remix-run/react";
import { useEffect, useRef } from "react";
import { getDrives } from "~/utils/desktop/sd-card.server";

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

export const loader = async () => {
  return json(await getDrives());
};

export default function PhotoEditSession() {
  const refresh = useSubmit();
  const intervalId = useRef<NodeJS.Timeout>();
  const data = useLoaderData<typeof loader>();

  useEffect(() => {
    const refreshHandler = () => {
      if (intervalId.current) {
        clearInterval(intervalId.current);
      }
      console.log("Refresh");
      if (document.visibilityState === "visible") {
        refresh({});
      }
      intervalId.current = setInterval(refreshHandler, 1000 * 60);
    };
    refreshHandler();
    // Refresh when document is in focus.
    document.addEventListener("visibilitychange", refreshHandler);
    return () => {
      document.removeEventListener("visibilitychange", refreshHandler);
    };
  }, [refresh]);

  console.log(data);
  return (
    <div className="flex flex-col gap-4">
      <h2>Select target SD card drive.</h2>
      <span>
        Select the target SD card drive to import photos on this computer.
      </span>
      <Form method="post" className="space-y-4">
        <select className="w-full" name="drive">
          {data.map((drive) => (
            <option key={drive.device} value={safeURLString(drive.device)}>
              {drive.description} ({drive.mountpoints?.[0].path})
            </option>
          ))}
        </select>
        <div className="flex flex-col gap-2 flex-1">
          <button
            type="button"
            onClick={() => {
              refresh({});
            }}
            className="bg-slate-700 hover:bg-slate-800 px-6 py-3 font-medium rounded-md text-white w-full"
          >
            Refresh
          </button>

          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 px-6 py-3 font-medium rounded-md text-white w-full"
          >
            Select
          </button>
        </div>
      </Form>
    </div>
  );
}
