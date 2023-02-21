"use client";

import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { auth } from "../firebase";

interface IAuthProviderProps {
  children: ReactNode;
}

interface IAuthContext {
  currentUser:
    | {
        uid: string;
      }
    | undefined;
  signup: (email: string, password: string) => Promise<{}>;
  signin: (email: string, password: string) => Promise<{}>;
  logout: () => void;
  loginWithGoogle: () => Promise<{}>;
  forgotPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: IAuthProviderProps) => {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  const loginWithGoogle = () => {
    return signInWithPopup(auth, new GoogleAuthProvider());
  };

  const loginWithGoogleMobile = () => {
    return signInWithPopup(auth, new GoogleAuthProvider());
  };

  const signup = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signin = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    signOut(auth);
  };

  const forgotPassword = (email: string) => {
    return sendPasswordResetEmail(auth, email);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: any) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    signin,
    logout,
    loginWithGoogle,
    loginWithGoogleMobile,
    forgotPassword,
  };
  return (
    <AuthContext.Provider value={value}>
      {loading ? (
        <div
          style={{
            transform: "translate3d(0,0,200px)",
          }}
          className="bg-gray-[#f4f4f4] center"
        >
          <picture>
            <img src="/RocketLoader.svg" alt="loader" className="w-20 h-20" />
          </picture>
        </div>
      ) : (
        <>{children}</>
      )}
    </AuthContext.Provider>
  );
};
