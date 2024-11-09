"use client";
import { Button, Switch, TextArea, TextField } from "@radix-ui/themes";
import { updateProfile } from "@/actions";
import { CloudUploadIcon, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Profile } from "@prisma/client";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

export default function SettingsForm({ profile }: { profile: Profile | null }) {
  const router = useRouter();
  const fileInRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [avatarUrl, setAvatarUrl] = useState(profile?.avatar || null);
  const [isUploading, setIsUploading] = useState(false);

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
            setAvatarUrl(url);
            return url;
          })
          .finally(() => {
            setIsUploading(false);
          }),
        {
          loading: "🖼️ Updating your avatar...",
          success: "✨ Avatar updated successfully!",
          error: "❌ Failed to update avatar",
        }
      );
    }
  }, [file]);

  return (
    <>
      {/* <CustomToast /> */}
      <form
        action={async (data: FormData) => {
          await updateProfile(data);
          toast.success("🎉 Profile settings saved!", {
            duration: 4000,
          });
          router.push("/profile");
          router.refresh();
        }}
      >
        <input type="hidden" name="avatar" value={avatarUrl || ""} />
        <div className="flex gap-4 items-center">
          <div>
            <div
              className="bg-gray-300 size-24 rounded-full
           overflow-hidden aspect-square shadow-md shadow-gray-500"
            >
              <img
                className="w-full h-full object-cover"
                src={avatarUrl || ""}
                alt=""
              />
            </div>
          </div>
          <div>
            <input
              type="file"
              ref={fileInRef}
              className="hidden"
              onChange={(ev) => {
                if (ev.target.files?.[0]) setFile(ev.target.files[0] || null);
              }}
            />

            <Button
              type="button"
              onClick={() => fileInRef.current?.click()}
              variant="outline"
              disabled={isUploading}
            >
              {isUploading ? (
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
              ) : (
                <CloudUploadIcon />
              )}
              {isUploading ? "Uploading..." : "Change Avatar"}
            </Button>
          </div>
        </div>
        <p className="mt-2 font-bold">Username</p>
        <TextField.Root
          name="username"
          defaultValue={profile?.username || ""}
          placeholder="Your User Name"
        />
        <p className="mt-2 font-bold">Name</p>
        <TextField.Root
          name="name"
          defaultValue={profile?.name || ""}
          placeholder="John Silver"
        />
        <p className="mt-2 font-bold">Subtitle</p>
        <TextField.Root
          name="subtitle"
          defaultValue={profile?.subtitle || ""}
          placeholder="Graphic Designer"
        />
        <p className="mt-2 font-bold">Bio</p>
        <TextArea name="bio" defaultValue={profile?.bio || ""} />
        <label className="flex items-center gap-2 mt-2">
          <span>Dark Mode</span>
          <Switch
            defaultChecked={localStorage.getItem("theme") == "dark"}
            onCheckedChange={(isDark) => {
              const html = document.querySelector("html");
              const theme = isDark ? "dark" : "light";
              if (html) {
                html.dataset.theme = theme;
              }
              localStorage.setItem("theme", theme);
              window.location.reload();
            }}
          />
        </label>

        <div className="mt-4 flex justify-center">
          <Button variant="solid">Save Settings</Button>
        </div>
      </form>
    </>
  );
}
