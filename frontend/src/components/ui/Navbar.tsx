import { Link } from "@tanstack/react-router";
import { Button } from "./button";
import { NavBarBase } from "./NavBarBase";
import { UserRound } from "lucide-react";

export default function NavBar() {
  return (
    <NavBarBase
      rightSlot={
        <Button variant="ghost" size="icon" asChild aria-label="My account">
          <Link to="/profile">
            <UserRound />
          </Link>
        </Button>
      }
    />
  );
}
