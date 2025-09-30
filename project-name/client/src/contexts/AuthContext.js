import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../config/supabaseClient'; // Adjust path if needed
import { set } from '../../../server/src/app';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [emailVerified, setEmailVerified] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
      setEmailVerified(session?.user?.email_confirmed_at);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setEmailVerified(session?.user?.email_confirmed_at);
    });

    return () => subscription.unsubscribe();
  }, []);

  const value = { session, loading, emailVerified };
  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext); // Include the hook here for convenience
export default AuthContext;