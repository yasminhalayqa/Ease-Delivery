import translationsEN from "./en/en.json";
import translationsAR from "./ar/ar.json";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const resources = {
    en: {
        translation: translationsEN
    },
    ar: {
        translation: translationsAR
    }
}

i18n.use(initReactI18next)
    .use(LanguageDetector)
    .init({
        resources,
        fallbackLng: "ar", // default language
        keySeparator: false, // we do not use keys in form messages.welcome
        interpolation: {
            escapeValue: false, // react already safes from xss
        },
    });

export default i18n    