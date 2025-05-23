import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { CardWithForm } from "@/components/ui/CardWithForm";
import { Separator } from "@/components/ui/separator";
import { Component } from "@/components/ui/Component";
import CardDemo from "@/components/ui/Card1";
import InteractiveBarChart from "@/components/ui/InteractiveLineChart";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Profileview } from "@/page/profileview";
import { useState } from "react";

export const StudentDash = () => {
  const [showProfile, setShowProfile] = useState(false);

  const openFullProfile = () => {
    setShowProfile(true);
  };
  const Backpackdash = () => {
    setShowProfile(false);
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">Pro ClassRoom</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Assignment</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          {showProfile ? (
            <Profileview Backpackdash={Backpackdash} />
          ) : (
            <div className="grid auto-rows-min gap-4 md:grid-cols-3">
              <CardWithForm className="aspect-video rounded-xl bg-muted/50" />
              <Component />
              <CardDemo openFullProfile={openFullProfile} />
            </div>
          )}
          {!showProfile && <InteractiveBarChart />}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};
