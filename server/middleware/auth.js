import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const jwtSecret = process.env.JWT_SECRET;

// Need to have an account
export const userAuth = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (token) {
        jwt.verify(token, jwtSecret, (err, decodedToken) => {
            if (err) {
                return res.status(401).json({ message: "Not Authorized" });
            } else {
                if (!decodedToken.role) {
                    return res.status(401).json({ message: "Not Authorized" });
                } else {
                    req.id = decodedToken.id;
                    next();
                }
            }
        });
    } else {
        return res.status(401).json({ message: "Not authorized by token" });
    }
}

// Anyone accessing the internet 
export const publicAuth = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (token) {
        jwt.verify(token, jwtSecret, (err, decodedToken) => {
            if (err) {
                return res.status(401).json({ message: "Not Authorized" });
            } else {
                if (!decodedToken.role) {
                    return res.status(401).json({ message: "Not Authorized" });
                } else {
                    req.id = decodedToken.id;
                }
            }
        });
    }
    next();
}

// Need to have admin role access
export const adminAuth = (req, res, next) => {
    const {userID} = req.body;
    const token = req.headers.authorization.split(" ")[1];
    if (token) {
        jwt.verify(token, jwtSecret, (err, decodedToken) => {
            if (err) {
                return res.status(401).json({ message: "Not Authorized" });
            } else {
                if (decodedToken.role !== "admin" || decodedToken.id !== userID) {
                    return res.status(401).json({ message: "Not Authorized" });
                } else {
                    next();
                }
            }
        });
    } else {
        return res.status(401).json({ message: "Not authorized by token" });
    }
}