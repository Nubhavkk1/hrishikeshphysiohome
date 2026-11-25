import { useEffect, useState } from 'react';
import { ArrowLeft, CalendarDays, LogOut, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/useAuth';
import { getHomePath } from '../../context/authRoutes';
import { api } from '../../services/api';
import '../auth.css';

const appointmentModeLabels = {
  online: 'Online',
  homevisit: 'Home visit',
  onclinic: 'At the clinic'
};

function formatAppointmentDate(value) {
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? 'Invalid appointment date'
    : date.toLocaleString(undefined, {
      dateStyle: 'medium',
      timeStyle: 'short'
    });
}

export default function ListAppointmentsPage() {
  const { user, logout } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    let active = true;

    const fetchAppointments = async () => {
      setIsLoading(true);
      setError('');

      try {
        const response = await api.get('/api/appointments');
        if (!Array.isArray(response.data?.data)) {
          throw new Error('The appointments response was incomplete. Please try again.');
        }

        if (active) {
          setAppointments(response.data.data);
          setIsLoading(false);
        }
      } catch (requestError) {
        if (active) {
          setError(
            requestError.response?.data?.message ||
            requestError.message ||
            'Unable to load appointments. Please try again.'
          );
          setIsLoading(false);
        }
      }
    };

    fetchAppointments();
    return () => {
      active = false;
    };
  }, [retryCount]);

  return (
    <main className="patient-page">
      <header className="dashboard-header">
        <Link className="dashboard-brand" to={getHomePath(user?.role)} aria-label="Back to dashboard">
          <ArrowLeft size={17} aria-hidden="true" />
          Back to dashboard
        </Link>
        <div className="appointment-page-account">
          <span>{user?.username || 'Admin'}</span>
          <button className="dashboard-logout" type="button" onClick={logout}>
            <LogOut size={17} aria-hidden="true" />
            Sign out
          </button>
        </div>
      </header>

      <section className="patient-intake-card appointment-list-panel" aria-labelledby="appointments-heading">
        <div className="appointment-list-heading">
          <div>
            <p className="auth-eyebrow">CLINIC WORKSPACE</p>
            <h1 id="appointments-heading">Appointments</h1>
            <p className="patient-intake-intro">All scheduled appointment requests, ordered by date.</p>
          </div>
          <CalendarDays size={28} aria-hidden="true" />
        </div>

        {isLoading ? (
          <p className="appointment-list-status" role="status">Loading appointments…</p>
        ) : error ? (
          <div className="appointment-list-error" role="alert">
            <p>{error}</p>
            <button
              className="appointment-search-button"
              type="button"
              onClick={() => setRetryCount((count) => count + 1)}
            >
              <RefreshCw size={15} aria-hidden="true" />
              Retry
            </button>
          </div>
        ) : appointments.length === 0 ? (
          <p className="appointment-list-status">There are no appointments yet.</p>
        ) : (
          <div className="appointment-list">
            {appointments.map((appointment) => (
              <article className="appointment-list-card" key={appointment._id}>
                <div className="appointment-list-card-heading">
                  <div>
                    <span className="appointment-list-label">PATIENT</span>
                    <h2>{appointment.patient?.username || 'Patient account unavailable'}</h2>
                  </div>
                  <span className={`appointment-status appointment-status-${appointment.status || 'scheduled'}`}>
                    {appointment.status || 'scheduled'}
                  </span>
                </div>
                <dl>
                  <div>
                    <dt>Date and time</dt>
                    <dd>{formatAppointmentDate(appointment.appointmentDate)}</dd>
                  </div>
                  <div>
                    <dt>Mode</dt>
                    <dd>{appointmentModeLabels[appointment.appointmentMode] || appointment.appointmentMode}</dd>
                  </div>
                  {appointment.notes && (
                    <div className="appointment-list-notes">
                      <dt>Notes</dt>
                      <dd>{appointment.notes}</dd>
                    </div>
                  )}
                </dl>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}