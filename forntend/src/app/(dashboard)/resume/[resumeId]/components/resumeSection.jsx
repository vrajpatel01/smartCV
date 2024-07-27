export default function ResumeSection({ title, children }) {
    return (
        <div className="space-y-3">
            <div className="border-b">
                <h1 className="mb-2 font-medium text-lg">{title}</h1>
            </div>
            {children}
        </div>
    )
}