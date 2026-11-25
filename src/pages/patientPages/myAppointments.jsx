import { useEffect, useState } from 'react';
import { ArrowUpRight, CalendarDays } from 'lucide-react';
import { Link } from 'react-router-dom';
import { api } from '../../services/api';

const appointmentModeLabels = {
  online: 'Online',
  homevisit: 'Home visit',
  onclinic: 'At the clinic'
};

function formatAppointmentDate(value) {
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? 'Appointment date unavailable'
    : date.toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' });
}

export default function MyAppointmentsSection() {
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
        const response = await api.get('/api/appointments/my');
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
            'Unable to load your appointments. Please try again.'
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
    <section className="patient-visits-section patient-appointments-section" id="patient-appointments" aria-labelledby="patient-appointments-heading">
      <div className="patient-journal-heading">
        <div>
          <p className="workspace-eyebrow">YOUR CARE JOURNEY</p>
          <h2 id="patient-appointments-heading">Your appointments</h2>
        </div>
        <Link className="patient-appointments-book-link" to="/create-appointment">
          Book appointment <ArrowUpRight size={15} aria-hidden="true" />
        </Link>
      </div>

      {isLoading ? (
        <p className="patient-appointments-message" role="status">Loading your appointments…</p>
      ) : error ? (
        <div className="patient-appointments-error" role="alert">
          <p>{error}</p>
          <button
            className="patient-retry-button"
            type="button"
            onClick={() => setRetryCount((count) => count + 1)}
          >
            Try again
          </button>
        </div>
      ) : appointments.length === 0 ? (
        <div className="patient-appointments-empty">
          <CalendarDays size={22} aria-hidden="true" />
          <div>
            <strong>No appointments booked yet</strong>
            <p>Your upcoming and past appointments will appear here.</p>
          </div>
        </div>
      ) : (
        <div className="patient-visits-list">
          {appointments.map((appointment) => {
            const status = appointment.status || 'unknown';

            return (
              <article className="appointment-list-card patient-home-appointment-card" key={appointment._id}>
                <div className="appointment-list-card-heading">
                  <div>
                    <span className="appointment-list-label">APPOINTMENT</span>
                    <h3>{formatAppointmentDate(appointment.appointmentDate)}</h3>
                  </div>
                  <span className={`appointment-status appointment-status-${status}`}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </span>
                </div>
                <dl>
                  <div>
                    <dt>Mode</dt>
                    <dd>{appointmentModeLabels[appointment.appointmentMode] || appointment.appointmentMode || 'Not specified'}</dd>
                  </div>
                  {appointment.notes && (
                    <div className="appointment-list-notes">
                      <dt>Notes</dt>
                      <dd>{appointment.notes}</dd>
                    </div>
                  )}
                </dl>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}