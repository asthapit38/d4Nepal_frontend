import NextAuth from "next-auth"
import CredientialsProvider from "next-auth/providers/credentials"
import { convertTimestampToDate } from "./lib/utils";

const BACKEND_ACCESS_TOKEN_LIFETIME =  1 * 24 * 60 * 60;  // 1 days
const BACKEND_REFRESH_TOKEN_LIFETIME = 6 * 24 * 60 * 60;  // 6 days

const getCurrentEpochTime = () => {
  return Math.floor(new Date().getTime() / 1000);
};

interface Session {
  access_token: string;
  refresh_token: string;
  user: any;
  error: string;
}

export const { handlers: { GET, POST }, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    CredientialsProvider({
      credentials: {
        username: {},
        password: {},
      },
      authorize: async (credentials) => {
        try {
          const response = await fetch(process.env.NEXTAUTH_BACKEND_URL + "api/auth/login/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: credentials?.username,
              password: credentials?.password,
            }),
          });
          const data = await response.json();
          if (data) return data;
        } catch (error) {
          console.error(error);
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        let backendResponse = user as any;
        token["user"] = backendResponse.user!;
        token["access_token"] = backendResponse.access!;
        token["refresh_token"] = backendResponse.refresh!;
        token["ref"] = getCurrentEpochTime() + BACKEND_ACCESS_TOKEN_LIFETIME;
        return token;
      }
      // Refresh the backend token if necessary
      if (getCurrentEpochTime() > token["ref"]) {
        const response = await fetch(process.env.NEXTAUTH_BACKEND_URL + "api/auth/token/refresh/", {
          method: "post",
          body: JSON.stringify({
            refresh: token["refresh_token"]
          },
          ),
          headers: {
            "Content-Type": "application/json",
          }
        });

        token["access_token"] = response.data.access;
        token["refresh_token"] = response.data.refresh;
        token["ref"] = getCurrentEpochTime() + BACKEND_ACCESS_TOKEN_LIFETIME;
      }
      return token;
    },
    async session({session, token}) {
      session.user = token.user as any;
      session.access_token = token.access_token as string;
      return session;
    },
  },
  trustHost: true,
})