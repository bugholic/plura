import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { pricingCards } from "@/lib/constants";
import clsx from "clsx";
import { Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  return (
    <>
      <section className="h-full w-full pt-36 relative flex items-center justify-center flex-col">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#161616,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
        <p className="md:mt-[300px] font-bold text-center">
          Run your agency, in one place
        </p>
        <div className="bg-gradient-to-r from-blue-700 to-secondary-foreground text-transparent bg-clip-text ">
          <h1 className="text-9xl font-bold text-center md:text-[300px]">
            Plura
          </h1>
        </div>
        <div className="flex justify-center items-center relative md:mt-[-50px]">
          <Image
            src={"/assets/preview.png"}
            alt="banner img"
            height={1200}
            width={1200}
            className="rounded-tl-2xl rounded-tr-2xl border-2 border-muted"
          />
          <div className="bottom-0 top-[50%] bg-gradient-to-t dark:from-background left-0 right-0 absolute z-10"></div>
        </div>
      </section>
      <section className="flex justify-center flex-col gap-4 items-center mt-[-60px] md:mt-96 ">
        <h2 className="text-4xl text-center">Choose what fits you right</h2>
        <p className="text-white text-center text-sm">
          Our straight pricing plans are tailored to meet your needs. If{" "}
          {"you're"} not <br /> ready to commit you can get started for free.
        </p>
        <div className="flex  gap-4 flex-wrap justify-center mt-6">
          {pricingCards.map((card:any) => (
            // WIP: Wire up free product from  stripe
            <Card
              key={card.title}
              className={clsx("w-[300px]  flex flex-col justify-between", {
                "border-2  border-primary": card.title === "Unlimited SaaS",
              })}
            >
              <CardHeader>
                <CardTitle
                  className={clsx("", {
                    "text-muted-primary": card.title !== "Unlimited SaaS",
                  })}
                >
                  {card.title}
                </CardTitle>
                <CardDescription>{card.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <span className="text-4xl font-bold">{card.price}</span>
                <span className="text-muted-foreground">/m</span>
              </CardContent>
              <CardFooter className="flex flex-col items-start gap-4 ">
                <div>
                  {card.features.map((feature:any) => (
                    <div key={feature} className="flex gap-2 items-center">
                      <Check /> <p>{feature}</p>{" "}
                    </div>
                  ))}
                </div>
                <Link
                  href={`/agency?plan=${card.priceId}`}
                  className={clsx(
                    "w-full text-center bg-gray-300 text-black p-2 rounded-md",
                    { "!bg-blue-600 text-white/70": card.title === "Unlimited SaaS" }
                  )}
                >
                  Get Started
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
}
