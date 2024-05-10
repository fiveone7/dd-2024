
export const API_URLS = {
    LOGIN: `${process.env.REACT_APP_API_URL}/auth/login`,
    REGISTER: `${process.env.REACT_APP_API_URL}/auth/register`,
    CONTACT_UPDATE: `${process.env.REACT_APP_API_URL}/user/contact_update`,
    CONTACT_INFO: `${process.env.REACT_APP_API_URL}/user/contact`,
    APPOINTMENT_UPDATE: `${process.env.REACT_APP_API_URL}/user/appointment_update`,
    APPOINTMENT_INFO: `${process.env.REACT_APP_API_URL}/user/appointment`,
    TIMERS_UPDATE: `${process.env.REACT_APP_API_URL}/user/timers_update`,
    TIMERS_INFO: `${process.env.REACT_APP_API_URL}/user/timers`,
    WORDS_UPDATE: `${process.env.REACT_APP_API_URL}/user/words_update`,
    WORDS_INFO: `${process.env.REACT_APP_API_URL}/user/words`,
    PASSWORD_RESET: `${process.env.REACT_APP_API_URL}/auth/reset_password`,
    MATERIAL_HOWTO: `${process.env.REACT_APP_API_URL}/material/howto`,
    MATERIAL_GLOSSARY: `${process.env.REACT_APP_API_URL}/material/glossary`,
    MATERIAL_PIM: `${process.env.REACT_APP_API_URL}/material/pim`,
    MATERIAL_WEDS: `${process.env.REACT_APP_API_URL}/material/weds`,
    MATERIAL_RULES: `${process.env.REACT_APP_API_URL}/material/rules`,
    MATERIAL_VIDEOS: `${process.env.REACT_APP_API_URL}/material/videos`,
    DIALOGUE_CATEGORY_LIST: `${process.env.REACT_APP_API_URL}/dialogue/category_list`,
}