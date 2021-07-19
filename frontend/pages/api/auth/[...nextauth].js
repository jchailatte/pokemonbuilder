import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

export default NextAuth({
    providers: [
        Providers.GitHub({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
            scope: "read:user"
        }),
    ],

    // A database is optional, but required to persist accounts in a database
    database: process.env.DATABASE_URL,
    session: { jwt: true },
    callbacks: {
        async jwt(token, user, account, profile, isNewUser) {
            if (user) { // User object only passed on initial JWT creation
                const administrators = ['jonathan.chai98@gmail.com']
                token.isAdmin = administrators.includes(user?.email)
            }
            return token
        },
        async session(session, token) {
            if (token?.isAdmin) {
              session.user.isAdmin = token.isAdmin
            }
            return session
          }
    }

})
