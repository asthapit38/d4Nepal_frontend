import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BusinessSetupForm } from "../_components/business-setup-form";
import { getBusiness } from "@/actions/business-action";
import { redirect } from "next/navigation";

const BusinessPage = async () => {
  const userBusiness = await getBusiness();
  if (userBusiness.length > 0) {
    redirect("/dashboard");
  }
  return (
    <div className="w-full h-screen max-h-screen flex flex-col items-center justify-center p-6">
      <Card className="lg:max-w-screen-sm w-full">
        <CardHeader>
          <CardTitle>Business Setup</CardTitle>
          <CardDescription>
            Provide basic information about your business
          </CardDescription>
        </CardHeader>
        <CardContent>
          <BusinessSetupForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default BusinessPage;
