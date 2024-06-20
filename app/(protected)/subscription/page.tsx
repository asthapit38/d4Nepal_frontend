import { getPlans } from "@/actions/plan-action";
import { Plan } from "@/lib/types";
import { PlanCard } from "./_components/plan-card";
import { getUserSubcription } from "@/actions/subscriptions-action";
import { redirect } from "next/navigation";

const Page = async () => {
  const subscription = await getUserSubcription();
  if (subscription.length > 0) {
    redirect("/dashboard");
  }
  const plans = await getPlans();
  return (
    <div className="container">
      <div className="flex lg:h-screen w-full items-center justify-center flex-col my-6 lg:my-0">
        <div className="grid grid-cols-12 gap-5">
          <div className="col-span-12">
            <p className="text-3xl font-bold">Choose your plan</p>
          </div>
          {plans &&
            plans.map((plan: Plan) => {
              return (
                <div className="lg:col-span-4 col-span-12" key={plan.id}>
                  <PlanCard plan={plan} />
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Page;
