"use client";

import { useRef } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ImageIcon } from "lucide-react";

import { createWorkspaceSchema } from "../schemas";

import { useCreateWorkspace } from "../api/use-create-workspace";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormMessage,
  FormLabel,
  FormItem,
} from "@/components/ui/form";
import { DottedSeperator } from "@/components/dotted-seperator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import MotionSubmitButton from "@/components/motion-submit-btn";

type CreateWorkspaceFormProps = {
  onCancel?: () => void;
};

type FormSchemaType = z.infer<typeof createWorkspaceSchema>;

// form contains data & image fields
export const CreateWorkspaceForm = ({ onCancel }: CreateWorkspaceFormProps) => {
  const { mutate: createWorkspace, isPending } = useCreateWorkspace();

  const inputRef = useRef<HTMLInputElement>(null);

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(createWorkspaceSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = (values: FormSchemaType) => {
    const finalValues = {
      ...values,
      image: values.image instanceof File ? values.image : "",
    };

    createWorkspace({ form: finalValues }, { onSuccess: () => form.reset() });
  };

  const handleImageChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const file = ev.target.files?.[0];
    if (file) {
      form.setValue("image", file);
    }
  };

  return (
    <Card className="w-full h-full border-none shadow-none">
      <CardHeader>
        <CardTitle className="text-xl font-bol">
          Create a new workspace
        </CardTitle>
      </CardHeader>
      <div className="px-7">
        <DottedSeperator />
      </div>
      <CardContent className="p-7">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Workspace name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter workspace name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <div className="flex flex-col gap-y-2">
                    <div className="flex items-center gap-x-5">
                      {field.value ? (
                        <div className="size-[72px] relative rounded-md overflow-hidden">
                          <Image
                            src={
                              field.value instanceof Blob
                                ? URL.createObjectURL(field.value)
                                : field.value
                            }
                            alt="logo"
                            className="object-cover"
                            fill
                          />
                        </div>
                      ) : (
                        <Avatar className="size-[72px]">
                          <AvatarFallback>
                            <ImageIcon className="size-[36px] text-neutral-400" />
                          </AvatarFallback>
                        </Avatar>
                      )}
                      <div className="flex flex-col">
                        <p className="text-sm">Workspace Icon</p>
                        <p className="text-sm text-muted-foreground"></p>
                        JPG, PNG, SVG or JPEG up to 1MB
                      </div>
                      <input
                        className="hidden"
                        type="file"
                        accept=".jpg, .png, .jpeg, .svg"
                        ref={inputRef}
                        disabled={isPending}
                        onChange={handleImageChange}
                      />
                      <Button
                        className="w-fit mt-2"
                        size="xs"
                        variant="teritary"
                        disabled={isPending}
                        type="button"
                        onClick={() => inputRef.current?.click()}
                      >
                        {!field.value ? "Upload Image" : "Change Image"}
                      </Button>
                    </div>
                  </div>
                )}
              />
              <DottedSeperator classname="py-7" />
            </div>
            <div className="flex items-center justify-between">
              <Button
                type="button"
                size="lg"
                variant="secondary"
                onClick={onCancel}
                disabled={isPending}
              >
                Cancel
              </Button>
              <MotionSubmitButton
                className="w-48"
                size="lg"
                disabled={isPending}
              >
                <span>Create workspace</span>
              </MotionSubmitButton>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
