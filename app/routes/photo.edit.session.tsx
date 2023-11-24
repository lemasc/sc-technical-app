import type { MetaFunction } from "@remix-run/node";
import { Outlet } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [{ title: "Photo Edit Session - SC Technical App" }];
};

export default function PhotoEditSession() {
  return (
    <div className="flex flex-col">
      <div className="relative">
        <img
          src="/images/photo-edit-session.jpg"
          alt="Edit Session"
          className="max-h-[50vw] object-cover md:max-h-screen w-full md:max-w-none"
        />
        <a
          tabIndex={-1}
          target="_blank"
          href="https://unsplash.com/photos/black-ipad-RuTMP0iI_ek?utm_content=creditShareLink&utm_medium=referral&utm_source=unsplash"
          className="absolute top-0 left-0 p-3 text-white text-xs opacity-75 hover:opacity-100"
          rel="noreferrer"
        >
          Photo by Jye B on Unsplash
        </a>
        <h1 className="absolute drop-shadow p-6 left-0 bottom-0 text-white select-none">
          Photo Edit Session
        </h1>
      </div>
      <div className="px-6 py-8">
        <Outlet />
      </div>
    </div>
  );
}
