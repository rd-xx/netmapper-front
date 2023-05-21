import * as yup from "yup"

export const usernameSchema = yup
  .string()
  .trim()
  .required("Nom d'utilisateur requis")
  .label("Nom d'utilisateur")

export const emailSchema = yup
  .string()
  .email()
  .required("E-mail requis")
  .label("E-mail")

export const passwordSchema = yup
  .string()
  .min(8, "Mot de passe doit contenir au moins 8 caractères")
  .matches(
    /^.*(?=.*[0-9]+).*$/,
    "Mot de passe doit contenir au moins un chiffre"
  )
  .matches(
    /^.*(?=.*\p{Ll}+).*$/u,
    "Mot de passe doit contenir au moins une lettre minuscule"
  )
  .matches(
    /^.*(?=.*\p{Lu}+).*$/u,
    "Mot de passe doit contenir au moins une lettre majuscule"
  )
  .matches(
    /^.*(?=.*[^0-9\p{L}]+).*$/u,
    "Mot de passe doit contenir au moins un caractère spécial"
  )
  .required("Mot de passe requis")
  .label("Mot de passe")

export const ipSchema = yup
  .string()
  .matches(
    /^(?:(?:25[0-5]|2[0-4]\d|1?\d?\d)(?:\.(?!$)|$)){4}$/,
    "Adresse IP invalide"
  )
  .required("Adresse IP requise")
  .label("Adresse IP")

export const cleanRegExp = (str) => str.replace(new RegExp("\\/", "g"), "")
