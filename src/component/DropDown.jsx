"use client"
import { authClient } from "@/lib/auth-client";
import { ArrowRightFromSquare, Gear, Persons } from "@gravity-ui/icons";
import { Avatar, Dropdown, Label } from "@heroui/react";
import { ArrowUpRightFromSquare } from "lucide-react";

import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";




export default function CustomTrigger({ user }) {
 const router = useRouter()

  const handleSignOut = async () => {
    await authClient.signOut();
    toast.success("log out successful");
    router.refresh()
  };
  return (
    <Dropdown>
      <Dropdown.Trigger className="rounded-full flex items-center space-x-5">
        <Avatar >
          <Avatar.Image
            alt={user?.name}
            src={user?.image}
            referrerPolicy="no-referrer"
          />
          <Avatar.Fallback delayMs={600}>{user?.name[0]}</Avatar.Fallback>
        </Avatar>
        <h2 className="font-bold hidden md:flex lg:flex ">{`${user?.name}`.split(" ")[0] + ""}</h2>
        
      </Dropdown.Trigger>
      <Dropdown.Popover>
        <div className="px-3 pt-3 pb-1">
          <div className="flex items-center gap-2">
            <Avatar size="sm">
              <Avatar.Image
                alt={user?.name}
                src={user?.image}
                referrerPolicy="no-referrer"
              />
              <Avatar.Fallback delayMs={600}>{user?.name[0]}</Avatar.Fallback>
            </Avatar>
            <div className="flex flex-col gap-0">
              <p className="text-sm leading-5 font-medium">{user?.name}</p>
              <p className="text-xs leading-none text-muted">{user?.email}</p>
            </div>
          </div>
        </div>
        <Dropdown.Menu>
          <Dropdown.Item className=" flex md:hidden lg:hidden" id="dashboard" textValue="Dashboard">
            <Link href={"/dashboard/request"}>
              <Label>Dashboard</Label>
            </Link>
          </Dropdown.Item>
          <Dropdown.Item id="profile" textValue="Profile">
            <Label>Profile</Label>
          </Dropdown.Item>

          <Dropdown.Item id="logout" textValue="Logout" variant="danger">
            <div
              onClick={handleSignOut}
              className="flex w-full items-center justify-between gap-2"
            >
              <Label>Log Out</Label>
              <ArrowUpRightFromSquare className="size-3.5 text-danger" />
            </div>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  );
}
