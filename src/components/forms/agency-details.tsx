// "use client";

// import { Agency } from "@prisma/client";
// import React, { useEffect } from "react";
// import { Toast } from "../ui/toast";
// import { useRouter } from "next/navigation";
// import { AlertDialog } from "../ui/alert-dialog";
// import { zodResolver } from "@hookform/resolvers/zod";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "../ui/card";
// import { Form, useForm } from "react-hook-form";
// import * as z from "zod";
// import { FormControl, FormField, FormItem, FormLabel } from "../ui/Form";

// type Props = {
//   data?: Partial<Agency>;
// };

// const FormSchema = {
//   name: z.string().min(2, { message: "Agency Name must be atleast 2 chars" }),
//   companyEmail: z.string().min(1),
//   companyPhone: z.string().min(1),
//   whiteLabel: z.boolean(),
//   address: z.string().min(1),
//   city: z.string().min(1),
//   zipCode: z.string().min(1),
//   state: z.string().min(1),
//   country: z.string().min(1),
//   agencyLogo: z.string().min(1), // Considering a reasonable length for URLs or text
// };

// const AgencyDetails = ({ data }: Props) => {
//   const toast = Toast;
//   const router = useRouter();
//   const [deleteingAgency, setDeleteingAgency] = React.useState(false);

//   const form = useForm<z.infer<typeof FormSchema>>({
//     mode: "onChange",
//     resolver: zodResolver(FormSchema),
//     defaultValues: {
//       name: data?.name,

//       companyEmail: data?.companyEmail,
//       companyPhone: data?.companyPhone,
//       whiteLabel: data?.whiteLabel || false,
//       address: data?.address,
//       city: data?.city,
//       zipCode: data?.zipCode,
//       state: data?.state,
//       country: data?.country,
//       agencyLogo: data?.agencyLogo,
//     },
//   });

//   const isLoading = form.formState.isSubmitting;

//   useEffect(() => {
//     if (data) {
//       form.reset(data);
//     }
//   }, [data]);

//   const handleSubmit = async () => {};

//   return (
//     <AlertDialog>
//       <Card>
//         <CardHeader>
//           <CardTitle>Agency Information</CardTitle>
//           <CardDescription>Lets create a agency for you.</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <Form {...form}>
//             <form
//               onSubmit={form.handleSubmit(handleSubmit)}
//               className="space-y-4"
//             >
//               <FormField
//                 disabled={isLoading}
//                 control={form.control}
//                 name="agencylogo"
//                 render={({field})=>(
//                     <FormItem>
//                         <FormLabel>
//                             Agency Logo
//                         </FormLabel>
//                         <FormControl> 
//                             <FileUpload></FileUpload>
//                         </FormControl>
//                     </FormItem>
//                 )
//               ></FormField>
//             </form>
//           </Form>
//         </CardContent>
//       </Card>
//     </AlertDialog>
//   );
// };

// export default AgencyDetails;
