"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import {
  signIn,
  useSession,
  getProviders,
  signOut,
  LiteralUnion,
  ClientSafeProvider,
} from "next-auth/react";
import { BuiltInProviderType } from "next-auth/providers/index";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "./ui/button";
import { LogOut, Plus } from "lucide-react";

type ProvidersObj = Record<
  LiteralUnion<BuiltInProviderType, string>,
  ClientSafeProvider
> | null;

const Nav = () => {
  const { data: session } = useSession();

  const [providers, setProviders] = useState<ProvidersObj>(null);

  useEffect(() => {
    const setProviderState = async () => {
      const response = await getProviders();
      setProviders(response);
    };

    setProviderState();
  }, []);

  console.log(session)

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href={"/"} className="flex gap-2 flex-center">
        <Image
          alt="logo"
          src={"/assets/images/logo.svg"}
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="logo_text">Promtify</p>
      </Link>

      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Button asChild>
              <Link href={"/create-prompt"}>Create Prompt</Link>
            </Button>
            <Button
              type="button"
              onClick={() => {
                signOut();
              }}
              variant={"outline"}
            >
              Sign Out
            </Button>
            <Link href="/profile">
              <Image
                src={session.user.image || ""}
                width={37}
                height={37}
                className="rounded-full"
                alt="profile"
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <Button
                  type="button"
                  key={provider.name}
                  onClick={() => {
                    signIn(provider.id);
                  }}
                >
                  Sign in
                </Button>
              ))}
          </>
        )}
      </div>

      <div className="sm:hidden flex relative">
        {session?.user ? (
          <DropdownMenu>
            <DropdownMenuTrigger className="outline-none">
              <Image
                src={session.user.image || ""}
                width={37}
                height={37}
                className="rounded-full"
                alt="profile"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem asChild className="space-x-2">
                <Link href={"/create-prompt"}>
                  <Plus className="w-4 h-4" />
                  <span>Create Prompt</span>
                </Link>
              </DropdownMenuItem>{" "}
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  signOut();
                }}
                className="text-red-600 space-x-2"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <Button
                  type="button"
                  key={provider.name}
                  onClick={() => {
                    signIn(provider.id);
                  }}
                >
                  Sign in
                </Button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
