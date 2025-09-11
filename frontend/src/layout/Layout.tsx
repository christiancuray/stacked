import { use, useState } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Home, User, FileText, Settings } from "lucide-react";
import { useOutlet, Link } from "react-router-dom";

interface LayoutProps {
  children?: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const outlet = useOutlet();

  const navigationItems = [
    { id: "home", name: "Home", icon: Home, href: "/" },
    { id: "posts", name: "Posts", icon: FileText, href: "/posts" },
    { id: "profile", name: "Profile", icon: User, href: "/profile" },
    { id: "settings", name: "Settings", icon: Settings, href: "/settings" },
  ];

  return (
    <SidebarProvider open={sidebarOpen} onOpenChange={setSidebarOpen}>
      {/* Sidebar */}
      <Sidebar className="border-r w-64">
        <SidebarHeader className="border-b px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              S
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">Stacked</span>
              <span className="truncate text-xs">App</span>
            </div>
          </div>
        </SidebarHeader>

        <SidebarContent className="px-0">
          <SidebarInset className="p-0">
            <SidebarGroup>
              <SidebarGroupLabel className="px-4 py-2 text-xs font-medium text-muted-foreground">
                Navigation
              </SidebarGroupLabel>
              <SidebarGroupContent className="px-2">
                <SidebarMenu>
                  {navigationItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <SidebarMenuItem key={item.id}>
                        <SidebarMenuButton
                          asChild
                          className="w-full justify-start"
                        >
                          <Link
                            key={item.href}
                            to={item.href}
                            className="flex items-center gap-3 w-full px-3 py-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
                          >
                            <Icon className="h-4 w-4" />
                            <span>{item.name}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarInset>
        </SidebarContent>

        <SidebarFooter className="border-t px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted">
              <User className="h-4 w-4" />
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">John Doe</span>
              <span className="truncate text-xs text-muted-foreground">
                john@example.com
              </span>
            </div>
          </div>
        </SidebarFooter>
      </Sidebar>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />

          <div className="flex-1"></div>

          <div className="flex space-x-4">
            <Button variant="outline">
              <User className="h-4 w-4 mr-2" />
              Profile
            </Button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4">{outlet ?? children}</main>
      </div>
    </SidebarProvider>
  );
}
