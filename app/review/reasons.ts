import { ButtonProps } from "./components/Button";
import { ReviewReasonObject } from "./components/ReviewReason";
import { PhotoReview } from "./schema";

export const reasons: Record<PhotoReview["status"], ReviewReasonObject[]> = {
  approved: [],
  "needs-editing": [
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
  ],
  rejected: [
    {
      key: "repetitive",
      title: "Repetitive",
      description: "รูปภาพนี้คล้ายคลึงหรือซ้ำกับรูปอื่น ๆ ใน Collection นี้",
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
      description: "รูปภาพนี้ไม่ได้เพิ่มคุณค่าหรืออธิบายบรรยากาศของกิจกรรม",
    },
  ],
};

export const styles: Record<PhotoReview["status"], ButtonProps["className"]> = {
  approved: {
    hover: "hover:text-white hover:bg-green-600",
    primary: "bg-green-500 text-white",
    outline: "bg-white bg-opacity-10 text-green-500 border border-green-500",
  },
  "needs-editing": {
    hover: "hover:text-white hover:bg-yellow-600 w-full",
    primary: "bg-yellow-500 text-white",
    outline: "bg-white bg-opacity-10 text-yellow-500 border border-yellow-500",
  },
  rejected: {
    hover: "hover:text-white hover:bg-red-600 w-full",
    primary: "bg-red-500 text-white",
    outline: "bg-white bg-opacity-10 text-red-500 border border-red-500",
  },
};
