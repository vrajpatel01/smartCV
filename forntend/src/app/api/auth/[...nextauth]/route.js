// import { login } from "@/app/auth/login/services/api";
import axiosInstance from "../../../../axios.config";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = await NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        try {
          if (!credentials) {
            return null;
          }

          const { username, password } = credentials;
          console.log(username);
          console.log(password);

          const response = await axiosInstance.post("/admin/auth/login", {
            email: username,
            password: password,
          });

          if (response.data.success === false) {
            throw new Error(response.data.data.message);
          }

          return {
            email: response.data.data.email,
            refreshToken: response.data.data.refreshToken,
            accessToken: response.data.data.accessToken,
          };
        } catch (error) {
          console.log(error.response.data);
          if (!error.response.data.success) console.log(error.response.data);

          throw new Error(error.response.data.message);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
          email: user.email,
        };
      }
      return token;
    },
    async session({ token, session }) {
      // console.log('token: ', token);
      return {
        ...session,
        user: {
          ...session.user,
          accessToken: token.accessToken,
          refreshToken: token.refreshToken,
          email: token.email,
        },
      };
    },
  },
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/login",
    error: "/auth/login",
    newUser: "/auth/register",
  },
});

export { handler as GET, handler as POST };
