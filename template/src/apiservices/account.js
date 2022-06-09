import { get, post } from './http'

export const login = data => post('/api/Account/Login', data)
export const logout = _ => get('/api/Account/Logout', {})