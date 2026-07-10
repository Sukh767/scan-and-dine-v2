class HealthController {
  check(req, res) {
    return res.status(200).json(
      new ApiResponse(
        HTTP_STATUS.OK,
        GENERAL_MESSAGES.API_RUNNING
      )
    );
  }
}

export default new HealthController();