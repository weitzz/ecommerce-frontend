'use client'
import Image from 'next/image';
import HeaderIcon from './header-icon';
import Link from 'next/link';
import Search from '../filter/search';
import { MenuItem } from '@/types/menu';
import { useMenuStore } from '@/store/menuStore';
import { clearAuthCookie } from '@/actions/clear-auth-cookie';
import { useAuthStore } from '@/store/auth';

type HeaderProps = {
    isAuthenticated: boolean;
};

const Header = ({ isAuthenticated: initialIsAuthenticated }: HeaderProps) => {
    const menu: MenuItem[] = [
        { label: "Camisas", href: '/categories/camisas' },
        { label: "Kits", href: '/categories/kits' },
        { label: "Bonés", href: '/categories/bones' }]

    const { isOpen, toggleMenu } = useMenuStore();
    const { isAuthenticated, hydrated, clear } = useAuthStore(state => state)
    const authState = hydrated ? isAuthenticated : initialIsAuthenticated

    return (
        <header className="bg-white border-b border-gray-100">
            <p className="bg-black text-white text-center p-4">
                <strong>FRETE GRÁTIS</strong>  para todo o Nordeste nas compras acima de R$ 199,00. <strong>APROVEITA!</strong> </p>
            <section className="w-full max-w-6xl mx-auto p-6 ">
                <div className='flex items-center justify-between'>
                    <div className='w-32'>
                        <Link href={"/"}>
                            <Image src="/ui/logo-black.png" alt="ecommerce" width={120} height={40} />
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
                        <Link href={"/cart"}>
                            <HeaderIcon src="/ui/shopping-bag-4-line.png" alt="Carrinho" width={24} height={24} />
                        </Link>
                        {authState ? (
                            <>
                                <Link href="/me">
                                    <HeaderIcon
                                        src="/ui/user-line.png"
                                        alt="Minha conta"
                                        width={24}
                                        height={24}
                                    />
                                </Link>

                                <form action={clearAuthCookie}>
                                    <button type="submit" aria-label="Sair" className='cursor-pointer' onClick={() => clear()}>
                                        <HeaderIcon
                                            src="/ui/logout-box.png"
                                            alt="Sair"
                                            width={24}
                                            height={24}
                                        />
                                    </button>
                                </form>
                            </>
                        ) : (
                            <Link
                                href="/login"
                                className="text-sm font-medium text-gray-600 hover:text-black transition"
                            >
                                <HeaderIcon
                                    src="/ui/logout-box.png"
                                    alt="Sair"
                                    width={24}
                                    height={24}
                                />
                            </Link>
                        )}
                        <div className='md:hidden' onClick={toggleMenu}>
                            <HeaderIcon src="/ui/menu-line.png"
                                alt="Menu"
                                width={24}
                                height={24}
                                selected={isOpen}
                                srcSelect="/ui/menu-line-white.png" />
                        </div>
                    </div>
                </div>

            </section>
            {isOpen &&
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
