import { EnrollAndClass } from "./EnrollandClass";
import { EnrollClassdetail } from "./EnrollClassdetail";

export const StudentClass = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full md:w-2/3 lg:w-1/2 mb-8">
        <EnrollAndClass />
      </div>
      <div className="w-full ">
        <EnrollClassdetail />
      </div>
    </div>
  );
};
