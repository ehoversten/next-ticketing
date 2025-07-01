import { login, signup } from './actions';
import { Button } from '@/components/ui/button';

export default function LoginPage() {
  return (
    <div className='flex justify-center h-lvh'>
      <form className='flex-col border-4 border-sky-600 h-1/2 p-5'>
        <div>
          <label htmlFor="email">Email:</label>
          <input id="email" name="email" type="email" required />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input id="password" name="password" type="password" required />

        </div>
        <div>
          <Button formAction={login} className='m-5'>Log in</Button>
          <Button formAction={signup} variant={'outline'}>Sign up</Button>

        </div>
      </form>
    
    </div>
  )
}