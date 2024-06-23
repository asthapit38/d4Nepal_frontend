import Link from "next/link";
import { Bell, Menu, Search, BarChartBigIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { UserNavigation } from "@/components/user-navigation";
import {
  DesktopNavigation,
  MobileNavigation,
} from "@/components/main-navigation";
import { UpgradeCard } from "../_components/upgrade-card";
import { ThemeToggler } from "@/components/ui/theme-toggler";
import { getUserSubcription } from "@/actions/subscriptions-action";
import { redirect } from "next/navigation";
import { getBusiness } from "@/actions/business-action";

type LayoutProps = {
  children: React.ReactNode;
};

const ProtectedLayout = async ({ children }: LayoutProps) => {
  const userSubscription = await getUserSubcription();
  const userBusiness = await getBusiness();

  if (userSubscription.length === 0) {
    redirect("/subscription");
  }

  if (userBusiness.length === 0) {
    redirect("/setup/business");
  }

  return (
    <div className="grid min-h-screen max-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] overflow-hidden">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <BarChartBigIcon className="h-6 w-6" />
              <span className="">D4 Data</span>
            </Link>
            <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
              <Bell className="h-4 w-4" />
              <span className="sr-only">Toggle notifications</span>
            </Button>
          </div>
          <div className="flex-1">
            <DesktopNavigation />
          </div>
          <UpgradeCard className="p-4" />
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <MobileNavigation />
              <UpgradeCard />
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1">
            <form>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                />
              </div>
            </form>
          </div>
          <ThemeToggler />
          <UserNavigation />
        </header>
        <main>
          <div className="h-[calc(100vh-60px)] overflow-y-scroll space-y-6 flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProtectedLayout;
