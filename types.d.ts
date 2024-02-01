type Users = {
  email: string;
  fullname: string;
  phono: int;
  password: string;
  role?: string;
  created_at?: Date;
  updated_at?: Date;
};

type UserDataSession = {
  name?: string | null | undefined;
  email?: string | null | undefined;
  image?: string | null | undefined;
  fullname?: string | null | undefined;
};
