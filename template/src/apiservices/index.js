import * as account from '@/apiservices/account'

/* #region Account APIs */

// export const apiLogin = account.login

/* #endregion */

export const apis = {
  login: account.login,
  logout: account.logout
}
