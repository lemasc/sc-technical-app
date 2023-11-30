import type { MetaFunction } from "@remix-run/node";
import { Outlet } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [{ title: "Photo Edit Session - SC Technical App" }];
};

export default function PhotoEditSession() {
  return (
    <div className="flex flex-col lg:flex-row h-full flex-1">
      <div className="relative">
        <img
          src="/images/photo-import.jpg"
          alt="Import"
          className="h-full object-cover w-full lg:w-[50vw]"
        />
        <a
          tabIndex={-1}
          target="_blank"
          href="https://unsplash.com/photos/person-holding-black-and-silver-laptop-computer-GRnU60VzBnE?utm_content=creditShareLink&utm_medium=referral&utm_source=unsplash"
          className="absolute top-0 left-0 p-3 text-white text-xs opacity-75 hover:opacity-100"
          rel="noreferrer"
        >
          Photo by Samsung Memory on Unsplash
        </a>
        <h1 className="z-20 absolute drop-shadow p-6 left-0 bottom-0 text-white select-none">
          Photo Import
        </h1>
        <div className="absolute bottom-0 z-10 w-full bg-gradient-to-b from-transparent to-black h-full opacity-40"></div>
      </div>
      <div className="px-6 py-8 flex-grow flex-1 flex-shrink-0">
        <Outlet />
      </div>
    </div>
  );
}
