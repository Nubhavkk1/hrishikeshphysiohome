export function getHomePath(role) {
  const normalizedRole = typeof role === 'string' ? role.trim().toLowerCase() : '';

  if (normalizedRole === 'admin') {
    return '/dashboard';
  }

  if (normalizedRole === 'physiotherapist' || normalizedRole === 'pysiotherapist') {
    return '/physiotherapist-home';
  }

  return '/patient-home';
}
