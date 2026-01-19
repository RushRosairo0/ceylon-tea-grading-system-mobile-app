import { config } from "@/config/config";

export async function userGet(accessToken: string) {
  try {
    // call user get endpoint
    const response = await fetch(`${config.API_URL}/api/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `"${accessToken}"`,
      },
    });

    // check for errors
    if (!response.ok) {
      const errorData = await response.json();

      throw new Error(errorData.response.data || "Get details failed");
    }

    // parse and return success response
    const data = await response.json();

    return {
      user: data.response.data.user,
    };
  } catch (error) {
    throw error;
  }
}
