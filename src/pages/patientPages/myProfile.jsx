import { useEffect, useState } from 'react';
import { ArrowLeft, Home, LogOut, UserRound } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/useAuth';
import { api } from '../../services/api';
import ProfileImageControl from '../../component/ProfileImageControl';
import {
  deleteProfileImage,
  getProfileImageRequestError,
  uploadProfileImage
} from '../../services/profileImages';
import '../auth.css';
import '../patientHomepage.css';

const profileFieldNames = [
  'name',
  'phoneno',
  'gender',
  'age',
  'address',
  'pain',
  'chiefComplaint',
  'presentCondition',
  'patientHistory',
  'medicalSurgicalHistory',
  'functionalEvaluation',
  'gaitExamination'
];

function getProfileForm(profile) {
  return Object.fromEntries(
    profileFieldNames.map((field) => [
      field,
      profile?.[field] === undefined || profile?.[field] === null
        ? ''
        : String(profile[field])
    ])
  );
}

export default function PatientMyProfilePage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [details, setDetails] = useState(getProfileForm(null));
  const [isLoading, setIsLoading] = useState(true);
  const [retryCount, setRetryCount] = useState(0);
  const [loadError, setLoadError] = useState('');
  const [saveError, setSaveError] = useState('');
  const [saveNotice, setSaveNotice] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [profilePictureFile, setProfilePictureFile] = useState(null);
  const [profilePictureError, setProfilePictureError] = useState('');
  const [profilePictureNotice, setProfilePictureNotice] = useState('');
  const [isUpdatingProfilePicture, setIsUpdatingProfilePicture] = useState(false);

  useEffect(() => {
    let active = true;

    const fetchProfile = async () => {
      setIsLoading(true);
      setLoadError('');

      try {
        const response = await api.get('/api/patients/myprofile');
        if (active) {
          const patientProfile = response.data?.data;
          setProfile(patientProfile);
          setDetails(getProfileForm(patientProfile));
          setIsLoading(false);
        }
      } catch (requestError) {
        if (!active) return;

        if (
          requestError.response?.status === 404 &&
          requestError.response?.data?.code === 'PATIENT_PROFILE_NOT_FOUND'
        ) {
          navigate('/ask-patient-name', { replace: true });
          return;
        }

        setLoadError(
          requestError.response?.data?.message ||
          requestError.message ||
          'Unable to load your patient profile.'
        );
        setIsLoading(false);
      }
    };

    fetchProfile();
    return () => {
      active = false;
    };
  }, [navigate, retryCount]);

  const updateField = (event) => {
    const { name, value } = event.target;
    setDetails((currentDetails) => ({ ...currentDetails, [name]: value }));
    setSaveError('');
    setSaveNotice('');
  };

  const saveProfile = async (event) => {
    event.preventDefault();
    setSaveError('');
    setSaveNotice('');

    const name = details.name.trim();
    const phone = details.phoneno.trim();
    if (!name || !phone) {
      setSaveError('Full name and phone number are required.');
      return;
    }

    const payload = {
      name,
      phoneno: Number(phone),
      gender: details.gender,
      address: details.address.trim(),
      pain: details.pain,
      chiefComplaint: details.chiefComplaint.trim(),
      patientHistory: details.patientHistory.trim(),
      medicalSurgicalHistory: details.medicalSurgicalHistory,
      functionalEvaluation: details.functionalEvaluation.trim(),
      gaitExamination: details.gaitExamination.trim()
    };
    if (details.age !== '') {
      payload.age = Number(details.age);
    }
    if (details.presentCondition !== '') {
      payload.presentCondition = Number(details.presentCondition);
    }

    setIsSaving(true);
    try {
      const response = await api.put('/api/patients/myprofile', payload);
      const updatedProfile = response.data?.data;
      const nextProfile = {
        ...(profile || {}),
        ...payload,
        ...(updatedProfile || {})
      };
      setProfile(nextProfile);
      setDetails(getProfileForm(nextProfile));
      setSaveNotice(response.data?.message || 'Your profile details were updated.');
    } catch (requestError) {
      setSaveError(
        requestError.response?.data?.message ||
        requestError.message ||
        'Unable to update your patient profile. Please try again.'
      );
    } finally {
      setIsSaving(false);
    }
  };

  const uploadSelectedProfilePicture = async () => {
    if (!profilePictureFile) {
      return;
    }

    setProfilePictureError('');
    setProfilePictureNotice('');
    setIsUpdatingProfilePicture(true);
    try {
      const response = await uploadProfileImage(
        '/api/patients/myprofile/profile-picture',
        profilePictureFile
      );
      const updatedProfile = response.data?.data;
      if (typeof updatedProfile?.profilePicture !== 'string' || !updatedProfile.profilePicture) {
        throw new Error('The image upload response did not include a profile picture URL.');
      }

      setProfile((currentProfile) => (
        currentProfile ? { ...currentProfile, ...updatedProfile } : currentProfile
      ));
      setProfilePictureFile(null);
      setProfilePictureNotice(response.data?.warning || 'Profile picture updated.');
    } catch (requestError) {
      setProfilePictureError(getProfileImageRequestError(
        requestError,
        'Unable to update your profile picture. Please try again.'
      ));
    } finally {
      setIsUpdatingProfilePicture(false);
    }
  };

  const removeProfilePicture = async () => {
    setProfilePictureError('');
    setProfilePictureNotice('');
    setIsUpdatingProfilePicture(true);
    try {
      const response = await deleteProfileImage('/api/patients/myprofile/profile-picture');
      setProfile((currentProfile) => (
        currentProfile
          ? { ...currentProfile, profilePicture: '', profilePicturePublicId: '' }
          : currentProfile
      ));
      setProfilePictureNotice(response.data?.warning || 'Profile picture removed.');
    } catch (requestError) {
      setProfilePictureError(getProfileImageRequestError(
        requestError,
        'Unable to remove your profile picture. Please try again.'
      ));
    } finally {
      setIsUpdatingProfilePicture(false);
    }
  };

  return (
    <div className="workspace-page patient-workspace">
      <aside className="workspace-sidebar patient-sidebar">
        <Link className="workspace-brand" to="/" aria-label="Hrishikesh Physio Home">
          <img src="/images/logoxkx.png" alt="" />
          <span>Hrishikesh<strong>Physio Home</strong></span>
        </Link>
        <p className="workspace-nav-label">YOUR SPACE</p>
        <nav className="workspace-nav" aria-label="Patient navigation">
          <Link className="workspace-nav-link" to="/patient-home">
            <Home size={18} aria-hidden="true" />
            Home
          </Link>
          <a className="workspace-nav-link is-active" href="#my-profile" aria-current="page">
            <UserRound size={18} aria-hidden="true" />
            My profile
          </a>
        </nav>
        <div className="workspace-sidebar-bottom">PATIENT PORTAL</div>
      </aside>

      <div className="workspace-main">
        <header className="workspace-topbar">
          <div>
            <p className="workspace-breadcrumb">Patient space <span>/</span> My profile</p>
            <h1>My profile</h1>
          </div>
          <div className="workspace-account">
            <div className="workspace-account-copy">
              <strong>{profile?.name || user?.username || 'Patient'}</strong>
              <span>Patient</span>
            </div>
            {profile?.profilePicture ? (
              <img className="workspace-avatar workspace-avatar-image" src={profile.profilePicture} alt="" />
            ) : (
              <span className="workspace-avatar" aria-hidden="true">
                {(profile?.name || user?.username || 'P').slice(0, 1).toUpperCase()}
              </span>
            )}
            <button className="workspace-signout" type="button" onClick={logout}>
              <LogOut size={17} aria-hidden="true" />
              <span>Sign out</span>
            </button>
          </div>
        </header>

        <main className="workspace-content patient-my-profile-content" id="my-profile">
          <Link className="patient-back-link" to="/patient-home">
            <ArrowLeft size={16} aria-hidden="true" />
            Back to patient home
          </Link>
          {isLoading ? (
            <p className="workspace-loading" role="status">Loading your profile…</p>
          ) : loadError ? (
            <div className="patient-profile-error" role="alert">
              <p>{loadError}</p>
              <button
                className="patient-retry-button"
                type="button"
                onClick={() => setRetryCount((count) => count + 1)}
              >
                Try again
              </button>
            </div>
          ) : (
            <div className="patient-my-profile-columns">
              <section className="patient-side-card patient-my-profile-card" aria-labelledby="my-profile-heading">
                <p className="workspace-eyebrow">YOUR DETAILS</p>
                <h2 id="my-profile-heading">Update your profile</h2>
                <p className="patient-settings-description">
                  Keep your contact and care details current. Changes are saved to your patient profile.
                </p>
                <form className="patient-my-profile-form" onSubmit={saveProfile}>
                  <div className="patient-form-grid">
                    <div className="patient-form-field">
                      <label htmlFor="my-profile-name">Full name</label>
                      <input
                        id="my-profile-name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        value={details.name}
                        onChange={updateField}
                        required
                      />
                    </div>
                    <div className="patient-form-field">
                      <label htmlFor="my-profile-phone">Phone number</label>
                      <input
                        id="my-profile-phone"
                        name="phoneno"
                        type="tel"
                        inputMode="numeric"
                        autoComplete="tel"
                        pattern="[0-9]{7,15}"
                        value={details.phoneno}
                        onChange={updateField}
                        required
                      />
                    </div>
                    <div className="patient-form-field">
                      <label htmlFor="my-profile-gender">Gender</label>
                      <select id="my-profile-gender" name="gender" value={details.gender} onChange={updateField}>
                        <option value="">Select gender</option>
                        <option value="Female">Female</option>
                        <option value="Male">Male</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div className="patient-form-field">
                      <label htmlFor="my-profile-age">Age</label>
                      <input
                        id="my-profile-age"
                        name="age"
                        type="number"
                        min="0"
                        max="120"
                        value={details.age}
                        onChange={updateField}
                      />
                    </div>
                    <div className="patient-form-field">
                      <label htmlFor="my-profile-pain">Experiencing pain?</label>
                      <select id="my-profile-pain" name="pain" value={details.pain} onChange={updateField}>
                        <option value="">Select an option</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                    </div>
                    <div className="patient-form-field">
                      <label htmlFor="my-profile-medical-history">Medical/surgical history?</label>
                      <select
                        id="my-profile-medical-history"
                        name="medicalSurgicalHistory"
                        value={details.medicalSurgicalHistory}
                        onChange={updateField}
                      >
                        <option value="">Select an option</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                    </div>
                    <div className="patient-form-field patient-form-field-wide">
                      <label htmlFor="my-profile-address">Address</label>
                      <textarea
                        id="my-profile-address"
                        name="address"
                        rows="2"
                        value={details.address}
                        onChange={updateField}
                      />
                    </div>
                    <div className="patient-form-field patient-form-field-wide">
                      <label htmlFor="my-profile-complaint">Chief complaint</label>
                      <textarea
                        id="my-profile-complaint"
                        name="chiefComplaint"
                        rows="2"
                        value={details.chiefComplaint}
                        onChange={updateField}
                      />
                    </div>
                    <div className="patient-form-field patient-form-field-wide">
                      <label htmlFor="my-profile-condition">Present condition (1-10)</label>
                      <input
                        id="my-profile-condition"
                        name="presentCondition"
                        type="number"
                        min="1"
                        max="10"
                        value={details.presentCondition}
                        onChange={updateField}
                      />
                    </div>
                    <div className="patient-form-field patient-form-field-wide">
                      <label htmlFor="my-profile-history">Patient history</label>
                      <textarea
                        id="my-profile-history"
                        name="patientHistory"
                        rows="3"
                        value={details.patientHistory}
                        onChange={updateField}
                      />
                    </div>
                    <div className="patient-form-field patient-form-field-wide">
                      <label htmlFor="my-profile-functional">Functional evaluation</label>
                      <textarea
                        id="my-profile-functional"
                        name="functionalEvaluation"
                        rows="3"
                        value={details.functionalEvaluation}
                        onChange={updateField}
                      />
                    </div>
                    <div className="patient-form-field patient-form-field-wide">
                      <label htmlFor="my-profile-gait">Gait examination</label>
                      <textarea
                        id="my-profile-gait"
                        name="gaitExamination"
                        rows="3"
                        value={details.gaitExamination}
                        onChange={updateField}
                      />
                    </div>
                  </div>
                  {saveError && <p className="auth-error" role="alert">{saveError}</p>}
                  {saveNotice && <p className="auth-success" role="status">{saveNotice}</p>}
                  <div className="patient-my-profile-actions">
                    <Link className="patient-secondary-action" to="/patient-home">Cancel</Link>
                    <button className="patient-primary-action" type="submit" disabled={isSaving}>
                      {isSaving ? 'Saving profile…' : 'Save changes'}
                    </button>
                  </div>
                </form>
              </section>

              <section className="patient-side-card patient-my-picture-card" aria-labelledby="my-picture-heading">
                <p className="workspace-eyebrow">PROFILE PHOTO</p>
                <h2 id="my-picture-heading">Your picture</h2>
                <p className="patient-settings-description">Choose a photo to personalize your patient portal.</p>
                <ProfileImageControl
                  id="my-profile-picture"
                  label="Patient profile picture"
                  imageUrl={profile?.profilePicture || ''}
                  file={profilePictureFile}
                  onFileChange={(file) => {
                    setProfilePictureFile(file);
                    setProfilePictureError('');
                    setProfilePictureNotice('');
                  }}
                  onRemoveImage={profile?.profilePicture ? removeProfilePicture : undefined}
                  onUpload={profilePictureFile ? uploadSelectedProfilePicture : undefined}
                  isUploading={isUpdatingProfilePicture}
                  error={profilePictureError}
                  notice={profilePictureNotice}
                />
              </section>
            </div>
          )}
        </main>

        <footer className="workspace-footer">
          <span>© Hrishikesh Physio Home</span>
          <span>Supporting better care, together</span>
        </footer>
      </div>
    </div>
  );
}
