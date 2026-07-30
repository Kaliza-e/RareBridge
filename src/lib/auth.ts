import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import * as bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "patient@rarebridge.org" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // 1. Try DB lookup
        try {
          const user = await prisma.user.findUnique({
            where: { email: credentials.email }
          });

          if (user && user.password) {
            const isValid = await bcrypt.compare(credentials.password, user.password);
            if (isValid) {
              return {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
              };
            }
          }
        } catch (error) {
          console.warn("Database lookup failed, attempting mock fallback authentication:", error);
        }

        // 2. Mock Fallback (for demo compatibility without active DB)
        const mockUsers = [
          {
            id: "mock-patient-id",
            name: "David Miller",
            email: "patient@rarebridge.org",
            password: "Password123", // plaintext for mock check or we can compare directly
            role: "PATIENT"
          },
          {
            id: "mock-admin-id",
            name: "Dr. Sarah Jenkins",
            email: "admin@rarebridge.org",
            password: "Password123",
            role: "ADMIN"
          }
        ];

        const matchedMock = mockUsers.find(
          (u) => u.email === credentials.email && u.password === credentials.password
        );

        if (matchedMock) {
          return {
            id: matchedMock.id,
            name: matchedMock.name,
            email: matchedMock.email,
            role: matchedMock.role,
          };
        }

        return null;
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
        (session.user as any).role = token.role;
      }
      return session;
    }
  },
  pages: {
    signIn: "/auth/signin",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET || "rarebridge-secret-key-12345",
};
