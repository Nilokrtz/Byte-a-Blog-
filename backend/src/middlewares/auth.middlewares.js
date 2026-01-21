import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import userService from "../services/user.service.js";

dotenv.config();
 
export const authMiddleware = (req, res, next) => {
    try {
      const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).send({ message: "Unauthorized" });
    }

    const parts = authorization.split(" ");

    const [schema, token] = parts;

    if (parts.length !== 2) {
      return res.status(401).send({ message: "Unauthorized" });
    }

    if (schema !== "Bearer") {
      return res.status(401).send({ message: "Unauthorized" });
    }

    jwt.verify(token, process.env.JWT_SECRET, async (error, decoded) => {
      if (error) {
        return res.status(401).send({ message: "Unauthorized" });
      }

      const user = await userService.findByIdService(decoded.id);

      if (!user || !user.id) {
        return res.status(401).send({ message: "Invalid token" });
      }

      req.userId = user.id;
      return next();
    });
  } catch (error) {
        res.status(500).send({ message: error.message });
  }
};

