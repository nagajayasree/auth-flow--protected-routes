import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { app } from './firebase';

const auth = getAuth(app);

export type User = {
  name?: string;
  email: string;
  password: string;
};

export const register = async ({ email, password }: User) => {
  const response = await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up
      return userCredential.user;
    })
    .catch((error) => {
      console.log(error.code);
      console.log(error.message);
    });
  return response;
};

export const login = async ({ email, password }: User) => {
  const response = await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      return userCredential.user;
    })
    .catch((error) => {
      console.log(error.code);
      console.log(error.message);
    });
  return response;
};

export const signout = async () => {
  const response = await signOut(auth)
    .then(() => {
      // Sign-out successful.
      console.log('sign out done');
    })
    .catch((error) => {
      console.log(error.message);
    });

  return response;
};
