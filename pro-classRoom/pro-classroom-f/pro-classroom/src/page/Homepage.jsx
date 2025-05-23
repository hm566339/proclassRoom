import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";

export const Homepage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const stutdentonClick = () => {
    dispatch(addHome("student"));
    navigate("/");
  };

  const features = [
    {
      icon: "💻",
      title: "For Teachers",
      description: "Create and manage courses with ease.",
    },
    {
      icon: "👥",
      title: "For Students",
      description: "Access your courses and collaborate.",
    },
    {
      icon: "🌐",
      title: "Learn Anywhere",
      description: "Study from any device, anytime.",
    },
  ];

  return (
    <>
      <main>
        <div className="text-center">
          <h1 className="text-4xl font-bold text-black mb-4">
            Welcome to Pro Classroom
          </h1>
          <p>
            A platform for students and teachers to connect, learn, and grow.
          </p>
          <div>
            <Button className="m-2">
              <NavLink to="/StudentLogin">Login as Student</NavLink>
            </Button>
            <Button className="m-2">
              <NavLink to="/TeacherLogin">Login as Teacher</NavLink>
            </Button>
          </div>
        </div>
        <div className="text-center">
          <h1 className="text-2xl font-bold text-black mb-4">Why Choose Us?</h1>
          <div className="flex items-center justify-center">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 p-8">
              {features.map((feature, index) => (
                <Card key={index} className="rounded-2xl shadow-lg">
                  <CardHeader>
                    <div className="text-5xl mb-4">{feature.icon}</div>
                    <CardTitle className="text-2xl font-bold">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
