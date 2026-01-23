import { config } from "@/config/config";

export async function analyzeSave(
  accessToken: string,
  imageId: number,
  grade: string,
  gradeConfidence: number,
  category: number,
  categoryConfidence: number,
  model: string,
) {
  try {
    // call save analyze endpoint
    const response = await fetch(`${config.API_URL}/api/predict/save`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `"${accessToken}"`,
      },
      body: JSON.stringify({
        imageId,
        grade,
        gradeConfidence,
        category,
        categoryConfidence,
        model,
      }),
    });

    // check for errors
    if (!response.ok) {
      const errorData = await response.json();

      throw new Error(
        errorData.response.data.message || "Saving analyze failed",
      );
    }

    // parse and return success response
    const data = await response.json();

    return {
      data: data.response.data.prediction,
    };
  } catch (error) {
    throw error;
  }
}
