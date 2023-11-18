'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import {
  SignIn,
  signOut,
  useSession,
  getProvider,
  getProviders,
} from 'next-auth/react';

function Nav() {
  const isUserLoggedIn = true;

  const [providers, setProviders] = useState(null);

  useEffect(() => {
    const setProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };

    setProviders();
  }, []);

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/logo.svg"
          alt="promptopia"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="logo_text">Promtopita</p>
      </Link>

      {/*-------------------------- desktop navigation ----------------------*/}

      {/* will be displayed on small and larger but not on extra small(mobile size) */}
      <div className="sm:flex hidden">
        {/*--------------------- if user is logged in------------------------ */}

        {isUserLoggedIn ? (
          <div className="flex gap-3 md:gap-5">
            <Link href={'/create-prompt'} className="black_btn">
              Create Post
            </Link>

            <button type="button" onClick={signOut} className="outline_btn">
              Sign Out
            </button>
            <Link href={'/profile'}>
              <Image
                src={'assets/images/logo.svg'}
                className="rounded-full"
                alt="profile"
                width={37}
                height={37}
              />
            </Link>
          </div>
        ) : (
          <>
            {/*--------------------- if user is not logged in------------------------ */}

            {providers &&
              //  "Object.values" extract the values of an object and work with them as an array.

              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  onClick={() => SignIn(provider.id)}
                  className="black-btn"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>

      {/* -------------------------------mobile navigation--------------------------- */}

      <div className="sm:hidden flex relative">
        {/*--------------------- if user is logged in------------------------ */}

        {isUserLoggedIn ? (
          <div className="flex">
            <Image
              src={'assets/images/logo.svg'}
              className="rounded-full"
              alt="profile"
              width={37}
              height={37}
              onClick={() => {}}
            />
          </div>
        ) : (
          <>
            {/*--------------------- if user is not logged in------------------------ */}

            {providers &&
              //  "Object.values" extract the values of an object and work with them as an array.

              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  onClick={() => SignIn(provider.id)}
                  className="black-btn"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
}

export default Nav;
