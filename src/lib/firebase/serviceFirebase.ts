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

export async function retriveDatabyField(
  collectionName: string,
  field: string,
  value: string
) {
  const q = query(
    collection(firestore, collectionName),
    where(field, "==", value)
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((e) => ({
    id: e.id,
    ...e.data(),
  }));
}

export async function addData(
  collectionName: string,
  data: any,
  callback: Function
) {
  return addDoc(collection(firestore, collectionName), data).then(() =>
    callback(data)
  );
}
