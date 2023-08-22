import {
  CheckBadgeIcon,
  PencilSquareIcon,
  XCircleIcon,
} from "@heroicons/react/20/solid";
import { PhotoReview } from "./schema";

export const getIcon = (status?: PhotoReview["status"]) => {
  switch (status) {
    case "approved":
      return CheckBadgeIcon;
    case "needs-editing":
      return PencilSquareIcon;
    case "rejected":
      return XCircleIcon;
  }
};

export const getIconColor = (status: PhotoReview["status"]) => {
  return status === "approved"
    ? "text-green-500"
    : status === "rejected"
    ? "text-red-500"
    : "text-yellow-500";
};
