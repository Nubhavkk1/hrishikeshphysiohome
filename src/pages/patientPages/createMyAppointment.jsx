import { useState } from 'react';
import { ArrowLeft, BadgeCheck, CalendarPlus, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/useAuth';
import { api } from '../../services/api';
import AppointmentDateTimePicker from '../../component/AppointmentDateTimePicker';
import '../auth.css';

const appointmentModes = [
  ['onclinic', 'At the clinic'],
  ['homevisit', 'Home visit'],
  ['online', 'Online']
];

const appointmentModeLabels = {
  online: 'Online',
  homevisit: 'Home visit',
  onclinic: 'At the clinic'
};

function formatAppointmentDate(value) {
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? 'Not available'
    : date.toLocaleString(undefined, { dateStyle: 'full', timeStyle: 'short' });
}

export default function CreateMyAppointmentPage() {
  const { user, logout } = useAuth();
  const [appointmentDay, setAppointmentDay] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');
  const [appointmentMode, setAppointmentMode] = useState('onclinic');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');
  const [createdAppointment, setCreatedAppointment] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setCreatedAppointment(null);

    const selectedAppointment = new Date(`${appointmentDay}T${appointmentTime}`);
    const appointmentTimestamp = selectedAppointment.getTime();
    if (
      !appointmentDay ||
      !appointmentTime ||
      !Number.isFinite(appointmentTimestamp) ||
      appointmentTimestamp < Date.now() + 15 * 60 * 1000
    ) {
      setError('Choose an appointment time at least 15 minutes from now.');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await api.post('/api/appointments/patient', {
        appointmentDate: selectedAppointment.toISOString(),
        appointmentMode,
        ...(notes.trim() ? { notes: notes.trim() } : {})
      });

      if (!response.data?.success || !response.data?.data) {
        throw new Error('The appointment response was incomplete. Please try again.');
      }

      setCreatedAppointment(response.data.data);
      setAppointmentDay('');
      setAppointmentTime('');
      setAppointmentMode('onclinic');
      setNotes('');
    } catch (requestError) {
      setError(
        requestError.response?.data?.message ||
        requestError.message ||
        'Unable to create your appointment. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="patient-page">
      <header className="dashboard-header">
        <Link className="dashboard-brand" to="/patient-home" aria-label="Back to patient home">
          <ArrowLeft size={17} aria-hidden="true" />
          Back to patient home
        </Link>
        <button className="dashboard-logout" type="button" onClick={logout}>
          <LogOut size={17} aria-hidden="true" />
          Sign out
        </button>
      </header>

      <section className="patient-intake-card appointment-panel" aria-labelledby="create-appointment-heading">
        <p className="auth-eyebrow">PATIENT PORTAL</p>
        <h1 id="create-appointment-heading">
          {createdAppointment ? 'Appointment confirmation' : 'Create an appointment'}
        </h1>
        <p className="patient-intake-intro">
          {createdAppointment
            ? 'Your appointment has been recorded. Check its current status and details below.'
            : `Choose a time at least 15 minutes from now. We’ll save this request to your account, ${user?.username || 'Patient'}.`}
        </p>

        {createdAppointment ? (
          <section className="appointment-confirmation" aria-labelledby="appointment-confirmation-heading" role="status">
            <div className="appointment-confirmation-icon">
              <BadgeCheck size={27} aria-hidden="true" />
            </div>
            <p className="auth-eyebrow">APPOINTMENT COMPLETE</p>
            <h2 id="appointment-confirmation-heading">Your appointment is booked</h2>
            <p className="appointment-confirmation-copy">
              Your appointment has been created successfully. You can review these details below.
            </p>

            <div className="appointment-confirmation-status">
              <span>Appointment status</span>
              <strong className={`appointment-status appointment-status-${createdAppointment.status || 'unknown'}`}>
                {createdAppointment.status
                  ? createdAppointment.status.charAt(0).toUpperCase() + createdAppointment.status.slice(1)
                  : 'Status unavailable'}
              </strong>
            </div>

            <dl className="appointment-confirmation-details">
              <div>
                <dt>Date and time</dt>
                <dd>{formatAppointmentDate(createdAppointment.appointmentDate)}</dd>
              </div>
              <div>
                <dt>Appointment mode</dt>
                <dd>{appointmentModeLabels[createdAppointment.appointmentMode] || createdAppointment.appointmentMode || 'Not available'}</dd>
              </div>
            </dl>

            <Link className="appointment-return-button" to="/patient-home">
              Return to patient homepage
            </Link>
          </section>
        ) : (
          <form className="auth-form" onSubmit={handleSubmit}>
            <AppointmentDateTimePicker
              idPrefix="patient-appointment"
              date={appointmentDay}
              time={appointmentTime}
              onDateChange={setAppointmentDay}
              onTimeChange={setAppointmentTime}
            />

            <label htmlFor="patient-appointment-mode">Appointment mode</label>
            <select
              className="patient-form-control"
              id="patient-appointment-mode"
              name="appointmentMode"
              value={appointmentMode}
              onChange={(event) => setAppointmentMode(event.target.value)}
              required
            >
              {appointmentModes.map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>

            <label htmlFor="patient-appointment-notes">Notes (optional)</label>
            <textarea
              className="patient-form-control"
              id="patient-appointment-notes"
              name="notes"
              maxLength={500}
              rows={4}
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
            />
            <p className="appointment-field-hint">{notes.length}/500 characters</p>

            {error && <p className="auth-error" role="alert">{error}</p>}
            <button className="auth-submit" type="submit" disabled={isSubmitting}>
              <CalendarPlus size={17} aria-hidden="true" />
              {isSubmitting ? 'Creating appointment…' : 'Create appointment'}
            </button>
          </form>
        )}
      </section>
    </main>
  );
}