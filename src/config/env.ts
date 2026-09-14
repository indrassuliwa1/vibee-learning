export const env = {
  PORT: process.env.PORT || "3000",
  DATABASE_URL: process.env.DATABASE_URL as string,
  NODE_ENV: process.env.NODE_ENV || "development",
};

if (!env.DATABASE_URL) {
  throw new Error("DATABASE_URL is missing in environment variables");
}
