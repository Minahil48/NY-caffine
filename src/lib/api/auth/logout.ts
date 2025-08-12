"use server";
import 'server-only'
import { cookies } from 'next/headers'
 
export async function LogoutAPI() {
  const cookieStore = await cookies()
  cookieStore.delete('token')
}