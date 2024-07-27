"use client";
import { CircleCheck, Loader2, PlusIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetResume, useGetResumeList } from "./services/query";
import { useCreateResume } from "./services/mutatin";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import createResumeValidator from "@/validator/resume/createResume";
import { TbInvoice } from "react-icons/tb";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import Link from "next/link";

export default function ResumeScreen() {
  const resume = useGetResumeList();
  const createResume = useCreateResume();
  const queryClient = useQueryClient()
  const [stage, setStage] = useState(0);

  const form = useForm({
    resolver: zodResolver(createResumeValidator),
    defaultValues: {
      name: ""
    }
  })

  const onSubmit = async (value) => {
    createResume.mutate({
      title: value.name
    }, {
      onSuccess: (data) => {
        console.log(data);
        if (data.success) {
          queryClient.invalidateQueries("resume")
          setStage(1);
        }
      },
      onError: (error) => {
        if (!error.response.data.success) {
          form.setError("name", {
            message: error.response.data.data.error
          })
        }
      }
    })
  }

  return (
    <>
      <div className="add-resumes grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
        <Dialog>
          <DialogTrigger>
            <Card className="flex justify-between items-center flex-col py-10 h-full min-h-[350px]">
              <CardContent className="flex justify-center items-center h-full">
                <PlusIcon strokeWidth={1.5} size={42} />
              </CardContent>
              <CardFooter>
                <div>Add Resume</div>
              </CardFooter>
            </Card>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create a new resume</DialogTitle>
              <DialogDescription>
                Start building your resume by giving it a name.
              </DialogDescription>
            </DialogHeader>
            {stage === 0 &&
              <Form {...form}>
                <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
                  <FormField
                    name="name"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Resume name</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            id="name"
                            placeholder="enter name"
                            className="col-span-3" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                  <Button disabled={createResume.isPending} type="submit" className="flex gap-2 items-center">
                    {createResume.isPending && <Loader2 className="animate-spin" size={18} />}
                    Add resume
                  </Button>
                </form>
              </Form>}

            {stage === 1 && <div className="flex justify-center items-center flex-col gap-5 w-full py-10">
              <CircleCheck size={34} />
              <span>Your resume create successfully</span>
            </div>}
          </DialogContent>
        </Dialog>

        {resume.data?.data.map((item, index) => (
          <Link href={`/resume/${item._id}`} key={index}>
            <Card className="flex justify-between items-center flex-col py-10 h-full min-h-[350px]">
              <CardContent className="flex justify-center items-center h-full">
                <TbInvoice strokeWidth={1.5} size={42} />
              </CardContent>
              <CardFooter>
                <div>{item.title}</div>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </>
  );
}
