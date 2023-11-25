import { Form } from "@remix-run/react";

export default function PhotoEditSession() {
  return (
    <div className="flex flex-col gap-4">
      <h2>Select Base Catalog</h2>
      <span>
        Please select your Adobe Lightroom catalog to start this edit session.
        For more information, contact your assistant for catalog file to select.
      </span>
      <Form method="post">
        <button className="bg-slate-700 hover:bg-slate-800 px-6 py-3 font-medium rounded-md text-white w-full">
          Select File
        </button>
      </Form>
    </div>
  );
}
