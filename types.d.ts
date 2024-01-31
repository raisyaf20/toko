type Users = {
  email: string;
  fullname: string;
  phono: int;
  password: string;
  role?: string;
};

type UserDataSession = {
  name?: string | null | undefined;
  email?: string | null | undefined;
  image?: string | null | undefined;
  fullname?: string | null | undefined;
};
