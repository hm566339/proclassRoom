import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { AllStudentEnrolled } from "@/redux/api/AllStudentEnrolled";
import { Button } from "@/components/ui/button";

export const EnrollStudent = () => {
  const { class_id } = useParams();
  const dispatch = useDispatch();

  const { students, loading, error } = useSelector(
    (state) => state.enrollStudent // ✅ matches store key
  );

  useEffect(() => {
    dispatch({ type: "SET_LOADING" });
    dispatch(AllStudentEnrolled(class_id));
  }, [dispatch, class_id]);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Class ID: {class_id}</h1>

      {loading && <p>Loading students...</p>}
      {error && <p className="text-red-500">Error: {error.message || error}</p>}

      {!loading && students.length === 0 && <p>No students enrolled.</p>}

      <ul className="space-y-2">
        {students.map((student) => (
          <li
            key={student.id}
            className="border p-2 rounded flex justify-between items-center"
          >
            <div>
              <strong>Name:</strong> {student.firstname} {student.secondname}{" "}
              <br />
              <strong>Email:</strong> {student.email}
            </div>
            <Button className="ml-4">View Detail</Button>
          </li>
        ))}
      </ul>
    </div>
  );
};
