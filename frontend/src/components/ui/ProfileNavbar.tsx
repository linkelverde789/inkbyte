import { useI18n } from "@/i18n/i18nProvider";
import { NavBarBase } from "./NavBarBase";
import { Button } from "./button";
import { LogOut } from "lucide-react";
import { useAuth } from "@/auth/AuthContext";
import { useNavigate } from "@tanstack/react-router";

export function ProfileNavBar() {
  const { t } = useI18n();
  const { logout } = useAuth();
  const navigate = useNavigate();

  async function signOut() {
    await logout();
    await navigate({
      to: "/login",
      replace: true,
    });
  }

  return (
    <NavBarBase
      rightSlot={
        <Button variant="ghost" onClick={signOut}>
          <LogOut />
          {t("Logout")}
        </Button>
      }
    />
  );
}
