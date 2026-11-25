import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, LockKeyhole, UserRound } from 'lucide-react';
import { api } from '../services/api';
import './auth.css';

export default function RegisterPage() {
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
      await api.post('/api/auth/register', {
        username,
        password,
        role: 'patient'
      });
      navigate('/login', { replace: true, state: { registrationComplete: true } });
    } catch (requestError) {
      setError(
        requestError.response?.data?.message ||
        requestError.message ||
        'Unable to create your account. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="auth-page">
      <section className="auth-card" aria-labelledby="register-heading">
        <Link className="auth-back-link" to="/login">
          <ArrowLeft size={17} aria-hidden="true" />
          Back to login
        </Link>

        <div className="auth-brand">
          <img src="/images/logoxkx.png" alt="Hrishikesh's Physio Logo" className="h-10 w-10 object-cover rounded-full" />
          <span>Hrishikesh Physio Home</span>
        </div>

        <div className="auth-heading">
          <p className="auth-eyebrow">Create your patient account</p>
          <h1 id="register-heading">Join the HPH Digital Portal</h1>
          <p>Register to access your patient profile.</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label htmlFor="register-username">Username</label>
          <div className="auth-input-wrap">
            <UserRound size={18} aria-hidden="true" />
            <input
              id="register-username"
              name="username"
              type="text"
              autoComplete="username"
              placeholder="Choose a username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              required
            />
          </div>

          <label htmlFor="register-password">Password</label>
          <div className="auth-input-wrap">
            <LockKeyhole size={18} aria-hidden="true" />
            <input
              id="register-password"
              name="password"
              type="password"
              autoComplete="new-password"
              placeholder="Create a password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>

          {error && <p className="auth-error" role="alert">{error}</p>}

          <button className="auth-submit" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Creating account…' : 'Create patient account'}
          </button>
        </form>

        <p className="auth-register-prompt">
          Already registered? <Link to="/login">Sign in</Link>
        </p>
      </section>
    </main>
  );
}