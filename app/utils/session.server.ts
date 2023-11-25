/* eslint-disable @typescript-eslint/consistent-type-imports */
import { createCookie } from "@remix-run/node";
import { z } from "zod";

export const PhotoEditSessionSchema = z.object({
  catalogPath: z.string().min(3),
});
export const PhotoUserCookieSchema = z.object({
  name: z.string(),
  editSession: PhotoEditSessionSchema.optional(),
});

const photoUserCookie = createCookie("photo-user", {
  maxAge: 604_800,
});

export const getPhotoUserCookie = async (request: Request) => {
  let cookieString =
    request.headers.get("Cookie") ?? request.headers.get("Set-Cookie");
  if (process.env.ELECTRON === "1") {
    const { session } = require("electron") as typeof import("electron");
    cookieString = (
      await session.defaultSession.cookies.get({ name: "photo-user" })
    )
      .map((c) => `${c.name}=${c.value}`)
      .join("; ");
  }
  return PhotoUserCookieSchema.parse(await photoUserCookie.parse(cookieString));
};

export const setPhotoUserCookie = async (
  data: z.infer<typeof PhotoUserCookieSchema>
) => {
  const cookie = await photoUserCookie.serialize(
    PhotoUserCookieSchema.parse(data)
  );
  if (process.env.ELECTRON === "1") {
    const { session } = require("electron") as typeof import("electron");
    const { parse } = require("cookie") as typeof import("cookie");
    const parsed = parse(cookie);
    await session.defaultSession.cookies.set({
      url: "http://localhost",
      name: "photo-user",
      value: parsed["photo-user"],
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });
  }
  return cookie;
};
