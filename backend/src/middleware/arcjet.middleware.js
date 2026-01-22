import aj from "../lib/arcjet.js";
import { isSpoofedBot } from "@arcjet/inspect";
export const arcjetProtection = async (req, res, next) => {
  try {
    const decision = await aj.protect(req);

    if (decision.isDenied()) {
      if (decision.reason?.isRateLimit?.()) {
        return res.status(429).json({
          message: "Rate limit exceeded. Please try again later",
        });
      }

      if (decision.reason?.isBot?.()) {
        return res.status(403).json({
          message: "Bot access denied.",
        });
      }

      return res.status(403).json({
        message: "Access denied by security policy",
      });
    }

    if (decision.results?.some(isSpoofedBot)) {
      return res.status(403).json({
        message: "Malicious spoofed bot detected",
      });
    }

    next(); 

    // next() → keyingi middleware yoki route handlerga o‘tish
  } catch (error) {
    console.error("Arcjet Protection error:", error);
    return res.status(500).json({
      message: "Security service error",
    });
  }
};
