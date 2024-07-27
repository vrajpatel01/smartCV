import { DialogContent, DialogTrigger, Dialog, DialogHeader } from "@/components/ui/dialog";
import { PlusIcon, X } from "lucide-react";
import { useContext, useState } from "react";
import { ResumeContext } from "../context/useResumeContext";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";

export default function Experience() {
    const { resume, setResume } = useContext(ResumeContext)
    const [experience, setExperience] = useState({});


    const handleAddEducation = () => {
        setResume({ ...resume, experience: [...resume?.experience || [], experience] });
        setExperience({});
    }

    const handleFieldUpdate = (e, index) => {
        const { id, value } = e.target;
        resume.experience[index][id] = value;
        setResume({ ...resume, experience: resume.experience });
    }

    return (
        <div>
            <div className="space-y-3">
                <h1>Work Experience</h1>
            </div>
            <Dialog>
                <DialogTrigger>
                    <div className="flex justify-start items-center gap-2 cursor-pointer">
                        <PlusIcon size={18} />
                        <span className="text-sm">Add an Education</span>
                    </div>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            Add work Experience
                        </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-5">
                        <Input
                            id="title"
                            placeholder="Title"
                            value={experience.title}
                            onChange={(e) => setExperience({ ...experience, title: e.target.value })} />
                        <Input
                            id="company"
                            placeholder="Company"
                            value={experience.company}
                            onChange={(e) => setExperience({ ...experience, company: e.target.value })} />
                        <Input
                            id="location"
                            placeholder="Location"
                            value={experience.location}
                            onChange={(e) => setExperience({ ...experience, location: e.target.value })} />
                        <Input
                            placeholder="Date or Date range"
                            value={experience.date}
                            onChange={(e) => setExperience({ ...experience, date: e.target.value })} />
                        <Textarea id="summary" row={10} value={experience.summary} onChange={(e) => setExperience({ ...experience, summary: e.target.value })} />
                        <Button onClick={handleAddEducation}>
                            Add
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>

            <div className="divide-y-[1px]">
                {resume?.experience?.map((experience, index) => {
                    return (
                        <div key={index} className="space-y-2 py-2">
                            <div className="w-full flex justify-end items-center">
                                <Button><X onClick={() => {
                                    const newExperience = resume.experience.filter((_, i) => i !== index);
                                    setResume({ ...resume, experience: newExperience });
                                }} /></Button>
                            </div>
                            <Input id="title" onChange={(e) => handleFieldUpdate(e, index)} value={experience.title} />
                            <Input id="company" onChange={(e) => handleFieldUpdate(e, index)} value={experience.company} />
                            <Input id="location" onChange={(e) => handleFieldUpdate(e, index)} value={experience.location} />
                            <Input id="date" onChange={(e) => handleFieldUpdate(e, index)} value={experience.date} />
                            <Textarea id="summary" onChange={(e) => handleFieldUpdate(e, index)} value={experience.summary} />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}