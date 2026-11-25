import { useState } from 'react';
import { ArrowLeft, CalendarPlus, LogOut, Search } from 'lucide-react';
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

export default function CreatePatientAppointmentPage() {
  const { logout } = useAuth();
  const [patientUsername, setPatientUsername] = useState('');
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [searchError, setSearchError] = useState('');
  const [searchMessage, setSearchMessage] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [appointmentDay, setAppointmentDay] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');
  const [appointmentMode, setAppointmentMode] = useState('onclinic');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const searchPatients = async () => {
    const query = patientUsername.trim();
    setSearchError('');
    setSearchMessage('');
    setPatients([]);
    setSelectedPatient(null);

    if (!query) {
      setSearchError('Enter a patient username to search.');
      return;
    }

    setIsSearching(true);
    try {
      const response = await api.get('/api/users/search', { params: { username: query } });
      if (!Array.isArray(response.data?.data)) {
        throw new Error('The patient search response was incomplete. Please try again.');
      }

      setPatients(response.data.data);
      if (response.data.data.length === 0) {
        setSearchMessage('No patient accounts matched that username.');
      }
    } catch (requestError) {
      setSearchError(
        requestError.response?.data?.message ||
        requestError.message ||
        'Unable to search for patients. Please try again.'
      );
    } finally {
      setIsSearching(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    if (!selectedPatient || selectedPatient.username !== patientUsername.trim()) {
      setError('Search for and select a patient account before creating the appointment.');
      return;
    }

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
      const response = await api.post('/api/appointments/physiotherapist', {
        patientUsername: selectedPatient.username,
        appointmentDate: selectedAppointment.toISOString(),
        appointmentMode,
        ...(notes.trim() ? { notes: notes.trim() } : {})
      });

      if (!response.data?.success || !response.data?.data) {
        throw new Error('The appointment response was incomplete. Please try again.');
      }

      setSuccess(response.data.message || `Appointment created for ${selectedPatient.username}.`);
      setPatientUsername('');
      setPatients([]);
      setSelectedPatient(null);
      setAppointmentDay('');
      setAppointmentTime('');
      setAppointmentMode('onclinic');
      setNotes('');
    } catch (requestError) {
      setError(
        requestError.response?.data?.message ||
        requestError.message ||
        'Unable to create the appointment. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="patient-page">
      <header className="dashboard-header">
        <Link className="dashboard-brand" to="/physiotherapist-home" aria-label="Back to physiotherapist home">
          <ArrowLeft size={17} aria-hidden="true" />
          Back to workspace
        </Link>
        <button className="dashboard-logout" type="button" onClick={logout}>
          <LogOut size={17} aria-hidden="true" />
          Sign out
        </button>
      </header>

      <section className="patient-intake-card appointment-panel" aria-labelledby="create-patient-appointment-heading">
        <p className="auth-eyebrow">PHYSIOTHERAPIST WORKSPACE</p>
        <h1 id="create-patient-appointment-heading">Schedule for a patient</h1>
        <p className="patient-intake-intro">
          Search the patient’s username, select the correct account, then choose an appointment time.
        </p>

        <div className="appointment-search">
          <label htmlFor="appointment-patient-username">Patient username</label>
          <div className="appointment-search-controls">
            <input
              className="patient-form-control"
              id="appointment-patient-username"
              name="patientUsername"
              type="text"
              autoComplete="off"
              value={patientUsername}
              onChange={(event) => {
                setPatientUsername(event.target.value);
                setSelectedPatient(null);
                setPatients([]);
                setSearchMessage('');
                setSearchError('');
                setError('');
                setSuccess('');
              }}
            />
            <button
              className="appointment-search-button"
              type="button"
              onClick={searchPatients}
              disabled={isSearching}
            >
              <Search size={16} aria-hidden="true" />
              {isSearching ? 'Searching…' : 'Search'}
            </button>
          </div>
          {searchError && <p className="auth-error" role="alert">{searchError}</p>}
          {searchMessage && <p className="appointment-field-hint" role="status">{searchMessage}</p>}
          {patients.length > 0 && (
            <div className="appointment-search-results" aria-label="Patient search results">
              {patients.map((patient) => (
                <button
                  className="appointment-search-result"
                  key={patient._id}
                  type="button"
                  aria-pressed={selectedPatient?._id === patient._id}
                  onClick={() => {
                    setSelectedPatient(patient);
                    setPatientUsername(patient.username);
                    setSearchMessage('');
                    setError('');
                  }}
                >
                  <strong>{patient.username}</strong>
                  <span>{selectedPatient?._id === patient._id ? 'Selected' : 'Select patient'}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <form className="auth-form appointment-details-form" onSubmit={handleSubmit}>
          <AppointmentDateTimePicker
            idPrefix="staff-appointment"
            date={appointmentDay}
            time={appointmentTime}
            onDateChange={setAppointmentDay}
            onTimeChange={setAppointmentTime}
          />

          <label htmlFor="staff-appointment-mode">Appointment mode</label>
          <select
            className="patient-form-control"
            id="staff-appointment-mode"
            name="appointmentMode"
            value={appointmentMode}
            onChange={(event) => setAppointmentMode(event.target.value)}
            required
          >
            {appointmentModes.map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>

          <label htmlFor="staff-appointment-notes">Notes (optional)</label>
          <textarea
            className="patient-form-control"
            id="staff-appointment-notes"
            name="notes"
            maxLength={500}
            rows={4}
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
          />
          <p className="appointment-field-hint">{notes.length}/500 characters</p>

          {error && <p className="auth-error" role="alert">{error}</p>}
          {success && <p className="auth-success appointment-success" role="status">{success}</p>}

          <button className="auth-submit" type="submit" disabled={isSubmitting}>
            <CalendarPlus size={17} aria-hidden="true" />
            {isSubmitting ? 'Creating appointment…' : 'Create appointment'}
          </button>
        </form>
      </section>
    </main>
  );
}
