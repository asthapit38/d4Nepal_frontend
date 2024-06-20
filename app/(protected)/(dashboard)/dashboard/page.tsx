import { Header } from "@/components/ui/header";
import { DollarSign } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import { SalesChart } from "./_components/sales-chart";
import { SalesVsExpensesChart } from "./_components/sales-vs-expenses-chart";
import { getUserSubcription } from "@/actions/subscriptions-action";
import { getBusiness, getBusinessStats } from "@/actions/business-action";
import { redirect } from "next/navigation";

export default async function Page() {
  const [userSubscription, userBusiness] = await Promise.all([
    getUserSubcription(),
    getBusiness(),
  ]);

  if (!userSubscription) {
    redirect("/subscription");
  }

  if (!userBusiness) {
    redirect("/setup/business");
  }

  const stats = await getBusinessStats(userBusiness[0].id);

  return (
    <>
      <Header title="Dashboard" />
      <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-5">
        {stats["kpi"].map(
          (kpi: { name: string; value: number }, index: number) => (
            <KpiCard
              key={index}
              title={kpi.name}
              value={kpi.value}
              icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
            />
          )
        )}
      </div>
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-5 ">
        {Array.from({
          length: userSubscription[0].plan_details.visual_graph,
        }).map((_, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>Total Sales</CardTitle>
            </CardHeader>
            <CardContent>
              {Number((index + 1) % 2 === 0) ? (
                <SalesChart />
              ) : (
                <SalesVsExpensesChart />
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}

type KpiCardProps = {
  title: string;
  value: number;
  icon: React.ReactNode;
};

const KpiCard = ({ title, value, icon }: KpiCardProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">${value}</div>
      </CardContent>
    </Card>
  );
};
