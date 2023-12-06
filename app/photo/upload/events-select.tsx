import { format, isSameDay } from "date-fns";

import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Sport } from "@/utils/sports-db/getSports";
import { useCallback, useEffect, useRef, useState } from "react";
import { ControllerRenderProps, useFormContext } from "react-hook-form";
import { UploadFormSchema } from "./schema";

export const EventSelectRadioGroup = ({
  field,
  sports,
}: {
  sports: Sport[];
  field: ControllerRenderProps<UploadFormSchema, "event">;
}) => {
  const { watch, getValues } = useFormContext<UploadFormSchema>();
  const [selectableSports, setSelectableSports] = useState<Sport[]>(sports);

  const lastSnapshot = useRef<Pick<UploadFormSchema, "date" | "event">>();

  const filterSports = useCallback(() => {
    const values = getValues();
    const date = values.date;
    const currentSport = values.event;
    if (!date) {
      return setSelectableSports(sports);
    }
    if (
      lastSnapshot.current?.date === date &&
      lastSnapshot.current?.event === values.event
    ) {
      return;
    }
    let shouldUnselect = false;
    const filteredSports = sports.filter((sport) => {
      const result =
        sport["Start Date"].valueOf() <= date.valueOf() &&
        sport["End Date"].valueOf() >= date.valueOf();
      if (currentSport === sport.Name && !result) {
        shouldUnselect = true;
      }
      return result;
    });
    if (shouldUnselect) {
      field.onChange(undefined);
    }
    lastSnapshot.current = { date, event: currentSport };
    return setSelectableSports(filteredSports);
  }, [sports, getValues, field]);

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if ((name === "date" || name === "event") && type === "change") {
        filterSports();
      }
    });
    return () => subscription.unsubscribe();
  }, [filterSports, watch]);
  return (
    <RadioGroup
      onValueChange={field.onChange}
      defaultValue={field.value}
      className="grid grid-cols-2 gap-3"
    >
      {selectableSports.map((sport) => (
        <FormItem
          key={sport.Name}
          className="flex items-center space-x-3 space-y-0 border border-muted-foreground p-4 rounded-lg hover:bg-slate-100 transition-colors group"
        >
          <FormControl>
            <RadioGroupItem value={sport.Name} />
          </FormControl>
          <div className="flex flex-col gap-1.5">
            <FormLabel className="font-semibold">{sport.Name}</FormLabel>
            <span className="text-xs">
              {format(sport["Start Date"], "d MMMM")}
              {!isSameDay(sport["Start Date"], sport["End Date"]) &&
                " - " + format(sport["End Date"], "d MMMM")}
            </span>
          </div>
        </FormItem>
      ))}
    </RadioGroup>
  );
};
