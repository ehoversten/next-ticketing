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
            <SelectValue placeholder="NEW"/>
        </SelectTrigger>
        <SelectContent >
            <SelectItem value="NEW">New</SelectItem>
            <SelectItem value="ASSIGNED">Assigned</SelectItem>
            <SelectItem value="IN-PROGRESS">In Progress</SelectItem>
            <SelectItem value="COMPLETE">Complete</SelectItem>
            <SelectItem value="CANCELLED">Canceled</SelectItem>
        </SelectContent>
    </Select>
  )
}

export default StatusSelect