import { useMutation } from "@tanstack/react-query";
import { crateResume, updateResume } from "./api";

export const useCreateResume = () => {
    return useMutation({
        mutationFn: (data) => crateResume(data)
    })
}

export const useUpdateResume = () => {
    return useMutation({
        mutationFn: (data) => updateResume(data)
    })
}