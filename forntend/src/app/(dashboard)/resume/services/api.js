import axiosInstance from "@/axios.config";
import { getSession } from "next-auth/react";

export const getResume = async () => {
    const session = await getSession()
    return (await axiosInstance.get("/resume/info", {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session.user.accessToken}`
        }
    })).data
}

export const resumeList = async () => {
    const session = await getSession()
    return (await axiosInstance.get("/resume/list", {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session.user.accessToken}`
        }
    })).data
}

export const crateResume = async (data) => {
    const session = await getSession()
    return (await axiosInstance.post("/resume/create", data, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session.user.accessToken}`
        }
    })).data
}

export const updateResume = async (data) => {
    const session = await getSession()
    return (await axiosInstance.patch('/resume/info', data, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session.user.accessToken}`
        }
    })).data
}

export const getResumeData = async (resumeId) => {
    const session = await getSession()
    return (await axiosInstance.get(`/resume/info/${resumeId}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session.user.accessToken}`
        }
    })).data
}