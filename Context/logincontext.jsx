"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

const LoginContext = createContext({
  user: null,
  session: null,
  userinfo: null,
  loading: true,
});

export const LoginProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [userinfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔹 Get initial session and listen to changes
  useEffect(() => {
    const getSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) console.error("Session error:", error.message);
      setSession(data.session);
      setUser(data.session?.user ?? null);
      setLoading(false);
    };

    getSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (!user) return;

      const { data: userProfile, error: userProfileError } = await supabase
        .from("userinfo")
        .select("*")
        .eq("id", user.id)
        .single();

      if (userProfileError) {
        // Ignore harmless “no rows found” error (PGRST116)
        if (userProfileError.code !== "PGRST116") {
          console.error("Fetch error for userinfo:", userProfileError);
        }
      } else {
        setUserInfo(userProfile);
      }
    };

    if (!loading && user) {
      fetchUserInfo();
    }
  }, [user, loading]); // ✅ include both

  return (
    <LoginContext.Provider value={{ user, session, loading, userinfo,accessToken: session?.access_token ?? null, }}>
      {children}
    </LoginContext.Provider>
  );
};

export const useLogin = () => useContext(LoginContext);
