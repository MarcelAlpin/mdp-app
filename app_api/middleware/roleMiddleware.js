const roleMiddleware = (requiredrole) => {
  return (req, res, next) => {
    // Jika User Memiliki Role Yang Sesuai
    if (req.user && req.user.role === requiredrole) {
      next();
    } else {
      return res.status(403).json({
        message: "Access Denied",
      });
    }
  };
};
module.exports = roleMiddleware;
