

import { auth } from "@/lib/auth";
import {Bars, Bell, CreditCard, Envelope, Gear, House, Magnifier, Person} from "@gravity-ui/icons";
import {Button, Drawer} from "@heroui/react";
import { BarChart3, BoxIcon, ChartAreaIcon, HeaterIcon, LayoutDashboard, Package, Plus, PlusIcon, ShoppingBag, ShoppingCart, Users } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";

export async function Navigation () {
  
const user = await auth.api.getSession({
    headers: await headers() // you need to pass the headers object.
})
console.log();

  const navItems  = user?.user?.role ==="seller"
?    [
    {icon: LayoutDashboard, href:"/", label: "Overview"},
    {icon: PlusIcon,href:"/dashboard/seller/addProduct", label: "Add Product"},
    {icon: BoxIcon,href:"/dashboard/seller/MyProduct", label: "My Product"},
    {icon: ShoppingBag,href:"/dashboard/seller/orders", label: "Oders"},
    {icon: ChartAreaIcon,href:"/", label: "Analytics"},
    {icon: Person,href:"/", label: "Profile"},
  ]:user?.user?.role ==="admin"?[
  {
    icon: LayoutDashboard,
    href: "/dashboard/admin",
    label: "Overview"
  },
  {
    icon: Plus,
    href: "/dashboard/add-product",
    label: "Add Product"
  },
  {
    icon: Package,
    href: "/dashboard/admin/allproducts",
    label: "All Products"
  },
  {
    icon: Users,
    href: "/dashboard/admin/user",           // or "/dashboard/buyers" if needed
    label: "Users"
  },
  {
    icon: ShoppingCart,
    href: "/dashboard/orders",
    label: "Orders"
  },
  {
    icon: BarChart3,
    href: "/dashboard/analytics",
    label: "Analytics"
  },
]:[
  {
    icon: LayoutDashboard,
    href: "/dashboard/buyer",
    label: "Overview",
  },
  {
    icon: ShoppingBag,
    href: "/dashboard/buyer/orders",
    label: "My Orders",
  },
  {
    icon: HeaterIcon,
    href: "/dashboard/buyer/wishlist",
    label: "Wishlist",
  },
  {
    icon: CreditCard,
    href: "/dashboard/buyer/payments",
    label: "Payment History",
  },
  {
    icon: Users,
    href: "/dashboard/buyer/profile",
    label: "Profile",
  },
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