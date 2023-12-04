"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/utils";
import { FormControl } from "../ui/form";

export type ComboboxProps<T> = {
  name: string;
  selected: string;
  data: T[];
  getLabel: (item: T) => string;
  getValue: (item: T) => string;
  setValue: (value: string) => void;
};
export function Combobox<T>({
  name,
  selected,
  data,
  getLabel,
  getValue,
  setValue,
}: ComboboxProps<T>) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {selected
              ? getLabel(data.find((item) => getValue(item) === selected)!)
              : `Select ${name}...`}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0" align="start">
        <Command>
          <CommandInput placeholder={`Search ${name}...`} />
          <CommandEmpty>No {name} found.</CommandEmpty>
          <CommandGroup>
            {data.map((item) => (
              <CommandItem
                key={getValue(item)}
                value={getValue(item)}
                onSelect={(currentValue) => {
                  setValue(currentValue === selected ? "" : currentValue);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    selected === getValue(item) ? "opacity-100" : "opacity-0"
                  )}
                />
                {getLabel(item)}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
