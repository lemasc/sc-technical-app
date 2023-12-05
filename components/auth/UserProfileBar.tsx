import { Session } from "next-auth";
import Image from "next/image";
import { SignOutButton } from "./SignOutButton";

export function UserProfileBar({ user }: { user: Session }) {
  return (
    <>
      <div className="flex flex-row items-center justify-center bg-white border border-gray-200 rounded-lg px-4 py-2">
        {user.user?.image && (
          <Image
            src={user.user?.image}
            width={96}
            height={96}
            className="w-6 h-6 rounded-full mr-2"
            alt="Profile"
          />
        )}
        <span className="font-medium text-sm">{user.user?.name}</span>
      </div>
      <SignOutButton />
    </>
  );
}
