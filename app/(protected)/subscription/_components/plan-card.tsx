"use client";
import { subscribe } from "@/actions/subscriptions-action";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Plan, Subscription } from "@/lib/types";
import { useMutation } from "@tanstack/react-query";
import { addMonths } from "date-fns";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { toast } from "sonner";

export const PlanCard = ({ plan }: { plan: Plan }) => {
  const router = useRouter();
  const { mutate, isPending } = useMutation({
    mutationFn: subscribe,
    onSuccess: async (data: Subscription) => {
      toast.success(`You are now subscribed to ${data.plan_details.name}`, {
        id: "subscription-success",
      });
      router.push("/setup/business");
    },
    onError: (error: Error) => {
      console.log({ error });
      toast.error(`Something went wrong`, {
        id: "subscription-success",
      });
    },
  });

  const handleSubscription = useCallback(() => {
    toast.loading("Subscribing...", {
      id: "subscription-success",
    });
    mutate({
      plan_id: plan.id,
      start_date: new Date().toISOString(),
      end_date: addMonths(new Date(), 1).toISOString(),
      status: "active",
    });
  }, [mutate, plan.id]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-bold uppercase tracking-wider">
          {plan.name}
        </CardTitle>
        <CardTitle>
          <span className="text-3xl font-bold">${plan.price}</span>
          <span className="text-muted-foreground text-sm">/mo</span>
        </CardTitle>
        <CardDescription className="text-muted-foreground text-sm">
          Select the basic subscription plan to get started
        </CardDescription>
      </CardHeader>
      <CardContent>
        <h6 className="text-secondary-foreground font-medium mb-3">
          Includes:
        </h6>
        <ul className="text-muted-foreground text-sm space-y-3 grow">
          <li className="flex items-center">
            <svg
              className="w-3 h-3 fill-emerald-500 mr-3 shrink-0"
              viewBox="0 0 12 12"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
            </svg>
            <span>
              {plan.business_per_account
                ? plan.business_per_account + " Business Per Account"
                : "Unlimited Business Per Account"}
            </span>
          </li>
          <li className="flex items-center">
            <svg
              className="w-3 h-3 fill-emerald-500 mr-3 shrink-0"
              viewBox="0 0 12 12"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
            </svg>
            <span>{plan.kpi} Key Performance Indicator</span>
          </li>
          <li className="flex items-center">
            <svg
              className="w-3 h-3 fill-emerald-500 mr-3 shrink-0"
              viewBox="0 0 12 12"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
            </svg>
            <span>{plan.visual_graph} Visual Graph</span>
          </li>
        </ul>
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleSubscription}
          className="w-full disabled:cursor-not-allowed"
          disabled={isPending}
          variant={
            plan.name.toLocaleLowerCase() == "standard" ? "default" : "outline"
          }
        >
          Purchase Plan
        </Button>
      </CardFooter>
    </Card>
  );
};
