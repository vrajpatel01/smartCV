import { DialogContent, DialogTrigger, Dialog, DialogHeader } from "@/components/ui/dialog";
import { PlusIcon, X } from "lucide-react";
import { useContext, useState } from "react";
import { ResumeContext } from "../context/useResumeContext";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";

export default function Education() {
    const { resume, setResume } = useContext(ResumeContext)
    const [education, setEducation] = useState({});


    const handleAddEducation = () => {
        console.log(education);
        setResume({ ...resume, education: [...resume?.education || [], education] });
        setEducation({});
    }

    const handleFieldUpdate = (e, index) => {
        const { id, value } = e.target;
        resume.education[index][id] = value;
        setResume({ ...resume, education: resume.education });
    }

    return (
        <div>
            <div className="space-y-3">
                <h1>Education</h1>
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
                            Add Education
                        </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-5">
                        <Input
                            placeholder="institute"
                            value={education.institute}
                            onChange={(e) => setEducation({ ...education, institute: e.target.value })} />
                        <Input
                            placeholder="Type of Study"
                            value={education.typeOfStudy}
                            onChange={(e) => setEducation({ ...education, typeOfStudy: e.target.value })} />
                        <Input
                            placeholder="course"
                            value={education.course}
                            onChange={(e) => setEducation({ ...education, course: e.target.value })} />
                        <Input
                            placeholder="score"
                            value={education.score}
                            onChange={(e) => setEducation({ ...education, score: e.target.value })} />
                        <Input
                            placeholder="Date or Date range"
                            value={education.date}
                            onChange={(e) => setEducation({ ...education, date: e.target.value })} />
                        <Textarea row={10} value={education.summary} onChange={(e) => setEducation({ ...education, summary: e.target.value })} />
                        <Button onClick={handleAddEducation}>
                            Add
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>

            <div className="divide-y-[1px]">
                {resume?.education?.map((education, index) => {
                    return (
                        <div key={index} className="space-y-2 py-2">
                            <div className="w-full flex justify-end items-center">
                                <Button><X onClick={() => {
                                    const newEducation = resume.education.filter((_, i) => i !== index);
                                    setResume({ ...resume, education: newEducation });
                                }} /></Button>
                            </div>
                            <Input id="institute" onChange={(e) => handleFieldUpdate(e, index)} value={education.institute} />
                            <Input id="typeOfStudy" onChange={(e) => handleFieldUpdate(e, index)} value={education.typeOfStudy} />
                            <Input id="course" onChange={(e) => handleFieldUpdate(e, index)} value={education.course} />
                            <Input id="score" onChange={(e) => handleFieldUpdate(e, index)} value={education.score} />
                            <Input id="date" onChange={(e) => handleFieldUpdate(e, index)} value={education.date} />
                            <Textarea id="summary" onChange={(e) => handleFieldUpdate(e, index)} value={education.summary} />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}