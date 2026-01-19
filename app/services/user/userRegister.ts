import { config } from "@/config/config";

export async function userRegister(
  name: string,
  email: string,
  experience: string,
  password: string,
) {
  try {
    // call user register endpoint
    const response = await fetch(`${config.API_URL}/api/user`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, experience, password }),
    });

    // check for errors
    if (!response.ok) {
      const errorData = await response.json();

      throw new Error(errorData.response.data.message || "Registration failed");
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
