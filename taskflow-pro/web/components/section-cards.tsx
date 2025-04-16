// SectionCards.tsx (harus di luar "use client")
import { getUserSummary } from "@/app/api/user";
import CardItem from "./card-item";

export default async function SectionCards() {
  const summary = await getUserSummary();

  const data = [
    {
      title: "Users",
      value: `${summary.users}`,
      percentage: 12,
      legend: "Users naik",
      description: "Jumlah total user",
    },
    {
      title: "Divisions",
      value: `${summary.divisions}`,
      percentage: 8,
      legend: "Divisi aktif",
      description: "Total divisi",
    },
    {
      title: "Projects",
      value: `${summary.projects}`,
      percentage: 20,
      legend: "Banyak project",
      description: "Total proyek aktif",
    },
    {
      title: "Tasks",
      value: `${summary.tasks}`,
      percentage: 10,
      legend: "Task meningkat",
      description: "Total task terdata",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      {data.map((item, index) => (
        <CardItem
          key={index}
          title={item.title}
          value={item.value}
          percentage={item.percentage}
          legend={item.legend}
          description={item.description}
        />
      ))}
    </div>
  );
}
