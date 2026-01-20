import { config } from "@/config/config";

export async function imageUpload(accessToken: string, uri: string) {
  try {
    // create form data
    const formData = new FormData();
    formData.append("image", {
      uri,
      type: "image/jpeg",
      name: "image.jpg",
    } as any);

    // call upload endpoint
    const response = await fetch(`${config.API_URL}/api/image`, {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `"${accessToken}"`,
      },
      body: formData,
    });

    // check for errors
    if (!response.ok) {
      const errorData = await response.json();

      throw new Error(errorData.response.data.message || "Image upload failed");
    }

    // parse and return success response
    const data = await response.json();

    return {
      image: data.response.data.image,
    };
  } catch (error) {
    throw error;
  }
}
