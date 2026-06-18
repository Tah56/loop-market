

import {Bars, Bell, Envelope, Gear, House, Magnifier, Person} from "@gravity-ui/icons";
import {Button, Drawer} from "@heroui/react";
import { BoxIcon, ChartAreaIcon, LayoutDashboard, PlusIcon, ShoppingBag } from "lucide-react";
import Link from "next/link";

export function Navigation() {
  const navItems = [
    {icon: LayoutDashboard, href:"/", label: "Overview"},
    {icon: PlusIcon,href:"/dashboard/addProduct", label: "Add Product"},
    {icon: BoxIcon,href:"/dashboard/MyProduct", label: "My Product"},
    {icon: ShoppingBag,href:"/", label: "Oders"},
    {icon: ChartAreaIcon,href:"/", label: "Analytics"},
    {icon: Person,href:"/", label: "Profile"},
  ];
  const navLinks =  <nav className="flex flex-col gap-1">
                {navItems.map((item) => (
                    <Link key={item.label} href={item.href}>
                  <button
                    
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default"
                    type="button"
                    >
                    <item.icon className="size-5 text-muted" />
                    {item.label}
                  </button>
                      </Link>
                ))}
              </nav>

  return (
    <>
    <aside className="hidden w-64 shrink-0 border-t border-r border-default p-4 lg:block">
        {navLinks}
    </aside>
    <Drawer>
      <Button  className={" md:hidden lg:hidden"} variant="secondary">
        <Bars />
        Menu
      </Button>
      <Drawer.Backdrop>
        <Drawer.Content placement="left">
          <Drawer.Dialog>
            <Drawer.CloseTrigger />
            <Drawer.Header>
              <Drawer.Heading>Navigation</Drawer.Heading>
            </Drawer.Header>
            <Drawer.Body>
              {navLinks}
            </Drawer.Body>
          </Drawer.Dialog>
        </Drawer.Content>
      </Drawer.Backdrop>
    </Drawer>
    </>
  );
}