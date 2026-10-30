import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio";
import { cn } from "@/lib/utils";

// Responsive, styled, future-ready wrapper
const AspectRatio = ({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof AspectRatioPrimitive.Root>) => {
  return (
    <AspectRatioPrimitive.Root
      className={cn(
        "overflow-hidden rounded-xl bg-muted dark:bg-muted p-0 m-0",
        className
      )}
      {...props}
    >
      {children}
    </AspectRatioPrimitive.Root>
  );
};

export { AspectRatio };
