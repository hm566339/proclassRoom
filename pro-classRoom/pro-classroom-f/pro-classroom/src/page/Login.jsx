import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginUser } from "@/redux/authSlice";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [localError, setLocalError] = useState("");

  const { loading, error } = useSelector((state) => state.auth);

  const role = location.pathname.includes("TeacherLogin")
    ? "teacher"
    : "student";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError("");

    const result = await dispatch(loginUser({ email, password }));

    if (result.meta.requestStatus === "fulfilled") {
      const { userId, role: userRole } = result.payload || {};

      // localStorage.setItem("userId", userId);

      if (!userRole) {
        setLocalError("Invalid user data received.");
        return;
      }

      if (userRole.toLowerCase() === role) {
        navigate(
          userRole.toLowerCase() === "teacher"
            ? "/teacher-dashboard"
            : "/student-dashboard"
        );
        // console.log(userRole.toLowerCase());
      } else {
        setLocalError("You are not authorized to access this role.");
      }
    } else {
      setLocalError("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>
            {role === "teacher" ? "Teacher Login" : "Student Login"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  placeholder="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            {error && <p className="text-red-500 mt-2">{error}</p>}
            {localError && <p className="text-red-500 mt-2">{localError}</p>}
            <CardFooter className="flex justify-between mt-4">
              <Button type="submit" disabled={loading}>
                {loading ? "Logging in..." : "Submit"}
              </Button>
              <Button variant="outline" onClick={() => navigate("/")}>
                Back Home
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
