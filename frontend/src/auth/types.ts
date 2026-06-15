export type User = {
  id: number;
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  profile_picture: string | null;
};

export type AuthResponse = {
  user: User;
};

export type LoginPayload = {
  email: string;
  password: string;
  remember_me?: boolean;
};

export type RegisterPayload = {
  email: string;
  username: string;
  password: string;
  password_confirm: string;
  first_name?: string;
  last_name?: string;
  remember_me?: boolean;
};
