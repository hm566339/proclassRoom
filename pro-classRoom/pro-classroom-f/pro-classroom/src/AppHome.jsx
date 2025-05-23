import { createBrowserRouter, RouterProvider } from "react-router-dom"; // ✅ Correct import
import AppLayout from "./components/layout/AppLayout";
import { Homepage } from "@/page/Homepage";
import { Signup } from "./page/Singup";
import { About } from "./page/About";
import { Contact } from "./page/Contact";
import { Dashbord1 } from "./page/DashBord1";
import Teacherdashbordlay from "@/components/layout/Teacherdashbordlay";
import { Profileview } from "./page/Profileview";
import { Teacherclassroom } from "./page/Teacherclassroom";
// import { ListofStudent } from "@/page/ListofStudent";
import { Addclassroom } from "./components/Addclassroom";
import Login from "./page/Login";
// import { Classroomdash } from "./page/Classroomdash";
import { Sudentdash } from "./page/Sudentdash";
import Studentlayout from "./components/layout/Studentlayoout";
import { Assignment } from "./page/Assigment";
import { DetailCard } from "./components/DetailCard";
import { ClassRoomDetail } from "./components/ClassRoomDetail";
import { ClassRoomReleted } from "./page/ClassRoomReleted";
import { StudentClass } from "./page/Student/StudentClass";
import { ListOfAssignment } from "./page/Student/ListOfAssignment";
import AssignmentDisplay from "./page/Student/AssignmentDisplay";
import { AllClassAssignment } from "./page/Student/AllClassAssignment";
import { Submission } from "./page/Student/Submission";
import { EnrollStudent } from "./page/teacher/EnrollStudent";
import { SubmitAllStudent } from "./page/teacher/SubmitAllStudent";

const AppHome = () => {
  const router = createBrowserRouter([
    {
      path: "/teacher-dashboard",
      element: <Teacherdashbordlay />,
      children: [
        {
          index: true,
          element: <Dashbord1 />,
        },
        {
          path: "profileview",
          element: <Profileview />,
        },
        {
          path: "Teacherclassroom",
          element: <Teacherclassroom />,
        },
        {
          path: "Addclassroom",
          element: <ClassRoomReleted />,
        },
        {
          path: "Assignment",
          element: <Assignment />,
        },
        {
          path: "classRoom",
          element: <ClassRoomDetail />,
        },
        {
          path: "AssigmnetDetail",
          element: <DetailCard />,
        },
        {
          path: "/teacher-dashboard/enrollstudent/:class_id",
          element: <EnrollStudent />,
        },
        {
          path: "/teacher-dashboard/submitstudent/:assignmentId",
          element: <SubmitAllStudent />,
        },
      ],
    },
    {
      path: "/student-dashboard",
      element: <Studentlayout />,
      children: [
        {
          index: true,
          element: <Sudentdash />,
        },
        {
          path: "profileview", // ✅ Correct relative path
          element: <Profileview />,
        },
        {
          path: "Teacherclassroom", // ✅ Matches sidebar path
          element: <Teacherclassroom />,
        },
        {
          path: "courses", // ✅ Matches sidebar path
          element: <StudentClass />,
        },
        {
          path: "Addclassroom", // ✅ Matches sidebar path
          element: <Addclassroom />,
        },
        {
          path: "ShowAssignment", // ✅ Matches sidebar path
          element: <AssignmentDisplay />,
        },
        {
          path: "assignments", // ✅ Matches sidebar path
          element: <ListOfAssignment />,
        },
        {
          path: "classAssignment/:class_id", // Add :class_id here
          element: <AllClassAssignment />,
        },
        {
          path: "/student-dashboard/submission/:assignmentId", // Add :class_id here
          element: <Submission />,
        },
      ],
    },
    {
      path: "/",
      element: <AppLayout />,
      children: [
        {
          path: "/",
          element: <Homepage />,
        },
        {
          path: "/signup",
          element: <Signup />,
        },
        {
          path: "/about",
          element: <About />,
        },
        {
          path: "/contact",
          element: <Contact />,
        },
        {
          path: "/StudentLogin",
          element: <Login />,
        },
        {
          path: "/TeacherLogin",
          element: <Login />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
  // return <Sudentdash />;
};

export default AppHome;
