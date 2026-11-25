import { useState } from 'react';
import { ArrowLeft, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/useAuth';
import ProfileImageControl from '../../component/ProfileImageControl';
import { api } from '../../services/api';
import {
  deleteProfileImage,
  getProfileImageRequestError,
  uploadProfileImage
} from '../../services/profileImages';
import '../auth.css';

const initialDetails = {
  username: '',
  password: '',
  name: ''
};

export default function CreatePhysiotherapistPage() {
  const { logout } = useAuth();
  const [details, setDetails] = useState(initialDetails);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageFiles, setImageFiles] = useState({ profilePicture: null, coverImage: null });
  const [createdProfile, setCreatedProfile] = useState(null);
  const [imageErrors, setImageErrors] = useState({ profilePicture: '', coverImage: '' });
  const [imageNotices, setImageNotices] = useState({ profilePicture: '', coverImage: '' });
  const [uploadingImages, setUploadingImages] = useState({ profilePicture: false, coverImage: false });
  const [removingImages, setRemovingImages] = useState({ profilePicture: false, coverImage: false });

  const imageTypes = {
    profilePicture: 'profile-picture',
    coverImage: 'cover-image'
  };

  const uploadPhysiotherapistImage = async (profileId, imageField, file) => {
    if (!profileId || !file) {
      return false;
    }

    setImageErrors((current) => ({ ...current, [imageField]: '' }));
    setImageNotices((current) => ({ ...current, [imageField]: '' }));
    setUploadingImages((current) => ({ ...current, [imageField]: true }));
    try {
      const imageType = imageTypes[imageField];
      const response = await uploadProfileImage(
        `/api/physiotherapists/staff/${profileId}/images/${imageType}`,
        file
      );
      const imageUrl = response.data?.data?.[imageField];
      if (typeof imageUrl !== 'string' || !imageUrl) {
        throw new Error('The image upload response did not include its Cloudinary URL.');
      }

      setCreatedProfile((current) => (
        current ? { ...current, [imageField]: imageUrl } : current
      ));
      setImageFiles((current) => ({ ...current, [imageField]: null }));
      setImageNotices((current) => ({
        ...current,
        [imageField]: response.data?.warning || ''
      }));
      return true;
    } catch (requestError) {
      setImageErrors((current) => ({
        ...current,
        [imageField]: getProfileImageRequestError(
          requestError,
          'Unable to upload the image. You can retry without recreating the account.'
        )
      }));
      return false;
    } finally {
      setUploadingImages((current) => ({ ...current, [imageField]: false }));
    }
  };

  const removePhysiotherapistImage = async (imageField) => {
    if (!createdProfile?._id) {
      return;
    }

    setImageErrors((current) => ({ ...current, [imageField]: '' }));
    setImageNotices((current) => ({ ...current, [imageField]: '' }));
    setRemovingImages((current) => ({ ...current, [imageField]: true }));
    try {
      const imageType = imageTypes[imageField];
      const response = await deleteProfileImage(
        `/api/physiotherapists/staff/${createdProfile._id}/images/${imageType}`
      );
      setCreatedProfile((current) => (
        current ? { ...current, [imageField]: '' } : current
      ));
      setImageNotices((current) => ({
        ...current,
        [imageField]: response.data?.warning || ''
      }));
    } catch (requestError) {
      setImageErrors((current) => ({
        ...current,
        [imageField]: getProfileImageRequestError(
          requestError,
          'Unable to remove the image. Please try again.'
        )
      }));
    } finally {
      setRemovingImages((current) => ({ ...current, [imageField]: false }));
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
    setIsSubmitting(true);

    try {
      const response = await api.post('/api/physiotherapists/create', {
        username: details.username.trim(),
        password: details.password,
        name: details.name.trim()
      });
      const createdUsername = response.data?.data?.user?.username || details.username.trim();
      const profile = response.data?.data?.profile;
      const profileId = profile?._id;
      setCreatedProfile({
        _id: profileId,
        username: createdUsername,
        profilePicture: profile?.profilePicture || '',
        coverImage: profile?.coverImage || ''
      });
      setDetails(initialDetails);
      setSuccess(`Physiotherapist account created for ${createdUsername}.`);
      if (profileId) {
        if (imageFiles.profilePicture) {
          await uploadPhysiotherapistImage(profileId, 'profilePicture', imageFiles.profilePicture);
        }
        if (imageFiles.coverImage) {
          await uploadPhysiotherapistImage(profileId, 'coverImage', imageFiles.coverImage);
        }
      } else if (imageFiles.profilePicture || imageFiles.coverImage) {
        const missingIdError = 'The account was created, but the response did not include its profile ID. Images cannot be uploaded until the profile ID is available.';
        setImageErrors({
          profilePicture: imageFiles.profilePicture ? missingIdError : '',
          coverImage: imageFiles.coverImage ? missingIdError : ''
        });
      }
    } catch (requestError) {
      setError(
        requestError.response?.data?.message ||
        requestError.message ||
        'Unable to create the physiotherapist. Please try again.'
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

      <section className="staff-create-content" aria-labelledby="create-physiotherapist-heading">
        <Link className="auth-back-link" to="/dashboard">
          <ArrowLeft size={17} aria-hidden="true" />
          Back to admin dashboard
        </Link>
        <p className="auth-eyebrow patient-management-eyebrow">ADMINISTRATION</p>
        <h1 id="create-physiotherapist-heading">Create physiotherapist</h1>
        <p className="patient-intake-intro">
          Create a sign-in account and physiotherapist profile.
        </p>

        {!createdProfile && (
        <form className="patient-details-form" onSubmit={handleSubmit}>
          <div className="patient-form-field">
            <label htmlFor="physiotherapist-name">Full name</label>
            <input
              id="physiotherapist-name"
              name="name"
              type="text"
              autoComplete="name"
              value={details.name}
              onChange={updateField}
              required
            />
          </div>

          <div className="patient-form-field">
            <label htmlFor="physiotherapist-username">Username</label>
            <input
              id="physiotherapist-username"
              name="username"
              type="text"
              autoComplete="username"
              value={details.username}
              onChange={updateField}
              required
            />
          </div>

          <div className="patient-form-field">
            <label htmlFor="physiotherapist-password">Temporary password</label>
            <input
              id="physiotherapist-password"
              name="password"
              type="password"
              autoComplete="new-password"
              value={details.password}
              onChange={updateField}
              required
            />
          </div>

          <div className="profile-image-grid">
            <ProfileImageControl
              id="physiotherapist-profile-picture"
              label="Profile picture"
              imageUrl=""
              file={imageFiles.profilePicture}
              onFileChange={(file) => {
                setImageFiles((current) => ({ ...current, profilePicture: file }));
                setImageErrors((current) => ({ ...current, profilePicture: '' }));
                setImageNotices((current) => ({ ...current, profilePicture: '' }));
              }}
              disabled={isSubmitting}
              error={imageErrors.profilePicture}
            />
            <ProfileImageControl
              id="physiotherapist-cover-image"
              label="Cover image"
              imageUrl=""
              file={imageFiles.coverImage}
              onFileChange={(file) => {
                setImageFiles((current) => ({ ...current, coverImage: file }));
                setImageErrors((current) => ({ ...current, coverImage: '' }));
                setImageNotices((current) => ({ ...current, coverImage: '' }));
              }}
              disabled={isSubmitting}
              error={imageErrors.coverImage}
            />
          </div>

          {error && <p className="auth-error" role="alert">{error}</p>}
          {success && <p className="auth-success" role="status">{success}</p>}

          <button className="auth-submit" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Creating account…' : 'Create physiotherapist'}
          </button>
        </form>
        )}

        {createdProfile && (
          <section className="staff-created-profile" aria-labelledby="created-physiotherapist-images-heading">
            <h2 id="created-physiotherapist-images-heading">
              Images for {createdProfile.username}
            </h2>
            <div className="profile-image-grid">
              <ProfileImageControl
                id="created-physiotherapist-profile-picture"
                label="Profile picture"
                imageUrl={createdProfile.profilePicture}
                file={imageFiles.profilePicture}
                onFileChange={(file) => {
                  setImageFiles((current) => ({ ...current, profilePicture: file }));
                  setImageErrors((current) => ({ ...current, profilePicture: '' }));
                  setImageNotices((current) => ({ ...current, profilePicture: '' }));
                }}
                onRemoveImage={createdProfile.profilePicture
                  ? () => removePhysiotherapistImage('profilePicture')
                  : undefined}
                onUpload={imageFiles.profilePicture && createdProfile._id
                  ? () => uploadPhysiotherapistImage(createdProfile._id, 'profilePicture', imageFiles.profilePicture)
                  : undefined}
                isUploading={uploadingImages.profilePicture || removingImages.profilePicture}
                disabled={isSubmitting}
                error={imageErrors.profilePicture}
                notice={imageNotices.profilePicture}
              />
              <ProfileImageControl
                id="created-physiotherapist-cover-image"
                label="Cover image"
                imageUrl={createdProfile.coverImage}
                file={imageFiles.coverImage}
                onFileChange={(file) => {
                  setImageFiles((current) => ({ ...current, coverImage: file }));
                  setImageErrors((current) => ({ ...current, coverImage: '' }));
                  setImageNotices((current) => ({ ...current, coverImage: '' }));
                }}
                onRemoveImage={createdProfile.coverImage
                  ? () => removePhysiotherapistImage('coverImage')
                  : undefined}
                onUpload={imageFiles.coverImage && createdProfile._id
                  ? () => uploadPhysiotherapistImage(createdProfile._id, 'coverImage', imageFiles.coverImage)
                  : undefined}
                isUploading={uploadingImages.coverImage || removingImages.coverImage}
                disabled={isSubmitting}
                error={imageErrors.coverImage}
                notice={imageNotices.coverImage}
              />
            </div>
            <button
              className="auth-submit"
              type="button"
              onClick={() => {
                setCreatedProfile(null);
                setImageFiles({ profilePicture: null, coverImage: null });
                setImageErrors({ profilePicture: '', coverImage: '' });
                setImageNotices({ profilePicture: '', coverImage: '' });
                setSuccess('');
              }}
              disabled={isSubmitting || Object.values(uploadingImages).some(Boolean) || Object.values(removingImages).some(Boolean)}
            >
              Create another physiotherapist
            </button>
          </section>
        )}
      </section>
    </main>
  );
}
