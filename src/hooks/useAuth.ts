import { useState, useEffect } from 'react';
import { auth, db } from '@/integrations/firebase/config';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as fbSignOut,
  onAuthStateChanged,
  updateProfile,
  User as FirebaseUser,
} from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';

export interface AppUser {
  id: string;
  uid: string;
  email: string | null;
  displayName: string | null;
  user_metadata?: {
    display_name?: string;
  };
}

export function useAuth() {
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (fbUser: FirebaseUser | null) => {
      if (fbUser) {
        let displayName = fbUser.displayName;
        if (!displayName) {
          try {
            const userDoc = await getDoc(doc(db, 'profiles', fbUser.uid));
            if (userDoc.exists()) {
              displayName = userDoc.data()?.display_name || null;
            }
          } catch (e) {
            console.error('Error fetching profile:', e);
          }
        }

        const appUser: AppUser = {
          id: fbUser.uid,
          uid: fbUser.uid,
          email: fbUser.email,
          displayName: displayName || fbUser.email?.split('@')[0] || 'Felhasználó',
          user_metadata: {
            display_name: displayName || fbUser.email?.split('@')[0] || 'Felhasználó',
          },
        };
        setUser(appUser);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, displayName: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const fbUser = userCredential.user;

      await updateProfile(fbUser, { displayName });

      // Save profile to Firestore
      await setDoc(doc(db, 'profiles', fbUser.uid), {
        id: fbUser.uid,
        display_name: displayName,
        email: email,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });

      const appUser: AppUser = {
        id: fbUser.uid,
        uid: fbUser.uid,
        email: fbUser.email,
        displayName,
        user_metadata: { display_name: displayName },
      };
      setUser(appUser);
      return { error: null };
    } catch (error: any) {
      return { error };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return { error: null };
    } catch (error: any) {
      return { error };
    }
  };

  const signOut = async () => {
    try {
      await fbSignOut(auth);
      return { error: null };
    } catch (error: any) {
      return { error };
    }
  };

  return { user, session: user ? { user } : null, loading, signUp, signIn, signOut };
}
