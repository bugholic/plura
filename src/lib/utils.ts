// export const pricingCards = [
//     {
//       title: "Starter",
//       description: "Perfect for trying out Plura",
//       price: "Free",
//       duration: "Lifetime",
//       highlight: "Key features",
//       features: ["3 Sub accounts", "2 Team members", "Unlimited pipelines"],
//       priceId: "price_001",
//     },
//     {
//       title: "Unlimited SaaS",
//       description: "The ultimate agency kit",
//       price: "$199",
//       duration: "month",
//       highlight: "Key features",
//       features: ["Rebilling", "24/7 Support team"],
//       priceId: "price_1Qt6SPFS84je4SgVWX8rcFTO",
//     },
//     {
//       title: "Basic",
//       description: "For serious agency owners",
//       price: "$49",
//       duration: "month",
//       highlight: "Everything in Starter, plus",
//       features: ["Unlimited Sub accounts", "Unlimited Team members"],
//       priceId: "price_1Qt6R2FS84je4SgVq2Wt15bF",
//     }
//   ];
  
  import { clsx, type ClassValue } from "clsx"
  import { twMerge } from "tailwind-merge"
  
  export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
  }
  