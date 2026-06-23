import { useI18n } from "@/i18n/i18nProvider";
import { NavBarBase } from "./NavBarBase";
import { Button } from "./button";
import { LogOut } from "lucide-react";

type ProfileNavBarProps = {
  logOut: () => void;
};

export function ProfileNavBar({ logOut }: ProfileNavBarProps) {
  const { t } = useI18n();

  return (
    <NavBarBase
      rightSlot={
        <Button variant="ghost" onClick={logOut}>
          <LogOut />
          {t("Logout")}
        </Button>
      }
    />
  );
}
