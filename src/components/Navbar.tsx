'use client'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const Navbar = () => {

    const [input, setInput] = useState("");
    const router = useRouter();

    const searchMovie = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        router.push(`?movie=${input}`)
        setInput("")
    }
    return (
        <div className='bg-gray-200 py-4 px-4'>
            <div className="container mx-auto flex justify-between items-center">
                <Link href="/">
                    <div className="text-[30px] font-medium">Logo</div>
                </Link>
                <form onSubmit={searchMovie}>
                    <div className="space-x-4">
                        <input type="text" className="bg-gray-300 px-4 py-2 outline-none" placeholder='Search a Movie' value={input} onChange={(event) => setInput(event.target.value)} />
                        <button className="bg-blue-500 py-2 px-4 hover:text-white hover:bg-blue-800">Search</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Navbar