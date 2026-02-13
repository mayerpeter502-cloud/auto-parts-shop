import { db } from '@/lib/firebase';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  DocumentSnapshot,
  serverTimestamp
} from 'firebase/firestore';
import { Product } from '@/types';

const PRODUCTS_COLLECTION = 'products';

export const productApi = {
  async getById(id: string): Promise<Product | null> {
    const docRef = doc(db, PRODUCTS_COLLECTION, id);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) return null;
    return { id: docSnap.id, ...docSnap.data() } as Product;
  },

  async getAll(options?: {
    category?: string;
    brand?: string;
    limit?: number;
    lastDoc?: DocumentSnapshot;
  }): Promise<{ products: Product[]; lastDoc: DocumentSnapshot | null }> {
    let q = query(collection(db, PRODUCTS_COLLECTION), orderBy('createdAt', 'desc'));
    
    if (options?.category) {
      q = query(q, where('category', '==', options.category));
    }
    if (options?.brand) {
      q = query(q, where('brand', '==', options.brand));
    }
    if (options?.limit) {
      q = query(q, limit(options.limit));
    }
    if (options?.lastDoc) {
      q = query(q, startAfter(options.lastDoc));
    }

    const snapshot = await getDocs(q);
    const products = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Product[];

    return {
      products,
      lastDoc: snapshot.docs.length > 0 ? snapshot.docs[snapshot.docs.length - 1] : null
    };
  },

  async search(searchTerm: string): Promise<Product[]> {
    const q = query(
      collection(db, PRODUCTS_COLLECTION),
      where('name', '>=', searchTerm),
      where('name', '<=', searchTerm + '\uf8ff'),
      limit(20)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Product[];
  },

  async getByCompatibility(brand: string, model: string, year: number): Promise<Product[]> {
    const q = query(
      collection(db, PRODUCTS_COLLECTION),
      where('compatibility', 'array-contains-any', [
        { brand, model, yearFrom: year, yearTo: year }
      ])
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Product[];
  },

  async getPopular(limitCount: number = 8): Promise<Product[]> {
    const q = query(
      collection(db, PRODUCTS_COLLECTION),
      orderBy('rating', 'desc'),
      limit(limitCount)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Product[];
  },

  async create(product: Omit<Product, 'id' | 'createdAt'>): Promise<string> {
    const docRef = await addDoc(collection(db, PRODUCTS_COLLECTION), {
      ...product,
      createdAt: serverTimestamp()
    });
    return docRef.id;
  },

  async update(id: string, data: Partial<Product>): Promise<void> {
    const docRef = doc(db, PRODUCTS_COLLECTION, id);
    await updateDoc(docRef, {
      ...data,
      updatedAt: serverTimestamp()
    });
  },

  async delete(id: string): Promise<void> {
    await deleteDoc(doc(db, PRODUCTS_COLLECTION, id));
  }
};