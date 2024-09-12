import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentData,
  DocumentReference,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { TStudent } from "@/entities/schemas";
import { db } from "@/configs";

export const APIStudent = {
  getStudents: async (): Promise<TStudent[]> => {
    try {
      const studentRef = collection(db, "students");
      const result = await getDocs(studentRef);
      const students = result.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      })) as TStudent[];
      return students;
    } catch (error) {
      console.error(error);
      throw new Error(error as string);
    }
  },

  getStudent: async (id: string): Promise<TStudent | null> => {
    try {
      const docRef = doc(db, "students", id);
      const result = await getDoc(docRef);
      return result.data() as TStudent;
    } catch (error) {
      console.error(error);
      throw new Error(error as string);
    }
  },

  addStudent: async (
    user: TStudent
  ): Promise<DocumentReference<DocumentData, DocumentData>> => {
    try {
      const docRef = await addDoc(collection(db, "students"), user);
      return docRef;
    } catch (error) {
      console.error(error);
      throw new Error(error as string);
    }
  },

  deleteStudent: async (id: string): Promise<void> => {
    try {
      const docRef = doc(db, "students", id);
      await deleteDoc(docRef);
    } catch (error) {
      console.error(error);
      throw new Error(error as string);
    }
  },

  updateStudent: async (id: string, data: TStudent): Promise<void> => {
    try {
      const docRef = doc(db, "students", id);
      await updateDoc(docRef, data);
    } catch (error) {
      console.error(error);
      throw new Error(error as string);
    }
  },
};
