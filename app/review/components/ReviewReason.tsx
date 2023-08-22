import { Disclosure, RadioGroup } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/20/solid";
import { useEffect, useRef } from "react";
import { PhotoEntry, PhotoReview, reviewPhotoStore } from "../store";
import { Button, ButtonProps } from "./Button";

export type ReviewReasonObject = {
  key: string;
  title: string;
  description: string;
};

const AutoClose = ({
  close,
  variant,
}: {
  close: () => void;
} & Pick<ButtonProps, "variant">) => {
  const previousVariant = useRef<ButtonProps["variant"]>(variant);
  useEffect(() => {
    const changes = previousVariant.current !== variant;
    if (changes) {
      close();
    }

    previousVariant.current = variant;
  }, [variant, close]);
  return null;
};

export const ReviewReason = ({
  reasons,
  image,
  onChange,
  ...props
}: ButtonProps & {
  reasons: ReviewReasonObject[];
  image: PhotoEntry;
  onChange?: (reason: ReviewReasonObject["key"]) => void;
}) => {
  return (
    <Disclosure
      as={"div"}
      defaultOpen={props.variant === "primary"}
      className={`rounded-b-lg bg-opacity-20 ${props.className["primary"]} w-full`}
    >
      {({ open, close }) => (
        <>
          <AutoClose close={close} variant={props.variant} />
          <Disclosure.Button
            as={Button}
            {...props}
            variant={
              props.variant === "primary" || open ? "primary" : "outline"
            }
          />
          <Disclosure.Panel
            onChange={onChange}
            value={image.review?.reason}
            as={RadioGroup}
            className="p-4 space-y-4 text-sm"
          >
            <RadioGroup.Label>Select a reason:</RadioGroup.Label>
            <div className="flex flex-col gap-4">
              {reasons.map((reason) => (
                <RadioGroup.Option
                  key={reason.key}
                  value={reason.key}
                  className={({ checked }) =>
                    `${checked ? props.className["primary"] : "bg-white"}
                    relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none`
                  }
                >
                  {({ checked }) => (
                    <>
                      <div className="flex w-full items-center justify-between">
                        <div className="flex items-center">
                          <div className="text-sm">
                            <RadioGroup.Label
                              as="p"
                              className={`font-medium  ${
                                checked ? "text-white" : "text-gray-900"
                              }`}
                            >
                              {reason.title}
                            </RadioGroup.Label>
                            <RadioGroup.Description
                              as="span"
                              className={`inline font-thai ${
                                checked ? "text-sky-100" : "text-gray-500"
                              }`}
                            >
                              {reason.description}
                            </RadioGroup.Description>
                          </div>
                        </div>
                        {checked && (
                          <div className="shrink-0 text-white">
                            <CheckIcon className="h-6 w-6" />
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </RadioGroup.Option>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};
