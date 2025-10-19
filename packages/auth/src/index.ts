import { checkout, polar, portal, usage } from '@polar-sh/better-auth'
import { Polar } from '@polar-sh/sdk'
import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'

import { db } from '@repo/db'
import { VerifyEmail } from './emails/verify-email'
import { getResend } from './resend'

const polarClient = new Polar({
  accessToken: process.env.POLAR_ACCESS_TOKEN,
  server: 'sandbox',
})

export const auth = betterAuth({
  baseURL: process.env.API_URL!,
  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      await getResend().emails.send({
        from: 'Bun Turbo <no-reply@bun-web.sandervreeken.com>',
        to: user.email,
        subject: 'Verify your email address',
        html: VerifyEmail(user.name, url),
      })
    },
  },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
  },
  database: drizzleAdapter(db, {
    provider: 'pg',
  }),
  plugins: [
    polar({
      client: polarClient,
      createCustomerOnSignUp: true,
      use: [
        checkout({
          products: [
            {
              productId: '5d085005-3936-4416-9aaf-03a9aea3a8d5',
              slug: 'premium',
            },
          ],
          successUrl: process.env.POLAR_SUCCESS_URL,
          authenticatedUsersOnly: true,
        }),
        portal(),
        usage(),
      ],
    }),
  ],
  advanced: {
    crossSubDomainCookies: {
        enabled: true,
        domain: process.env.COOKIE_DOMAIN!,
    },
  },
  trustedOrigins: [process.env.API_URL!, process.env.WEB_URL!],
})
