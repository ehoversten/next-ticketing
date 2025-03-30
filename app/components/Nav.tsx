import React from 'react';
import Link from 'next/link';
import { faGem } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { buttonVariants } from './ui/button';

// type IconProp ={
//   icon: string;
// }

function Nav() {
  return (
    <nav className="navbar bg-sky-400 h-20 flex justify-between items-center">
      <div className="icon p-5 flex items-center">
        <FontAwesomeIcon icon={faGem} className='w-10 mr-5' />
        <h2 className='text-xl'>Welcome: {'username'}</h2>
      </div>
      <div className='links w-1/2 flex justify-around'>
        <Link href="/ticketpage" className='text-3xl'>All Tickets</Link>
        <Link href="/unclaimed" className='text-3xl'>Unclaimed</Link>
        <Link href="/mytickets" className='text-3xl'>My Tickets</Link>
      </div>
      <div className="authorized mr-5">
        <Link href='logout' className={buttonVariants({ variant: "destructive" })}>Logout</Link>
      </div>
    </nav>
  )
}

export default Nav