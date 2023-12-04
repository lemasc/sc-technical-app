import { ShownClientOnly } from "@/components/shown-client-only";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getOnsiteWorkers } from "@/utils/sports-db/workers";
import { UploadForm } from "./form";

export default async function UploadDialog() {
  const photographers = (await getOnsiteWorkers()).filter((v) =>
    v.Section.includes("Photographer")
  );
  return (
    <ShownClientOnly>
      <Dialog>
        <DialogTrigger asChild>
          <Button>Upload</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload</DialogTitle>
            <DialogDescription>
              Upload photos and videos to the current workspace.
            </DialogDescription>
            <UploadForm photographers={photographers} />
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </ShownClientOnly>
  );
}
