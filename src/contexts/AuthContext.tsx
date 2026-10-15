import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { User, Session, AuthError } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";
import {
  login as localLogin,
  logout as localLogout,
  isAuthenticated as isLocalAuthed,
} from "@/lib/adminData";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  isPassphraseAuth: boolean;
  isAuthenticated: boolean;
  loginWithSupabase: (
    email: string,
    pass: string
  ) => Promise<{ success: boolean; error?: string }>;
  signUpWithSupabase: (
    email: string,
    pass: string,
    name?: string
  ) => Promise<{ success: boolean; error?: string; message?: string }>;
  loginWithPassphrase: (pass: string) => boolean;
  logout: () => Promise<void>;
  resetPasswordEmail: (email: string) => Promise<{ success: boolean; error?: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isPassphraseAuth, setIsPassphraseAuth] = useState<boolean>(() => isLocalAuthed());

  useEffect(() => {
    // 1. Initial check for existing Supabase session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // 2. Listen to active auth state changes from Supabase
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const loginWithSupabase = async (
    email: string,
    pass: string
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password: pass,
      });

      if (error) {
        return { success: false, error: error.message };
      }

      setSession(data.session);
      setUser(data.user);
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || "Failed to authenticate with Supabase" };
    }
  };

  const signUpWithSupabase = async (
    email: string,
    pass: string,
    name?: string
  ): Promise<{ success: boolean; error?: string; message?: string }> => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password: pass,
        options: {
          data: {
            full_name: name || "NLMRC Staff",
          },
        },
      });

      if (error) {
        return { success: false, error: error.message };
      }

      if (data.session) {
        setSession(data.session);
        setUser(data.user);
        return { success: true };
      }

      return {
        success: true,
        message: "Sign up successful! Please check your email inbox to confirm your account.",
      };
    } catch (err: any) {
      return { success: false, error: err.message || "Sign up failed" };
    }
  };

  const loginWithPassphrase = (pass: string): boolean => {
    const ok = localLogin(pass);
    setIsPassphraseAuth(ok);
    return ok;
  };

  const logout = async (): Promise<void> => {
    if (session) {
      await supabase.auth.signOut();
    }
    localLogout();
    setUser(null);
    setSession(null);
    setIsPassphraseAuth(false);
  };

  const resetPasswordEmail = async (
    email: string
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/admin`,
      });
      if (error) {
        return { success: false, error: error.message };
      }
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || "Failed to send reset email" };
    }
  };

  const isAuthenticated = Boolean(user || isPassphraseAuth);

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        loading,
        isPassphraseAuth,
        isAuthenticated,
        loginWithSupabase,
        signUpWithSupabase,
        loginWithPassphrase,
        logout,
        resetPasswordEmail,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
