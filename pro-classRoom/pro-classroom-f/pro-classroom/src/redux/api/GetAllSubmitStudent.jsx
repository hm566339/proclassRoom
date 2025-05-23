export const GetAllSubmitStudent = (assignmentId) => async (dispatch) => {
  const token = localStorage.getItem("token");

  try {
    const response = await fetch(
      `http://localhost:8581/assignment/${assignmentId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );

    const data = await response.json();
    dispatch({ type: "SET_ENROLLED_STUDENTS", payload: data });
    // console.log(data);
  } catch (error) {
    console.error("Failed to fetch:", error);
    dispatch({ type: "SET_ENROLLED_STUDENTS_ERROR", payload: error });
  }
};
