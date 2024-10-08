import bcrypt from 'bcrypt';
import { cookies } from 'next/headers';
import { SignJWT } from 'jose';

const secretKey = process.env.SECRET_KEY;
const key = new TextEncoder().encode(secretKey);

async function encrypt(payload) {
    const encryption = await new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('24h')
        .sign(key);
    return encryption;
}

async function encryptSession(user) {
    const now = new Date();
    const expires = new Date(now).setDate(now.getDate() + 1);
    const session = await encrypt({ user, expires });
    cookies().set('session', session, { expires, httpOnly: true });
}

async function getPasswordHash() {
    const password = process.env.SITE_PASSWORD;
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
}

async function getUsernameHash() {
    const username = process.env.SITE_USERNAME;
    const hashedUsername = await bcrypt.hash(username, 10);
    return hashedUsername;
}

export async function login(formData) {
    const { username, password } = formData;
    const correctUsername = await getUsernameHash();
    const usernameMatches = await bcrypt.compare(username, correctUsername);
    if (usernameMatches) {
        const correctPassword = await getPasswordHash();
        const passwordMatches = await bcrypt.compare(password, correctPassword);
        if (passwordMatches) {
            await encryptSession();
            return 'success';
        } else {
            throw new Error('incorrect password');
        }
    } else {
        throw new Error('incorrect username');
    }
}
