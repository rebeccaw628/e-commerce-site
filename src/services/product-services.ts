import { db } from "../../config/firestore";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  or,
} from "firebase/firestore";

export interface Variant {
  color: string;
  imgURL: string;
  stock: number;
}

export interface ProductDbResponse {
  id: string;
  title: string;
  // color: string[];
  category: string;
  subCategory: string;
  price: string;
  // stock: number[];
  material: string;
  dimensions: string;
  // imgURL: string[];
  isFeatured: boolean;
  variants: Variant[];
}

export const getAllProducts = async () => {
  const collectionRef = collection(db, "products");
  const querySnapshot = await getDocs(collectionRef);
  // console.log(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
  return querySnapshot.docs.map(
    (doc) => ({ id: doc.id, ...doc.data() } as ProductDbResponse)
  );
};

export const getChairs = async () => {
  const collectionRef = collection(db, "products");
  const categoryQ = query(collectionRef, where("category", "==", "Chair"));
  const querySnapshot = await getDocs(categoryQ);
  // console.log(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
  return querySnapshot.docs.map(
    (doc) => ({ id: doc.id, ...doc.data() } as ProductDbResponse)
  );
};

export const getTables = async () => {
  const collectionRef = collection(db, "products");
  const categoryQ = query(collectionRef, where("category", "==", "Table"));
  const querySnapshot = await getDocs(categoryQ);
  // console.log(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
  return querySnapshot.docs.map(
    (doc) => ({ id: doc.id, ...doc.data() } as ProductDbResponse)
  );
};

export const getFeatured = async () => {
  const collectionRef = collection(db, "products");
  const featuredQ = query(collectionRef, where("isFeatured", "==", true));
  const querySnapshot = await getDocs(featuredQ);
  // console.log(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
  return querySnapshot.docs.map(
    (doc) => ({ id: doc.id, ...doc.data() } as ProductDbResponse)
  );
};

export const getProductById = async (id: string) => {
  const docRef = doc(db, "products", id);
  const snapshot = await getDoc(docRef);
  if (!snapshot.exists()) {
    throw new Error("Could not find product with id " + id);
  }
  return { id: snapshot.id, ...snapshot.data() } as ProductDbResponse;
};

// pagination
// export const paginate = async () => {
//   const first = query(collection(db, "products"), limit(6));
//   const querySnapshot = await getDocs(first);
//   const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
//   const next = query(
//     collection(db, "products"),
//     startAfter(lastVisible),
//     limit(6)
//   );
//   console.log(lastVisible);
//   console.log(next);
// };

export const searchProducts = async (searchTerm: string) => {
  const collectionRef = collection(db, "products");
  const searchQ = query(
    collectionRef,
    or(
      where("category", "in", [searchTerm]),
      where("subcategory", "in", [searchTerm]),
      where("material", "in", [searchTerm]),
      where("variants", "array-contains-any", [searchTerm])
    )
  );
  const querySnapshot = await getDocs(searchQ);
  console.log(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
};
