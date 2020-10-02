import passport from "passport"
import JwtStrategy from "passport-jwt"
const dotenv = require('dotenv');
dotenv.config();

const jwtOptions = {
    jwtFromRequest = JwtStrategy.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secret : process.env.JWT_SECRET,
};

const verifyUser = (payload, done) => {
    try {

    } catch(error) {
        
    }
}

passport.use(new JwtStrategy(jwtOptions, verifyUser));