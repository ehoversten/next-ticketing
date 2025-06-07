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
            <SelectValue placeholder="New"/>
        </SelectTrigger>
        <SelectContent >
            <SelectItem value="new">New</SelectItem>
            <SelectItem value="assigned">Assigned</SelectItem>
            <SelectItem value="in-progress">In Progress</SelectItem>
            <SelectItem value="canceled">Canceled</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
        </SelectContent>
    </Select>
  )
}

export default StatusSelect