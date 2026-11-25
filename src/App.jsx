import { Navigate, createBrowserRouter, RouterProvider, useLocation } from 'react-router-dom';
import './App.css';
import HomePage from './component/homepage'
import Service from './component/Service';
import Dashboard from './pages/dashboard';
import LoginPage from './pages/loginPage';
import AskPatientName from './pages/askPatientName';
import PatientHomepage from './pages/patientHomepage';
import PhysiotherapistHomepage from './pages/physiotherapistHomepage';
import PatientDetailsPage from './pages/patientPages/patient_detailsPage';
import PatientMyProfilePage from './pages/patientPages/myProfile';
import CreatePatientPage from './pages/adminPages/createPatient';
import CreatePhysiotherapistPage from './pages/adminPages/createPhysiotherapist';
import ListAppointmentsPage from './pages/adminPages/listAppointments';
import CreateMyAppointmentPage from './pages/patientPages/createMyAppointment';
import CreatePatientAppointmentPage from './pages/physiotherapistPages/createPatientAppointment';
import RegisterPage from './pages/registerPage';
import { AuthProvider } from './context/AuthContext';
import { getHomePath } from './context/authRoutes';
import { useAuth } from './context/useAuth';

export function ProtectedDashboard() {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return getHomePath(user?.role) === '/dashboard'
    ? <Dashboard />
    : <Navigate to={getHomePath(user?.role)} replace />;
}

function ProtectedPhysiotherapistHomepage() {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return getHomePath(user?.role) === '/physiotherapist-home'
    ? <PhysiotherapistHomepage />
    : <Navigate to={getHomePath(user?.role)} replace />;
}

export function ProtectedPatientHomepage() {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return getHomePath(user?.role) === '/patient-home'
    ? <PatientHomepage />
    : <Navigate to={getHomePath(user?.role)} replace />;
}

function ProtectedPatientMyProfilePage() {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return getHomePath(user?.role) === '/patient-home'
    ? <PatientMyProfilePage />
    : <Navigate to={getHomePath(user?.role)} replace />;
}

function ProtectedAskPatientName() {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return getHomePath(user?.role) === '/patient-home'
    ? <AskPatientName />
    : <Navigate to={getHomePath(user?.role)} replace />;
}

function ProtectedPatientDetailsPage() {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return getHomePath(user?.role) === '/patient-home'
    ? <PatientDetailsPage />
    : <Navigate to={getHomePath(user?.role)} replace />;
}

function ProtectedCreatePatientPage() {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  const role = typeof user?.role === 'string' ? user.role.trim().toLowerCase() : '';
  const isStaff = role === 'admin' || role === 'physiotherapist' || role === 'pysiotherapist';

  return isStaff
    ? <CreatePatientPage />
    : <Navigate to={getHomePath(user?.role)} replace />;
}

function ProtectedCreatePhysiotherapistPage() {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return user?.role?.trim().toLowerCase() === 'admin'
    ? <CreatePhysiotherapistPage />
    : <Navigate to={getHomePath(user?.role)} replace />;
}

function ProtectedPatientAppointmentPage() {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return user?.role?.trim().toLowerCase() === 'patient'
    ? <CreateMyAppointmentPage />
    : <Navigate to={getHomePath(user?.role)} replace />;
}

function ProtectedPhysiotherapistAppointmentPage() {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return user?.role?.trim().toLowerCase() === 'physiotherapist'
    ? <CreatePatientAppointmentPage />
    : <Navigate to={getHomePath(user?.role)} replace />;
}

function ProtectedAppointmentsPage() {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();
  const role = typeof user?.role === 'string' ? user.role.trim().toLowerCase() : '';

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return role === 'admin' || role === 'physiotherapist'
    ? <ListAppointmentsPage />
    : <Navigate to={getHomePath(user?.role)} replace />;
}

function LoginRoute() {
  const { isAuthenticated, user } = useAuth();

  return isAuthenticated ? <Navigate to={getHomePath(user?.role)} replace /> : <LoginPage />;
}

function RegisterRoute() {
  const { isAuthenticated, user } = useAuth();

  return isAuthenticated ? <Navigate to={getHomePath(user?.role)} replace /> : <RegisterPage />;
}


function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />
    },
    {
      path: "/services",
      element: <Service />
    },
    {
      path: "/login",
      element: <LoginRoute />
    },
    {
      path: "/register",
      element: <RegisterRoute />
    },
    {
      path: "/dashboard",
      element: <ProtectedDashboard />
    },
    {
      path: "/physiotherapist-home",
      element: <ProtectedPhysiotherapistHomepage />
    },
    {
      path: "/patient-home",
      element: <ProtectedPatientHomepage />
    },
    {
      path: "/my-profile",
      element: <ProtectedPatientMyProfilePage />
    },
    {
      path: "/ask-patient-name",
      element: <ProtectedAskPatientName />
    },
    {
      path: "/patient-details",
      element: <ProtectedPatientDetailsPage />
    },
    {
      path: "/create-patient",
      element: <ProtectedCreatePatientPage />
    },
    {
      path: "/create-physiotherapist",
      element: <ProtectedCreatePhysiotherapistPage />
    },
    {
      path: "/create-appointment",
      element: <ProtectedPatientAppointmentPage />
    },
    {
      path: "/create-patient-appointment",
      element: <ProtectedPhysiotherapistAppointmentPage />
    },
    {
      path: "/appointments",
      element: <ProtectedAppointmentsPage />
    }
  ]);

  return (
    <AuthProvider>
      <div className="App">
        <RouterProvider router={router} />
      </div>
    </AuthProvider>
  );
}

export default App;
