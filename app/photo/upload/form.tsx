"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Combobox } from "@/components/composites/combobox";
import { DatePicker } from "@/components/composites/date-picker";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Worker } from "@/utils/sports-db/workers";
import { UploadFormSchema, uploadformSchema } from "./schema";
//import { toast } from "@/components/ui/use-toast";

export function UploadForm({
  photographers,
}: {
  photographers: Worker<"ONSITE">[];
}) {
  const form = useForm<UploadFormSchema>({
    resolver: zodResolver(uploadformSchema),
  });

  function onSubmit(data: UploadFormSchema) {
    console.log(data);
    /*toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });*/
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 pt-2">
        <FormField
          control={form.control}
          name="photographer"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Photographer</FormLabel>
              <Combobox
                name="photographer"
                data={photographers}
                selected={field.value}
                getLabel={(item) => `${item.Nickname} (${item.Name})`}
                getValue={(item) => item.Nickname}
                setValue={field.onChange}
              />
              <FormDescription>
                Select the photographer who shoot this photo set.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date taken</FormLabel>
              <DatePicker
                selected={field.value}
                onSelect={field.onChange}
                initialFocus
                disabled={(date) => {
                  return new Date("2023-12-04") >= date;
                }}
              />
              <FormDescription>
                Date that this photographer has shot the photo set.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
