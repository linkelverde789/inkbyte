import { Avatar, AvatarImage } from "@/components/ui/avatar";
import profile_picture_default from "@/assets/default_pfp.jpg";
import { Camera } from "lucide-react";
import { useI18n } from "@/i18n/i18nProvider";
import { api, API_ENDPOINTS } from "@/api";

import { useEffect, useState } from "react";
import { User } from "@/auth/types";
import { toast } from "sonner";

type ProfileAvatarProps = {
  profile_picture: string | null;
};

export function ProfileAvatar({ profile_picture }: ProfileAvatarProps) {
  const { t } = useI18n();

  const [image, setImage] = useState(
    profile_picture ?? profile_picture_default,
  );

  useEffect(() => {
    setImage(profile_picture ?? profile_picture_default);
  }, [profile_picture]);

  async function handleSubmitImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    e.target.value = "";

    const formData = new FormData();
    formData.append("profile_picture", file);

    try {
      const res = await api.patch<User>(API_ENDPOINTS.PROFILE, formData);

      setImage(res.profile_picture ?? profile_picture_default);

      toast.success(t("Profile picture sucessfully updated!"));

      return res;
    } catch (err) {
      console.error("Upload failed:", err);
    }
  }

  return (
    <div>
      <Avatar className="size-44 rounded-xl bg-muted">
        <AvatarImage src={image} className="object-cover" />
      </Avatar>
      <label className="mt-4 inline-flex h-11 cursor-pointer items-center gap-2 bg-primary px-5 text-xs font-bold uppercase tracking-wider text-primary-foreground">
        <Camera className="size-4" /> {t("Change profile picture")}
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="sr-only"
          onChange={(e) => {
            void handleSubmitImage(e);
          }}
        />
      </label>
    </div>
  );
}
