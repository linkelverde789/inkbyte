import { useI18n } from "@/i18n/i18nProvider";

type ProfileInfoProps = {
  firstName: string | null;
  lastName: string | null;
  username: string;
  email: string;
};

export default function ProfileInfo(props: ProfileInfoProps) {
  const { t } = useI18n();
  return (
    <div className="grid content-start gap-6 sm:grid-cols-2">
      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-primary">
          {t("Name")}
        </p>
        <p className="mt-2 text-lg">{props.firstName || "—"}</p>
      </div>

      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-primary">
          {t("Last name")}
        </p>
        <p className="mt-2 text-lg">{props.lastName || "—"}</p>
      </div>

      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-primary">
          {t("Username")}
        </p>
        <p className="mt-2 text-lg">@{props.username}</p>
      </div>

      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-primary">
          {t("Email")}
        </p>
        <p className="mt-2 break-all text-lg">{props.email}</p>
      </div>
    </div>
  );
}
