import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import app from ".";

export const loader: LoaderFunction = async ({ request, context }) => {
  return app.fetch(request, context);
};

export const action: ActionFunction = async ({ request, context }) => {
  return app.fetch(request, context);
};
