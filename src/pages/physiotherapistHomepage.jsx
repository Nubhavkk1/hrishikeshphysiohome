import { useEffect, useState } from 'react';
import {
  ArrowRight,
  Camera,
  CalendarDays,
  HeartPulse,
  LayoutDashboard,
  LogOut,
  ShieldCheck,
  UserPlus,
  Users,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import { api } from '../services/api';
import ProfileImageControl from '../component/ProfileImageControl';
import {
  deleteProfileImage,
  getProfileImageRequestError,
  uploadProfileImage
} from '../services/profileImages';
import './auth.css';

export default function PhysiotherapistHomepage() {
  const { user, logout } = useAuth();
  const [profile, setProfile] = useState(null);
  const [profileError, setProfileError] = useState('');
  const [retryCount, setRetryCount] = useState(0);
  const [imageFiles, setImageFiles] = useState({ profilePicture: null, coverImage: null });
  const [imageErrors, setImageErrors] = useState({ profilePicture: '', coverImage: '' });
  const [imageNotices, setImageNotices] = useState({ profilePicture: '', coverImage: '' });
  const [updatingImages, setUpdatingImages] = useState({
    profilePicture: false,
    coverImage: false
  });

  useEffect(() => {
    let active = true;

    const fetchProfile = async () => {
      setProfileError('');
      try {
        const response = await api.get('/api/physiotherapists/myprofile');
        if (active) {
          setProfile(response.data?.data || null);
        }
      } catch (requestError) {
        if (active) {
          setProfileError(
            requestError.response?.data?.message ||
            requestError.message ||
            'Unable to load your physiotherapist profile.'
          );
        }
      }
    };

    fetchProfile();
    return () => {
      active = false;
    };
  }, [retryCount]);

  const updateImage = async (imageField) => {
    const file = imageFiles[imageField];
    if (!file) {
      return;
    }

    const imageType = imageField === 'profilePicture' ? 'profile-picture' : 'cover-image';
    setImageErrors((current) => ({ ...current, [imageField]: '' }));
    setImageNotices((current) => ({ ...current, [imageField]: '' }));
    setUpdatingImages((current) => ({ ...current, [imageField]: true }));
    try {
      const response = await uploadProfileImage(
        `/api/physiotherapists/myprofile/images/${imageType}`,
        file
      );
      const updatedProfile = response.data?.data;
      if (typeof updatedProfile?.[imageField] !== 'string' || !updatedProfile[imageField]) {
        throw new Error('The image upload response did not include its Cloudinary URL.');
      }

      setProfile((current) => (current ? { ...current, ...updatedProfile } : updatedProfile));
      setImageFiles((current) => ({ ...current, [imageField]: null }));
      setImageNotices((current) => ({
        ...current,
        [imageField]: response.data?.warning || ''
      }));
    } catch (requestError) {
      setImageErrors((current) => ({
        ...current,
        [imageField]: getProfileImageRequestError(
          requestError,
          'Unable to update this image. Please try again.'
        )
      }));
    } finally {
      setUpdatingImages((current) => ({ ...current, [imageField]: false }));
    }
  };

  const removeImage = async (imageField) => {
    const imageType = imageField === 'profilePicture' ? 'profile-picture' : 'cover-image';
    setImageErrors((current) => ({ ...current, [imageField]: '' }));
    setImageNotices((current) => ({ ...current, [imageField]: '' }));
    setUpdatingImages((current) => ({ ...current, [imageField]: true }));
    try {
      const response = await deleteProfileImage(
        `/api/physiotherapists/myprofile/images/${imageType}`
      );
      setProfile((current) => current ? { ...current, [imageField]: '' } : current);
      setImageNotices((current) => ({
        ...current,
        [imageField]: response.data?.warning || ''
      }));
    } catch (requestError) {
      setImageErrors((current) => ({
        ...current,
        [imageField]: getProfileImageRequestError(
          requestError,
          'Unable to remove this image. Please try again.'
        )
      }));
    } finally {
      setUpdatingImages((current) => ({ ...current, [imageField]: false }));
    }
  };

  return (
    <div className="workspace-page physio-workspace">
      <aside className="workspace-sidebar">
        <Link className="workspace-brand" to="/" aria-label="Hrishikesh Physio Home">
          <img src="/images/logoxkx.png" alt="" />
          <span>Hrishikesh<strong>Physio Home</strong></span>
        </Link>

        <p className="workspace-nav-label">YOUR SPACE</p>
        <nav className="workspace-nav" aria-label="Physiotherapist navigation">
          <a className="workspace-nav-link is-active" href="#overview" aria-current="page">
            <LayoutDashboard size={18} aria-hidden="true" />
            Overview
          </a>
          <a className="workspace-nav-link" href="#profile">
            <Camera size={18} aria-hidden="true" />
            My profile
          </a>
          <Link className="workspace-nav-link" to="/create-patient">
            <Users size={18} aria-hidden="true" />
            Patients
          </Link>
          <Link className="workspace-nav-link" to="/create-patient-appointment">
            <CalendarDays size={18} aria-hidden="true" />
            Appointments
          </Link>
        </nav>

        <div className="workspace-sidebar-note">
          <div className="workspace-note-icon"><HeartPulse size={17} aria-hidden="true" /></div>
          <strong>Care starts here.</strong>
          <p>Make your professional profile yours and keep patient care close at hand.</p>
        </div>
        <div className="workspace-sidebar-bottom">PHYSIOTHERAPIST SPACE</div>
      </aside>

      <div className="workspace-main">
        <header className="workspace-topbar">
          <div>
            <p className="workspace-breadcrumb">Workspace <span>/</span> Overview</p>
            <h1>My workspace</h1>
          </div>
          <div className="workspace-account">
            <div className="workspace-account-copy">
              <strong>{user?.username || 'Physiotherapist'}</strong>
              <span>Physiotherapist</span>
            </div>
            {profile?.profilePicture ? (
              <img className="workspace-avatar workspace-avatar-image" src={profile.profilePicture} alt="" />
            ) : (
              <span className="workspace-avatar" aria-hidden="true">
                {(user?.username || 'P').slice(0, 1).toUpperCase()}
              </span>
            )}
            <button className="workspace-signout" type="button" onClick={logout}>
              <LogOut size={17} aria-hidden="true" />
              <span>Sign out</span>
            </button>
          </div>
        </header>

        <main className="workspace-content physio-content" id="overview">
          <section className="physio-profile-card" aria-labelledby="physiotherapist-home-heading">
            <div className="physio-cover">
              {profile?.coverImage && <img src={profile.coverImage} alt="" />}
              <span className="physio-cover-badge"><ShieldCheck size={15} aria-hidden="true" /> Professional profile</span>
            </div>
            <div className="physio-profile-intro">
              <div className="physio-profile-avatar">
                {profile?.profilePicture ? (
                  <img src={profile.profilePicture} alt="" />
                ) : (
                  <span>{(user?.username || 'P').slice(0, 1).toUpperCase()}</span>
                )}
              </div>
              <div className="physio-profile-copy">
                <p className="workspace-eyebrow">PHYSIOTHERAPIST HOME</p>
                <h2 id="physiotherapist-home-heading">Welcome, {user?.username || 'Physiotherapist'}</h2>
                <p>Your professional space for patient care and profile updates.</p>
              </div>
              <Link className="workspace-primary-action" to="/create-patient">
                <UserPlus size={17} aria-hidden="true" />
                Create patient
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </section>

          <section className="workspace-section physio-next-steps" aria-labelledby="physio-next-steps-heading">
            <div className="workspace-section-heading">
              <div>
                <p className="workspace-eyebrow">YOUR WORKSPACE</p>
                <h2 id="physio-next-steps-heading">A few ways to get started</h2>
              </div>
              <span>Everything you need to keep moving</span>
            </div>
            <div className="physio-action-grid">
              <Link className="physio-action-card" to="/create-patient">
                <span className="workspace-tool-icon mint"><UserPlus size={21} aria-hidden="true" /></span>
                <span className="physio-action-title">Add a patient</span>
                <span className="physio-action-description">Create a patient record and continue with their care details.</span>
                <ArrowRight size={18} className="physio-action-arrow" aria-hidden="true" />
              </Link>
              <Link className="physio-action-card" to="/create-patient-appointment">
                <span className="workspace-tool-icon lavender"><CalendarDays size={21} aria-hidden="true" /></span>
                <span className="physio-action-title">Schedule an appointment</span>
                <span className="physio-action-description">Find a patient by username and book a visit for them.</span>
                <ArrowRight size={18} className="physio-action-arrow" aria-hidden="true" />
              </Link>
              <a className="physio-action-card" href="#profile">
                <span className="workspace-tool-icon lavender"><Camera size={21} aria-hidden="true" /></span>
                <span className="physio-action-title">Personalize your profile</span>
                <span className="physio-action-description">Add a profile picture and cover image to make this space yours.</span>
                <ArrowRight size={18} className="physio-action-arrow" aria-hidden="true" />
              </a>
            </div>
          </section>

          <section className="physio-image-section" aria-labelledby="physiotherapist-profile-images-heading" id="profile">
            <div className="workspace-section-heading">
              <div>
                <p className="workspace-eyebrow">MAKE IT YOURS</p>
                <h2 id="physiotherapist-profile-images-heading">Profile appearance</h2>
              </div>
              <span>Choose images that represent you</span>
            </div>
            {profileError ? (
              <div className="workspace-profile-error">
                <p className="auth-error" role="alert">{profileError}</p>
                <button className="auth-submit" type="button" onClick={() => setRetryCount((count) => count + 1)}>
                  Retry loading profile
                </button>
              </div>
            ) : !profile ? (
              <p className="workspace-loading" role="status">Loading your profile…</p>
            ) : (
              <div className="profile-image-grid workspace-image-grid">
                <ProfileImageControl
                  id="physiotherapist-self-profile-picture"
                  label="Profile picture"
                  imageUrl={profile.profilePicture || ''}
                  file={imageFiles.profilePicture}
                  onFileChange={(file) => {
                    setImageFiles((current) => ({ ...current, profilePicture: file }));
                    setImageErrors((current) => ({ ...current, profilePicture: '' }));
                    setImageNotices((current) => ({ ...current, profilePicture: '' }));
                  }}
                  onRemoveImage={profile.profilePicture ? () => removeImage('profilePicture') : undefined}
                  onUpload={imageFiles.profilePicture ? () => updateImage('profilePicture') : undefined}
                  isUploading={updatingImages.profilePicture}
                  error={imageErrors.profilePicture}
                  notice={imageNotices.profilePicture}
                />
                <ProfileImageControl
                  id="physiotherapist-self-cover-image"
                  label="Cover image"
                  imageUrl={profile.coverImage || ''}
                  file={imageFiles.coverImage}
                  onFileChange={(file) => {
                    setImageFiles((current) => ({ ...current, coverImage: file }));
                    setImageErrors((current) => ({ ...current, coverImage: '' }));
                    setImageNotices((current) => ({ ...current, coverImage: '' }));
                  }}
                  onRemoveImage={profile.coverImage ? () => removeImage('coverImage') : undefined}
                  onUpload={imageFiles.coverImage ? () => updateImage('coverImage') : undefined}
                  isUploading={updatingImages.coverImage}
                  error={imageErrors.coverImage}
                  notice={imageNotices.coverImage}
                />
              </div>
            )}
          </section>
        </main>

        <footer className="workspace-footer">
          <span>© Hrishikesh Physio Home</span>
          <span>Supporting better care, together</span>
        </footer>
      </div>
    </div>
  );
}
