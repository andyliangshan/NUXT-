import { getUserFromSession, getUserFromLocalStorage } from '~/utils/auth'

export default function ({ isServer, store, req }) {
   // If nuxt generate, pass this middleware
  if (isServer && !req) return
  const userInfo = isServer ? getUserFromSession(req) : getUserFromLocalStorage()
  store.commit('SET_USER', userInfo)
}