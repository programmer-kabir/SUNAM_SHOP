import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    // 🔐 Credentials Login
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials) {
        const res = await fetch(`${process.env.BACKEND_URL}/api/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(credentials),
        });

        const data = await res.json();

        if (!res.ok) return null;

        return data; // { token, user }
      },
    }),

    // 🔵 Google Login
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    // 🔥 Google login hole backend e save
    async signIn({ user, account }) {
      if (account.provider === "google") {
        const res = await fetch(`${process.env.BACKEND_URL}/api/auth/google`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: user.name,
            email: user.email,
            image: user.image,
          }),
        });

        if (!res.ok) return false;

        const data = await res.json();

        user.backendToken = data.token;
        user.backendUser = data.user;
      }

      return true;
    },

    // 🔐 JWT Callback
    async jwt({ token, user, account }) {
      // Credentials login
      if (account?.provider === "credentials" && user) {
        token.accessToken = user.token;
        token.user = user.user; // DB user
      }

      // Google login
      if (account?.provider === "google" && user) {
        token.accessToken = user.backendToken;
        token.user = user.backendUser;
      }

      return token;
    },

    // 📦 Session Callback
    async session({ session, token }) {
      session.user = token.user;
      session.accessToken = token.accessToken;
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};
