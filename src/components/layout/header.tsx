'use client'
import { useState } from 'react';
import Image from 'next/image';
import HeaderIcon from './header-icon';
import Link from 'next/link';
import Search from './search';
import { MenuItem } from '@/types/menu';



const Header = () => {
    const menu: MenuItem[] = [
        { label: "Camisa", href: '/categories/camisa' },
        { label: "Kits", href: '/categories/kits' }]

    const [open, setOpen] = useState(false)
    return (
        <header className="bg-white border-b border-gray-100">
            <p className="bg-black text-white text-center p-4">
                <strong>FRETE GRÁTIS</strong>  para todo o Nordeste nas compras acima de R$ 199,00. <strong>APROVEITA!</strong> </p>
            <section className="w-full max-w-6xl mx-auto p-6 ">
                <div className='flex items-center justify-between'>
                    <div className='w-32'>
                        <Link href={"/"}>
                            <Image src="/ui/logo-black.png" alt="B7Store" width={120} height={40} />
                        </Link>
                    </div>
                    <div className='flex-1 '>
                        <div className=' w-full hidden md:flex items-center px-6 gap-6'>
                            <div className='flex-1 '>
                                <ul className='flex gap-10 font-medium text-gray-600'>
                                    {menu.map(item => (
                                        <li key={item.label}>
                                            <Link href={item.href}>{item.label}</Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className='w-80'>
                                <Search />
                            </div>
                        </div>
                    </div>

                    <div className='flex gap-4'>
                        <Link href={"/my-orders"}>
                            <HeaderIcon src="/ui/user-line.png" alt="Perfil" width={24} height={24} />
                        </Link>
                        <Link href={"/cart"}>
                            <HeaderIcon src="/ui/shopping-bag-4-line.png" alt="Carrinho" width={24} height={24} />
                        </Link>
                        <div className='md:hidden' onClick={() => setOpen(!open)}>
                            <HeaderIcon src="/ui/menu-line.png"
                                alt="Menu"
                                width={24}
                                height={24}
                                selected={open}
                                srcSelect="/ui/menu-line-white.png" />
                        </div>
                    </div>
                </div>

            </section>
            {open &&
                <div className='md:hidden pb-6'>
                    {menu.map(item => (
                        <Link key={item.label} href={item.href}>
                            <div className='p-6 border-b border-gray-200 flex items-center justify-between'>
                                <p className='font-medium text-lg text-gray-600'>{item.label}</p>
                                <Image src="/ui/arrow-up-right.png" alt="Ir a categoria" width={24} height={24} />
                            </div>
                        </Link>
                    ))}
                </div>}

            <div className='p-6 pt-0 md:hidden'>
                <Search />
            </div>
        </header>
    )
}

export default Header