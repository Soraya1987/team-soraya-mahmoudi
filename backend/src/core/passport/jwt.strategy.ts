// src/core/passport/jwt.strategy.ts
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import passport from 'passport';
import { UserModel } from '../../modules/user/entity/user.entity';

if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined');
}

type JwtPayload = {id: string; iat: number; exp: number };
const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET || 'dev_secret',
};

passport.use(
  new JwtStrategy(opts, async (jwt_payload: JwtPayload, done) => {
    try {
      const user = await UserModel.findById(jwt_payload.id);
      return user ? done(null, user) : done(null, false);
    } catch (err) {
      return done(err, false);
    }
  }),
);
