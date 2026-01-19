import { config } from "@/config/config";

export async function userLogin(email: string, password: string) {
  try {
    // call user login endpoint
    const response = await fetch(`${config.API_URL}/api/user/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    // check for errors
    if (!response.ok) {
      const errorData = await response.json();

      throw new Error(errorData.response.data.message || "Login failed");
    }

    // parse and return success response
    const data = await response.json();
    const token = response.headers.get("Access-Token");

    return {
      user: data.response.data.user,
      token: token,
    };
  } catch (error) {
    throw error;
  }
}
