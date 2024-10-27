const { Strategy, ExtractJwt } = require('passport-jwt');
const User = require('../models/user');

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET || 'hdkljh12dDCF5GR5kjdu58AQXD9IU52kjf',  
};
exports.passportScr = (passport)=>{
  return passport.use(
    new Strategy(opts, async (jwt_payload, done) => {
      try {
        const user = await User.findByPk(jwt_payload.id);
        if (user) {
          return done(null, user);
        }
        return done(null, false);
      } catch (error) {
          console.log(error)
        return done(error, false);
      }
    })
  );
}


