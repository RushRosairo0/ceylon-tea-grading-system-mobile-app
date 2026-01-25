import { config } from "@/config/config";

export async function saveFeedback(
  accessToken: string,
  predictionId: number,
  isAgreed: boolean,
  grade: string,
  comment: string,
  aroma: number,
  color: number,
  taste: number,
  afterTaste: number,
  acceptability: number,
) {
  try {
    // call save feedback endpoint
    const response = await fetch(`${config.API_URL}/api/feedback`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `"${accessToken}"`,
      },
      body: JSON.stringify({
        predictionId,
        isAgreed,
        grade,
        comment,
        aroma,
        color,
        taste,
        afterTaste,
        acceptability,
      }),
    });

    // check for errors
    if (!response.ok) {
      const errorData = await response.json();

      throw new Error(
        errorData.response.data.message || "Saving feedback failed",
      );
    }

    // parse and return success response
    const data = await response.json();

    return {
      data: data.response.data.feedback,
    };
  } catch (error) {
    throw error;
  }
}
