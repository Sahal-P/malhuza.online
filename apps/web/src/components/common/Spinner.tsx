import cn from "classnames";
import { Loader } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import useLoading from "@/hooks/useLoading";

const spinnerVariants = cva("text-muted-foreground animate-spin", {
  variants: {
    size: {
      default: "h-4 w-4",
      sm: "h-2 w-2",
      lg: "h-6 w-6",
      icon: "h-10 w-10",
    },
  },
  defaultVariants: {
    size: "default",
  },
});
interface SpinnerProps extends VariantProps<typeof spinnerVariants> {}

const Spinner = ({ size }: SpinnerProps) => {
  return <Loader className={cn(spinnerVariants({ size }))} />;
};

export const CommonSpinner = () => {
  return (
    <div className="flex h-screen justify-center items-center">
      <Spinner size={"lg"} />
    </div>
  );
};

export const Loading = () => {
  const load = useLoading();
  if (load.isLoading) {
    return (
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-[9999999]">
        <Spinner size={"lg"} />
      </div>
    );
  }
};

export default Spinner;
