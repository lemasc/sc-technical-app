import { Form } from "@remix-run/react";

export default function PhotoEditSession() {
  return (
    <div className="flex flex-col gap-4">
      <h2>Select Base Catalog</h2>
      <span>
        Please select your Adobe Lightroom catalog to start this edit session.
        For more information, contact your assistant.
      </span>
      <Form action="post">
        <button className="bg-blue-500 hover:bg-blue-600 px-6 py-3 font-medium rounded-md text-white w-full">
          Select File
        </button>
      </Form>
    </div>
  );
}
