import { addData, retriveDatabyField } from "@/lib/firebase/serviceFirebase";
import bcrypt from "bcrypt";

export async function signUp(userData: Users, callback: Function) {
  const data = await retriveDatabyField("users", "email", userData.email);

  if (data.length > 0) {
    callback(false, "Email is registered");
  } else {
    if (!userData.role) {
      userData.role = "member";
    }
    userData.password = await bcrypt.hash(userData.password, 10);
    userData.created_at = new Date();
    userData.updated_at = new Date();
    await addData("users", userData, (result: boolean) => {
      callback(result);
    });
  }
}

export async function signIn(email: string) {
  const data = await retriveDatabyField("users", "email", email);

  if (data) {
    return data[0];
  } else {
    return null;
  }
}

export async function loginWithGoogle(data: any, callback: Function) {
  const user = await retriveDatabyField("users", "email", data.email);

  if (user.length > 0) {
    callback(user[0]);
  } else {
    data.role = "member";
    await addData("users", data, (result: boolean) => {
      if (result) callback(data);
    });
  }
}
