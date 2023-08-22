import {
  ArrowUturnLeftIcon,
  CheckIcon,
  PencilSquareIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import { useCallback } from "react";
import { setPhotoEntry } from "../store";
import { PhotoEntry, PhotoReview } from "../schema";
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
            description: "รูปภาพสว่างเกินไป",
          },
          {
            key: "underexposed",
            title: "Underexposed",
            description: "รูปภาพมืดเกินไป",
          },
          {
            key: "bad-white-balance",
            title: "Bad White Balance",
            description:
              "สมดุลสีขาวของภาพไม่ดี ภาพดูเย็นเกินไป (ฟ้าไป) หรืออุ่นเกินไป (แดงไป)",
          },
          {
            key: "crop-or-rotate",
            title: "Crop or Rotate",
            description: "รูปภาพนี้จำเป็นต้องมีการครอปหรือหมุนภาพ",
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
              "รูปภาพนี้คล้ายคลึงหรือซ้ำกับรูปอื่น ๆ ใน Collection นี้",
          },
          {
            key: "bad-subject",
            title: "Bad Subject",
            description:
              "ภาพนี้มีจุดเด่นหรือจุดสนใจที่ไม่ดี (จุดสนใจเบลอ จุดสนใจมีลักษณะหรือท่าทางไม่เหมาะสม ฯลฯ)",
          },
          {
            key: "bad-shooting",
            title: "Bad Shooting",
            description:
              "รูปภาพนี้ถ่ายไม่ดีจนไม่สามารถแก้ไขได้ (ภาพเบลอเนื่องจากหลุดโฟกัส แสงไม่ดี ฯลฯ)",
          },
          {
            key: "bad-composition",
            title: "Bad Composition",
            description: "รูปภาพนี้องค์ประกอบไม่ดี",
          },
          {
            key: "not-meaningful",
            title: "Not Meaningful",
            description:
              "รูปภาพนี้ไม่ได้เพิ่มคุณค่าหรืออธิบายบรรยากาศของกิจกรรม",
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
