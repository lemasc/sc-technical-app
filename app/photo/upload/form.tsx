"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Combobox } from "@/components/composites/combobox";
import { DatePicker } from "@/components/composites/date-picker";
import { LoadingButton } from "@/components/composites/loading-button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/components/ui/use-toast";
import { useOverlayState } from "@/utils/overlay-state";
import { Sport } from "@/utils/sports-db/getSports";
import { Worker } from "@/utils/sports-db/workers";
import { useRouter } from "next/navigation";
import { createUploadSession } from "./action";
import { EventSelectRadioGroup } from "./events-select";
import { UploadFormSchema, uploadformSchema } from "./schema";

export function UploadForm({
  photographers,
  sports,
}: {
  photographers: Worker<"ONSITE">[];
  sports: Sport[];
}) {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<UploadFormSchema>({
    resolver: zodResolver(uploadformSchema),
  });

  const submitting = useOverlayState((state) => state.preventClose);

  async function onSubmit(data: UploadFormSchema) {
    try {
      useOverlayState.setState({ preventClose: true });
      const { id } = await createUploadSession(data);
      router.push(`/photo/upload/${id}`);
      useOverlayState.setState({ preventClose: false, open: false });
    } catch (err) {
      let description = err instanceof Error ? err.message : "Unknown error";
      toast({ title: "Error", description });
      useOverlayState.setState({ preventClose: false });
    }
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
                  return !(
                    new Date("2023-12-05") < date &&
                    new Date("2023-12-08") > date
                  );
                }}
              />
              <FormDescription>
                Date that this photographer has shot the photo set.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="event"
          render={({ field, formState }) => (
            <FormItem className="space-y-3">
              <FormLabel>Event</FormLabel>
              <ScrollArea className="h-[300px] w-full rounded-md border py-4 pl-4 pr-6">
                <FormControl>
                  <EventSelectRadioGroup field={field} sports={sports} />
                </FormControl>
              </ScrollArea>{" "}
              <FormDescription>
                Event that this photo set is taken at. If there are multiple
                events, please upload them separately.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <LoadingButton disabled={submitting} type="submit">
          Submit
        </LoadingButton>
      </form>
    </Form>
  );
}
