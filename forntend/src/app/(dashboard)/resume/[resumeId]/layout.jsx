'use client';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import ResumeContextProvider from "./context/useResumeContext";
import Resume from "./components/resume";
import { Document, Page } from "@react-pdf/renderer";
import ReactPDF from '@react-pdf/renderer';

export default function ResumeLayout({ children }) {
    return (
        <>
            <ResumeContextProvider>
                <ResizablePanelGroup
                    direction="horizontal"
                    className="w-full -ml-6 -my-6 p-6 rounded-sm">
                    <ResizablePanel className="-ml-6 -my-6" defaultSize={40}>
                        {children}
                    </ResizablePanel>
                    <ResizableHandle withHandle />
                    <ResizablePanel className="w-full">
                        <div className="flex justify-center items-center w-full">
                            <Document>
                                <Page size="A4">
                                    <Resume />
                                </Page>
                            </Document>
                        </div>
                    </ResizablePanel>
                </ResizablePanelGroup>
            </ResumeContextProvider>
        </>
    )
}