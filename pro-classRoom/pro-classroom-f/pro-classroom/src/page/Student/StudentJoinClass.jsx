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

export function StudentJoinClass() {
  const dispatch = useDispatch();

  // Get the class room data from the Redux store
  const classRoomState = useSelector((state) => state.classRoom1);

  const { classRoom, loading, error } = classRoomState || {
    classRoom: [],
    loading: false,
    error: null,
  };

  useEffect(() => {
    // Dispatch API call to fetch class room data
    dispatch(ApiClassRoom());
  }, [dispatch]);

  // Show loading state
  if (loading) return <p>Loading classrooms...</p>;

  // Show error state
  if (error) return <p>Error: {error}</p>;

  // If no classRoom data exists, render a message (optional fallback)
  if (classRoom.length === 0) return <p>No classrooms available</p>;

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
            >
              Delete
            </Button>
            <Button
              variant="outline"
              className="w-5/12 text-xs md:text-sm lg:text-base"
            >
              View
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
