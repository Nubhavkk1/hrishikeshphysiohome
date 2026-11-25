import { useState } from 'react';
import { LogOut } from 'lucide-react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/useAuth';
import { api } from '../../services/api';
import ProfileImageControl from '../../component/ProfileImageControl';
import {
  deleteProfileImage,
  getProfileImageRequestError,
  uploadProfileImage
} from '../../services/profileImages';
import '../auth.css';

const initialDetails = {
  gender: '',
  age: '',
  address: '',
  pain: '',
  chiefComplaint: '',
  presentCondition: '',
  patientHistory: '',
  medicalSurgicalHistory: '',
  functionalEvaluation: '',
  gaitExamination: ''
};

export default function PatientDetailsPage() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const contactDetails = location.state;
  const [details, setDetails] = useState(initialDetails);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [profileSaved, setProfileSaved] = useState(false);
  const [profilePictureFile, setProfilePictureFile] = useState(null);
  const [profilePictureUrl, setProfilePictureUrl] = useState('');
  const [profilePictureError, setProfilePictureError] = useState('');
  const [profilePictureNotice, setProfilePictureNotice] = useState('');
  const [isUploadingProfilePicture, setIsUploadingProfilePicture] = useState(false);
  const [isRemovingProfilePicture, setIsRemovingProfilePicture] = useState(false);

  if (!contactDetails?.name || !contactDetails?.phoneno) {
    return <Navigate to="/patient-home" replace />;
  }

  const updateField = (event) => {
    const { name, value } = event.target;
    setDetails((currentDetails) => ({ ...currentDetails, [name]: value }));
  };

  const uploadSelectedProfilePicture = async () => {
    if (!profilePictureFile) {
      return false;
    }

    setProfilePictureError('');
    setProfilePictureNotice('');
    setIsUploadingProfilePicture(true);
    try {
      const response = await uploadProfileImage(
        '/api/patients/myprofile/profile-picture',
        profilePictureFile
      );
      const imageUrl = response.data?.data?.profilePicture;
      if (typeof imageUrl !== 'string' || !imageUrl) {
        throw new Error('The image upload response did not include a profile picture URL.');
      }

      setProfilePictureUrl(imageUrl);
      setProfilePictureFile(null);
      setProfilePictureNotice(response.data?.warning || '');
      return true;
    } catch (requestError) {
      setProfilePictureError(getProfileImageRequestError(
        requestError,
        'Unable to upload the profile picture. Please try again.'
      )
      );
      return false;
    } finally {
      setIsUploadingProfilePicture(false);
    }
  };

  const uploadAndContinue = async () => {
    if (await uploadSelectedProfilePicture()) {
      navigate('/patient-home', { replace: true });
    }
  };

  const removeProfilePicture = async () => {
    setProfilePictureError('');
    setProfilePictureNotice('');
    setIsRemovingProfilePicture(true);
    try {
      const response = await deleteProfileImage('/api/patients/myprofile/profile-picture');
      setProfilePictureUrl('');
      setProfilePictureNotice(response.data?.warning || '');
    } catch (requestError) {
      setProfilePictureError(getProfileImageRequestError(
        requestError,
        'Unable to remove the profile picture. Please try again.'
      )
      );
    } finally {
      setIsRemovingProfilePicture(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);

    const payload = {
      name: contactDetails.name,
      phoneno: contactDetails.phoneno,
      ...details,
      age: details.age ? Number(details.age) : undefined,
      presentCondition: details.presentCondition ? Number(details.presentCondition) : undefined
    };

    try {
      const response = await api.put('/api/patients/myprofile', payload);
      setProfilePictureUrl(response.data?.data?.profilePicture || '');
      setProfileSaved(true);

      if (profilePictureFile && !(await uploadSelectedProfilePicture())) {
        return;
      }

      navigate('/patient-home', { replace: true });
    } catch (requestError) {
      setError(
        requestError.response?.data?.message ||
        requestError.message ||
        'Unable to save your patient details. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
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

      <section className="patient-details-content">
        <p className="auth-eyebrow">PATIENT PROFILE</p>
        <h1>Tell us a little more, {user?.username || 'Patient'}</h1>
        <p className="patient-intake-intro">
          Your contact details are confirmed. Complete the details below to set up your profile.
        </p>

        {profileSaved ? (
          <section className="patient-details-form" aria-labelledby="patient-picture-heading">
            <h2 id="patient-picture-heading">Profile picture</h2>
            <p className="patient-intake-intro">Your profile details are saved. Add or update your picture, or continue to your portal.</p>
            <ProfileImageControl
              id="patient-profile-picture"
              label="Patient profile picture"
              imageUrl={profilePictureUrl}
              file={profilePictureFile}
              onFileChange={(file) => {
                setProfilePictureFile(file);
                setProfilePictureError('');
              }}
              onRemoveImage={profilePictureUrl ? removeProfilePicture : undefined}
              onUpload={profilePictureFile ? uploadAndContinue : undefined}
              isUploading={isUploadingProfilePicture || isRemovingProfilePicture}
              disabled={isSubmitting}
              error={profilePictureError}
              notice={profilePictureNotice}
            />
            <button
              className="auth-submit"
              type="button"
              disabled={isSubmitting || isUploadingProfilePicture || isRemovingProfilePicture}
              onClick={() => navigate('/patient-home', { replace: true })}
            >
              Continue to patient portal
            </button>
          </section>
        ) : (
        <form className="patient-details-form" onSubmit={handleSubmit}>
          <div className="patient-contact-summary">
            <div><span>Full name</span><strong>{contactDetails.name}</strong></div>
            <div><span>Phone number</span><strong>{contactDetails.phoneno}</strong></div>
          </div>

          <ProfileImageControl
            id="patient-profile-picture"
            label="Patient profile picture"
            imageUrl={profilePictureUrl}
            file={profilePictureFile}
            onFileChange={(file) => {
              setProfilePictureFile(file);
              setProfilePictureError('');
              setProfilePictureNotice('');
            }}
            disabled={isSubmitting}
            error={profilePictureError}
            notice={profilePictureNotice}
          />

          <div className="patient-form-grid">
            <div className="patient-form-field">
              <label htmlFor="gender">Gender</label>
              <select id="gender" name="gender" value={details.gender} onChange={updateField}>
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            <div className="patient-form-field">
              <label htmlFor="age">Age</label>
              <input
                id="age"
                name="age"
                type="number"
                min="0"
                max="120"
                value={details.age}
                onChange={updateField}
              />
            </div>

            <div className="patient-form-field">
              <label htmlFor="pain">Are you experiencing pain?</label>
              <select id="pain" name="pain" value={details.pain} onChange={updateField}>
                <option value="">Select an option</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

            <div className="patient-form-field">
              <label htmlFor="medicalSurgicalHistory">Medical/surgical history?</label>
              <select
                id="medicalSurgicalHistory"
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
              <label htmlFor="address">Address</label>
              <textarea
                id="address"
                name="address"
                rows="2"
                value={details.address}
                onChange={updateField}
              />
            </div>

            <div className="patient-form-field patient-form-field-wide">
              <label htmlFor="chiefComplaint">Chief complaint</label>
              <textarea
                id="chiefComplaint"
                name="chiefComplaint"
                rows="2"
                value={details.chiefComplaint}
                onChange={updateField}
              />
            </div>

            <div className="patient-form-field patient-form-field-wide">
              <label htmlFor="presentCondition">Present condition (1-10)</label>
              <input
                id="presentCondition"
                name="presentCondition"
                type="number"
                min="1"
                max="10"
                step="1"
                value={details.presentCondition}
                onChange={updateField}
              />
            </div>

            <div className="patient-form-field patient-form-field-wide">
              <label htmlFor="patientHistory">Patient history</label>
              <textarea
                id="patientHistory"
                name="patientHistory"
                rows="3"
                value={details.patientHistory}
                onChange={updateField}
              />
            </div>

            <div className="patient-form-field patient-form-field-wide">
              <label htmlFor="functionalEvaluation">Functional evaluation</label>
              <textarea
                id="functionalEvaluation"
                name="functionalEvaluation"
                rows="3"
                value={details.functionalEvaluation}
                onChange={updateField}
              />
            </div>

            <div className="patient-form-field patient-form-field-wide">
              <label htmlFor="gaitExamination">Gait examination</label>
              <textarea
                id="gaitExamination"
                name="gaitExamination"
                rows="3"
                value={details.gaitExamination}
                onChange={updateField}
              />
            </div>
          </div>

          {error && <p className="auth-error" role="alert">{error}</p>}

          <button className="auth-submit" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Saving details…' : 'Save patient details'}
          </button>
        </form>
        )}
      </section>
    </main>
  );
}