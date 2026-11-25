import {
  Activity,
  ArrowRight,
  CalendarDays,
  ClipboardList,
  HeartPulse,
  LayoutDashboard,
  LogOut,
  UserPlus,
  Users,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import './auth.css';

export default function Dashboard() {
  const { logout, user } = useAuth();

  return (
    <div className="workspace-page admin-workspace">
      <aside className="workspace-sidebar">
        <Link className="workspace-brand" to="/" aria-label="Hrishikesh Physio Home">
          <img src="/images/logoxkx.png" alt="" />
          <span>Hrishikesh<strong>Physio Home</strong></span>
        </Link>

        <p className="workspace-nav-label">WORKSPACE</p>
        <nav className="workspace-nav" aria-label="Admin navigation">
          <a className="workspace-nav-link is-active" href="#overview" aria-current="page">
            <LayoutDashboard size={18} aria-hidden="true" />
            Overview
          </a>
          <a className="workspace-nav-link" href="#clinic-tools">
            <CalendarDays size={18} aria-hidden="true" />
            Clinic tools
          </a>
          <Link className="workspace-nav-link" to="/create-patient">
            <Users size={18} aria-hidden="true" />
            Patients
          </Link>
          <Link className="workspace-nav-link" to="/create-physiotherapist">
            <HeartPulse size={18} aria-hidden="true" />
            Physiotherapists
          </Link>
        </nav>

        <div className="workspace-sidebar-note">
          <div className="workspace-note-icon"><Activity size={17} aria-hidden="true" /></div>
          <strong>Care, connected.</strong>
          <p>Keep your clinic team and patient records moving in one place.</p>
        </div>
        <div className="workspace-sidebar-bottom">ADMIN WORKSPACE</div>
      </aside>

      <div className="workspace-main">
        <header className="workspace-topbar">
          <div>
            <p className="workspace-breadcrumb">Workspace <span>/</span> Overview</p>
            <h1>Admin dashboard</h1>
          </div>
          <div className="workspace-account">
            <div className="workspace-account-copy">
              <strong>{user?.username || 'Admin'}</strong>
              <span>Administrator</span>
            </div>
            <span className="workspace-avatar" aria-hidden="true">
              {(user?.username || 'A').slice(0, 1).toUpperCase()}
            </span>
            <button className="workspace-signout" type="button" onClick={logout}>
              <LogOut size={17} aria-hidden="true" />
              <span>Sign out</span>
            </button>
          </div>
        </header>

        <main className="workspace-content" id="overview">
          <section className="workspace-welcome">
            <div className="workspace-welcome-copy">
              <p className="workspace-eyebrow">YOUR CLINIC, AT A GLANCE</p>
              <h2>Welcome back, {user?.username || 'Admin'}.</h2>
              <p>Manage your clinic workspace, add people, and keep care organized.</p>
              <div className="workspace-status"><span /> Workspace is active</div>
            </div>
            <div className="workspace-welcome-art" aria-hidden="true">
              <div className="workspace-art-circle"><HeartPulse size={48} strokeWidth={1.4} /></div>
              <span className="workspace-art-dot workspace-art-dot-one" />
              <span className="workspace-art-dot workspace-art-dot-two" />
            </div>
          </section>

          <section className="workspace-section" aria-labelledby="admin-tools-heading" id="clinic-tools">
            <div className="workspace-section-heading">
              <div>
                <p className="workspace-eyebrow">GET STARTED</p>
                <h2 id="admin-tools-heading">Clinic tools</h2>
              </div>
              <span>Quick access to your most-used actions</span>
            </div>

            <div className="workspace-tool-grid">
              <article className="workspace-tool-card">
                <span className="workspace-tool-icon mint"><UserPlus size={21} aria-hidden="true" /></span>
                <p className="workspace-card-kicker">PATIENT CARE</p>
                <h3>Add a patient</h3>
                <p>Create a patient account and continue setting up their care details.</p>
                <Link to="/create-patient" className="workspace-card-link">
                  Create patient <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </article>
              <article className="workspace-tool-card">
                <span className="workspace-tool-icon lavender"><HeartPulse size={21} aria-hidden="true" /></span>
                <p className="workspace-card-kicker">YOUR TEAM</p>
                <h3>Grow your team</h3>
                <p>Set up a physiotherapist account and profile for your clinic.</p>
                <Link to="/create-physiotherapist" className="workspace-card-link">
                  Add physiotherapist <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </article>
              <article className="workspace-tool-card workspace-tool-card-soft">
                <span className="workspace-tool-icon peach"><ClipboardList size={21} aria-hidden="true" /></span>
                <p className="workspace-card-kicker">CLINIC WORKFLOW</p>
                <h3>Review appointments</h3>
                <p>See scheduled patient appointments and their visit details.</p>
                <Link to="/appointments" className="workspace-card-link">
                  View appointments <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </article>
            </div>
          </section>

          <section className="workspace-bottom-card">
            <div className="workspace-bottom-icon"><Activity size={20} aria-hidden="true" /></div>
            <div>
              <h2>Your workspace is ready</h2>
              <p>Your authenticated session is active. Clinic actions continue to use your existing secure API connection.</p>
            </div>
            <span className="workspace-secure-tag"><span /> Signed in</span>
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
