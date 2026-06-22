import { useI18n } from "@/i18n/i18nProvider";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useState } from "react";

type SignUpFormProps = {
  error: string;
  loading: boolean;
  onSubmit: (
    firstName: string,
    lastName: string,
    username: string,
    email: string,
    password: string,
    passwordConfirm: string,
  ) => void;
};

type FormState = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
};

export function SignUpForm(props: SignUpFormProps) {
  const { t } = useI18n();

  const [form, setForm] = useState<FormState>({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  function update(field: keyof FormState) {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
    };
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();

    props.onSubmit(
      form.firstName,
      form.lastName,
      form.username,
      form.email,
      form.password,
      form.passwordConfirm,
    );
  }

  const fields: {
    name: keyof FormState;
    label: string;
    type: string;
    autoComplete?: string;
  }[] = [
    {
      name: "firstName",
      label: "First name",
      type: "text",
      autoComplete: "given-name",
    },
    {
      name: "lastName",
      label: "Last name",
      type: "text",
      autoComplete: "family-name",
    },
    {
      name: "username",
      label: "Username",
      type: "text",
      autoComplete: "username",
    },
    { name: "email", label: "Email", type: "email", autoComplete: "email" },
  ];

  return (
    <form onSubmit={handleSubmit} className="grid gap-5 sm:grid-cols-2">
      {fields.map((field) => (
        <div key={field.name}>
          <label
            htmlFor={field.name}
            className="mb-2 block text-xs font-bold uppercase tracking-wider"
          >
            {t(field.label)}
          </label>

          <Input
            id={field.name}
            type={field.type}
            value={form[field.name]}
            onChange={update(field.name)}
            required
            maxLength={100}
            autoComplete={field.autoComplete}
            className="h-12 rounded-none"
          />
        </div>
      ))}

      <div>
        <label
          htmlFor="signup-password"
          className="mb-2 block text-xs font-bold uppercase tracking-wider"
        >
          {t("Password")}
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

        <p className="mt-2 text-xs text-muted-foreground">
          {t("Minimum 8 characters.")}
        </p>
      </div>

      <div>
        <label
          htmlFor="signup-password-confirm"
          className="mb-2 block text-xs font-bold uppercase tracking-wider"
        >
          {t("Confirm password")}
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

      {props.error && (
        <p role="alert" className="text-sm text-destructive sm:col-span-2">
          {props.error}
        </p>
      )}

      <Button
        type="submit"
        variant="editorial"
        size="editorial"
        disabled={props.loading}
        className="sm:col-span-2"
      >
        {props.loading ? t("Creating…") : t("Create my account")}
      </Button>
    </form>
  );
}
