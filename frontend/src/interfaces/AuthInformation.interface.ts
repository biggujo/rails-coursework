interface AuthInformation {
  isLoggedIn: boolean,
  isRefreshing: boolean, // Is in progress of login
  user: {
    email: string,
  }
}

export default AuthInformation;
