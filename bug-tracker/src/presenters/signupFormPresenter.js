import { useState } from 'react';
import { SignupFormView } from '../views';
import { signUp } from '../api';
const SignupFormPresenter = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const signup = async () => {
    setLoading(true);
    try {
      const user = await signUp(email, password);
      setLoading(false);
      setError(null);
    } catch (error) {
      setLoading(false);
      console.error(error);
      setError(true);
    }
  };
  return (
    <SignupFormView
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      confirmPassword={confirmPassword}
      setConfirmPassword={setConfirmPassword}
      signup={signup}
      loading={loading}
      error={error}
    />
  );
};

export default SignupFormPresenter;
