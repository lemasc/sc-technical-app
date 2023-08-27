import { forwardRef } from "react";

type ButtonVariant = "outline" | "primary";

export type ButtonProps = {
  className: Record<ButtonVariant | "hover", string>;
  variant: ButtonVariant;
  Icon: React.ForwardRefExoticComponent<
    React.PropsWithoutRef<React.SVGProps<SVGSVGElement>> & {
      title?: string;
      titleId?: string;
    } & React.RefAttributes<SVGSVGElement>
  >;
  children: React.ReactNode;
  disabled?: boolean;
  isAnswerView?: boolean;
};

export const Button = forwardRef<
  HTMLButtonElement,
  ButtonProps & Omit<React.HTMLAttributes<HTMLButtonElement>, "className">
>(function Button(
  { variant, className, Icon, children, isAnswerView, ...props },
  ref
) {
  return (
    <button
      ref={ref}
      className={`px-6 py-3 rounded-lg text-sm font-medium transition-colors ${
        className[variant]
      } ${className["hover"]} ${
        props.disabled && variant !== "primary" ? "hidden" : "block"
      }`}
      {...props}
    >
      {Icon && <Icon className="w-5 h-5 mr-1 -mt-1 inline" />} {children}
    </button>
  );
});
