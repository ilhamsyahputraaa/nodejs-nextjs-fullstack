import { cookies } from "next/headers";

const API_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080/api";

  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  

export const getUserTasks = async (userId:string) => {

  if (!token) throw new Error("Token not found");

  const res = await fetch(`${API_URL}/task/user/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Failed to fetch profile");

  return res.json();
};

export const getTasksById = async (id: string) => {

  if (!token) throw new Error("Token not found");

  const res = await fetch(`${API_URL}/task/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Failed to fetch profile");

  return res.json();
};

export async function createTask({ name,assignedToId, description, dueDate,projectId, status, division_id }: { name: string, division_id:string, assignedToId:string, description:string, dueDate:Date, projectId:string, status:string }) {

  if (!token) throw new Error("Token not found");
  const res = await fetch(`${API_URL}/api/task/create`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name,assignedToId, description, dueDate, projectId,status,  division_id }),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message);
  }

  const data = await res.json();

  return data;
}

export async function updateMemberRole({
  name,
  assignedToId,
  description,
  dueDate,
  projectId,
  status,
  division_id,
}: {
  name: string;
  division_id: string;
  assignedToId: string;
  description: string;
  dueDate: Date;
  projectId: string;
  status: string;
}) {
  if (!token) throw new Error("Token not found");
  const res = await fetch(`${API_URL}/api/task/update`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      assignedToId,
      description,
      dueDate,
      projectId,
      status,
      division_id,
    }),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message);
  }

  const data = await res.json();

  return data;
}

export async function deleteTask({ memberId }: { memberId: string }) {

  if (!token) throw new Error("Token not found");
  const res = await fetch(`${API_URL}/api/task/delete/${memberId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message);
  }

  const data = await res.json();

  return data;
}
