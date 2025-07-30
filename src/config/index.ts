import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  jwt: {
    access_secret: process.env.ACCESS_SECRET,
    access_expires_in: process.env.ACCESS_EXPIRES_IN,
    refresh_secret: process.env.REFRESH_SECRET,
    refresh_expires_in: process.env.REFRESH_EXPIRES_IN,
    reset_pass_secret: process.env.RESET_PASS_SECRET,
    reset_pass_expires_in: process.env.RESET_PASS_EXPIRES_IN,
  },
  reset_pass_link: process.env.RESET_PASS_LINK,
  emailSender: {
    email: process.env.EMAIL,
    app_pass: process.env.APP_PASS,
  },
};
