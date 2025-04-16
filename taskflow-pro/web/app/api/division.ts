import { cookies } from "next/headers";


const API_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080/api";



export const getDivisions = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) throw new Error("Token not found");

  const res = await fetch(`${API_URL}/division/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Failed to fetch profile");

  return res.json();
};


export const getDivisionsById = async (id:string) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) throw new Error("Token not found");

  const res = await fetch(`${API_URL}/division/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Failed to fetch profile");

  return res.json();
};





export async function createDivision({
  name,
}: {
  name: string;
}) {

  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) throw new Error("Token not found");
  const res = await fetch(`${API_URL}/api/division/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name }),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message );
  }

  const data = await res.json();

  return data;
}



export async function addMemberDivision({ divisionId, userId,role }: { divisionId: string, userId:string, role:string }) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) throw new Error("Token not found");
  const res = await fetch(`${API_URL}/api/division/add-member`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ divisionId, userId,role }),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message );
  }

  const data = await res.json();

  return data;
}




export async function updateMemberRole({
  memberId,
  newRole,
}: {
  memberId: string;
  newRole: string;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) throw new Error("Token not found");
  const res = await fetch(`${API_URL}/api/division/update-role`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ memberId, newRole }),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message);
  }

  const data = await res.json();

  return data;
}



export async function deleteMember({
  memberId,
  
}: {
  memberId: string;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) throw new Error("Token not found");
  const res = await fetch(`${API_URL}/api/division/remove-member/${memberId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ memberId, }),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message);
  }

  const data = await res.json();

  return data;
}

