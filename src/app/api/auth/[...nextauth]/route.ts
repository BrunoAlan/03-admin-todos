import { signInEmailPassword } from '@/auth/actions/auth-actions';
import prisma from '@/lib/prisma';
import { PrismaAdapter } from '@auth/prisma-adapter';
import NextAuth, { NextAuthOptions } from 'next-auth';
import { Adapter } from 'next-auth/adapters';
import Credentials from 'next-auth/providers/credentials';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma) as Adapter,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
        }),
        GithubProvider({
            clientId: process.env.GITHUB_ID ?? '',
            clientSecret: process.env.GITHUB_SECRET ?? '',
        }),
        Credentials({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email' },
                password: {
                    label: 'Password',
                    type: 'password',
                    placeholder: '*****',
                },
            },
            async authorize(credentials) {
                const user = await signInEmailPassword(
                    credentials!.email,
                    credentials!.password
                );
                if (user) {
                    return user;
                }
                return null;
            },
        }),
    ],
    session: {
        strategy: 'jwt',
    },
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            return true;
        },
        async jwt({ token, user }) {
            if (user) {
                const dbUser = await prisma.user.findUnique({
                    where: { email: token.email || '' },
                });
                token.roles = dbUser?.roles || ['no-roles'];
                token.id = dbUser?.id || 'no-id';
            }
            return token;
        },

        async session({ session, token }) {
            if (session.user) {
                session.user.roles = token.roles || ['no-roles'];
                session.user.id = token.id || 'no-id';
            }
            return session;
        },
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
