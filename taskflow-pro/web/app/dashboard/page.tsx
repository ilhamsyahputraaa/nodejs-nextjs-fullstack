import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { getUserList } from "../api/user";
import { DataTable } from "@/components/data-table";
import SectionCards from "@/components/section-cards";
import { SiteHeader } from "@/components/site-header";
import { userColumns } from "@/components/tables/user-columns";

export default async function Page() {
  const { users } = await getUserList();

  console.log(users);
  
  return (
    <>
      <SiteHeader pageTitle="Dashboard" />

      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        <SectionCards />
        <div className="px-4 lg:px-6">
          <ChartAreaInteractive />
        </div>
        <DataTable data={users} columns={userColumns} />
      </div>
    </>
  );
}
