import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/auth/AuthContext";

export const Route = createFileRoute("/create-account")({
  component: SignupPage,
});

const INITIAL_FORM = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  passwordConfirm: "",
};

function SignupPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState(INITIAL_FORM);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const update = (key: keyof typeof form) => (event: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [key]: event.target.value });

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setError("");

    if (form.password !== form.passwordConfirm) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    setLoading(true);
    try {
      await register({
        email: form.email.trim(),
        password: form.password,
        password_confirm: form.passwordConfirm,
        first_name: form.firstName.trim(),
        last_name: form.lastName.trim(),
        remember_me: true,
      });
      await navigate({ to: "/profile" });
    } catch {
      setError("No pudimos crear la cuenta. Revisa los datos e inténtalo de nuevo.");
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
          <ArrowLeft className="size-4" /> Volver
        </Link>
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Tu biblioteca personal</p>
        <h1 className="mb-3 mt-2 text-4xl sm:text-5xl">Crear cuenta</h1>
        <p className="mb-9 text-muted-foreground">Gratis, sencilla y lista para tu próxima lectura.</p>
        <form onSubmit={submit} className="grid gap-5 sm:grid-cols-2">
          {[
            { k: "firstName" as const, l: "Nombre", a: "given-name", m: 80 },
            { k: "lastName" as const, l: "Apellidos", a: "family-name", m: 120 },
            { k: "email" as const, l: "Correo", a: "email", m: 255 },
          ].map(({ k, l, a, m }) => (
            <div key={k}>
              <label htmlFor={k} className="mb-2 block text-xs font-bold uppercase tracking-wider">
                {l}
              </label>
              <Input
                id={k}
                type={k === "email" ? "email" : "text"}
                value={form[k]}
                onChange={update(k)}
                required
                maxLength={m}
                autoComplete={a}
                className="h-12 rounded-none"
              />
            </div>
          ))}
          <div>
            <label htmlFor="signup-password" className="mb-2 block text-xs font-bold uppercase tracking-wider">
              Contraseña
            </label>
            <Input
              id="signup-password"
              type="password"
              value={form.password}
              onChange={update("password")}
              required
              minLength={8}
              maxLength={128}
              autoComplete="new-password"
              className="h-12 rounded-none"
            />
            <p className="mt-2 text-xs text-muted-foreground">Mínimo 8 caracteres.</p>
          </div>
          <div>
            <label htmlFor="signup-password-confirm" className="mb-2 block text-xs font-bold uppercase tracking-wider">
              Confirmar contraseña
            </label>
            <Input
              id="signup-password-confirm"
              type="password"
              value={form.passwordConfirm}
              onChange={update("passwordConfirm")}
              required
              minLength={8}
              maxLength={128}
              autoComplete="new-password"
              className="h-12 rounded-none"
            />
          </div>
          {error && (
            <p role="alert" className="text-sm text-destructive sm:col-span-2">
              {error}
            </p>
          )}
          <Button type="submit" variant="editorial" size="editorial" disabled={loading} className="sm:col-span-2">
            {loading ? "Creando…" : "Crear mi cuenta"}
          </Button>
        </form>
        <p className="mt-7 text-center text-sm text-muted-foreground">
          ¿Ya tienes cuenta?{" "}
          <Link to="/auth" className="font-bold text-primary underline underline-offset-4">
            Inicia sesión
          </Link>
        </p>
      </div>
    </main>
  );
}
