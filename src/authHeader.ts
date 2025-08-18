import { cookies } from "next/headers";
const getAuthHeaders = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) throw new Error("No auth token found.");

  return {
    Authorization: `Bearer ${token}`,
  };
};
export default getAuthHeaders;
