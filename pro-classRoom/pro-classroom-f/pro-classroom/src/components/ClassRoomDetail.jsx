import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ApiClassRoom } from "@/redux/api/ApiClassRoom";
// import { Navigate } from "react-router";
// import { AllStudentEnrolled } from "@/redux/api/AllStudentEnrolled";

import { useNavigate } from "react-router-dom";
import { deleteClassRoom } from "@/redux/api/delete/DeletClassRoom";

export function ClassRoomDetail() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const classRoomState = useSelector((state) => state.classRoom1);
  const { classRoom, loading, error } = classRoomState || {
    classRoom: [],
    loading: false,
    error: null,
  };

  useEffect(() => {
    dispatch(ApiClassRoom());
  }, [dispatch]);

  if (loading) return <p>Loading classrooms...</p>;
  if (error) return <p>Error: {error}</p>;
  if (classRoom.length === 0) return <p>No classrooms available</p>;

  const showAllEnrollSetudent = (class_id) => {
    // console.log(class_id);
    navigate(`/teacher-dashboard/enrollstudent/${class_id}`);
  };

  const handleDelete = (class_id) => {
    dispatch(deleteClassRoom(class_id)).then(() => {
      dispatch(ApiClassRoom());
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-x-auto">
      {classRoom.map((classR) => (
        <Card key={classR.class_id} className="w-full">
          <CardHeader>
            <CardTitle>ClassRoom ID: {classR.class_id}</CardTitle>
            <CardDescription>Class Details:</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div>
                <strong>Class Name:</strong> {classR.class_name}
              </div>
              <div>
                <strong>Subject:</strong> {classR.subject}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between items-center">
            <Button
              variant="outline"
              className="w-5/12 text-xs md:text-sm lg:text-base bg-black text-white"
              onClick={() => handleDelete(classR.class_id)}
            >
              Delete
            </Button>

            <Button
              variant="outline"
              className="w-5/12 text-xs md:text-sm lg:text-base"
              onClick={() => showAllEnrollSetudent(classR.class_id)}
            >
              View
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
