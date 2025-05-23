import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { ApiEnrollClass } from "@/redux/api/ApiEnrollClass";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
// import { AllAssidnmentclass } from "@/redux/api/AllAssidnmentclass";

export function EnrollClassdetail() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Accessing the state
  const {
    classrooms = [],
    loading,
    error,
  } = useSelector((state) => state.EmrollClass) || {};

  // Log the state for debugging
  // console.log("Classrooms state:", classrooms);

  // Fetch the assignments when the component mounts
  useEffect(() => {
    dispatch(ApiEnrollClass());
  }, [dispatch]);

  if (loading) return <p>Loading assignments...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!classrooms.length) return <p>No assignments available</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-x-auto">
      {classrooms.map((assignment) => (
        <Card key={assignment.assignmentId} className="w-full">
          <CardHeader>
            <CardTitle>Class Room ID: {assignment.class_id}</CardTitle>
            <CardDescription>Class Details:</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div>
                <strong>Class Name:</strong> {assignment.class_name}
              </div>
              <div>
                <strong>Section:</strong> {assignment.section}
              </div>
              <div>
                <strong>Subject:</strong> {assignment.subject}
              </div>
              <div>
                <strong>Teacher:</strong>{" "}
                {assignment.teacher ? assignment.teacher.firstname : "N/A"}
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              variant="outline"
              className="text-xs md:text-sm lg:text-base"
              onClick={() => handleView(assignment.class_id)}
            >
              View Assignment
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );

  function handleView(class_id) {
    navigate(`/student-dashboard/classAssignment/${class_id}`);
  }
}
