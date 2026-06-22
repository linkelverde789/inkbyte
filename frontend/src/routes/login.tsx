import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useAuth } from "@/auth/AuthContext";
import { useI18n } from "@/i18n/i18nProvider";
import { LoginHero } from "@/components/login/LoginHero";
import { LoginForm } from "@/components/login/LoginForm";

export const Route = createFileRoute("/login")({
  component: LoginPage,
});

function LoginPage() {
  const { t } = useI18n();
  const navigate = useNavigate();
  const { login, user } = useAuth();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(email: string, password: string) {
    setError("");
    setLoading(true);

    try {
      await login({ email, password, remember_me: true });
    } catch {
      setError(t("Invalid email or password"));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (user) {
      navigate({ to: "/profile" });
    }
  }, [user, navigate]);

  return (
    <main className="grid min-h-screen bg-background lg:grid-cols-2">
      <section className="flex flex-col justify-between bg-primary p-8 text-primary-foreground sm:p-12 lg:p-16">
        <LoginHero />
      </section>
      <section className="flex items-center px-6 py-14 sm:px-14 lg:px-20">
        <LoginForm onSubmit={handleLogin} loading={loading} error={error} />
      </section>
    </main>
  );
}
