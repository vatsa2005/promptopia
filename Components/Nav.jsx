"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

function Nav() {
    const isUserLoggedIn = true;
    const[providers, setProviders] = useState(null);
    const[toggleDropdown, setToggleDropDown] = useState(false);

    useEffect(() => {
        async function setProviders() {
            const response = await getProviders();
            console.log(response);
            setProviders(response);
        }
        setProviders();
    }, []);

    useEffect(() => {
        function handleEsc(e) {
            if(e.key === "Escape") {
                setToggleDropDown(false);
            }
        }
        document.addEventListener("keydown", handleEsc);
        return(() => {document.removeEventListener("keydown", handleEsc)});
    })

    return(
        <nav className="flex-between w-full mb-16 pt-3">
            <Link href="/" className="flex gap-2 flex-center align-middlex">
                <Image src="assets/images/logo.svg" alt="logo" width={30} height={30} className="object-contain"/>
                <p className="logo_text">Promptopia</p>
            </Link>
            <div className="sm:flex hidden">
                {isUserLoggedIn ? 
                
                <div className="flex gap-3 md:gap-5">
                    <Link href="/create-prompt" className="black_btn">Create new post</Link>
                    <button type="button" onClick={signOut} className="outline_btn">
                        Sign Out
                    </button>
                    <Link href="/profile">
                        <Image src="assets/images/logo.svg" alt="profile" width={37} height={37} className="rounded-full" />
                    </Link>
                </div> 
                : 
                <>
                    {providers && Object.values(providers).map((provider) => {
                        return <button type="button" key={provider.name} onClick={() => {signIn(provider.id)}} className="black_btn">
                            Sign In
                        </button>
                    })}
                </>
                }
            </div>

            <div className="sm:flex relative">
                {isUserLoggedIn ? (
                    <div className="flex">
                        <Image src="assets/images/logo.svg" alt="profile" width={37} height={37} className="rounded-full" onClick={() => {setToggleDropDown((prev) => !prev )}}/>
                        {toggleDropdown && 
                        <div className="dropdown flex">
                            <Link href="/profile" className="dropdown_link" onClick={() => {setToggleDropDown(false)}}>
                                My Profile
                            </Link>
                            <Link href="/create-prompt" className="dropdown_link" onClick={() => {setToggleDropDown(false)}}>
                                Create Prompt
                            </Link>
                            <button type="button" onClick={() => {setToggleDropDown(false); signOut();}} className="mt-5 w-full black_btn">
                                Sign Out
                            </button>
                        </div>}
                    </div>
                ):(
                    <>
                    {providers && Object.values(providers).map((provider) => {
                        return <button type="button" key={provider.name} onClick={() => {signIn(provider.id)}} className="black_btn">
                            Sign In
                        </button>
                    })}
                </>
                )}
            </div>
        </nav> 
    );
}

export default Nav;
