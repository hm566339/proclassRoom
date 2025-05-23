import { createSlice, createSelector } from "@reduxjs/toolkit";

// Dummy user data
const initialState = {
  user: {
    id: "user_001",
    firstName: "Alex",
    lastName: "Johnson",
    email: "alex.johnson@example.com",
    phone: "987-654-3210",
    address: "456 Elm St, Metropolis",
    role: "teacher", // Can be "student" or "teacher"
    subject: "Physics", // Only applicable if teacher
    gradeLevel: "11th Grade", // Only applicable if student
  },
  enrolledCourses: [
    {
      id: "course_201",
      title: "Physics",
      teacher: "Dr. Williams",
      progress: 80, // Progress in percentage
      assignments: [
        {
          title: "Quantum Mechanics Homework",
          dueDate: "2025-04-10",
          status: "pending",
        },
        {
          title: "Relativity Quiz",
          dueDate: "2025-04-15",
          status: "completed",
        },
      ],
    },
    {
      id: "course_202",
      title: "Chemistry",
      teacher: "Prof. Taylor",
      progress: 65,
      assignments: [
        {
          title: "Organic Chemistry Lab",
          dueDate: "2025-04-20",
          status: "pending",
        },
        {
          title: "Periodic Table Test",
          dueDate: "2025-04-25",
          status: "in-progress",
        },
      ],
    },
  ],
  upcomingAssignments: [
    {
      title: "Quantum Mechanics Homework",
      dueDate: "2025-04-10",
      status: "pending",
    },
    {
      title: "Organic Chemistry Lab",
      dueDate: "2025-04-20",
      status: "pending",
    },
  ],
  grades: [
    { course: "Physics", score: 88, status: "Very Good" },
    { course: "Chemistry", score: 76, status: "Average" },
    { course: "Mathematics", score: 95, status: "Excellent" },
  ],
};

// Create Redux slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateProgress: (state, action) => {
      const { courseId, progress } = action.payload;
      const course = state.enrolledCourses.find((c) => c.id === courseId);
      if (course) {
        course.progress = progress;
      }
    },
    submitAssignment: (state, action) => {
      const { courseId, assignmentTitle } = action.payload;
      const course = state.enrolledCourses.find((c) => c.id === courseId);
      if (course) {
        const assignment = course.assignments.find(
          (a) => a.title === assignmentTitle
        );
        if (assignment) {
          assignment.status = "submitted";
        }
      }
    },
  },
});

// Selector
export const selectUserData = createSelector(
  (state) => state.user,
  (user) => ({
    id: user.user.id,
    firstName: user.user.firstName,
    lastName: user.user.lastName,
    email: user.user.email,
    phone: user.user.phone,
    address: user.user.address,
    role: user.user.role,
    subject: user.user.subject,
    gradeLevel: user.user.gradeLevel,
    courses: user.enrolledCourses,
    assignments: user.upcomingAssignments,
    grades: user.grades,
  })
);

// Export actions & reducer
export const { updateProgress, submitAssignment } = userSlice.actions;
export default userSlice.reducer;
