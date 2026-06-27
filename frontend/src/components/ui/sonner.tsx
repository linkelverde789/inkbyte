import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      className="toaster group"
      position="bottom-right"
      offset={24}
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-2 group-[.toaster]:border-foreground group-[.toaster]:rounded-none group-[.toaster]:shadow-[6px_6px_0_var(--color-secondary)] group-[.toaster]:font-[family-name:Nunito_Sans]",
          title:
            "group-[.toast]:font-[family-name:Lora] group-[.toast]:text-base group-[.toast]:tracking-tight",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground group-[.toast]:rounded-none group-[.toast]:border-2 group-[.toast]:border-foreground",
          cancelButton:
            "group-[.toast]:bg-secondary group-[.toast]:text-secondary-foreground group-[.toast]:rounded-none",
          success: "group-[.toaster]:shadow-[6px_6px_0_var(--color-primary)]",
          error:
            "group-[.toaster]:shadow-[6px_6px_0_var(--color-destructive)] group-[.toaster]:border-destructive",
          warning: "group-[.toaster]:shadow-[6px_6px_0_var(--color-accent)]",
          info: "group-[.toaster]:shadow-[6px_6px_0_var(--color-secondary)]",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };

{
  /* <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      {...props}
    /> */
}
