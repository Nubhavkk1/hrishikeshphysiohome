// @vitest-environment jsdom

import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { api } from '../services/api';
import CreatePatientPage from './adminPages/createPatient';
import CreatePhysiotherapistPage from './adminPages/createPhysiotherapist';
import PatientDetailsPage from './patientPages/patient_detailsPage';
import PatientMyProfilePage from './patientPages/myProfile';
import PatientHomepage from './patientHomepage';
import PhysiotherapistHomepage from './physiotherapistHomepage';

vi.mock('../context/useAuth', () => ({
  useAuth: () => ({ user: { username: 'admin', role: 'admin' }, logout: vi.fn() })
}));

function renderWithRoutes(path, element, routes = []) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path={path} element={element} />
        {routes.map(({ routePath, routeElement }) => (
          <Route key={routePath} path={routePath} element={routeElement} />
        ))}
      </Routes>
    </MemoryRouter>
  );
}

describe('profile image upload page integrations', () => {
  beforeEach(() => {
    vi.spyOn(api, 'get');
    vi.spyOn(api, 'post');
    vi.spyOn(api, 'put');
    vi.spyOn(api, 'delete');
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it('creates a patient, retries only a failed picture upload, and supports removal', async () => {
    const file = new File(['patient image'], 'patient.png', { type: 'image/png' });
    api.post
      .mockResolvedValueOnce({
        data: { data: { user: { _id: 'user-1', username: 'patient1' } } }
      })
      .mockResolvedValueOnce({
        data: { data: { _id: 'patient-profile-1', profilePicture: '' } }
      });
    api.put
      .mockRejectedValueOnce({ response: { data: { message: 'Cloudinary unavailable' } } })
      .mockResolvedValueOnce({
        data: { data: { profilePicture: 'https://res.cloudinary.com/patient.png' } }
      });
    api.delete.mockResolvedValue({ data: { success: true } });

    renderWithRoutes('/create-patient', <CreatePatientPage />);
    fireEvent.change(screen.getByLabelText('Username'), {
      target: { value: 'patient1' }
    });
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'patient-password' }
    });
    fireEvent.change(screen.getByLabelText('Confirm password'), {
      target: { value: 'patient-password' }
    });
    fireEvent.change(screen.getByLabelText('Patient profile picture'), {
      target: { files: [file] }
    });
    fireEvent.change(screen.getByLabelText('Full name'), {
      target: { value: 'Patient Name' }
    });
    fireEvent.change(screen.getByLabelText('Phone number'), {
      target: { value: '5551234567' }
    });
    fireEvent.submit(
      screen.getByRole('button', { name: 'Create account and patient profile' }).closest('form')
    );

    expect(await screen.findByText('Cloudinary unavailable')).toBeTruthy();
    expect(api.post).toHaveBeenCalledTimes(2);
    expect(api.post).toHaveBeenNthCalledWith(
      1,
      '/api/auth/register',
      { username: 'patient1', password: 'patient-password', role: 'patient' }
    );
    expect(api.post).toHaveBeenNthCalledWith(
      2,
      '/api/patients/create',
      expect.objectContaining({
        userId: 'user-1',
        name: 'Patient Name',
        phoneno: 5551234567
      })
    );
    fireEvent.click(screen.getByRole('button', { name: 'Retry upload' }));

    await screen.findByRole('button', { name: 'Remove Patient profile picture' });
    expect(api.post).toHaveBeenCalledTimes(2);
    expect(api.put).toHaveBeenCalledTimes(2);
    expect(api.put.mock.calls[0][0]).toBe('/api/patients/staff/patient-profile-1/profile-picture');
    expect(api.put.mock.calls[0][1].get('image')).toBe(file);

    fireEvent.click(screen.getByRole('button', { name: 'Remove Patient profile picture' }));
    await waitFor(() => {
      expect(api.delete).toHaveBeenCalledWith(
        '/api/patients/staff/patient-profile-1/profile-picture'
      );
    });
  });

  it('requires matching passwords before creating the patient account', async () => {
    renderWithRoutes('/create-patient', <CreatePatientPage />);
    fireEvent.change(screen.getByLabelText('Username'), {
      target: { value: 'patient1' }
    });
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'first-password' }
    });
    fireEvent.change(screen.getByLabelText('Confirm password'), {
      target: { value: 'different-password' }
    });
    fireEvent.change(screen.getByLabelText('Full name'), {
      target: { value: 'Patient Name' }
    });
    fireEvent.change(screen.getByLabelText('Phone number'), {
      target: { value: '5551234567' }
    });
    fireEvent.click(screen.getByRole('button', { name: 'Create account and patient profile' }));

    expect(await screen.findByText('Password and confirmation do not match.')).toBeTruthy();
    expect(api.post).not.toHaveBeenCalled();
  });

  it('retries patient profile creation without registering the account twice', async () => {
    api.post
      .mockResolvedValueOnce({
        data: { data: { user: { _id: 'user-1', username: 'patient1' } } }
      })
      .mockRejectedValueOnce({ response: { data: { message: 'Patient service unavailable' } } })
      .mockResolvedValueOnce({
        data: { data: { _id: 'patient-profile-1', profilePicture: '' } }
      });

    renderWithRoutes('/create-patient', <CreatePatientPage />);
    fireEvent.change(screen.getByLabelText('Username'), {
      target: { value: 'patient1' }
    });
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'patient-password' }
    });
    fireEvent.change(screen.getByLabelText('Confirm password'), {
      target: { value: 'patient-password' }
    });
    fireEvent.change(screen.getByLabelText('Full name'), {
      target: { value: 'Patient Name' }
    });
    fireEvent.change(screen.getByLabelText('Phone number'), {
      target: { value: '5551234567' }
    });
    fireEvent.click(screen.getByRole('button', { name: 'Create account and patient profile' }));

    expect(await screen.findByText(/Patient account patient1 was created, but its patient profile was not/)).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Finish patient profile' })).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: 'Finish patient profile' }));

    expect(await screen.findByText('Patient account and profile created for patient1.')).toBeTruthy();
    expect(api.post).toHaveBeenCalledTimes(3);
    expect(api.post.mock.calls[0][0]).toBe('/api/auth/register');
    expect(api.post.mock.calls[1][0]).toBe('/api/patients/create');
    expect(api.post.mock.calls[2][0]).toBe('/api/patients/create');
  });

  it('creates a physiotherapist and uploads profile and cover images', async () => {
    const profilePicture = new File(['profile'], 'profile.jpg', { type: 'image/jpeg' });
    const coverImage = new File(['cover'], 'cover.webp', { type: 'image/webp' });
    api.post.mockResolvedValue({
      data: {
        data: {
          user: { username: 'physio1' },
          profile: { _id: 'physio-profile-1' }
        }
      }
    });
    api.put
      .mockResolvedValueOnce({
        data: { data: { profilePicture: 'https://res.cloudinary.com/profile.jpg' } }
      })
      .mockResolvedValueOnce({
        data: { data: { coverImage: 'https://res.cloudinary.com/cover.webp' } }
      });

    renderWithRoutes('/create-physio', <CreatePhysiotherapistPage />);
    fireEvent.change(screen.getByLabelText('Full name'), {
      target: { value: 'Physiotherapist Name' }
    });
    fireEvent.change(screen.getByLabelText('Username'), {
      target: { value: 'physio1' }
    });
    fireEvent.change(screen.getByLabelText('Temporary password'), {
      target: { value: 'temporary-password' }
    });
    fireEvent.change(screen.getByLabelText('Profile picture'), {
      target: { files: [profilePicture] }
    });
    fireEvent.change(screen.getByLabelText('Cover image'), {
      target: { files: [coverImage] }
    });
    fireEvent.submit(
      screen.getByRole('button', { name: 'Create physiotherapist' }).closest('form')
    );

    await screen.findByRole('img', { name: 'Cover image preview' });
    expect(api.put).toHaveBeenNthCalledWith(
      1,
      '/api/physiotherapists/staff/physio-profile-1/images/profile-picture',
      expect.any(FormData)
    );
    expect(api.put).toHaveBeenNthCalledWith(
      2,
      '/api/physiotherapists/staff/physio-profile-1/images/cover-image',
      expect.any(FormData)
    );
    expect(api.put.mock.calls[0][1].get('image')).toBe(profilePicture);
    expect(api.put.mock.calls[1][1].get('image')).toBe(coverImage);
  });

  it('saves patient details once, retries a failed self-service upload, then continues', async () => {
    const file = new File(['patient'], 'patient.webp', { type: 'image/webp' });
    api.put
      .mockResolvedValueOnce({ data: { data: { profilePicture: '' } } })
      .mockRejectedValueOnce({ response: { data: { message: 'Upload failed' } } })
      .mockResolvedValueOnce({
        data: { data: { profilePicture: 'https://res.cloudinary.com/self-patient.webp' } }
      });

    render(
      <MemoryRouter
        initialEntries={[{
          pathname: '/patient-details',
          state: { name: 'Self Patient', phoneno: 5551234567 }
        }]}
      >
        <Routes>
          <Route path="/patient-details" element={<PatientDetailsPage />} />
          <Route path="/patient-home" element={<p>Patient portal</p>} />
        </Routes>
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText('Patient profile picture'), {
      target: { files: [file] }
    });
    fireEvent.submit(screen.getByRole('button', { name: 'Save patient details' }).closest('form'));

    expect(await screen.findByText('Upload failed')).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: 'Retry upload' }));

    expect(await screen.findByText('Patient portal')).toBeTruthy();
    expect(api.put).toHaveBeenCalledTimes(3);
    expect(api.put.mock.calls[0][0]).toBe('/api/patients/myprofile');
    expect(api.put.mock.calls[1][0]).toBe('/api/patients/myprofile/profile-picture');
    expect(api.put.mock.calls[2][0]).toBe('/api/patients/myprofile/profile-picture');
    expect(api.put.mock.calls[1][1].get('image')).toBe(file);
    expect(api.put.mock.calls[2][1].get('image')).toBe(file);
  });

  it('lets a patient retry a failed image upload from their profile page', async () => {
    const file = new File(['patient'], 'patient.png', { type: 'image/png' });
    api.get.mockResolvedValue({
      data: { data: { name: 'Patient One', profilePicture: '' } }
    });
    api.put
      .mockRejectedValueOnce({ code: 'ERR_NETWORK', message: 'Network Error' })
      .mockResolvedValueOnce({
        data: { data: { profilePicture: 'https://res.cloudinary.com/patient.png' } }
      });
    api.delete.mockResolvedValue({ data: { success: true } });

    render(
      <MemoryRouter initialEntries={['/patient-home']}>
        <Routes>
          <Route path="/patient-home" element={<PatientHomepage />} />
        </Routes>
      </MemoryRouter>
    );

    fireEvent.change(await screen.findByLabelText('Patient profile picture'), {
      target: { files: [file] }
    });
    fireEvent.click(screen.getByRole('button', { name: 'Upload image' }));
    expect(await screen.findByText(/Cannot reach the HPH backend/)).toBeTruthy();

    fireEvent.click(screen.getByRole('button', { name: 'Retry upload' }));
    expect(await screen.findByRole('img', { name: 'Patient profile picture preview' })).toBeTruthy();
    expect(api.put).toHaveBeenCalledTimes(2);
    expect(api.put.mock.calls[0][0]).toBe('/api/patients/myprofile/profile-picture');
    expect(api.put.mock.calls[0][1].get('image')).toBe(file);

    fireEvent.click(screen.getByRole('button', { name: 'Remove Patient profile picture' }));
    await waitFor(() => {
      expect(api.delete).toHaveBeenCalledWith('/api/patients/myprofile/profile-picture');
    });
  });

  it('updates patient profile details from the My Profile page', async () => {
    api.get.mockResolvedValue({
      data: {
        data: {
          name: 'Patient One',
          phoneno: 5551234567,
          gender: 'Female',
          age: 32,
          profilePicture: ''
        }
      }
    });
    api.put.mockResolvedValue({
      data: {
        data: {
          name: 'Patient Updated',
          phoneno: 5551234567,
          gender: 'Other',
          age: 34,
          profilePicture: ''
        }
      }
    });

    renderWithRoutes('/my-profile', <PatientMyProfilePage />);

    fireEvent.change(await screen.findByLabelText('Full name'), {
      target: { value: 'Patient Updated' }
    });
    fireEvent.change(screen.getByLabelText('Gender'), {
      target: { value: 'Other' }
    });
    fireEvent.change(screen.getByLabelText('Age'), {
      target: { value: '34' }
    });
    fireEvent.click(screen.getByRole('button', { name: 'Save changes' }));

    expect(await screen.findByText('Your profile details were updated.')).toBeTruthy();
    expect(api.put).toHaveBeenCalledWith(
      '/api/patients/myprofile',
      expect.objectContaining({
        name: 'Patient Updated',
        phoneno: 5551234567,
        gender: 'Other',
        age: 34
      })
    );
  });

  it('links patients to real appointment creation', async () => {
    api.get.mockResolvedValue({ data: { data: { name: 'Patient One', profilePicture: '' } } });

    renderWithRoutes('/patient-home', <PatientHomepage />);

    const appointmentLink = await screen.findByRole('link', { name: 'Create appointment' });

    expect(appointmentLink.getAttribute('href')).toBe('/create-appointment');
    expect(api.post).not.toHaveBeenCalled();
  });

  it('lets a physiotherapist retry their profile image upload and manage their cover image', async () => {
    const file = new File(['profile'], 'profile.webp', { type: 'image/webp' });
    const coverFile = new File(['cover'], 'cover.jpg', { type: 'image/jpeg' });
    api.get.mockResolvedValue({ data: { data: { profilePicture: '', coverImage: '' } } });
    api.put
      .mockRejectedValueOnce({ code: 'ERR_NETWORK', message: 'Network Error' })
      .mockResolvedValueOnce({
        data: { data: { profilePicture: 'https://res.cloudinary.com/profile.webp' } }
      })
      .mockResolvedValueOnce({
        data: { data: { coverImage: 'https://res.cloudinary.com/cover.jpg' } }
      });
    api.delete.mockResolvedValue({ data: { success: true } });

    render(
      <MemoryRouter initialEntries={['/physiotherapist-home']}>
        <Routes>
          <Route path="/physiotherapist-home" element={<PhysiotherapistHomepage />} />
        </Routes>
      </MemoryRouter>
    );

    fireEvent.change(await screen.findByLabelText('Profile picture'), {
      target: { files: [file] }
    });
    fireEvent.click(screen.getByRole('button', { name: 'Upload image' }));
    expect(await screen.findByText(/Cannot reach the HPH backend/)).toBeTruthy();

    fireEvent.click(screen.getByRole('button', { name: 'Retry upload' }));
    expect(await screen.findByRole('img', { name: 'Profile picture preview' })).toBeTruthy();

    fireEvent.change(screen.getByLabelText('Cover image'), {
      target: { files: [coverFile] }
    });
    fireEvent.click(screen.getByRole('button', { name: 'Upload image' }));
    expect(await screen.findByRole('img', { name: 'Cover image preview' })).toBeTruthy();
    expect(api.put).toHaveBeenNthCalledWith(
      1,
      '/api/physiotherapists/myprofile/images/profile-picture',
      expect.any(FormData)
    );
    expect(api.put).toHaveBeenNthCalledWith(
      2,
      '/api/physiotherapists/myprofile/images/profile-picture',
      expect.any(FormData)
    );
    expect(api.put).toHaveBeenNthCalledWith(
      3,
      '/api/physiotherapists/myprofile/images/cover-image',
      expect.any(FormData)
    );
    expect(api.put.mock.calls[1][1].get('image')).toBe(file);

    fireEvent.click(screen.getByRole('button', { name: 'Remove Profile picture' }));
    await waitFor(() => {
      expect(api.delete).toHaveBeenCalledWith(
        '/api/physiotherapists/myprofile/images/profile-picture'
      );
    });
  });
});
