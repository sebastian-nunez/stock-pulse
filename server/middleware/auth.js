const authMiddleware = (req, res, next) => {
  // check if the user is authenticated
  if (!req.session || !req.session.user) {
    return res.status(401).json({ message: "Unauthorized: Please log in." });
  }

  next();
};

export default authMiddleware;
