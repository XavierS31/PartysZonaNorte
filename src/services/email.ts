import emailjs from '@emailjs/browser'
import { business } from '../config/business'

export type ContactPayload = {
  firstName: string
  lastName: string
  email: string
  phone: string
  subject: string
  message: string
}

export async function sendContactEmail(payload: ContactPayload) {
  const service = import.meta.env.VITE_EMAILJS_SERVICE_ID
  const template = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
  const key = import.meta.env.VITE_EMAILJS_PUBLIC_KEY
  if (!service || !template || !key)
    throw new Error('El correo aún no está configurado. Por favor, contáctanos por teléfono o WhatsApp.')
  return emailjs.send(
    service,
    template,
    {
      ...payload,
      from_name: `${payload.firstName} ${payload.lastName}`,
      reply_to: payload.email,
      to_email: business.emailRecipient,
      to_emails: business.emailRecipient,
    },
    { publicKey: key }
  )
}
