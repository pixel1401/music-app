import { useState } from 'react';
import { RiCloseLine } from 'react-icons/ri'
import { HiOutlineMenu } from 'react-icons/hi'
import { links } from '../Models/consts';
import myLogo from '../assets/myLogo.svg';
import { NavLink } from "react-router-dom";



const ActiveLinkStyle = 'flex items-center justify-start flex-row my-8 text-sm font-medium text-gray-400 hover:text-cyan-400'

export const Sidebar: React.FC = () => {
    const [isMobile, setIsMobile] = useState(false);

    return (
        <>
            <div className=" md:flex hidden flex-col w-[240px] pb-10  px-4 bg-[#191624]">
                <img src={myLogo} alt="Mylogo" className=' w-full h-23 object-contain' />
                <NavLinkWrap />
            </div>

            <div className=' absolute md:hidden block top-6 right-3'>
                {isMobile ? (
                    <RiCloseLine onClick={() => setIsMobile(false)} className=' cursor-pointer w-6 h-6 text-white mr-2' />
                )
                    : (
                        <HiOutlineMenu onClick={()=> setIsMobile(true) } className=' cursor-pointer w-6 h-6 text-white mr-2' />
                    )
                }
            </div>

            <div className={` absolute top-0 h-screen  w-2/3 bg-gradient-to-bl from-white/10 to-[#483d8d] backdrop-blur-lg z-20  p-6 md:hidden  transition-all ${isMobile ? 'left-0' : '-left-full' }  `}>
                <img src={myLogo} alt="Mylogo" className=' w-full  h-72 object-contain' />
                <NavLinkWrap  />
            </div>
        </>
    )
}



const NavLinkWrap = () => {
    return (
        <div className='flex-1 overflow-y-scroll'>
            {links.map((item) => {
                return (
                    <NavLink key={item.to} to={item.to}
                        className={({ isActive }) => 
                            isActive ? `text-cyan-400 ${ActiveLinkStyle}` : `${ActiveLinkStyle}` 
                    } 
                    >
                        <item.icon className=' w-6 h-6 mr-2' />
                        {item.name}
                    </NavLink>
                )
            })}
        </div>
    )
}



