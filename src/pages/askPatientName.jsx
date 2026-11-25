import { useState } from 'react';
import { LogOut } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import './auth.css';

export default function AskPatientName() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [name, setName] = useState('');
  const [phoneno, setPhoneno] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState('');

  const handleSendOtp = (event) => {
    event.preventDefault();
    setError('');

    if (!name.trim() || !/^\d{7,15}$/.test(phoneno)) {
      setError('Enter your name and a valid phone number to continue.');
      return;
    }

    setOtpSent(true);
  };

  const handleVerifyOtp = (event) => {
    event.preventDefault();

    if (otp !== '1234') {
      setError('That OTP is incorrect. For this demo, enter 1234.');
      return;
    }

    navigate('/patient-details', {
      state: { name: name.trim(), phoneno: Number(phoneno) }
    });
  };

  return (
    <main className="patient-page">
      <header className="dashboard-header">
        <Link className="dashboard-brand" to="/" aria-label="Hrishikesh Physio Home">
          <img className="dashboard-brand-mark object-cover" src="/images/logoxkx.png" alt="" />
          <span>Hrishikesh <strong>Physio Home</strong></span>
        </Link>
        <button className="dashboard-logout" type="button" onClick={logout}>
          <LogOut size={17} aria-hidden="true" />
          Sign out
        </button>
      </header>

      {location.state?.profileComplete ? (
      <section className="patient-welcome">
        <p className="auth-eyebrow">PATIENT PORTAL</p>
        <h1>Thank you, {user?.username || 'Patient'}</h1>
        <p>Your patient details have been saved successfully.</p>
      </section>
      ) : (
        <section className="patient-intake-card" aria-labelledby="patient-intake-heading">
          <p className="auth-eyebrow">PATIENT PORTAL</p>
          <h1 id="patient-intake-heading">Welcome, {user?.username || 'Patient'}</h1>
          <p className="patient-intake-intro">Let’s start by confirming your contact details.</p>

          <form className="auth-form" onSubmit={otpSent ? handleVerifyOtp : handleSendOtp}>
            <label htmlFor="patient-name">Full name</label>
            <input
              className="patient-form-control"
              id="patient-name"
              name="name"
              type="text"
              autoComplete="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />

            <label htmlFor="patient-phone">Phone number</label>
            <input
              className="patient-form-control"
              id="patient-phone"
              name="phoneno"
              type="tel"
              inputMode="numeric"
              autoComplete="tel"
              pattern="[0-9]{7,15}"
              value={phoneno}
              onChange={(event) => setPhoneno(event.target.value)}
              required
            />

            {otpSent && (
              <>
                <label htmlFor="patient-otp">Verification code</label>
                <input
                  className="patient-form-control"
                  id="patient-otp"
                  name="otp"
                  type="text"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  pattern="[0-9]{4}"
                  maxLength={4}
                  value={otp}
                  onChange={(event) => setOtp(event.target.value)}
                  required
                />
                <p className="patient-demo-otp">
                  Demo only: no SMS is sent. Enter <strong>1234</strong>.
                </p>
              </>
            )}

            {error && <p className="auth-error" role="alert">{error}</p>}

            <button className="auth-submit" type="submit">
              {otpSent ? 'Next' : 'Send OTP'}
            </button>
          </form>
        </section>
      )}
    </main>
  );
}