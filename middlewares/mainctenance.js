function maintenance(req, res, next) {
  // Set this to true to enable maintenance mode
  if (process.env.MAINTENANCE_MODE === "true") {
    return res.status(503).json({
      message:
        "Service is currently under maintenance. Please try again later.",
    });
  }
  next();
}
export default maintenance;
