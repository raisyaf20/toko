import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import app from "./init";
import bcrypt from "bcrypt";

const firestore = getFirestore(app);

export async function retriveData(collectionName: string) {
  const snapshot = await getDocs(collection(firestore, collectionName));
  return snapshot.docs.map((e) => ({
    id: e.id,
    ...e.data(),
  }));
}

export async function retriveById(collectionName: string, id: string) {
  const snapshot = await getDoc(doc(firestore, collectionName, id));
  return snapshot.data();
}

export async function signUp(userData: Users, callback: Function) {
  const q = query(
    collection(firestore, "users"),
    where("email", "==", userData.email)
  );
  const snapshot = await getDocs(q);
  const data = snapshot.docs.map((e) => ({
    id: e.id,
    ...e.data(),
  }));

  if (data.length > 0) {
    callback(false, "Email is registered");
  } else {
    if (!userData.role) {
      userData.role = "member";
    }
    userData.password = await bcrypt.hash(userData.password, 10);
    await addDoc(collection(firestore, "users"), userData)
      .then(() => callback(true, "Success creted user signup"))
      .catch((error) => {
        callback(false, error);
        console.log(error);
      });
  }
}

export async function signIn(email: string) {
  const q = query(collection(firestore, "users"), where("email", "==", email));
  const snapshot = await getDocs(q);
  const data = snapshot.docs.map((e) => ({
    id: e.id,
    ...e.data(),
  }));

  if (data) {
    return data[0];
  } else {
    return null;
  }
}

export async function loginWithGoogle(data: any, callback: Function) {
  const q = query(
    collection(firestore, "users"),
    where("email", "==", data.email)
  );
  const snapshot = await getDocs(q);
  const user = snapshot.docs.map((e) => ({
    id: e.id,
    ...e.data(),
  }));

  if (user.length > 0) {
    callback(user[0]);
  } else {
    data.role = "member";
    await addDoc(collection(firestore, "users"), data).then(() =>
      callback(data)
    );
  }
}
