"use client";

import React from "react";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

// form
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
   Card,
   CardContent,
   CardHeader,
   CardTitle,
   CardDescription,
} from "@/components/ui/card";
import { DottedSeperator } from "@/components/dotted-seperator";
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
   name: z.string().trim().min(1, "required").max(32),
   email: z.string().email().max(256),
   password: z.string().min(8).max(256, "Maximum 256 character"),
});

export const SignUpCard = () => {
   const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
         email: "",
         password: "",
         name: "",
      },
   });
   function onSubmit(values: z.infer<typeof formSchema>) {
      console.log(values);
   }

   return (
      <Card className="w-full h-full md:w-[487px] border-none shadow-none">
         <CardHeader className="flex items-center justify-center text-center p-7">
            <CardTitle className="text-2xl">Sign up</CardTitle>
            <CardDescription>
               By signing up, you agree to our{" "}
               <Link className="text-blue-700" href={"/privacy"}>
                  Privacy Policy
               </Link>{" "}
               and{" "}
               <Link className="text-blue-700" href={"/terms"}>
                  Terms Of Service
               </Link>
            </CardDescription>
         </CardHeader>
         <div className="px-7">
            <DottedSeperator color="#4545d8" />
         </div>
         <CardContent className="p-7">
            <Form {...form}>
               <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
               >
                  <FormField
                     name={"name"}
                     control={form.control}
                     render={({ field }) => (
                        <FormItem>
                           <FormControl>
                              <Input
                                 type="text"
                                 placeholder="Enter your name"
                                 {...field}
                              />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
                  <FormField
                     name={"email"}
                     control={form.control}
                     render={({ field }) => (
                        <FormItem>
                           <FormControl>
                              <Input
                                 type="email"
                                 placeholder="Enter email address"
                                 {...field}
                              />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
                  <FormField
                     name={"password"}
                     control={form.control}
                     render={({ field }) => (
                        <FormItem>
                           <FormControl>
                              <Input
                                 type="password"
                                 placeholder="Enter password"
                                 {...field}
                              />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />

                  <Button type="submit" size={"lg"} className="w-full">
                     Sign Up
                  </Button>
               </form>
            </Form>
         </CardContent>

         <div className="px-7">
            <DottedSeperator />
         </div>
         <CardContent className="p-7 flex flex-col gap-y-4">
            <Button variant={"secondary"} size={"lg"} className="w-full">
               <FcGoogle className="mr-2 size-5" />
               Login with Google
            </Button>
            <Button variant={"secondary"} size={"lg"} className="w-full">
               <FaGithub className="mr-2 size-5" />
               Login with github
            </Button>
         </CardContent>
         <div className="px-7">
            <DottedSeperator />
         </div>
         <CardContent className="flex items-center justify-center p-7">
            <p>
               Already have an account?
               <Link href="/sign-in" className="text-blue-700">
                  &nbsp;Sign In
               </Link>
            </p>
         </CardContent>
      </Card>
   );
};
