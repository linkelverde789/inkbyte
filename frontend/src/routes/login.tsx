import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft, BookOpen } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/auth/AuthContext";
import { t } from "@/i18n";

export const Route = createFileRoute("/login")({
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login, user } = useAuth();

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
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
  }, [user]);

  return (
    <main className="grid min-h-screen bg-background lg:grid-cols-2">
      <section className="flex flex-col justify-between bg-primary p-8 text-primary-foreground sm:p-12 lg:p-16">
        <Link to="/" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest">
          <ArrowLeft className="size-4" /> InkByte
        </Link>
        <div className="my-16 max-w-lg">
          <BookOpen className="mb-8 size-10 text-secondary" />
          <h1 className="text-5xl leading-tight sm:text-6xl">{t("Welcome back to your next readings.")}</h1>
          <p className="mt-6 text-primary-foreground/80">
            {t("Your personal space to discover and download stories.")}
          </p>
        </div>
        <p className="text-xs uppercase tracking-widest">{t("Read more. Search less.")}</p>
      </section>
      <section className="flex items-center px-6 py-14 sm:px-14 lg:px-20">
        <div className="w-full max-w-md">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-primary">{t("Welcome back")}</p>
          <h2 className="mb-9 text-4xl">{t("Login")}</h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="mb-2 block text-xs font-bold uppercase tracking-wider">
                {t("Email")}
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="username"
                className="h-12 rounded-none"
              />
            </div>
            <div>
              <label htmlFor="password" className="mb-2 block text-xs font-bold uppercase tracking-wider">
                {t("Password")}
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
                maxLength={128}
                autoComplete="current-password"
                className="h-12 rounded-none"
              />
            </div>
            {error && (
              <p role="alert" className="text-sm text-destructive">
                {error}
              </p>
            )}
            <Button type="submit" variant="editorial" size="editorial" className="w-full" disabled={loading}>
              {loading ? t("Accessing...") : t("Enter")}
            </Button>
          </form>
          <p className="mt-8 text-center text-sm text-muted-foreground">
            {t("Don't have an account?")}{" "}
            <Link to="/signup" className="font-bold text-primary underline underline-offset-4">
              {t("Create account")}
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
