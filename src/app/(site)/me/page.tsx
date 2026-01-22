import { getServerAuthToken } from '@/libs/server-cookies';
import { redirect } from 'next/navigation';
import React from 'react'

const page = async () => {
    const token = await getServerAuthToken();

    if (!token) {
        redirect("/login");
    }
    return (
        <div>{token}</div>
    )
}

export default page