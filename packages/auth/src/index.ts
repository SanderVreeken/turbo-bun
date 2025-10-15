import { checkout, polar, portal, usage } from '@polar-sh/better-auth'
import { Polar } from '@polar-sh/sdk'
import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { Resend } from 'resend'

import { db } from '@repo/db'
import { VerifyEmail } from './emails/verify-email'

const polarClient = new Polar({
  accessToken: process.env.POLAR_ACCESS_TOKEN,
  // Use 'sandbox' if you're using the Polar Sandbox environment
  // Remember that access tokens, products, etc. are completely separated between environments.
  // Access tokens obtained in Production are for instance not usable in the Sandbox environment.
  server: 'sandbox',
})

const resend = new Resend(process.env.RESEND_API_KEY!);

export const auth = betterAuth({
  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      await resend.emails.send({
          from: 'Bun Turbo <no-reply@bun-web.sandervreeken.com>',
          to: user.email,
          subject: 'Verify your email address',
          html: VerifyEmail(user.name, url)
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
  trustedOrigins: [process.env.API_URL!, process.env.WEB_URL!],
})
