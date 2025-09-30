import React from 'react';
import { useAuth } from '../../contexts/AuthContext'; // Or hooks/useAuth if separate
import { supabase } from '../../config/supabaseClient';
import { Navigate } from 'react-router-dom'; // If redirecting

const Profile = () => {
  const { session, emailVerified } = useAuth();

  // Function to resend verification email (optional)
  const resendVerification = async () => {
    if (session?.user?.email) {
      await supabase.auth.resend({
        type: 'signup',
        email: session.user.email,
      });
      alert('Verification email resent! Check your inbox.');
    }
  };

  if (!session) return <Navigate to="/login" />; // Redirect if not logged in
  if (!emailVerified) {
    return (
      <div>
        <p>Your email is not verified. Please check your inbox or resend the verification email.</p>
        <button onClick={resendVerification}>Resend Verification Email</button>
      </div>
    );
  }

  return (
    <div>
      <h1>Welcome, {session.user.email}!</h1>
      <p>Your email is verified.</p>
      {/* Rest of profile content */}
    </div>
  );
};

export default Profile;
