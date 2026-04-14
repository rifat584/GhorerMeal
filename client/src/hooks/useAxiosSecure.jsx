import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import axios from 'axios'
import useAuth from './useAuth'

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
})

const useAxiosSecure = () => {
  const { user, logOut, loading } = useAuth()
  const navigate = useNavigate()
  const accessToken = user?.accessToken

  useEffect(() => {
    if (loading) return

    const requestInterceptor = axiosInstance.interceptors.request.use(config => {
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`
      } else {
        delete config.headers.Authorization
      }

      return config
    })

    const responseInterceptor = axiosInstance.interceptors.response.use(
      res => res,
      err => {
        if (err?.response?.status === 401 || err?.response?.status === 403) {
          logOut().catch(console.error)
          navigate('/login')
        }
        return Promise.reject(err)
      }
    )

    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptor)
      axiosInstance.interceptors.response.eject(responseInterceptor)
    }
  }, [accessToken, loading, logOut, navigate])

  return axiosInstance
}
export default useAxiosSecure
