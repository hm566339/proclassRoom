import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { Allassignment } from "@/redux/api/Allassignment";
import { deleteAssignmentApi } from "@/redux/api/delete/deleteAssignmentApi";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { openAssignmentPdf } from "@/redux/api/openAssignmentPdf";
import { useNavigate } from "react-router";

export function DetailCard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const assignmentsState = useSelector((state) => state.assignments);
  const { assignments = [], loading, error } = assignmentsState || {};

  useEffect(() => {
    dispatch(Allassignment()); // Fetch assignments when component mounts
  }, [dispatch]);

  if (loading) return <p>Loading assignments...</p>;
  if (error) return <p>Error: {error}</p>;

  if (!assignments.length) return <p>No assignments available</p>;

  const handleDelete = (assignmentId) => {
    dispatch(deleteAssignmentApi(assignmentId)); // Dispatch delete assignment API action
  };

  const allSubmission = (assignmentId) => {
    // console.log(`Viewing assignment with ID: ${assignmentId}`);
    navigate(`/teacher-dashboard/submitstudent/${assignmentId}`);
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-x-auto m-3">
      {assignments.map((assignment) => (
        <Card key={assignment.assignmentId} className="w-full">
          <CardHeader>
            <CardTitle>Assignment ID: {assignment.assignmentId}</CardTitle>
            <CardDescription>Class Details:</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div>
                <strong>Class Name:</strong> {assignment.classRoom?.class_name}
              </div>
              <div>
                <strong>Description:</strong> {assignment.description}
              </div>
              <div>
                <strong>Title:</strong> {assignment.title}
              </div>
              <div>
                <strong>Due Date:</strong> {assignment.dueDate}
              </div>
              <div>
                <strong>Max Score:</strong> {assignment.max_score}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-2 items-center">
            <div className="w-full flex justify-between">
              <Button
                variant="outline"
                className="w-5/12 text-xs md:text-sm lg:text-base bg-black text-white"
                onClick={() => handleDelete(assignment.assignmentId)}
              >
                Delete
              </Button>
              <Button
                variant="outline"
                className="w-5/12 text-xs md:text-sm lg:text-base"
                onClick={() => openAssignmentPdf(assignment.assignmentId)}
              >
                View
              </Button>
            </div>
            <Button
              variant="outline"
              className="w-10/12 text-xs md:text-sm lg:text-base"
              onClick={() => allSubmission(assignment.assignmentId)}
            >
              All Submited Student
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
