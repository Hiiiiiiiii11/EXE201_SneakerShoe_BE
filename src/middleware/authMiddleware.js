import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_secret";

// Xác thực JWT
export const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ errCode: 1, errMessage: "No token provided, You need to login first" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (e) {
    console.error("verifyToken error:", e);
    return res.status(401).json({ errCode: 2, errMessage: "Invalid token, You need to login again" });
  }
};

// Check quyền Admin
export const isAdmin = (req, res, next) => {
  if (req.user?.roleId !== 3) {
    return res.status(403).json({ errCode: 3, errMessage: "Access denied. Admin only." });
  }
  next();
};
