
export const API_URLS = {
    LOGIN: `${process.env.REACT_APP_API_URL}/auth/login`,
    REGISTER: `${process.env.REACT_APP_API_URL}/auth/register`,
    CONTACT_UPDATE: `${process.env.REACT_APP_API_URL}/user/contact_update`,
    CONTACT_INFO: `${process.env.REACT_APP_API_URL}/user/contact`,
    APPOINTMENT_UPDATE: `${process.env.REACT_APP_API_URL}/user/appointment_update`,
    APPOINTMENT_INFO: `${process.env.REACT_APP_API_URL}/user/appointment`,
    TIMERS_UPDATE: `${process.env.REACT_APP_API_URL}/user/timers_update`,
    TIMERS_INFO: `${process.env.REACT_APP_API_URL}/user/timers`,
}