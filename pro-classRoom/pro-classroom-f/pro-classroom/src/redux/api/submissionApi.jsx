// api/submissionApi.js
export const submissionApi = async (formData) => {
  const token = localStorage.getItem("token"); // Get the token from localStorage

  if (!token) {
    throw new Error("Token not found");
  }

  try {
    const response = await fetch("http://localhost:8581/submit-assignment", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData, // Form data will automatically handle multipart form submission
    });

    if (response.ok) {
      return await response.json(); // Return JSON response from server
    } else {
      const errorText = await response.text();
      throw new Error(errorText || "Error submitting assignment");
    }
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};
