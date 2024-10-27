exports.isRH = (req, res, next) => {
    if (req.user.role === 'rh') {
      return next();
    } else {
      return res.status(403).json({ message: 'Access denied: RH role required' });
    }
  };
exports.isEmployee = (req, res, next) => {
    if (req.user.role === 'employee') {
      return next();
    } else {
      return res.status(403).json({ message: 'Access denied: Employee role required' });
    }
  };
