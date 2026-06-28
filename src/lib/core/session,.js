"use server"

import { headers } from "next/headers";
import { auth } from "../auth";
import { redirect } from "next/navigation";

export const getUser = async (role) => {
  const user = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });
  const data = user?.user;
  if (!data) {
    redirect("/auth/singIn");
  }
  if (data.role !== role) {
    redirect("/unauthorized");
  }
};

export const getUsers = async () => {
  const user = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });
  return user.user;
};

export const buyerInfo = async (email) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/api/users/${email}`,{
    headers: await authHeader()
  });
  const data = await res.json();
  return data;
};

export const paymentInfo = async (data, method = "POST") => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/api/payments`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...await authHeader()
    },
    body: JSON.stringify(data),
  });
  const datas = await res.json();

  console.log(datas);
  return datas;
};

export const getUserToken = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return session?.session?.token || null;
};

export const authHeader = async () => {
  const token = await getUserToken();
  const header = token
    ? {
        authorization: `Bearer ${token}`,
      }
    : {};
  return header;
};
