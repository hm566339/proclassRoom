import { configureStore } from "@reduxjs/toolkit";
import classroomReducer from "@/redux/clsssroomSlice";
import authReducer from "@/redux/authSlice";
import sidebarReducer from "@/redux/sidebarSlice";
import studentReducer from "@/redux/studenSlice";
import userReducer from "@/redux/userSlice";
import chartReducer from "@/redux/chartSlice";
import activityChartReducer from "@/redux/activityChartSlice";
// import assignmentReducer from "@/redux/assignmentSlice";
import classRoom1Reducer from "./classRoom1Slice";
import announcementReducer from "./announcementSlice";
import gradingCategoriesReducer from "./gradingCategoriesSlice";
import enrollmentReducer from "@/redux/enrollmentSlice";
import EmrollClassSlice from "@/redux/EmrollClassSlice";
import ListOfAssignmentReducer from "@/redux/ListOfAssignmentSlice";
import assignmentsReducer from "@/redux/assignmentsSlice";
import AssignmentByClassReducer from "./fetchAssignmentsByClass";
import assignmentSubmissionReducer from "@/redux/assignmentSubmissionSlice";
import { enrollstudentReducer } from "./enrollstudentSlice";
// import { EnrollStudent } from "@/page/teacher/EnrollStudent";
import similarityReducer from "@/redux/api/checkAssigmentSimiller";

const store = configureStore({
  reducer: {
    classroom: classroomReducer,
    auth: authReducer,
    sidebar: sidebarReducer,
    student: studentReducer,
    user: userReducer,
    chart: chartReducer,
    activityChart: activityChartReducer,
    // assignments: assignmentReducer,
    classRoom1: classRoom1Reducer,
    announcement: announcementReducer,
    gradingCategories: gradingCategoriesReducer,
    enrollment: enrollmentReducer,
    EmrollClass: EmrollClassSlice,
    ListOfAssignment: ListOfAssignmentReducer,
    assignments: assignmentsReducer,
    assignmentsByClass: AssignmentByClassReducer,
    assignments1: assignmentSubmissionReducer,
    enrollStudent: enrollstudentReducer,
    similarity: similarityReducer,
  },
});

export default store;
