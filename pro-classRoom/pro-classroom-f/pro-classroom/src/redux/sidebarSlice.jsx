import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

// Navigation data for teacher
const teacherNav = [
  {
    title: "Dashboard Controller",
    url: "#",
    icon: "SquareTerminal",
    isActive: false,
    items: [{ title: "Dashboard", url: "/teacher-dashboard" }],
  },
  {
    title: "Class Room",
    url: "#",
    icon: "SquareTerminal",
    isActive: false,
    items: [
      { title: "Add Class", url: "/teacher-dashboard/Addclassroom" },
      { title: "List of Class", url: "/teacher-dashboard/classRoom" },
    ],
  },
  {
    title: "Assignment",
    url: "#",
    icon: "Bot",
    items: [
      { title: "Assignment", url: "/teacher-dashboard/Assignment" },
      { title: "Detail Assignment", url: "/teacher-dashboard/AssigmnetDetail" },
    ],
  },
  {
    title: "Settings",
    url: "#",
    icon: "Settings2",
    items: [
      { title: "General", url: "#" },
      { title: "Assignment", url: "#" },
    ],
  },
];

// Navigation data for student
const studentNav = [
  {
    title: "Dashboard",
    url: "/student-dashboard",
    icon: "Home",
    items: [{ title: "Dashbord", url: "/student-dashboard" }],
  },
  {
    title: "My Courses",
    url: "#",
    icon: "BookOpen",
    items: [
      {
        title: "Enrolled Courses ClassRooms",
        url: "/student-dashboard/courses",
      },
      {
        title: "View Assignments Submission",
        url: "/student-dashboard/assignments",
      },
    ],
  },
  {
    title: "Settings",
    url: "#",
    icon: "Settings",
    items: [{ title: "Profile", url: "/student-dashboard/profileview" }],
  },
];

// Get user info safely
let user = {
  firstname: "Guest",
  secondname: "",
  sub: "guest@example.com",
  role: "student",
};

const token = localStorage.getItem("token");
if (token) {
  try {
    const decoded = jwtDecode(token);
    user = decoded;
  } catch (error) {
    console.error("Invalid token:", error);
  }
}

const role = user.role?.toLowerCase() || "student";

// Initial state
const initialState = {
  user: {
    name: `${user.firstname} ${user.secondname}`,
    email: `${user.sub}`,
    avatar: "/avatars/shadcn.jpg",
    role: role,
  },
  teams: [
    {
      name: "Pro ClassRoom",
      plan: "Make future bright",
    },
    {
      name: "Live ClassRoom",
      plan: "",
    },
  ],
  navMain: role === "teacher" ? teacherNav : studentNav,
};

// Create the slice
const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    setUserRole: (state, action) => {
      state.user.role = action.payload.toLowerCase();
      state.navMain =
        action.payload.toLowerCase() === "teacher" ? teacherNav : studentNav;
    },
    initializeNav: (state) => {
      state.navMain = state.user.role === "teacher" ? teacherNav : studentNav;
    },
  },
});

// Export actions and reducer
export const { setUserRole, initializeNav } = sidebarSlice.actions;
export default sidebarSlice.reducer;
