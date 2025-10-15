import { Resend } from 'resend'

// Lazy-loaded Resend instance
let _resend: Resend | null = null

export function getResend() {
  if (!_resend) {
    const key = process.env.RESEND_API_KEY
    if (!key) throw new Error('Missing RESEND_API_KEY')
    _resend = new Resend(key)
  }
  return _resend
}