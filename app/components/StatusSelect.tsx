import React from 'react';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  

type StatusProp = {
    status: string;
}

function StatusSelect(params: StatusProp) {

    const currentStatus = params.status;
    console.log("CurrenT: ", currentStatus);
    
  return (
    <Select>
        <SelectTrigger className="w-[180px] bg-white">
            <SelectValue placeholder="Submitted"/>
        </SelectTrigger>
        <SelectContent >
            <SelectItem value="submitted">Submitted</SelectItem>
            <SelectItem value="in-progress">In Progress</SelectItem>
            <SelectItem value="assistance">Assistance Needed</SelectItem>
            <SelectItem value="canceled">Canceled</SelectItem>
            <SelectItem value="complete">Complete</SelectItem>
        </SelectContent>
    </Select>
  )
}

export default StatusSelect