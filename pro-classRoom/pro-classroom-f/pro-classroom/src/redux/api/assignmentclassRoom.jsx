export const openAssignmentPdf = async (assignmentId) => {
  const token = localStorage.getItem("token");

  try {
    const response = await fetch(
      `http://localhost:8581/assignment/${assignmentId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);

    window.location.href = url;
  } catch (error) {
    console.error("Failed to open PDF:", error);
  }
};
