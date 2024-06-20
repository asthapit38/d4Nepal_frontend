import { Button } from "@/components/ui/button";
import { GridSmallBackground } from "@/components/ui/grid-small-background";
import Link from "next/link";

export default function Home() {
  return (
    <GridSmallBackground>
      <div className="w-full h-screen max-h-screen flex items-center justify-center flex-col gap-5">
        <h1 className="text-5xl font-bold flex flex-col items-center">
          <span>Beyond Numbers:</span>
          <span>See the Story Your Data Tells</span>
        </h1>
        <p className="text-muted-foreground max-w-lg text-center">
          We don't just analyze data, we bring it to life. Get stunning
          visualizations and actionable insights that tell a clear story,
          guiding your business towards success.
        </p>

        <Link href={"/login"}>
          <Button size={"lg"}>Sign In</Button>
        </Link>
      </div>
    </GridSmallBackground>
  );
}
