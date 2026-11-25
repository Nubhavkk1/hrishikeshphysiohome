import { useState } from 'react';
import { ArrowLeft, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/useAuth';
import { getHomePath } from '../../context/authRoutes';
import ProfileImageControl from '../../component/ProfileImageControl';
import { api } from '../../services/api';
import {
  deleteProfileImage,
  getProfileImageRequestError,
  uploadProfileImage
} from '../../services/profileImages';
import '../auth.css';
import './createPatient.css';

const initialDetails = {
  username: '',
  password: '',
  confirmPassword: '',
  name: '',
  phoneno: '',
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

function getRegisteredUserId(responseData) {
  const registeredUser =
    responseData?.user ||
    responseData?.data?.user ||
    responseData?.data ||
    responseData;
  const userId =
    registeredUser?._id ||
    registeredUser?.id ||
    responseData?.userId ||
    responseData?.data?.userId;

  return typeof userId === 'string' || typeof userId === 'number'
    ? String(userId)
    : '';
}

export default function CreatePatientPage() {
  const { user, logout } = useAuth();
  const [details, setDetails] = useState(initialDetails);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [profilePictureFile, setProfilePictureFile] = useState(null);
  const [createdUser, setCreatedUser] = useState(null);
  const [createdProfile, setCreatedProfile] = useState(null);
  const [profilePictureError, setProfilePictureError] = useState('');
  const [profilePictureNotice, setProfilePictureNotice] = useState('');
  const [isUploadingProfilePicture, setIsUploadingProfilePicture] = useState(false);
  const [isRemovingProfilePicture, setIsRemovingProfilePicture] = useState(false);
  const homePath = getHomePath(user?.role);

  const uploadPatientPicture = async (profileId, file) => {
    if (!profileId || !file) {
      return false;
    }

    setProfilePictureError('');
    setProfilePictureNotice('');
    setIsUploadingProfilePicture(true);
    try {
      const response = await uploadProfileImage(
        `/api/patients/staff/${profileId}/profile-picture`,
        file
      );
      const imageUrl = response.data?.data?.profilePicture;
      if (typeof imageUrl !== 'string' || !imageUrl) {
        throw new Error('The image upload response did not include a profile picture URL.');
      }

      setCreatedProfile((currentProfile) => (
        currentProfile ? { ...currentProfile, profilePicture: imageUrl } : currentProfile
      ));
      setProfilePictureFile(null);
      setProfilePictureNotice(response.data?.warning || '');
      return true;
    } catch (requestError) {
      setProfilePictureError(getProfileImageRequestError(
        requestError,
        'Unable to upload the patient picture. You can retry without recreating the profile.'
      )
      );
      return false;
    } finally {
      setIsUploadingProfilePicture(false);
    }
  };

  const removePatientPicture = async () => {
    if (!createdProfile?._id) {
      return;
    }

    setProfilePictureError('');
    setProfilePictureNotice('');
    setIsRemovingProfilePicture(true);
    try {
      const response = await deleteProfileImage(
        `/api/patients/staff/${createdProfile._id}/profile-picture`
      );
      setCreatedProfile((currentProfile) => (
        currentProfile ? { ...currentProfile, profilePicture: '' } : currentProfile
      ));
      setProfilePictureNotice(response.data?.warning || '');
    } catch (requestError) {
      setProfilePictureError(getProfileImageRequestError(
        requestError,
        'Unable to remove the patient picture. Please try again.'
      )
      );
    } finally {
      setIsRemovingProfilePicture(false);
    }
  };

  const updateField = (event) => {
    const { name, value } = event.target;
    setDetails((currentDetails) => ({ ...currentDetails, [name]: value }));
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    if (!createdUser && details.password !== details.confirmPassword) {
      setError('Password and confirmation do not match.');
      return;
    }

    setIsSubmitting(true);
    let patientUser = createdUser;
    let accountWasCreated = Boolean(createdUser);

    try {
      if (!patientUser) {
        const accountResponse = await api.post('/api/auth/register', {
          username: details.username.trim(),
          password: details.password,
          role: 'patient'
        });
        patientUser = {
          _id: getRegisteredUserId(accountResponse.data),
          username: accountResponse.data?.user?.username || details.username.trim()
        };
        accountWasCreated = true;
        setCreatedUser(patientUser);
        setDetails((currentDetails) => ({
          ...currentDetails,
          password: '',
          confirmPassword: ''
        }));
      }

      if (!patientUser?._id) {
        const lookupResponse = await api.get('/api/users/search', {
          params: { username: patientUser.username }
        });
        const users = lookupResponse.data?.data;
        if (!Array.isArray(users)) {
          throw new Error('The account was created, but the user lookup response was invalid.');
        }

        const matchingUser = users.find(
          (candidate) => candidate.username?.trim().toLowerCase() === patientUser.username.toLowerCase()
        );
        if (!matchingUser?._id) {
          throw new Error(
            'The account was created, but its user ID could not be found. Retry to look it up again.'
          );
        }

        patientUser = { ...patientUser, _id: String(matchingUser._id) };
        setCreatedUser(patientUser);
      }

      const payload = {
        ...Object.fromEntries(
          Object.entries(details).filter(
            ([field]) => !['username', 'password', 'confirmPassword'].includes(field)
          )
        ),
        userId: patientUser._id,
        name: details.name.trim(),
        phoneno: Number(details.phoneno),
        age: details.age !== '' ? Number(details.age) : undefined,
        presentCondition: details.presentCondition !== ''
          ? Number(details.presentCondition)
          : undefined
      };
      const response = await api.post('/api/patients/create', payload);
      const profile = response.data?.data;
      const profileId = profile?._id;
      setCreatedProfile({
        _id: profileId,
        username: patientUser.username,
        profilePicture: profile?.profilePicture || ''
      });
      setDetails(initialDetails);
      setSuccess(`Patient account and profile created for ${patientUser.username}.`);
      if (profilePictureFile) {
        if (profileId) {
          await uploadPatientPicture(profileId, profilePictureFile);
        } else {
          setProfilePictureError(
            'The patient profile was created, but its ID was missing from the response. The profile picture could not be uploaded.'
          );
        }
      }
    } catch (requestError) {
      const requestMessage =
        requestError.response?.data?.message ||
        requestError.message ||
        'Please try again.';
      setError(accountWasCreated
        ? `Patient account ${patientUser?.username || details.username.trim()} was created, but its patient profile was not. ${requestMessage} Retry to create the profile without registering the account again.`
        : `Unable to create the patient account. ${requestMessage}`);
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

      <section className="patient-details-content" aria-labelledby="create-patient-heading">
        <Link className="auth-back-link" to={homePath}>
          <ArrowLeft size={17} aria-hidden="true" />
          Back to workspace
        </Link>
        <p className="auth-eyebrow patient-management-eyebrow">PATIENT MANAGEMENT</p>
        <h1 id="create-patient-heading">Create patient</h1>
        <p className="patient-intake-intro">
          Create the patient's sign-in account and care profile in one consecutive workflow.
        </p>

        {createdUser && !createdProfile && (
          <div className="patient-selected-account" role="status">
            Account created for <strong>{createdUser.username}</strong>. Complete the patient profile
            below; retrying will not create the account again.
          </div>
        )}

        {!createdProfile && (
          <form className="patient-details-form" onSubmit={handleSubmit}>
            <section className="patient-create-account-section" aria-labelledby="patient-account-heading">
              <h2 id="patient-account-heading">Patient account</h2>
              <div className="patient-form-grid">
                <div className="patient-form-field">
                  <label htmlFor="patient-username">Username</label>
                  <input
                    id="patient-username"
                    name="username"
                    type="text"
                    autoComplete="username"
                    value={details.username}
                    onChange={updateField}
                    disabled={isSubmitting || Boolean(createdUser)}
                    required
                  />
                </div>
                <div className="patient-form-field">
                  <label htmlFor="patient-password">Password</label>
                  <input
                    id="patient-password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    value={details.password}
                    onChange={updateField}
                    disabled={isSubmitting || Boolean(createdUser)}
                    required={!createdUser}
                  />
                </div>
                {!createdUser && (
                  <div className="patient-form-field">
                    <label htmlFor="patient-confirm-password">Confirm password</label>
                    <input
                      id="patient-confirm-password"
                      name="confirmPassword"
                      type="password"
                      autoComplete="new-password"
                      value={details.confirmPassword}
                      onChange={updateField}
                      disabled={isSubmitting}
                      required
                    />
                  </div>
                )}
              </div>
            </section>

            <section className="patient-create-details-section" aria-labelledby="patient-information-heading">
              <h2 id="patient-information-heading">Patient information</h2>
            <ProfileImageControl
              id="create-patient-profile-picture"
              label="Patient profile picture"
              imageUrl=""
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
              <label htmlFor="name">Full name</label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                value={details.name}
                onChange={updateField}
                disabled={isSubmitting}
                required
              />
            </div>

            <div className="patient-form-field">
              <label htmlFor="phoneno">Phone number</label>
              <input
                id="phoneno"
                name="phoneno"
                type="tel"
                inputMode="numeric"
                autoComplete="tel"
                pattern="[0-9]{7,15}"
                value={details.phoneno}
                onChange={updateField}
                disabled={isSubmitting}
                required
              />
            </div>

            <div className="patient-form-field">
              <label htmlFor="gender">Gender</label>
              <select
                id="gender"
                name="gender"
                value={details.gender}
                onChange={updateField}
                disabled={isSubmitting}
              >
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
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
                disabled={isSubmitting}
              />
            </div>

            <div className="patient-form-field">
              <label htmlFor="pain">Are you experiencing pain?</label>
              <select
                id="pain"
                name="pain"
                value={details.pain}
                onChange={updateField}
                disabled={isSubmitting}
              >
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
                disabled={isSubmitting}
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
                disabled={isSubmitting}
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
                disabled={isSubmitting}
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
                disabled={isSubmitting}
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
                disabled={isSubmitting}
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
                disabled={isSubmitting}
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
                disabled={isSubmitting}
              />
            </div>
            </div>
            </section>

            {error && <p className="auth-error" role="alert">{error}</p>}

            <button className="auth-submit" type="submit" disabled={isSubmitting}>
              {isSubmitting
                ? (createdUser ? 'Creating patient profile…' : 'Creating account and profile…')
                : (createdUser ? 'Finish patient profile' : 'Create account and patient profile')}
            </button>
          </form>
        )}
        {createdProfile && (
          <section className="patient-details-form" aria-labelledby="created-patient-picture-heading">
            <h2 id="created-patient-picture-heading">
              Profile picture for {createdProfile.username}
            </h2>
            <ProfileImageControl
              id="created-patient-profile-picture"
              label="Patient profile picture"
              imageUrl={createdProfile.profilePicture}
              file={profilePictureFile}
              onFileChange={(file) => {
                setProfilePictureFile(file);
                setProfilePictureError('');
                setProfilePictureNotice('');
              }}
              onRemoveImage={createdProfile.profilePicture ? removePatientPicture : undefined}
              onUpload={profilePictureFile && createdProfile._id
                ? () => uploadPatientPicture(createdProfile._id, profilePictureFile)
                : undefined}
              isUploading={isUploadingProfilePicture || isRemovingProfilePicture}
              disabled={isSubmitting}
              error={profilePictureError}
              notice={profilePictureNotice}
            />
            <button
              className="auth-submit"
              type="button"
              onClick={() => {
                setCreatedProfile(null);
                setCreatedUser(null);
                setDetails(initialDetails);
                setProfilePictureFile(null);
                setProfilePictureError('');
                setProfilePictureNotice('');
                setSuccess('');
              }}
              disabled={isSubmitting || isUploadingProfilePicture || isRemovingProfilePicture}
            >
              Create another patient profile
            </button>
          </section>
        )}
        {success && <p className="auth-success" role="status">{success}</p>}
      </section>
    </main>
  );
}