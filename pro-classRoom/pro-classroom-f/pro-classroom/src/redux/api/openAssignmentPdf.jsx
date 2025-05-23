export const openAssignmentPdf = async (assignmentId) => {
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(
      `http://localhost:8581/assignmentssclsaa/${assignmentId}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error(
        `Server returned ${response.status}: ${response.statusText}`
      );
    }

    const data = await response.json();
    // console.log("Assignment data:", data.pathfile);

    if (data?.pathfile) {
      const pdfUrl = `http://localhost:8581${data.pathfile}`;
      // console.log("Opening PDF:", pdfUrl);
      const newWindow = window.open(pdfUrl, "_blank");
      if (
        !newWindow ||
        newWindow.closed ||
        typeof newWindow.closed === "undefined"
      ) {
        alert(
          "Popup blocked! Please allow popups for this site and try again."
        );
      }
    } else {
      alert("PDF path not found in the response.");
    }
  } catch (error) {
    console.error("Error opening PDF:", error);
    alert(`Failed to open PDF: ${error.message}`);
  }
};
