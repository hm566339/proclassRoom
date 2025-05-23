export const submitAssignment = async (submissionData) => {
  const token = localStorage.getItem("token");
  console.log(submissionData);

  const formData = new FormData();
  formData.append("assignmentId", submissionData.assignmentId);
  formData.append("studentId", submissionData.studentId);
  formData.append("feedback", submissionData.feedback);
  console.log(formData);

  if (submissionData.file) {
    formData.append("file", submissionData.file);
  }

  try {
    const response = await fetch("http://localhost:8581/submit", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (response.ok) {
      return await response.json();
    } else {
      const errorText = await response.text();
      throw new Error(errorText || "Error submitting assignment");
    }
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};
