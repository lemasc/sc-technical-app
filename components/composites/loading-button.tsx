import { Loader2 } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";

export const LoadingButton = React.forwardRef<
  React.ElementRef<typeof Button>,
  React.ComponentPropsWithoutRef<typeof Button>
>(({ children, variant, disabled, ...props }, ref) => (
  <Button disabled={disabled} variant={disabled ? "secondary" : variant}>
    {disabled && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
    {children}
  </Button>
));

LoadingButton.displayName = "LoadingButton";
