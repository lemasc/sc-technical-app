import {
  string,
  object,
  number,
  date,
  Output,
  coerce,
  optional,
  transform,
} from "valibot";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

const dayjsDate = coerce(date(), (value) => {
  if (typeof value === "string") {
    return dayjs(value, "YYYY:MM:DD HH:mm:ss").toDate();
  }
  return value as Date;
});

const numberConstructor = coerce(number(), (value) => {
  if (value instanceof Number) {
    return value.valueOf();
  }
  return value as number;
});

export const ExifMetadata = object({
  Make: string(),
  Model: string(),
  DateTimeOriginal: dayjsDate,
  Software: optional(string()),
  FNumber: transform(numberConstructor, (number) => {
    // Convert APEX units to readable human format (f/2.8)
    const value = Math.round(10 * Math.pow(2, number / 2)) / 10;
    return `f/${value.toFixed(1)}`;
  }),
  ShutterSpeedValue: transform(number(), (number) => {
    // Convert APEX units to readable human format (1/250)
    const denominator = Math.pow(2, number);
    return `1/${Math.round(denominator)} sec`;
  }),
  ISOSpeedRatings: numberConstructor,
});

export type ExifMetadataType = Output<typeof ExifMetadata>;
