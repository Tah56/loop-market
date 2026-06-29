"use client";

import { authClient } from "@/lib/auth-client";
import {Bars, CreditCard, Person} from "@gravity-ui/icons";
import {Button, Drawer} from "@heroui/react";
import { BarChart3, BoxIcon, ChartAreaIcon, HeaterIcon, LayoutDashboard, Package, Plus, PlusIcon, ShoppingBag, ShoppingCart, Users } from "lucide-react";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const pathname = usePathname();

  const { 
        data: user, 
        isPending, //loading state
        error, //error object
        refetch //refetch the session
    } = authClient.useSession() 

  const navItems = user?.user?.role === "seller" ? [
    { icon: LayoutDashboard, href: "/dashboard/seller", label: "Overview" },
    { icon: PlusIcon, href: "/dashboard/seller/addProduct", label: "Add Product" },
    { icon: BoxIcon, href: "/dashboard/seller/MyProduct", label: "My Product" },
    { icon: ShoppingBag, href: "/dashboard/seller/orders", label: "Orders" },
    { icon: ChartAreaIcon, href: "/", label: "Analytics" },
    { icon: Person, href: "/dashboard/seller/edit-profile", label: "Profile" },
  ] : user?.user?.role === "admin" ? [
    { icon: LayoutDashboard, href: "/dashboard/admin", label: "Overview" },

    { icon: Package, href: "/dashboard/admin/allproducts", label: "All Products" },
    { icon: Users, href: "/dashboard/admin/user", label: "Users" },
    { icon: ShoppingCart, href: "/dashboard/admin/all-orders", label: "Orders" },
    { icon: BarChart3, href: "/dashboard/admin/analytics", label: "Analytics" },
  ] : [
    { icon: LayoutDashboard, href: "/dashboard/buyer", label: "Overview" },
    { icon: ShoppingBag, href: "/dashboard/buyer/orders", label: "My Orders" },
    { icon: HeaterIcon, href: "/dashboard/buyer/wishlist", label: "Wishlist" },
    { icon: CreditCard, href: "/dashboard/buyer/payments", label: "Payment History" },
    { icon: Users, href: "/dashboard/buyer/edit-profile", label: "Profile" },
  ];

  return (
    <div className="flex flex-col m-h-screen">
      {/* Desktop Sidebar */}
      <aside className="hidden w-64 shrink-0 border-r border-emerald-500/20 bg-zinc-950 lg:flex flex-col h-full">
        <div className="p-6 border-b border-emerald-500/20">
          <Link href="/" className="font-bold text-2xl tracking-tight text-white flex items-center gap-1">
            Loop<span className="text-emerald-400">-Market</span>
          </Link>
        </div>

        <nav className="flex-1 p-4 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.label} href={item.href}>
                <button
                  className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm transition-all ${
                    isActive 
                      ? "bg-emerald-600 text-white" 
                      : "text-emerald-300 hover:bg-emerald-900/50 hover:text-emerald-400"
                  }`}
                >
                  <item.icon className={`size-5 ${isActive ? "text-white" : "text-emerald-500"}`} />
                  {item.label}
                </button>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Mobile Drawer */}
      <Drawer>
        <Button className="lg:hidden" variant="secondary">
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
                <nav className="flex flex-col gap-1">
                  {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <Link key={item.label} href={item.href}>
                        <button
                          className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm transition-all ${
                            isActive 
                              ? "bg-emerald-600 text-white" 
                              : "text-emerald-300 hover:bg-emerald-900/50 hover:text-emerald-400"
                          }`}
                        >
                          <item.icon className={`size-5 ${isActive ? "text-white" : "text-emerald-500"}`} />
                          {item.label}
                        </button>
                      </Link>
                    );
                  })}
                </nav>
              </Drawer.Body>
            </Drawer.Dialog>
          </Drawer.Content>
        </Drawer.Backdrop>
      </Drawer>
    </div>
  );
}