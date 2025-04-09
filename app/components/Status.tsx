import React from 'react';
import { Badge } from '@/components/ui/badge';

type StatusProp = {
    status: string;
}

function Status({ status }: StatusProp) {
  return (
    <Badge variant='secondary' className='p-2'>{status}</Badge>
  )
}

export default Status