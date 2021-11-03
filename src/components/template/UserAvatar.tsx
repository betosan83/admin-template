import Link from 'next/link'
import useAuth from '../../data/hook/useAuth'
import Image from 'next/image'

interface UserAvatarProps {
    className?: string
}

export default function UserAvatar(props: UserAvatarProps) {
    const { user } = useAuth()
    return (
        <Link href="/profile" passHref>
            {/* <Image width='50' height='50'
                src={user?.imageUrl ?? '/images/avatar.svg'} 
                alt="User avatar"
                /> */}
            <img 
                src={user?.imageUrl ?? '/images/avatar.svg'} 
                alt="User avatar" 
                className={`
                    h-10 w-10 rounded-full cursor-pointer
                    ${props.className}
                `}/>
        </Link>
    )
}