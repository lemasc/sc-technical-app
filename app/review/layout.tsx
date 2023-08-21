import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SC Photo Review",
};

export default function PhotoReview({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-gradient-to-b from-slate-900 to-black min-h-screen h-full text-white">
      {children}
    </div>
  );
}
