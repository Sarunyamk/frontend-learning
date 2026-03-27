import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

/** คำนวณ expiry timestamp จาก expiresIn (seconds) โดยหัก buffer 3 วิ */
function calcExpiresAt(expiresIn: number): number {
  return Date.now() + expiresIn * 1000 - 3_000;
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      async authorize(credentials) {
        try {
          //? ใส่ logic login service
          // const { accessToken, refreshToken, expiresIn, user } =
          //   await authService.login(credentials);

          console.log('credentials', credentials)
          return {
            id: 'id',
            email: 'test@gmail.com',
            name: 'mink',
            role: 'ADMIN',
            accessToken : 'accessTokennn',
            refreshToken:'refreshTpkennn',
            accessTokenExpiresAt: calcExpiresAt(90000),
          };

        } catch {
          return null;
        }
      },
    }),
  ],

  session: { strategy: 'jwt', maxAge: 7 * 24 * 60 * 60 }, // 7 days (match refresh token)

  pages: {
    signIn: '/admin/login',
  },

  callbacks: {
    async jwt({ token, user, trigger, session }) {
      // First login — persist user data into JWT
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.role = user.role;
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.accessTokenExpiresAt = user.accessTokenExpiresAt;
        return token;
      }

      // Manual session update (e.g. after profile edit)
      if (trigger === 'update' && session) {
        if (session.name) token.name = session.name;
      }

      // Token still valid — return as-is
      if (Date.now() < token.accessTokenExpiresAt) {
        return token;
      }
      // Token expired — try refresh
      try {
        //? ใส่ service refreshtoken
        // const tokens = await authService.refresh(token.refreshToken);
        // if (!tokens) {
        //   token.error = 'RefreshTokenError';
        //   return token;
        // }

        // token.accessToken = tokens.accessToken;
        // token.refreshToken = tokens.refreshToken;
        // token.accessTokenExpiresAt = calcExpiresAt(tokens.expiresIn);
        // token.error = undefined;
        return token;
      } catch {
        token.error = 'RefreshTokenError';
        return token;
      }
    },

    async session({ session, token }) {
      session.user.id = token.id;
      session.user.email = token.email;
      session.user.name = token.name;
      session.user.role = token.role;
      session.user.accessToken = token.accessToken;
      session.error = token.error;
      return session;
    },
  },
});
