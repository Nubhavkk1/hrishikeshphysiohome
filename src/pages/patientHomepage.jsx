import { useEffect, useState } from 'react';
import {
  Activity,
  ArrowUpRight,
  Bookmark,
  BookOpen,
  CalendarDays,
  CalendarPlus,
  HeartPulse,
  Home,
  LogOut,
  MessageCircle,
  ShieldCheck,
  UserRound
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import { api } from '../services/api';
import ProfileImageControl from '../component/ProfileImageControl';
import MyAppointmentsSection from './patientPages/myAppointments';
import {
  deleteProfileImage,
  getProfileImageRequestError,
  uploadProfileImage
} from '../services/profileImages';
import './auth.css';
import './patientHomepage.css';

const profileFields = [
  ['Full name', 'name'],
  ['Phone number', 'phoneno'],
  ['Gender', 'gender'],
  ['Age', 'age'],
  ['Address', 'address'],
  ['Pain', 'pain'],
  ['Chief complaint', 'chiefComplaint'],
  ['Present condition (1-10)', 'presentCondition'],
  ['Patient history', 'patientHistory'],
  ['Medical/surgical history', 'medicalSurgicalHistory'],
  ['Functional evaluation', 'functionalEvaluation'],
  ['Gait examination', 'gaitExamination']
];

const articles = [
  {
    id: 'back-pain',
    category: 'BACK & SPINE',
    title: 'Moving with lower-back pain: a gradual return to activity',
    summary: 'Gentle movement and pacing can help you rebuild confidence when your back feels sore.',
    body: 'A physiotherapist can help identify movements that feel comfortable and build a gradual plan around them. Short walks, changing position regularly, and simple mobility work are often useful starting points. Avoid pushing through sharp or worsening pain, and ask your clinician which exercises are right for you.',
    author: 'Dr. Hrishikesh, Physiotherapist',
    date: '5 min read',
    image: '/images/child.jpg',
    imageAlt: 'Physiotherapist supporting a patient during a back-care session'
  },
  {
    id: 'knee-mobility',
    category: 'JOINT HEALTH',
    title: 'Knee stiffness: small steps toward stronger movement',
    summary: 'A personalized strengthening plan can make everyday movement feel more manageable.',
    body: 'Knee stiffness can have many causes, so a tailored assessment matters. A physiotherapist may introduce comfortable range-of-motion work and gradually build the muscles around the knee. Low-impact activity, pacing, and regular check-ins can support progress; stop and seek advice if swelling or pain increases.',
    author: 'Maya Sen, Senior Physiotherapist',
    date: '4 min read',
    image: '/images/DSC00767.JPG',
    imageAlt: 'A physiotherapist guiding a leg mobility exercise'
  },
  {
    id: 'child-development',
    category: 'PEDIATRIC PHYSIOTHERAPY',
    title: 'Making movement practice playful for growing children',
    summary: 'Play-based therapy can make movement practice feel encouraging and achievable.',
    body: 'For children who need extra support with movement, a pediatric physiotherapist can shape activities around their interests and abilities. Simple play can practise balance, coordination, and everyday skills while keeping the child engaged. Every child develops differently, so discuss milestones and goals with their care team.',
    author: 'Ananya Rao, Pediatric Physiotherapist',
    date: '6 min read',
    image: '/images/img1.png',
    imageAlt: 'A pediatric physiotherapist supporting a child during a session'
  }
];

function getInitials(name) {
  return name?.trim()?.slice(0, 1)?.toUpperCase() || 'P';
}

export default function PatientHomepage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [patient, setPatient] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [retryCount, setRetryCount] = useState(0);
  const [profilePictureFile, setProfilePictureFile] = useState(null);
  const [profilePictureError, setProfilePictureError] = useState('');
  const [profilePictureNotice, setProfilePictureNotice] = useState('');
  const [isUpdatingProfilePicture, setIsUpdatingProfilePicture] = useState(false);
  const [expandedArticles, setExpandedArticles] = useState({});
  const displayName = patient?.name || user?.username || 'Patient';

  const uploadProfilePicture = async () => {
    if (!profilePictureFile) return;

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

      setPatient((currentProfile) => (
        currentProfile ? { ...currentProfile, ...updatedProfile } : currentProfile
      ));
      setProfilePictureFile(null);
      setProfilePictureNotice(response.data?.warning || '');
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
      setPatient((currentProfile) => (
        currentProfile
          ? { ...currentProfile, profilePicture: '', profilePicturePublicId: '' }
          : currentProfile
      ));
      setProfilePictureNotice(response.data?.warning || '');
    } catch (requestError) {
      setProfilePictureError(getProfileImageRequestError(
        requestError,
        'Unable to remove your profile picture. Please try again.'
      ));
    } finally {
      setIsUpdatingProfilePicture(false);
    }
  };

  useEffect(() => {
    let active = true;

    const fetchProfile = async () => {
      setIsLoading(true);
      setError('');

      try {
        const response = await api.get('/api/patients/myprofile');
        if (active) {
          setPatient(response.data?.data);
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

        setError(
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

  const toggleArticle = (articleId) => {
    setExpandedArticles((current) => ({ ...current, [articleId]: !current[articleId] }));
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
          <a className="workspace-nav-link is-active" href="#patient-home" aria-current="page">
            <Home size={18} aria-hidden="true" />
            Home
          </a>
          <a className="workspace-nav-link" href="#physio-feed">
            <BookOpen size={18} aria-hidden="true" />
            Physio journal
          </a>
          <a className="workspace-nav-link" href="#patient-appointments">
            <CalendarDays size={18} aria-hidden="true" />
            Appointments
          </a>
          <Link className="workspace-nav-link" to="/my-profile">
            <UserRound size={18} aria-hidden="true" />
            My Profile
          </Link>
        </nav>
        <div className="workspace-sidebar-note">
          <div className="workspace-note-icon"><HeartPulse size={17} aria-hidden="true" /></div>
          <strong>Progress at your pace.</strong>
          <p>Explore practical, therapist-written guidance for your wellbeing.</p>
        </div>
        <div className="workspace-sidebar-bottom">PATIENT PORTAL</div>
      </aside>

      <div className="workspace-main">
        <header className="workspace-topbar patient-topbar">
          <div>
            <p className="workspace-breadcrumb">Patient space <span>/</span> Home</p>
            <h1>Welcome, {user?.username || 'Patient'}</h1>
          </div>
          <div className="workspace-account">
            <div className="workspace-account-copy">
              <strong>{displayName}</strong>
              <span>Patient</span>
            </div>
            {patient?.profilePicture ? (
              <img className="workspace-avatar workspace-avatar-image" src={patient.profilePicture} alt="" />
            ) : (
              <span className="workspace-avatar" aria-hidden="true">{getInitials(displayName)}</span>
            )}
            <button className="workspace-signout" type="button" onClick={logout}>
              <LogOut size={17} aria-hidden="true" />
              <span>Sign out</span>
            </button>
          </div>
        </header>

        <main className="workspace-content patient-home-content" id="patient-home">
          <div className="patient-home-columns">
            <section className="patient-feed-column" aria-labelledby="patient-welcome-heading">
              <div className="patient-welcome-card">
                <div>
                  <p className="workspace-eyebrow">YOUR PATIENT PORTAL</p>
                  <h2 id="patient-welcome-heading">Good to see you, {displayName}</h2>
                  <p>Helpful movement guidance, made for your journey.</p>
                </div>
                <div className="patient-welcome-icon" aria-hidden="true"><Activity size={28} /></div>
              </div>

              {error && (
                <div className="patient-profile-error" role="alert">
                  <p>{error}</p>
                  <button
                    className="patient-retry-button"
                    type="button"
                    onClick={() => setRetryCount((count) => count + 1)}
                  >
                    Try again
                  </button>
                </div>
              )}

              <section className="patient-journal" id="physio-feed" aria-labelledby="patient-journal-heading">
                <div className="patient-journal-heading">
                  <div>
                    <p className="workspace-eyebrow">THE PHYSIO JOURNAL</p>
                    <h2 id="patient-journal-heading">Ideas for feeling better</h2>
                  </div>
                  <span><ShieldCheck size={15} aria-hidden="true" /> Patient education</span>
                </div>
                <div className="patient-article-list">
                  {articles.map((article) => {
                    const isExpanded = Boolean(expandedArticles[article.id]);
                    return (
                      <article className="patient-article-card" key={article.id}>
                        <img
                          className="patient-article-image"
                          src={article.image}
                          alt={article.imageAlt}
                          loading="lazy"
                        />
                        <div className="patient-article-content">
                          <div className="patient-article-meta">
                            <span>{article.category}</span>
                            <span>{article.date}</span>
                          </div>
                          <h3>{article.title}</h3>
                          <p className="patient-article-summary">{article.summary}</p>
                          <div
                            id={`article-${article.id}`}
                            className="patient-article-expanded"
                            hidden={!isExpanded}
                          >
                            <p>{article.body}</p>
                            <p className="patient-article-disclaimer">
                              General information only; ask your physiotherapist for advice tailored to you.
                            </p>
                          </div>
                          <div className="patient-article-footer">
                            <span className="patient-article-author">
                              <span className="patient-author-avatar" aria-hidden="true">
                                {getInitials(article.author)}
                              </span>
                              <span>By <strong>{article.author}</strong></span>
                            </span>
                            <span className="patient-article-actions" aria-label="Post actions">
                              <span><MessageCircle size={15} aria-hidden="true" /> Read</span>
                              <button
                                className="patient-read-more"
                                type="button"
                                aria-expanded={isExpanded}
                                aria-controls={`article-${article.id}`}
                                onClick={() => toggleArticle(article.id)}
                              >
                                {isExpanded ? 'Show less' : 'Read more'}
                                <ArrowUpRight size={15} aria-hidden="true" />
                              </button>
                            </span>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </section>

              <MyAppointmentsSection />

            </section>

            <aside className="patient-profile-column" aria-label="Patient profile and appointments">
              <section className="patient-side-card patient-profile-card" id="patient-profile" aria-labelledby="patient-profile-heading">
                <div className="patient-side-card-heading">
                  <h2 id="patient-profile-heading">Your profile</h2>
                  <UserRound size={17} aria-hidden="true" />
                </div>
                <div className="patient-profile-summary">
                  {patient?.profilePicture ? (
                    <img src={patient.profilePicture} alt="" />
                  ) : (
                    <span aria-hidden="true">{getInitials(displayName)}</span>
                  )}
                  <div>
                    <strong>{displayName}</strong>
                    <span>Patient member</span>
                  </div>
                </div>
                {isLoading ? (
                  <p className="patient-profile-status" role="status">Loading your profile…</p>
                ) : (
                  <dl className="patient-quick-details">
                    {profileFields.map(([label, key]) => (
                      <div key={key}>
                        <dt>{label}</dt>
                        <dd>{patient?.[key] ?? 'Not provided'}</dd>
                      </div>
                    ))}
                  </dl>
                )}
                <Link className="patient-update-details-button" to="/my-profile">
                  Update details <ArrowUpRight size={15} aria-hidden="true" />
                </Link>
              </section>

              <section className="patient-side-card patient-appointment-card" aria-labelledby="create-appointment-heading">
                <div className="patient-side-card-heading">
                  <div>
                    <p className="workspace-eyebrow">NEXT STEP</p>
                    <h2 id="create-appointment-heading">Need a session?</h2>
                  </div>
                  <CalendarPlus size={18} aria-hidden="true" />
                </div>
                <p>Plan your next visit with a physiotherapist.</p>
                <Link
                  className="patient-create-appointment-button"
                  to="/create-appointment"
                >
                  <CalendarPlus size={16} aria-hidden="true" />
                  Create appointment
                </Link>
              </section>

              <section className="patient-side-card patient-photo-settings" aria-labelledby="patient-photo-heading">
                <div className="patient-side-card-heading">
                  <div>
                    <p className="workspace-eyebrow">PROFILE SETTINGS</p>
                    <h2 id="patient-photo-heading">Profile picture</h2>
                  </div>
                  <Bookmark size={17} aria-hidden="true" />
                </div>
                {isLoading ? (
                  <p className="patient-profile-status" role="status">Loading profile settings…</p>
                ) : patient ? (
                  <ProfileImageControl
                    id="patient-home-profile-picture"
                    label="Patient profile picture"
                    imageUrl={patient.profilePicture || ''}
                    file={profilePictureFile}
                    onFileChange={(file) => {
                      setProfilePictureFile(file);
                      setProfilePictureError('');
                      setProfilePictureNotice('');
                    }}
                    onRemoveImage={patient.profilePicture ? removeProfilePicture : undefined}
                    onUpload={profilePictureFile ? uploadProfilePicture : undefined}
                    isUploading={isUpdatingProfilePicture}
                    error={profilePictureError}
                    notice={profilePictureNotice}
                  />
                ) : (
                  <p className="patient-profile-status">Profile settings are unavailable until your profile loads.</p>
                )}
                <Link className="patient-my-profile-link" to="/my-profile">
                  Open My Profile <ArrowUpRight size={14} aria-hidden="true" />
                </Link>
              </section>
            </aside>
          </div>
        </main>

        <footer className="workspace-footer">
          <span>© Hrishikesh Physio Home</span>
          <span>Supporting better care, together</span>
        </footer>
      </div>

    </div>
  );
}
