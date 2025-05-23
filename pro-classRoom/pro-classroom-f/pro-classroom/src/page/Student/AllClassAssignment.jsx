import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { fetchAssignmentsByClass } from "@/redux/fetchAssignmentsByClass";

export function AllClassAssignment() {
  const dispatch = useDispatch();
  const { class_id } = useParams();

  const { assignments, loading, error } = useSelector(
    (state) => state.assignmentsByClass
  );

  useEffect(() => {
    if (class_id) {
      dispatch(fetchAssignmentsByClass(class_id));
    }
  }, [dispatch, class_id]);

  if (loading) return <p>Loading assignments...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!assignments || assignments.length === 0) {
    return <p>No assignments available for this class.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-x-auto">
      {assignments.map((assignment) => (
        <Card key={assignment.id || assignment.assignmentId} className="w-full">
          <CardHeader>
            <CardTitle>{assignment.title || assignment.assignmentId}</CardTitle>
            <CardDescription>{assignment.description}</CardDescription>
          </CardHeader>
          <div className="space-y-2 px-4">
            <div>
              <strong>Max Score:</strong> {assignment.max_score}
            </div>
            <div>
              <strong>Teacher Name:</strong> {assignment.createBy?.firstname}{" "}
              {assignment.createBy?.secondname}
            </div>
            <div>
              <strong>Teacher:</strong> {assignment.teacher?.firstname ?? "N/A"}
            </div>
          </div>
          <CardContent>
            <p>Due Date: {assignment.dueDate}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
