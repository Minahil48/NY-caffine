"use server";
import 'server-only'
import getAuthHeaders from '@/authHeader';
 
export async function LogoutAPI() {
   const headers = await getAuthHeaders();
}