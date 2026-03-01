// Global error handler middleware — must be registered LAST in Express
export const errorHandler = (err, req, res, next) => {
  console.error(`[${new Date().toISOString()}] ERROR:`, err.stack || err.message);

  const status = err.status || err.statusCode || 500;
  const message = err.message || "Internal server error.";

  return res.status(status).json({ message });
};
