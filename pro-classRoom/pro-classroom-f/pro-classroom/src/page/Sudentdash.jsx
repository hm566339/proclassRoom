import CardDemo from "@/components/ui/Card1";
import { CardWithForm } from "@/components/ui/CardWithForm";
// import { ListofStudent } from "./ListofStudent";
export const Sudentdash = () => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left Side: CardWithForm */}
        <div>
          <CardWithForm />
        </div>

        {/* Right Side: CardDemo */}
        <div>
          <CardDemo />
        </div>

        {/* Full Width: ListofStudent */}
        {/* <div className="md:col-span-2">
          <ListofStudent />
        </div> */}
      </div>
    </>
  );
};
