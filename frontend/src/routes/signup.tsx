import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";

import { useAuth } from "@/auth/AuthContext";
import { useI18n } from "@/i18n/i18nProvider";
import { SignUpForm } from "@/components/signup/SignUpForm";

export const Route = createFileRoute("/signup")({
  component: SignupPage,
});

function SignupPage() {
  const { t } = useI18n();

  const { register } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(
    firstName: string,
    lastName: string,
    username: string,
    email: string,
    password: string,
    passwordConfirm: string,
  ) {
    if (password !== passwordConfirm) {
      setError(t("Passwords don't match"));
      return;
    }

    setLoading(true);
    try {
      await register({
        email: email.trim(),
        password: password,
        username: username,
        password_confirm: passwordConfirm,
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        remember_me: true,
      });
      await navigate({ to: "/profile" });
    } catch {
      setError(t("Can't create account"));
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-muted/40 px-5 py-10 sm:py-16">
      <div className="mx-auto max-w-3xl bg-card p-6 shadow-[10px_12px_0_var(--color-secondary)] sm:p-12">
        <Link
          to="/"
          className="mb-10 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground"
        >
          <ArrowLeft className="size-4" /> {t("Back")}
        </Link>
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
          {t("Your personal library")}
        </p>
        <h1 className="mb-3 mt-2 text-4xl sm:text-5xl">
          {t("Create account")}
        </h1>
        <p className="mb-9 text-muted-foreground">
          {t("Free, simple and ready for your next read.")}
        </p>
        <SignUpForm error={error} loading={loading} onSubmit={submit} />
        <p className="mt-7 text-center text-sm text-muted-foreground">
          {t("Already have an account?")}{" "}
          <Link
            to="/login"
            className="font-bold text-primary underline underline-offset-4"
          >
            {t("Login")}
          </Link>
        </p>
      </div>
    </main>
  );
}
