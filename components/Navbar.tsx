import { NavLinks } from '@/constants'
import Image from 'next/image'
import Link from 'next/link'
import AuthProviders from './AuthProviders';
import { getCurrentUser } from '@/lib/session';
import { signOut } from 'next-auth/react'; 
import ProfileMenu from './ProfileMenu';

const Navbar = async () => {
  const session = await getCurrentUser();

  return (
    <nav className='flexBetween navbar'>
      <div className='flex-1 flexStart gap-10'>
        <Link href='/'>
          {/* LOGO */}
          <Image 
          src='/logo.svg'
          width={115}
          height={43}
          alt='Flexibble'
          ></Image>
        </Link>
        <ul className='xl:flex hidden text-small gap-7'>
          {/* // NAV LINKS */}
          {NavLinks.map((link) => (
            <Link href={link.href} 
            key={link.key}
            className='hover:text-violet-600'>
              {link.text}
            </Link>
          ))}
        </ul>
      </div>
      <div className='flexCenter gap-4'>
        {session?.user ?(
          <>
            <ProfileMenu session={session}/>
            {/* {session?.user?.image
            && (
              <Link href={`/profile/${session?.user.id}`}>
                <Image 
                  src={session.user.image}
                  width={40}
                  height={40}
                  className='rounded-full'
                  alt={session.user.name}/>
              </Link>
            )} */}
            
            <Link href='/create-project'>
            New Creation!
            </Link>

            {/* <button type='button' className='text-sm' onClick={signOut}>Sign Out</button> */}
          </>
          
        ) : (
          <AuthProviders></AuthProviders>
        )}
        
      </div>
    </nav>
  )
}

export default Navbar;