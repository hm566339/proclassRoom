import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect } from "react";
import { ListOfAssignmentApi } from "@/redux/api/ListOfAssignmentApi";
import { openAssignmentPdf } from "@/redux/api/openAssignmentPdf";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function ListOfAssignment() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    assignments = [],
    loading,
    error,
  } = useSelector((state) => state.ListOfAssignment);

  useEffect(() => {
    if (!assignments.length) {
      dispatch(ListOfAssignmentApi());
    }
  }, [dispatch, assignments.length]);

  if (loading) return <p>Loading assignments...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!assignments.length) return <p>No assignments available</p>;

  const handleSubmissionClick = (assignmentId) => {
    navigate(`/student-dashboard/submission/${assignmentId}`);
    // console.log(assignmentId);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-x-auto">
      {assignments.map((assignment) => (
        <Card key={assignment.assignmentId} className="w-full">
          <CardHeader>
            <CardTitle>Assignment ID: {assignment.assignmentId}</CardTitle>
            <CardDescription>Class Details:</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div>
                <strong>Due Date:</strong> {assignment.dueDate}
              </div>
              <div>
                <strong>Description:</strong> {assignment.description}
              </div>
              <div>
                <strong>Subject:</strong> {assignment.classRoom.subject}
              </div>
              <div>
                <strong>Teacher:</strong>{" "}
                {assignment.classRoom.teacher.firstname}
              </div>
            </div>
          </CardContent>
          <CardFooter className="w-full flex justify-between">
            <Button
              variant="outline"
              className="w-5/12 text-xs md:text-sm lg:text-base"
              onClick={() => handleSubmissionClick(assignment.assignmentId)}
            >
              Submission
            </Button>
            <Button
              variant="outline"
              className="w-5/12 text-xs md:text-sm lg:text-base"
              onClick={() => openAssignmentPdf(assignment.assignmentId)}
            >
              View PDF
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
