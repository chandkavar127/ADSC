// PasswordReset.js
import React, { useState } from 'react';
import { supabase } from '../../config/supabaseClient';

const PasswordReset = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleReset = async (e) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your email');
      return;
    }
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/update-password`, // Point to your update route
    });
    if (error) setError(error.message);
    else setMessage('Password reset email sent');
  };

  return (
    <form onSubmit={handleReset}>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {message && <p style={{ color: 'green' }}>{message}</p>}
      <button type="submit">Reset Password</button>
    </form>
  );
};

export default PasswordReset;
