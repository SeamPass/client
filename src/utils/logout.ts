export const handleLogout = async () => {
  sessionStorage.clear();
  window.location.reload();
};
