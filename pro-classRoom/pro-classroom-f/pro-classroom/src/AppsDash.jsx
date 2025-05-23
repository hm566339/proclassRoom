// import {
//   createBrowserRouter,
//   RouterProvider,
//   Navigate,
// } from "react-router-dom";
// import { Dashbord1 } from "./page/DashBord1";
// import Teacherdashbordlay from "./components/layout/Teacherdashbordlay";
// import { Profileview } from "./page/Profileview";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Navigate to="/Teacherdashbordlay" replace />,
//   },
//   {
//     path: "/Teacherdashbordlay",
//     element: <Teacherdashbordlay />,
//     children: [
//       {
//         index: true,
//         element: <Dashbord1 />,
//       },
//       {
//         path: "/Profileview",
//         element: <Profileview />,
//       },
//     ],
//   },
// ]);

// const AppsDash = () => {
//   return <RouterProvider router={router} />;
// };

// export default AppsDash;

import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { Dashbord1 } from "./page/DashBord1";
import Teacherdashbordlay from "./components/layout/Teacherdashbordlay";
import { Profileview } from "./page/Profileview";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/Teacherdashbordlay" replace />,
  },
  {
    path: "/Teacherdashbordlay",
    element: <Teacherdashbordlay />,
    children: [
      {
        index: true, // ✅ Default child when visiting "/Teacherdashbordlay"
        element: <Dashbord1 />,
      },
      {
        path: "profileview", // ✅ Corrected relative path ("/Teacherdashbordlay/profileview")
        element: <Profileview />,
      },
    ],
  },
]);

const AppsDash = () => {
  return <RouterProvider router={router} />;
};

export default AppsDash;
