type ButtonVariant = "outline" | "primary";

type ButtonProps = {
  className: Record<ButtonVariant | "hover", string>;
  variant: ButtonVariant;
  Icon: React.ForwardRefExoticComponent<
    React.PropsWithoutRef<React.SVGProps<SVGSVGElement>> & {
      title?: string;
      titleId?: string;
    } & React.RefAttributes<SVGSVGElement>
  >;
} & Omit<React.HTMLAttributes<HTMLButtonElement>, "className">;

export const Button = ({
  variant,
  className,
  Icon,
  children,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={`px-6 py-3 rounded-lg text-sm font-medium transition-colors ${className[variant]} ${className["hover"]}`}
      {...props}
    >
      {Icon && <Icon className="w-5 h-5 mr-1 -mt-1 inline" />} {children}
    </button>
  );
};
