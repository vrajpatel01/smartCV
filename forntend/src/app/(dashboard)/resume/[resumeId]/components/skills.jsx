import { PlusIcon, X } from "lucide-react";
import { ResumeContext } from "../context/useResumeContext";
import { useContext, useState } from "react";
import { Input } from "@/components/ui/input";

export default function Skills() {
    const { resume, setResume } = useContext(ResumeContext);
    const [skills, setSkills] = useState('');

    const handleEnter = (e) => {
        if (e.key === 'Enter') {
            setResume({ ...resume, skills: [...resume?.skills || [], skills] });
            setSkills('');
        }
    }

    const handleRemoveSkills = (e) => {
        const newSkills = resume.skills.filter((_, index) => index !== e);
        console.log(newSkills);
        setResume({ ...resume, skills: newSkills });
        setSkills('');
    }

    return (
        <div className="space-y-3">
            <div className="space-y-2">
                <h1>Skills</h1>
                <Input onKeyDown={handleEnter} value={skills} onChange={e => setSkills(e.target.value)} placeholder="skills" />
            </div>
            {resume?.skills?.map((skill, index) => {
                return (
                    <div key={index} className="relative">
                        <Input value={skill} />
                        <X onClick={() => handleRemoveSkills(index)} className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer" size={16} />
                    </div>
                )
            })}
        </div>
    )
}