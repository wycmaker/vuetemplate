import request from '../http'

export const login = data => request('post', '/api/Account/Login', data)
export const logout = _ => request('get', '/api/Account/Logout', {})