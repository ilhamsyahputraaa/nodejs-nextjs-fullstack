import { cookies } from "next/headers";

const API_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080/api";

  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

export const getUserDetail = async(userId:string) => {

     if (!token) throw new Error("Token not found");

     const res = await fetch(`${API_URL}/user/${userId}`, {
       headers: {
         Authorization: `Bearer ${token}`,
       },
     });

     if (!res.ok) throw new Error("Failed to fetch profile");

     return res.json();
}

export const putUpdateUser = async(name:string, image:string) =>{
     if (!token) throw new Error("Token not found");

     const res = await fetch(`${API_URL}/user/update`, {
       method: "PUT",
       headers: {
         Authorization: `Bearer ${token}`,
         "Content-Type": "application/json",
       },
       body: JSON.stringify({ name, image }),
     });

     if (!res.ok) throw new Error("Failed to Update Profile");

     return res.json()
}


export const putUpdatePasswordUser = async (oldPassword: string, newPassword:string) => {
  if (!token) throw new Error("Token not found");

  const res = await fetch(`${API_URL}/user/update-password`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ oldPassword, newPassword }),
  });

  if (!res.ok) throw new Error("Failed to Update Password");

  return res.json();
};

