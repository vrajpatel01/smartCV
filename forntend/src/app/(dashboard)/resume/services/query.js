import { useQuery } from "@tanstack/react-query";
import { getResume, getResumeData, resumeList } from "./api";

export const useGetResume = () => {
    return useQuery({
        queryKey: ["resume"],
        queryFn: () => getResume()
    })
}

export const useGetResumeList = () => {
    return useQuery({
        queryKey: ["resume"],
        queryFn: () => resumeList()
    })
}

export const useGetResumeData = (resumeId) => {
    return useQuery({
        queryKey: ["resume", resumeId],
        queryFn: () => getResumeData(resumeId)
    })
}