import { restoreSession } from "../services";

export const sessionManager = {
  async restore() {
    await restoreSession();
  },
};
