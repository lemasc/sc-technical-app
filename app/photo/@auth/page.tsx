import { SignInButton } from "@/components/auth/SignInButton";
import { googleProvider } from "@/utils/auth/providers";
import Image from "next/image";

export default function SignInPage() {
  return (
    <div className="relative min-h-screen h-full bg-gray-50 w-full flex flex-col lg:flex-row lg:gap-6">
      <div className="flex flex-col items-center justify-center flex-grow w-full lg:max-w-xl gap-4 p-6 bg-[#da088d] text-center ">
        <Image
          src="/images/arun-games.png"
          width={300}
          height={300}
          alt="ARUN GAMES Logo"
          className="max-w-[150px] lg:max-w-none"
          draggable={false}
        />
        <span className="text-white font-semibold text-2xl max-w-sm">
          การแข่งขันกีฬาสาธิตราชภัฏสัมพันธ์ครั้งที่ 33 &quot;อรุณเกมส์&quot;
        </span>
        <span className="text-white opacity-90">
          วันที่ 6-8 ธันวาคม 2566 ณ มหาวิทยาลัยราชภัฏอุบลราชธานี
        </span>
      </div>
      <div className="flex flex-col justify-center p-8 gap-8 self-center h-full flex-1 pb-20">
        <Image
          src="/logo_sc.png"
          alt="SC Logo"
          className="-my-4 -mx-2"
          width={90}
          height={90}
        />
        <h1 className="text-red-600">SC Technical App</h1>
        <span className="border w-full" />
        <span className="text-lg font-medium">
          จัดการรูปภาพและวิดีโอในกิจกรรมต่าง ๆ จากทุกที่ได้อย่างง่ายดาย
        </span>
        <SignInButton provider={googleProvider} />
        <span
          tabIndex={-1}
          className="absolute right-0 bottom-0 text-sm p-4 text-right text-gray-500"
        >
          SATIT UBON GAMES VER. &copy; 2023 Lemasc
        </span>
      </div>
    </div>
  );
}
