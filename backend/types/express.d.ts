import { AuthPayload } from "./user-payload";

declare global {
  namespace Express {
    interface Request {
      payload?: AuthPayload
    }
  }
}
