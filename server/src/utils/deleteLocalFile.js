import fs from "fs/promises";

/**
 * Delete temporary local upload
 */
const deleteLocalFile = async (filePath) => {
  if (!filePath) return;

  try {
    await fs.unlink(filePath);
  } catch {
    /**
     * Ignore cleanup errors
     */
  }
};

export default deleteLocalFile;