import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, LockKeyhole, UserRound } from 'lucide-react';
import { getHomePath } from '../context/authRoutes';
import { useAuth } from '../context/useAuth';
import './auth.css';

export default function LoginPage() {
  const { login } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const user = await login(username, password);
      navigate(getHomePath(user.role), { replace: true });
    } catch (requestError) {
      setError(
        requestError.response?.data?.message ||
        requestError.message ||
        'Unable to log in. Please check your credentials and try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="auth-page">
      <section className="auth-card" aria-labelledby="login-heading">
        <Link className="auth-back-link" to="/">
          <ArrowLeft size={17} aria-hidden="true" />
          Back to home
        </Link>

        <div className="auth-brand">
          <img src="/images/logoxkx.png" alt="Hrishikesh's Physio Logo" className="h-10 w-10 object-cover rounded-full" />
          <span>Hrishikesh Physio Home</span>
        </div>

        <div className="auth-heading">
          <p className="auth-eyebrow">Login using your username and password</p>
          <h1 id="login-heading">Welcome to HPH Digital Portal</h1>
          <p>Log in to continue to your profile.</p>
        </div>

        {location.state?.registrationComplete && (
          <p className="auth-success" role="status">
            Registration successful. Continue by signing in below.
          </p>
        )}

        <form className="auth-form" onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>
          <div className="auth-input-wrap">
            <UserRound size={18} aria-hidden="true" />
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              placeholder="Enter your username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              required
            />
          </div>

          <label htmlFor="password">Password</label>
          <div className="auth-input-wrap">
            <LockKeyhole size={18} aria-hidden="true" />
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              placeholder="Enter your password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>

          {error && <p className="auth-error" role="alert">{error}</p>}

          <button className="auth-submit" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Signing in…' : 'Sign in'}
          </button>
        </form>

        <p className="auth-register-prompt">
          New to HPH? <Link to="/register">Create a patient account</Link>
        </p>

        <p className="auth-footnote">Your account is protected with secure authentication.</p>
      </section>
    </main>
  );
}
