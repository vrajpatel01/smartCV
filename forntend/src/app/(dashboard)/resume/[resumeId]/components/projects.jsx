import { DialogContent, DialogTrigger, Dialog, DialogHeader } from "@/components/ui/dialog";
import { PlusIcon, X } from "lucide-react";
import { useContext, useState } from "react";
import { ResumeContext } from "../context/useResumeContext";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";

export default function Projects() {
    const { resume, setResume } = useContext(ResumeContext)
    const [projects, setProjects] = useState({});


    const handleAddEducation = () => {
        setResume({ ...resume, projects: [...resume?.projects || [], projects] });
        setProjects({});
    }

    const handleFieldUpdate = (e, index) => {
        const { id, value } = e.target;
        resume.projects[index][id] = value;
        setResume({ ...resume, projects: resume.projects });
    }

    return (
        <div>
            <div className="space-y-3">
                <h1>Projects</h1>
            </div>
            <Dialog>
                <DialogTrigger>
                    <div className="flex justify-start items-center gap-2 cursor-pointer">
                        <PlusIcon size={18} />
                        <span className="text-sm">Add Projects</span>
                    </div>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            Add Project
                        </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-5">
                        <Input
                            id="title"
                            placeholder="Title"
                            value={projects.title}
                            onChange={(e) => setProjects({ ...projects, title: e.target.value })} />
                        <Input
                            placeholder="Completion Date"
                            value={projects.date}
                            onChange={(e) => setProjects({ ...projects, date: e.target.value })} />
                        <Textarea id="summary" row={10} value={projects.summary} onChange={(e) => setProjects({ ...projects, summary: e.target.value })} />
                        <Button onClick={handleAddEducation}>
                            Add
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>

            <div className="divide-y-[1px]">
                {resume?.projects?.map((projects, index) => {
                    return (
                        <div key={index} className="space-y-2 py-2">
                            <div className="w-full flex justify-end items-center">
                                <Button><X onClick={() => {
                                    const newProjects = resume.projects.filter((_, i) => i !== index);
                                    setResume({ ...resume, projects: newProjects });
                                }} /></Button>
                            </div>
                            <Input id="title" onChange={(e) => handleFieldUpdate(e, index)} value={projects.title} />
                            <Input id="date" onChange={(e) => handleFieldUpdate(e, index)} value={projects.date} />
                            <Textarea id="summary" onChange={(e) => handleFieldUpdate(e, index)} value={projects.summary} />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}