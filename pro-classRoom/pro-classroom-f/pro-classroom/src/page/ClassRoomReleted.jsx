import { Addclassroom } from "@/components/Addclassroom";
import { Announcements } from "@/components/Announcements";
import { GradingCategoriesPage } from "@/components/GradingCategoriesPage";

export const ClassRoomReleted = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-x-auto">
      <Addclassroom />
      <Announcements />
      <GradingCategoriesPage />
    </div>
  );
};
