import { config } from "@/config/config";

export async function analyze(
  accessToken: string,
  imageId: number,
  aroma: number,
  color: number,
  taste: number,
  afterTaste: number,
  acceptability: number,
) {
  try {
    // call analyze endpoint
    const response = await fetch(`${config.API_URL}/api/predict`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `"${accessToken}"`,
      },
      body: JSON.stringify({
        imageId,
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

      throw new Error(errorData.response.data.message || "Analyze failed");
    }

    // parse and return success response
    const data = await response.json();

    return {
      data: data.response.data,
    };
  } catch (error) {
    throw error;
  }
}
