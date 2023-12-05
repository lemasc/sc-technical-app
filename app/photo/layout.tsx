import { UserProfileBar } from "@/components/auth/UserProfileBar";
import { auth as nextAuth } from "@/utils/auth";
import Image from "next/image";
import { lazy, Suspense } from "react";

const UploadDialog = lazy(() => import("./upload/dialog"));

export default async function PhotoReviewLayout({
  children,
  browser,
  auth,
}: {
  children: React.ReactNode;
  browser: React.ReactNode;
  auth: React.ReactNode;
}) {
  const user = await nextAuth();
  if (!user) {
    return <>{auth}</>;
  }
  return (
    <div className="h-screen overflow-hidden bg-gray-50 w-full flex flex-col">
      <nav className="px-6 py-4 flex flex-row gap-4 items-center border-b">
        <Image priority src="/logo_sc.png" width={50} height={50} alt="Logo" />
        <h1 className="font-bold text-red-600 text-lg">Technical App</h1>
        <div className="flex flex-grow justify-end gap-4">
          <Suspense fallback={null}>
            <UploadDialog />
          </Suspense>
          <UserProfileBar user={user} />
        </div>
      </nav>
      <div className="flex flex-row flex-grow h-full pb-10">
        {browser && (
          <aside className="flex flex-col gap-4 w-full max-w-[16rem]">
            {browser}
          </aside>
        )}
        <main className="bg-white rounded-lg flex-grow px-6 py-8 m-4">
          {children}
        </main>
      </div>
    </div>
  );
}
