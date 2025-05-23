export const CreateAssignment = async (values) => {
  const token = localStorage.getItem("token");
  console.log(values);

  const formData = new FormData();

  formData.append("ClassRoomId", values.ClassRoomId);
  formData.append("CreateBy", values.CreateBy);
  formData.append("description", values.description);
  formData.append("title", values.title);
  //   formData.append("dueDate", values.dueDate); // ✅ MUST match backend parameter name
  formData.append("LocalDate", values.dueDate); // ✅ match backend param

  formData.append("max_score", values.max_score);

  console.log(formData);

  if (values.file) {
    formData.append("file", values.file);
  } else {
    throw new Error("File is required");
  }

  try {
    const response = await fetch("http://localhost:8581/assignmentcreate", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        // Don't set Content-Type manually when using FormData
      },
      body: formData,
    });

    if (response.ok) {
      return await response.json();
    } else {
      const errorText = await response.text();
      throw new Error(errorText || "Error creating assignment");
    }
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};
