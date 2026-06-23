import { User } from "@/auth/types";
import { ProfileAvatar } from "./ProfileAvatar";
import ProfileInfo from "./Info";

type ProfileCardProps = {
  user: User;
};
export default function ProfileCard(props: ProfileCardProps) {
  return (
    <section className="grid gap-10 bg-card p-7 shadow-[9px_10px_0_var(--color-secondary)] sm:p-10 md:grid-cols-[220px_1fr]">
      <ProfileAvatar profile_picture={props.user.profile_picture} />

      <ProfileInfo
        firstName={props.user.first_name}
        lastName={props.user.last_name}
        email={props.user.email}
        username={props.user.username}
      />
    </section>
  );
}
