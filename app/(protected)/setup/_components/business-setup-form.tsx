"use client";
import React, { useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BusinessSchema, BusinessSchemaType } from "@/lib/schema";
import { createBusiness } from "@/actions/business-action";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { fetchBusinessType } from "@/actions/business-type";
import {
  BusinessType,
  BusinessTypeWithKpi,
  Kpi,
  Subscription,
} from "@/lib/types";
import { ButtonSkeleton, FormInputSkeleton } from "@/components/from-skeleton";
import { getUserSubcription } from "@/actions/subscriptions-action";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const BusinessSetupForm = () => {
  const [kpis, setKpis] = React.useState<any[]>([]);
  const [selectedKpi, setSelectedKpi] = React.useState<Kpi[]>([]);

  const form = useForm<BusinessSchemaType>({
    resolver: zodResolver(BusinessSchema),
    defaultValues: {
      name: "",
      businessType: "",
    },
  });

  const { data: userSubscription } = useQuery<Subscription[]>({
    queryFn: async () => {
      return await getUserSubcription();
    },
    queryKey: ["userSubscription"],
  });

  const { data: businessType, isLoading } = useQuery<BusinessTypeWithKpi[]>({
    queryFn: async () => {
      return await fetchBusinessType();
    },
    queryKey: ["businessType"],
  });

  const { mutate, isPending } = useMutation({
    mutationFn: createBusiness,
    onSuccess: () => {
      toast.success("Business created", {
        id: "business-success",
      });
    },
    onError: (error) => {
      console.log({ error });
      toast.error("Something went wrong", {
        id: "business-success",
      });
    },
  });

  const onSubmit = React.useCallback(
    async (data: BusinessSchemaType) => {
      if (selectedKpi.length > 0) {
        toast.loading("Creating business...", {
          id: "business-success",
        });
        mutate({
          data: data,
          kpi: selectedKpi,
        });
      } else {
        toast.warning("Please select at least one KPI", {
          id: "business-success",
        });
      }
    },
    [mutate, selectedKpi]
  );

  const handleChange = (value: string) => {
    setSelectedKpi([]);
    const result = businessType?.find(
      (businessType) => Number(businessType.id) === Number(value)
    );
    if (result && result.kpi) {
      setKpis(result.kpi);
    }
    form.setValue("businessType", value);
  };

  const handleUserKpiSelection = (value: string) => {
    if (userSubscription) {
      if (selectedKpi.length >= userSubscription[0].plan_details.kpi) {
        toast.warning("More selection of KPI is not allowed for you plan.");
        return;
      } else {
        setSelectedKpi([...selectedKpi, kpis.find((kpi) => kpi.id === value)]);
      }
    }
  };

  const removeUserKpiSelection = (value: string) => {
    const updatedLists = selectedKpi.filter((kpi) => kpi.id !== value);
    setSelectedKpi(updatedLists);
  };

  return (
    <>
      {isLoading ? (
        <div className="flex flex-col gap-2">
          <FormInputSkeleton />
          <FormInputSkeleton />
          <ButtonSkeleton />
        </div>
      ) : (
        <>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className={cn("grid gap-4")}
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Business Name</FormLabel>
                    <FormControl>
                      <Input placeholder="ABC Corporation" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your business name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="businessType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Business Type</FormLabel>
                    <Select
                      onValueChange={handleChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select the type of business" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {businessType &&
                          businessType.map((businessType: BusinessType) => (
                            <SelectItem
                              key={businessType.id}
                              value={businessType.id.toLocaleString()}
                            >
                              {businessType.name}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Select the type of business you are running. This will
                      help us us to generate the relevant data for your
                      business.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {kpis.length > 0 && (
                <>
                  <Card>
                    <CardHeader>
                      <CardTitle>Key Performance Index(KPI) </CardTitle>
                      <CardDescription>
                        write something about the kpi which can be understood by
                        the layman.
                      </CardDescription>
                      <CardContent className="flex flex-wrap gap-2 p-0 mt-3">
                        {kpis.map((kpi: any) => (
                          <Button
                            type="button"
                            onClick={() => handleUserKpiSelection(kpi.id)}
                            disabled={selectedKpi.includes(kpi)}
                            key={kpi.id}
                          >
                            {kpi.name}
                          </Button>
                        ))}
                      </CardContent>
                    </CardHeader>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Your selection </CardTitle>
                      <CardContent className="flex flex-wrap gap-2 p-0 mt-3">
                        {selectedKpi.length > 0 ? (
                          selectedKpi.map((selected: Kpi) => (
                            <Button
                              type="button"
                              key={selected.id}
                              onClick={() =>
                                removeUserKpiSelection(selected.id)
                              }
                            >
                              {selected.name}
                            </Button>
                          ))
                        ) : (
                          <p className="my-4 text-sm text-muted-foreground">
                            {`You haven't selected any KPIs.`}
                          </p>
                        )}
                      </CardContent>
                    </CardHeader>
                  </Card>
                </>
              )}
              <Button
                type="submit"
                className="w-full disabled:cursor-not-allowed"
                disabled={isPending}
              >
                Complete Setup
              </Button>
            </form>
          </Form>
        </>
      )}
    </>
  );
};
