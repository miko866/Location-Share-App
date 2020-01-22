class AuthenticationController {
  // Remove data from SessionStorage after time is gone
  // It's because -> showing Logout Component
  logout() {
    window.setTimeout(() => {
      sessionStorage.removeItem('jwtToken');
    }, 1000);
  }

  // Check if user is logged in
  // Check SessionStorage and if find data @return true
  isUserLoggedIn() {
    let user = sessionStorage.getItem('jwtToken');
    if (user === null) {
      return false;
    }

    return true;
  }
}

export default new AuthenticationController();
