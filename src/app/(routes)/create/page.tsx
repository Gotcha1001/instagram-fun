"use client";
import { postEntry } from "@/actions";
import { Button, TextArea } from "@radix-ui/themes";
import { CloudUploadIcon, SendIcon, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

export default function CreatePage() {
  const [imageUrl, setImageUrl] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (file) {
      setIsUploading(true);
      const data = new FormData();
      data.set("file", file);

      toast.promise(
        fetch("/api/upload", {
          method: "POST",
          body: data,
        })
          .then((response) => {
            if (!response.ok) throw new Error("Upload failed");
            return response.json();
          })
          .then((url) => {
            setImageUrl(url);
            return url;
          })
          .finally(() => {
            setIsUploading(false);
          }),
        {
          loading: "Uploading your image...",
          success: "✨ Image uploaded successfully!",
          error: "❌ Upload failed. Please try again.",
        }
      );
    }
  }, [file]);

  return (
    <>
      {/* <CustomToast />  */}
      <form
        action={async (data) => {
          const id = await postEntry(data);
          toast.success("Your post has been published!", {
            duration: 4000,
            icon: "🚀",
          });
          router.push("/profile");
          router.refresh();
        }}
        className="flex flex-col items-center rounded-xl gradient-background2 gap-4"
      >
        <input type="hidden" name="image" value={imageUrl} />
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <div className="w-64 min-h-64 p-2 bg-gray-400 mt-4 rounded-md relative">
              {imageUrl && (
                <img
                  className="rounded-md"
                  src={imageUrl}
                  alt="Upload preview"
                />
              )}
              <div className="absolute inset-0 flex items-center justify-center">
                <input
                  onChange={(ev) => setFile(ev.target.files?.[0] || null)}
                  className="hidden"
                  type="file"
                  ref={fileInRef}
                />
                <Button
                  onClick={() => fileInRef.current?.click()}
                  type="button"
                  variant="surface"
                  disabled={isUploading}
                >
                  {isUploading ? (
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  ) : (
                    <CloudUploadIcon size={16} />
                  )}
                  {isUploading ? "Uploading..." : "Choose Image"}
                </Button>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <TextArea
              name="description"
              className="h-16"
              placeholder="Add Photo Description"
            />
          </div>
        </div>
        <div className="flex mt-4 justify-center mb-4">
          <Button disabled={isUploading || !imageUrl} type="submit">
            <SendIcon size={16} />
            Publish
          </Button>
        </div>
      </form>
    </>
  );
}
