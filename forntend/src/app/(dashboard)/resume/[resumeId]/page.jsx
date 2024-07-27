"use client";
import { Input } from "@/components/ui/input";
import { FiPlus, FiTrash } from "react-icons/fi";

import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Loader2, PlusIcon } from "lucide-react";
import { useContext, useState } from "react";
import TextEditor from "@/components/custom/textEditor";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import basicInfo from "@/validator/resume/basicInfo";
import { zodResolver } from "@hookform/resolvers/zod";
import { BasicCustomField } from "./components/basicCostomField";
import { ResumeContext } from "./context/useResumeContext";
import Skills from "./components/skills";
import Education from "./components/education";
import Experience from "./components/experience";
import Projects from "./components/projects";
import { Button } from "@/components/ui/button";
import { useUpdateResume } from "../services/mutatin";
import { usePathname } from "next/navigation";

export default function DashboardScreen({ params }) {
    const updateResume = useUpdateResume()
    const [fields, setFields] = useState([
        { id: Date.now(), name: "", value: "" },
    ]);

    const { resume, setResume, getResumeData } = useContext(ResumeContext);

    const handleAddField = () => {
        setFields([...fields, { id: Date.now(), name: "", value: "" }]);
    };

    const handleRemoveField = (id) => {
        setFields(fields.filter((field) => field.id !== id));
    };

    const handleChange = (id, event) => {
        const { name, value } = event.target;
        setFields(
            fields.map((field) =>
                field.id === id ? { ...field, [name]: value } : field
            )
        );
    };

    const onSubmit = () => {
        updateResume.mutate({
            data: resume,
            resumeId: params.resumeId
        }, {
            onSuccess: (data) => {
                console.log(data);
            },
            onError: (error) => {
                console.log(error);
            }
        })
    }

    const form = useForm({
        defaultValues: {
            name: "",
            email: "",
            headLine: "",
            website: "",
            phone: "",
            location: "",
            summary: "",
            custom: []
        }
    })

    if (getResumeData.isPending) {
        return <div>Loading...</div>
    }

    return (
        <div className=" border-r-2 border-solid h-screen overflow-y-auto bg-white w-full p-6 shadow-lg">
            <Form {...form}>
                <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                        name="name"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        {...field}
                                        value={resume?.basic?.name}
                                        onChange={(e) => setResume({ ...resume, basic: { ...resume?.basic, name: e.target.value } })}
                                        placeholder="Full name" />
                                </FormControl>
                            </FormItem>)} />
                    <FormField
                        name="headline"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        {...field}
                                        value={resume?.basic?.headline}
                                        onChange={(e) => setResume({ ...resume, basic: { ...resume?.basic, headline: e.target.value } })}
                                        placeholder="Headline" />
                                </FormControl>
                            </FormItem>)} />
                    <div className="grid grid-cols-2 gap-4">
                        <FormField
                            name="website"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            value={resume?.basic?.website}
                                            onChange={(e) => setResume({ ...resume, basic: { ...resume?.basic, website: e.target.value } })}
                                            placeholder="website" />
                                    </FormControl>
                                </FormItem>)} />
                        <FormField
                            name="email"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            value={resume?.basic?.email}
                                            onChange={(e) => setResume({ ...resume, basic: { ...resume?.basic, email: e.target.value } })}
                                            placeholder="email" />
                                    </FormControl>
                                </FormItem>)} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <FormField
                            name="phone"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            value={resume?.basic?.phone}
                                            onChange={(e) => setResume({ ...resume, basic: { ...resume?.basic, phone: e.target.value } })}
                                            placeholder="Phone number" />
                                    </FormControl>
                                </FormItem>)} />
                        <FormField
                            name="location"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            value={resume?.basic?.location}
                                            onChange={(e) => setResume({ ...resume, basic: { ...resume?.basic, location: e.target.value } })}
                                            placeholder="Location" />
                                    </FormControl>
                                </FormItem>)} />
                    </div>

                    <FormField
                        name="custom"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <BasicCustomField {...form} {...field} />
                                </FormControl>
                            </FormItem>)} />
                    <Skills />
                    <Education />
                    <Experience />
                    <Projects />
                </form>
                <Button disabled={updateResume.isPending} onClick={onSubmit} className="flex justify-center items-center gap-3">
                    {updateResume.isPending &&
                        <Loader2 className="animate-spin" size={18} />}
                    save
                </Button>
            </Form>
        </div>
    );
}
