'use client'
import { Button } from "@/components/ui/button";
import { DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, Dialog } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input"
import { Database, PlusIcon, X } from "lucide-react";
import { useEffect, useState } from "react";

export const BasicCustomField = (props) => {
    const [fieldValue, setFieldValue] = useState({
        name: "",
        value: ""
    })

    const [fields, setFields] = useState(props.value);
    const [customFields, setCustomFields] = useState({
        name: "",
        value: ""
    });

    const handleAddField = () => {
        if (fieldValue.name === "" || fieldValue.value === "") return;
        props.setValue('custom', [...props.value, fieldValue])
    }

    const handleFieldValueChange = (e, index) => {
        const { name, value } = e.target;
        if (e.target.id === 'name') {
            props.value[index].name = value;
        }
        if (e.target.id === 'value') {
            props.value[index].value = value;
        }
    }

    useEffect(() => {
    }, [props.value, setCustomFields])

    return (
        <div className="space-y-3">
            <Dialog>
                <DialogTrigger>

                    <div className="flex justify-start items-center gap-2 cursor-pointer">
                        <PlusIcon size={18} />
                        <span className="text-sm">Add an custom field</span>
                    </div>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Create a new resume</DialogTitle>
                        <DialogDescription>
                            Start building your resume by giving it a name.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex justify-between items-center gap-3">
                        <Input
                            value={fieldValue.name}
                            onChange={(e) => setFieldValue({ ...fieldValue, name: e.target.value })}
                            id="name"
                            placeholder="Enter name"
                        />
                        <Input
                            value={fieldValue.value}
                            onChange={(e) => setFieldValue({ ...fieldValue, value: e.target.value })}
                            id="value"
                            placeholder="Enter value"
                        />
                        <Button onClick={handleAddField}>
                            add
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
            <div className="space-y-3">
                {props.value.map((field, index) => {
                    return (
                        <div className="flex justify-between items-center gap-3" key={index}>
                            <Input id="name" value={field.name} onChange={(e) => {
                                handleFieldValueChange(e, index);
                                setCustomFields({ ...customFields, name: e.target.value })
                            }} />
                            <Input id="value" value={field.value} onChange={(e) => {
                                handleFieldValueChange(e, index);
                                setCustomFields({ ...customFields, value: e.target.value })
                            }} />
                            <X className="cursor-pointer" size={44} onClick={(e) => {
                                props.setValue('custom', props.value.filter((item, i) => i !== index))
                            }} />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}