import jwt from 'jwt-simple'

const SECRET = "senha ultra secreta";
const ISSUER = "music server";

function clockTimestamp(date = new Date()) {
    return Math.floor(date.getTime() / 1000);
}

export function createToken(user) {
    const DAYS = 10;
    const exp = new Date();
    exp.setDate(exp.getDate() + DAYS);

    const payload = {
        iss: ISSUER,
        iat: clockTimestamp(),
        exp: clockTimestamp(exp),
        sub: user.id,
        user: {
            id: user.id,
            login: user.login,
            admin: user.admin
        }
    }
    return jwt.encode(payload, SECRET);
}