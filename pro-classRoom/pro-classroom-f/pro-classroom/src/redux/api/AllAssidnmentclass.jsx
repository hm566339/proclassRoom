export const AllAssidnmentclass = async (class_id) => {
  const token = localStorage.getItem("token");

  try {
    const response = await fetch(
      `http://localhost:8581/assignment/classroom/${class_id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    // console.log("Fetched assignment data:", data);
    return data; // ensure your API response shape is like { data: [...] }
  } catch (error) {
    console.error("Failed to fetch assignment:", error);
    throw error;
  }
};
