import {
  ArrowUturnLeftIcon,
  CheckIcon,
  PencilSquareIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import { useCallback } from "react";
import { PhotoEntry, PhotoReview, setPhotoEntry } from "../store";
import { Button } from "./Button";
import { ReviewReason } from "./ReviewReason";

export const ImageReview = ({ image }: { image: PhotoEntry }) => {
  const getVariant = useCallback(
    (status: PhotoReview["status"]) => {
      return status === image.review?.status ? "primary" : "outline";
    },
    [image]
  );
  const setReview = (review: PhotoReview | null) => {
    setPhotoEntry({
      ...image,
      review,
    });
  };

  return (
    <div className="py-4 flex flex-col gap-3">
      <b>Review and Flag:</b>
      <Button
        variant={getVariant("approved")}
        className={{
          hover: "hover:text-white hover:bg-green-600",
          primary: "bg-green-500 text-white",
          outline:
            "bg-white bg-opacity-10 text-green-500 border border-green-500",
        }}
        Icon={CheckIcon}
        onClick={() => setReview({ status: "approved" })}
      >
        Approve
      </Button>
      <ReviewReason
        variant={getVariant("needs-editing")}
        key={Math.random()}
        className={{
          hover: "hover:text-white hover:bg-yellow-600 w-full",
          primary: "bg-yellow-500 text-white",
          outline:
            "bg-white bg-opacity-10 text-yellow-500 border border-yellow-500",
        }}
        Icon={PencilSquareIcon}
        reasons={[
          {
            key: "overexposed",
            title: "Overexposed",
            description: "The image is too bright.",
          },
          {
            key: "underexposed",
            title: "Underexposed",
            description: "The image is too dark.",
          },
          {
            key: "bad-white-balance",
            title: "Bad White Balance",
            description:
              "The image has a bad white balance. (Too blue or red.)",
          },
          {
            key: "crop-or-rotate",
            title: "Crop or Rotate",
            description: "The image needs to be cropped or rotated.",
          },
        ]}
        image={image}
        onChange={(reason) => setReview({ status: "needs-editing", reason })}
      >
        Needs Editing
      </ReviewReason>
      <ReviewReason
        variant={getVariant("rejected")}
        key={Math.random()}
        className={{
          hover: "hover:text-white hover:bg-red-600 w-full",
          primary: "bg-red-500 text-white",
          outline: "bg-white bg-opacity-10 text-red-500 border border-red-500",
        }}
        Icon={XMarkIcon}
        reasons={[
          {
            key: "repetitive",
            title: "Repetitive",
            description:
              "The image is too similar to other images in the collection.",
          },
          {
            key: "bad-shooting",
            title: "Bad Shooting",
            description:
              "The image is poorly shot. (Bad focus, bad lightning, etc.)",
          },
          {
            key: "bad-composition",
            title: "Bad Composition",
            description: "The image is poorly composed.",
          },
          {
            key: "bad-subject",
            title: "Bad Subject",
            description:
              "The image has a bad subject. (Subject is blurred, unintended behavior, etc.)",
          },
          {
            key: "not-meaningful",
            title: "Not Meaningful",
            description:
              "The image is not meaningful and doesn't add value to the collection.",
          },
        ]}
        image={image}
        onChange={(reason) => setReview({ status: "rejected", reason })}
      >
        Reject
      </ReviewReason>
      {image.review?.status && (
        <Button
          variant="outline"
          className={{
            hover: "hover:text-white hover:bg-gray-600",
            primary: "bg-gray-500 text-white",
            outline:
              "bg-white bg-opacity-10 text-gray-200 border border-gray-500",
          }}
          Icon={ArrowUturnLeftIcon}
          onClick={() => setReview(null)}
        >
          Undo Flag
        </Button>
      )}
    </div>
  );
};
