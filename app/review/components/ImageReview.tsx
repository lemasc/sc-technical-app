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
import { reasons, styles } from "../reasons";
import { useSearchParams } from "next/navigation";

export const ImageReview = ({
  image,
  isAnswerView,
}: {
  image: PhotoEntry;
  // Is this view showing the answer or the user's review?
  isAnswerView?: boolean;
}) => {
  const searchParams = useSearchParams();
  // If the URL has the answer param, don't allow the user to change the review.
  const showAnswer = searchParams.has("answer");
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
    <div className="pt-2 flex flex-col space-y-3">
      <b>{isAnswerView ? "Suggested Answer:" : "Review and Flag:"}</b>
      <Button
        variant={getVariant("approved")}
        className={styles["approved"]}
        Icon={CheckIcon}
        disabled={showAnswer}
        onClick={() => setReview({ status: "approved" })}
      >
        Approve
      </Button>
      <ReviewReason
        isAnswerView={isAnswerView}
        variant={getVariant("needs-editing")}
        key={Math.random()}
        className={styles["needs-editing"]}
        Icon={PencilSquareIcon}
        reasons={reasons["needs-editing"]}
        disabled={showAnswer}
        image={image}
        onChange={(reason) => setReview({ status: "needs-editing", reason })}
      >
        Needs Editing
      </ReviewReason>
      <ReviewReason
        isAnswerView={isAnswerView}
        variant={getVariant("rejected")}
        key={Math.random()}
        className={styles.rejected}
        Icon={XMarkIcon}
        reasons={reasons.rejected}
        disabled={showAnswer}
        image={image}
        onChange={(reason) => setReview({ status: "rejected", reason })}
      >
        Reject
      </ReviewReason>
      {image.review?.status && !showAnswer && (
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
