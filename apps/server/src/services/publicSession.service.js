import diningSessionRepository from "../repositories/diningSession.repository.js";

import ApiError from "../utils/ApiError.js";

import { toPublicSessionResponse } from "../transformers/publicSession.transformer.js";

import { HTTP_STATUS, DINING_SESSION_MESSAGES } from "../constants/index.js";

class PublicSessionService {
  async getSession(sessionToken) {
    const session =
      await diningSessionRepository.findActiveByToken(sessionToken);

    if (!session) {
      throw new ApiError(
        HTTP_STATUS.NOT_FOUND,
        DINING_SESSION_MESSAGES.NO_ACTIVE_SESSION,
      );
    }

    const updatedSession = await diningSessionRepository.update(session.id, {
      lastActivityAt: new Date(),
    });

    return toPublicSessionResponse(updatedSession);
  }
}

export default new PublicSessionService();
