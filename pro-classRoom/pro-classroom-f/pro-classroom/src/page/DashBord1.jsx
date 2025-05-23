import { CardWithForm } from "@/components/ui/CardWithForm";
import { Component } from "@/components/ui/Component";
import InteractiveBarChart from "@/components/ui/InteractiveLineChart";
import CardDemo from "@/components/ui/Card1";

export const Dashbord1 = () => {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <CardWithForm className="aspect-video rounded-xl bg-muted/50" />
        <Component />
        <CardDemo />
      </div>
      <InteractiveBarChart />
    </div>
  );
};
