import { useI18n } from "@/i18n/i18nProvider";
import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Link } from "@tanstack/react-router";

type LoginFormProps = {
  loading: boolean;
  onSubmit: (email: string, password: string) => Promise<void>;
  error: string;
};
export function LoginForm(props: LoginFormProps) {
  const { t } = useI18n();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    props.onSubmit(email, password).catch((error) => {
      console.log(error);
    });
  }
  return (
    <div className="w-full max-w-md">
      <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-primary">
        {t("Welcome back")}
      </p>
      <h2 className="mb-9 text-4xl">{t("Login")}</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-xs font-bold uppercase tracking-wider"
          >
            {t("Email")}
          </label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
            autoComplete="username"
            className="h-12 rounded-none"
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="mb-2 block text-xs font-bold uppercase tracking-wider"
          >
            {t("Password")}
          </label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
            minLength={8}
            maxLength={128}
            autoComplete="current-password"
            className="h-12 rounded-none"
          />
        </div>
        {props.error && (
          <p role="alert" className="text-sm text-destructive">
            {props.error}
          </p>
        )}
        <Button
          type="submit"
          variant="editorial"
          size="editorial"
          className="w-full"
          disabled={props.loading}
        >
          {props.loading ? t("Accessing...") : t("Enter")}
        </Button>
      </form>
      <p className="mt-8 text-center text-sm text-muted-foreground">
        {t("Don't have an account?")}{" "}
        <Link
          to="/signup"
          className="font-bold text-primary underline underline-offset-4"
        >
          {t("Create account")}
        </Link>
      </p>
    </div>
  );
}
