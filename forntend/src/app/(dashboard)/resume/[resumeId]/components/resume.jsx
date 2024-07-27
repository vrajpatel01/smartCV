'use client'
import Link from "next/link";
import ResumeSection from "./resumeSection";
import { useContext } from "react";
import { ResumeContext } from "../context/useResumeContext";
import { AtSign, Link as Link2, MapPin, Phone } from "lucide-react";

export default function Resume() {
    const { resume } = useContext(ResumeContext);
    return (
        <div className="w-[595px] h-[842px] bg-white p-4 text-xs space-y-4">
            <div className="w-full flex justify-center items-center flex-col gap-2">
                <h1 className="text-xl">{resume?.basic?.name}</h1>
                <p>{resume?.basic?.headline}</p>
                <div>
                    <div className="flex justify-center items-center gap-3">
                        {!!resume?.basic?.website &&
                            <Link className="flex justify-center items-center gap-2" href={`${resume?.basic?.website}`}><Link2 size={12} />{resume?.basic?.website}</Link>}
                        {!!resume?.basic?.email &&
                            <Link className="flex justify-center items-center gap-2" href={`mailto:${resume?.basic?.email}`}><AtSign size={12} />{resume?.basic?.email}</Link>}
                        {!!resume?.basic?.phone &&
                            <Link className="flex justify-center items-center gap-2" href={`tel:${resume?.basic?.phone}`}><Phone size={12} />{resume?.basic?.phone}</Link>}
                        {!!resume?.basic?.location &&
                            <div className="flex justify-center items-center gap-2">
                                <MapPin size={12} />
                                <p>{resume?.basic?.location}</p>
                            </div>
                        }
                        {!!resume?.basic?.custom && resume?.basic?.custom.map((custom, index) => {
                            return (
                                <div key={index} className="flex justify-center items-center gap-2">
                                    <p>{custom.label}</p>
                                    <p>{custom.value}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
            {!!resume?.skills &&
                <ResumeSection title="Skills">
                    <div className="space-x-2 space-y-2">
                        {resume?.skills?.map((skill, index) => {
                            console.log(resume?.skills?.length, index);
                            return (
                                <span key={index}>{skill}{(resume?.skills?.length != index + 1) && ','}</span>
                            )
                        })}
                    </div>
                </ResumeSection>}
            {!!resume?.education &&
                <ResumeSection title="Education">
                    <div className="space-y-2">
                        {resume?.education?.map((skill, index) => {
                            return (
                                <div key={index}>
                                    <div className="w-full flex justify-between items-center">
                                        <h1 className="font-bold">{skill?.institute}</h1>
                                        <h1 className="font-bold">{skill?.date}</h1>
                                    </div>
                                    <div className="w-full flex justify-between items-center mb-1">
                                        <p>{skill?.typeOfStudy}</p>
                                        <h1 className="font-bold">{skill?.score}</h1>
                                    </div>
                                    <p className="text-justify">{skill?.summary}</p>
                                </div>
                            )
                        })}
                    </div>
                </ResumeSection>}
            {!!resume?.experience &&
                <ResumeSection title="Work Experience">
                    <div className="space-y-2">
                        {resume?.experience?.map((experience, index) => {
                            return (
                                <div key={index}>
                                    <div className="w-full flex justify-between items-center">
                                        <h1 className="font-bold">{experience?.title}</h1>
                                        <h1 className="font-bold">{experience?.date}</h1>
                                    </div>
                                    <div className="w-full flex justify-between items-center mb-1">
                                        <h1 className="font-bold">{experience?.company}</h1>
                                        <h1 className="font-bold">{experience?.location}</h1>
                                    </div>
                                    <p className="text-justify">{experience?.summary}</p>
                                </div>
                            )
                        })}
                    </div>
                </ResumeSection>}
            {!!resume?.projects &&
                <ResumeSection title="Projects">
                    <div className="space-y-2">
                        {resume?.projects?.map((project, index) => {
                            return (
                                <div key={index}>
                                    <div className="w-full flex justify-start items-center">
                                        <h1 className="font-bold">{project?.title}</h1>
                                        <h1 className="font-medium">({project?.date})</h1>
                                    </div>
                                    <p className="text-justify">{project?.summary}</p>
                                </div>
                            )
                        })}
                    </div>
                </ResumeSection>}
        </div >
    )
}