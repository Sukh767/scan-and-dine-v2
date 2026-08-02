import { api } from "@scan/api";

export const sessionService = {
  getSessions(params = {}) {
    return api.get("/sessions", {
      params,
    });
  },

  getSession(sessionId) {
    return api.get(`/sessions/${sessionId}`);
  },

  startSession(payload) {
    return api.post("/sessions/start", payload);
  },

  resumeSession(sessionId) {
    return api.patch(`/sessions/${sessionId}/resume`);
  },

  endSession(sessionId) {
    return api.patch(`/sessions/${sessionId}/end`);
  },
};
