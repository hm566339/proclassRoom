export const openSubmittedAssignment = (filePath) => {
  try {
    const parts = filePath.split("\\");
    const filename = parts[parts.length - 1];

    // console.log(filePath);

    // Construct API URL
    const pdfUrl = `http://localhost:8581/files/submission/${filename}`;

    // Open the PDF in new tab
    const newWindow = window.open(pdfUrl, "_blank");

    if (
      !newWindow ||
      newWindow.closed ||
      typeof newWindow.closed === "undefined"
    ) {
      alert("Popup blocked! Please allow popups for this site.");
    }
  } catch (error) {
    console.error("Error opening submitted assignment:", error);
    alert("Could not open submitted assignment.");
  }
};
