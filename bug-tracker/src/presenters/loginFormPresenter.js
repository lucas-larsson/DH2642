import { useState } from 'react';
import { login } from '../api';
import { LoginFormView } from '../views';

const LoginFormPresenter = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const submitLogin = async () => {
    setLoading(true);
    try {
      const user = await login(email, password);
      setLoading(false);
      setError(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
      setError(true);
    }
  };
  return (
    <LoginFormView login={submitLogin} setEmail={setEmail} setPassword={setPassword} loading={loading} error={error} />
  );
};
export default LoginFormPresenter;
