import rateLimit from "express-rate-limit";

const commonOptions = {
  standardHeaders: true,
  legacyHeaders: false,
};

export const authRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: {
        message: "Too many authentication requests, please try again later",
    },
    ...commonOptions,
});


export const passwordRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: {
        message: "Too many password attempts, please try again later",
    },
    ...commonOptions,
});


export const apiRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: {
        message: "Too many requests, please try again later",
    },
    ...commonOptions,
});