// @vitest-environment jsdom

import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { api } from '../services/api';
import ListAppointmentsPage from './adminPages/listAppointments';
import CreateMyAppointmentPage from './patientPages/createMyAppointment';
import MyAppointmentsSection from './patientPages/myAppointments';
import CreatePatientAppointmentPage from './physiotherapistPages/createPatientAppointment';

vi.mock('../context/useAuth', () => ({
  useAuth: () => ({ user: { username: 'staff1', role: 'admin' }, logout: vi.fn() })
}));

function renderPage(path, element) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path={path} element={element} />
      </Routes>
    </MemoryRouter>
  );
}

describe('appointment page integrations', () => {
  beforeEach(() => {
    vi.spyOn(api, 'get');
    vi.spyOn(api, 'post');
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it('creates a patient appointment using only the supported appointment fields', async () => {
    const appointmentDate = '2031-05-04T10:30';
    api.post.mockResolvedValue({
      data: {
        success: true,
        message: 'Appointment created successfully.',
        data: {
          _id: 'appointment-1',
          status: 'scheduled',
          appointmentDate: new Date(appointmentDate).toISOString(),
          appointmentMode: 'online'
        }
      }
    });

    renderPage('/create-appointment', <CreateMyAppointmentPage />);
    fireEvent.click(screen.getByRole('button', { name: 'Tomorrow' }));
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const expectedTomorrow = `${tomorrow.getFullYear()}-${String(tomorrow.getMonth() + 1).padStart(2, '0')}-${String(tomorrow.getDate()).padStart(2, '0')}`;
    expect(screen.getByLabelText('Date').value).toBe(expectedTomorrow);
    const todayShortcut = screen.getByRole('button', { name: 'Today' });
    if (todayShortcut.disabled) {
      expect(screen.getByLabelText('Time').getAttribute('min')).toBeNull();
    } else {
      fireEvent.click(todayShortcut);
      expect(screen.getByLabelText('Time').getAttribute('min')).toMatch(/^\d{2}:\d{2}$/);
    }

    fireEvent.change(screen.getByLabelText('Date'), {
      target: { value: appointmentDate.slice(0, 10) }
    });
    fireEvent.change(screen.getByLabelText('Time'), {
      target: { value: appointmentDate.slice(11) }
    });
    fireEvent.change(screen.getByLabelText('Appointment mode'), {
      target: { value: 'online' }
    });
    fireEvent.change(screen.getByLabelText('Notes (optional)'), {
      target: { value: '  Initial consultation  ' }
    });
    fireEvent.submit(screen.getByRole('button', { name: /Create appointment/ }).closest('form'));

    expect(await screen.findByRole('heading', { name: 'Your appointment is booked' })).toBeTruthy();
    expect(screen.getByText('Appointment status')).toBeTruthy();
    expect(screen.getByText('Scheduled')).toBeTruthy();
    expect(screen.getByRole('link', { name: 'Return to patient homepage' }).getAttribute('href'))
      .toBe('/patient-home');
    expect(api.post).toHaveBeenCalledWith('/api/appointments/patient', {
      appointmentDate: new Date(appointmentDate).toISOString(),
      appointmentMode: 'online',
      notes: 'Initial consultation'
    });
    expect(api.post.mock.calls[0][1]).not.toHaveProperty('patientId');
  });

  it('searches and selects a patient username before staff booking', async () => {
    const appointmentDate = '2031-05-04T10:30';
    api.get.mockResolvedValue({
      data: { success: true, data: [{ _id: 'patient-user-1', username: 'patient1', role: 'patient' }] }
    });
    api.post.mockResolvedValue({
      data: { success: true, message: 'Appointment created successfully.', data: { _id: 'appointment-2' } }
    });

    renderPage('/create-patient-appointment', <CreatePatientAppointmentPage />);
    fireEvent.change(screen.getByLabelText('Patient username'), {
      target: { value: 'patient' }
    });
    fireEvent.click(screen.getByRole('button', { name: 'Search' }));

    fireEvent.click(await screen.findByRole('button', { name: /patient1/ }));
    fireEvent.change(screen.getByLabelText('Date'), {
      target: { value: appointmentDate.slice(0, 10) }
    });
    fireEvent.change(screen.getByLabelText('Time'), {
      target: { value: appointmentDate.slice(11) }
    });
    fireEvent.change(screen.getByLabelText('Appointment mode'), {
      target: { value: 'homevisit' }
    });
    fireEvent.submit(screen.getByRole('button', { name: /Create appointment/ }).closest('form'));

    await screen.findByText('Appointment created successfully.');
    expect(api.get).toHaveBeenCalledWith('/api/users/search', { params: { username: 'patient' } });
    expect(api.post).toHaveBeenCalledWith('/api/appointments/physiotherapist', {
      patientUsername: 'patient1',
      appointmentDate: new Date(appointmentDate).toISOString(),
      appointmentMode: 'homevisit'
    });
  });

  it('loads created appointments for the admin appointment page', async () => {
    api.get.mockResolvedValue({
      data: {
        success: true,
        data: [{
          _id: 'appointment-3',
          patient: { username: 'patient1', role: 'patient' },
          appointmentDate: '2031-05-04T10:30:00.000Z',
          appointmentMode: 'onclinic',
          status: 'scheduled',
          notes: 'Initial assessment'
        }]
      }
    });

    renderPage('/appointments', <ListAppointmentsPage />);

    expect(await screen.findByRole('heading', { name: 'patient1' })).toBeTruthy();
    expect(screen.getByText('Initial assessment')).toBeTruthy();
    expect(api.get).toHaveBeenCalledWith('/api/appointments');
  });

  it('loads the signed-in patient appointments from the patient-only endpoint', async () => {
    api.get.mockResolvedValue({
      data: {
        success: true,
        data: [{
          _id: 'my-appointment-1',
          appointmentDate: '2031-05-04T10:30:00.000Z',
          appointmentMode: 'online',
          status: 'scheduled',
          notes: 'Initial assessment'
        }]
      }
    });

    renderPage('/patient-home', <MyAppointmentsSection />);

    expect(await screen.findByText('Initial assessment')).toBeTruthy();
    expect(screen.getByText('Scheduled')).toBeTruthy();
    expect(screen.getByText('Online')).toBeTruthy();
    expect(api.get).toHaveBeenCalledWith('/api/appointments/my');
  });

  it('shows an empty state when the patient has no appointments', async () => {
    api.get.mockResolvedValue({ data: { success: true, data: [] } });

    renderPage('/patient-home', <MyAppointmentsSection />);

    expect(await screen.findByText('No appointments booked yet')).toBeTruthy();
    expect(screen.getByRole('link', { name: /Book appointment/ }).getAttribute('href'))
      .toBe('/create-appointment');
  });
});
