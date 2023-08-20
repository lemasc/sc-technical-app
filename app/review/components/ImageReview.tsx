import {
  ArrowUturnLeftIcon,
  CheckIcon,
  PencilSquareIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import { PhotoEntry } from "../store";
import { Button } from "./Button";

export const ImageReview = ({ image }: { image: PhotoEntry }) => {
  return (
    <div className="py-4 flex flex-col gap-3">
      <b>Review and Flag:</b>
      <Button
        variant="outline"
        className={{
          hover: "hover:text-white hover:bg-green-600",
          primary: "bg-green-500 text-white",
          outline:
            "bg-white bg-opacity-10 text-green-500 border border-green-500",
        }}
        Icon={CheckIcon}
      >
        Approve
      </Button>
      <Button
        variant="outline"
        className={{
          hover: "hover:text-white hover:bg-yellow-600",
          primary: "bg-yellow-500 text-white",
          outline:
            "bg-white bg-opacity-10 text-yellow-500 border border-yellow-500",
        }}
        Icon={PencilSquareIcon}
      >
        Needs Editing
      </Button>
      <Button
        variant="outline"
        className={{
          hover: "hover:text-white hover:bg-red-600",
          primary: "bg-red-500 text-white hover:bg-red-600",
          outline: "bg-white bg-opacity-10 text-red-500 border border-red-500",
        }}
        Icon={XMarkIcon}
      >
        Reject
      </Button>
      <Button
        variant="outline"
        className={{
          hover: "hover:text-white hover:bg-gray-600",
          primary: "bg-gray-500 text-white",
          outline:
            "bg-white bg-opacity-10 text-gray-200 border border-gray-500",
        }}
        Icon={ArrowUturnLeftIcon}
      >
        Undo Flag
      </Button>
    </div>
  );
};
