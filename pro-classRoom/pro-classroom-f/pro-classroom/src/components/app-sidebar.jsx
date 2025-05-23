import * as React from "react";
import { useSelector } from "react-redux";
import * as Icons from "lucide-react"; // Import all Lucide icons
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";

export function AppSidebar({ ...props }) {
  const sidebarData = useSelector((state) => state.sidebar);

  const getIconComponent = (iconName) => {
    return Icons[iconName] || Icons.HelpCircle;
  };

  const navItemsWithIcons =
    sidebarData?.navMain?.map((item) => ({
      ...item,
      icon: getIconComponent(item.icon),
      items: item.items?.map((subItem) => ({
        ...subItem,
        icon: getIconComponent(subItem.icon),
      })),
    })) || [];

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={sidebarData?.teams || []} />
      </SidebarHeader>
      <SidebarContent>
        {/* Pass updated nav items with actual icon components */}
        <NavMain items={navItemsWithIcons} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={sidebarData?.user || null} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
