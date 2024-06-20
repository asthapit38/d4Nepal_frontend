import { Skeleton } from "./ui/skeleton";

export const FormInputSkeleton = () => {
  return (
    <div className="flex flex-col gap-2">
      <Skeleton className="w-16 h-2" />
      <Skeleton className="w-full h-8" />
    </div>
  );
};

export const ButtonSkeleton = () => {
  return <Skeleton className="w-full h-8 mt-4" />;
};
