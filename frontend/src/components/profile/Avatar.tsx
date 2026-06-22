import { Avatar, AvatarImage } from "@/components/ui/avatar";
import profile_picture_default from "@/assets/default_pfp.jpg";
import { Camera } from "lucide-react";

type ProfileAvatarProps = {
  profile_picture: string | null;
};

export function ProfileAvatar({ profile_picture }: ProfileAvatarProps) {
  return (
    <div>
      <Avatar className="size-44 rounded-xl bg-muted">
        {profile_picture ? (
          <AvatarImage src={profile_picture} className="object-cover" />
        ) : (
          <AvatarImage src={profile_picture_default} className="object-cover" />
        )}
      </Avatar>
      <label className="mt-4 inline-flex h-11 cursor-pointer items-center gap-2 bg-primary px-5 text-xs font-bold uppercase tracking-wider text-primary-foreground">
        <Camera className="size-4" /> Cambiar imagen
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="sr-only"
        />
      </label>
    </div>
  );
}
