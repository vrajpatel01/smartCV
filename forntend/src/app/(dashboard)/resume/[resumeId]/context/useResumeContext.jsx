'use client'
import { createContext } from "react";
import { useState, useEffect } from "react";
import { useGetResumeData } from "../../services/query";
import { usePathname } from "next/navigation";

export const ResumeContext = createContext(null);

export default function ResumeContextProvider({ children }) {
    const pathname = usePathname();
    const resumeId = pathname.split("/")[2];

    const getResumeData = useGetResumeData(resumeId);
    const [resume, setResume] = useState({});

    useEffect(() => {
        if (getResumeData.isSuccess) {
            console.log(getResumeData.data.data.data);
            setResume(getResumeData.data.data.data);
        }
    }, [getResumeData.data, getResumeData.isSuccess]);

    return (
        <ResumeContext.Provider value={{ setResume, resume, getResumeData }}>
            {children}
        </ResumeContext.Provider>
    )
}