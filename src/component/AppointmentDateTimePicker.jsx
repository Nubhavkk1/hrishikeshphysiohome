import { useMemo } from 'react';
import { CalendarDays, Clock3 } from 'lucide-react';

function getLocalDateString(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export default function AppointmentDateTimePicker({
  idPrefix,
  date,
  time,
  onDateChange,
  onTimeChange
}) {
  const today = getLocalDateString(new Date());
  const earliestAppointment = new Date(Date.now() + 16 * 60 * 1000);
  const earliestDate = getLocalDateString(earliestAppointment);
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowString = getLocalDateString(tomorrow);
  const minimumTimeForToday = earliestDate === today
    ? `${String(earliestAppointment.getHours()).padStart(2, '0')}:${String(earliestAppointment.getMinutes()).padStart(2, '0')}`
    : undefined;
  const minimumTime = date === today ? minimumTimeForToday : undefined;
  const summary = useMemo(() => {
    if (!date) {
      return 'Select a date and time to continue.';
    }

    const selectedDate = new Date(`${date}T00:00:00`);
    const formattedDate = selectedDate.toLocaleDateString(undefined, {
      weekday: 'long',
      month: 'long',
      day: 'numeric'
    });

    return time
      ? `${formattedDate} at ${selectedDate.toLocaleTimeString(undefined, {
        hour: 'numeric',
        minute: '2-digit'
      })}`
      : `${formattedDate} selected. Choose a time to continue.`;
  }, [date, time]);

  const chooseDate = (nextDate) => {
    onDateChange(nextDate);
    if (nextDate === today && time && time < minimumTimeForToday) {
      onTimeChange('');
    }
  };

  return (
    <section className="appointment-date-time-picker" aria-labelledby={`${idPrefix}-heading`}>
      <div className="appointment-date-time-heading">
        <span className="appointment-date-time-icon"><CalendarDays size={20} aria-hidden="true" /></span>
        <div>
          <h2 id={`${idPrefix}-heading`}>Choose a date and time</h2>
          <p>Appointments must be scheduled at least 15 minutes ahead.</p>
        </div>
      </div>

      <div className="appointment-date-shortcuts" aria-label="Quick date choices">
        <button
          className="appointment-date-shortcut"
          type="button"
          disabled={earliestDate !== today}
          aria-pressed={date === today}
          onClick={() => chooseDate(today)}
        >
          Today
        </button>
        <button
          className="appointment-date-shortcut"
          type="button"
          aria-pressed={date === tomorrowString}
          onClick={() => chooseDate(tomorrowString)}
        >
          Tomorrow
        </button>
      </div>

      <div className="appointment-date-time-fields">
        <div className="appointment-picker-field">
          <label htmlFor={`${idPrefix}-date`}>Date</label>
          <div className="appointment-picker-control">
            <CalendarDays size={17} aria-hidden="true" />
            <input
              className="patient-form-control"
              id={`${idPrefix}-date`}
              name="appointmentDay"
              type="date"
              min={earliestDate}
              value={date}
              onChange={(event) => chooseDate(event.target.value)}
              required
            />
          </div>
        </div>

        <div className="appointment-picker-field">
          <label htmlFor={`${idPrefix}-time`}>Time</label>
          <div className="appointment-picker-control">
            <Clock3 size={17} aria-hidden="true" />
            <input
              className="patient-form-control"
              id={`${idPrefix}-time`}
              name="appointmentTime"
              type="time"
              min={minimumTime}
              value={time}
              onChange={(event) => onTimeChange(event.target.value)}
              required
            />
          </div>
        </div>
      </div>

      <p className="appointment-date-time-summary" role="status" aria-live="polite">
        <CalendarDays size={15} aria-hidden="true" />
        {summary}
      </p>
    </section>
  );
}
