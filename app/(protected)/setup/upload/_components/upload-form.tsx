"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useCallback, useState, useTransition } from "react";
import Dropzone, { FileRejection } from "react-dropzone";
import { Image, Loader2, MousePointerSquareDashed } from "lucide-react";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { uploadFile } from "@/actions/upload-action";

export const UploadForm = () => {
  const searchParams = useSearchParams();
  const businessId = searchParams.get("businessId");
  if (!businessId) {
    throw new Error("Business ID not found");
  }
  const [isDragOver, setIsDragOver] = useState<boolean>(false);

  const { mutate, isPending } = useMutation({
    mutationFn: uploadFile,
    onSuccess: () => {
      toast.success("File uploaded successfully", {
        id: "file-upload",
      });
    },
    onError: (error: Error) => {
      toast.error("File upload failed", {
        id: "file-upload",
      });
    },
  });

  const onDropRejected = (rejectedFiles: FileRejection[]) => {
    const [file] = rejectedFiles;
    setIsDragOver(false);
    toast.error(`${file.file.type} type is not supported.`, {
      description: "Please upload a CSV file instead.",
      id: "file-upload",
    });
  };

  const onDropAccepted = useCallback(
    (acceptedFiles: File[]) => {
      toast.loading("Uploading file...", {
        id: "file-upload",
      });

      const formData = new FormData();
      formData.append("file", acceptedFiles[0]);
      formData.append("business_profile_id", businessId);
      mutate(formData);
    },
    [mutate]
  );
  return (
    <Card className="lg:max-w-screen-sm w-full">
      <CardHeader>
        <CardTitle>Upload your data</CardTitle>
        <CardDescription>Drag and drop your data here</CardDescription>
      </CardHeader>
      <CardContent>
        <div
          className={cn(
            "relative h-full flex-1 my-16 w-full border border-muted-foreground p-6 rounded-xl  bg-gray-900/5  ring-1 ring-inset ring-gray-900/10 lg:rounded-2xl flex justify-center flex-col items-center",
            {
              "ring-blue-900/25 bg-blue-900/10": isDragOver,
            }
          )}
        >
          <div className="relative flex flex-1 flex-col items-center justify-center w-full">
            <Dropzone
              onDropRejected={onDropRejected}
              onDropAccepted={onDropAccepted}
              accept={{
                "application/csv": [".csv"],
              }}
              onDragEnter={() => setIsDragOver(true)}
              onDragLeave={() => setIsDragOver(false)}
            >
              {({ getRootProps, getInputProps }) => (
                <div
                  className="h-full w-full flex-1 flex flex-col items-center justify-center"
                  {...getRootProps()}
                >
                  <input {...getInputProps()} />
                  {isDragOver ? (
                    <MousePointerSquareDashed className="h-6 w-6 text-zinc-500 mb-2" />
                  ) : isPending ? (
                    <Loader2 className="animate-spin h-6 w-6 text-zinc-500 mb-2" />
                  ) : (
                    <Image className="h-6 w-6 text-zinc-500 mb-2" />
                  )}
                  <div className="flex flex-col justify-center mb-2 text-sm text-zinc-700">
                    {isPending ? (
                      <div className="flex flex-col items-center">
                        <p>Uploading...</p>
                      </div>
                    ) : isDragOver ? (
                      <p>
                        <span className="font-semibold">Drop file</span> to
                        upload
                      </p>
                    ) : (
                      <p>
                        <span className="font-semibold">Click to upload</span>{" "}
                        or drag and drop
                      </p>
                    )}
                  </div>

                  {isPending ? null : (
                    <p className="text-xs text-zinc-500">only CSV</p>
                  )}
                </div>
              )}
            </Dropzone>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
