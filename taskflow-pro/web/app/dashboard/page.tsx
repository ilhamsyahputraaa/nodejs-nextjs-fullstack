import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { getUserList } from "../api/user";
import SectionCards from "@/components/section-cards";
import { SiteHeader } from "@/components/site-header";
import { userColumns } from "@/components/tables/columns/user-columns";
import { UserDataTable } from "@/components/tables/user-table";
// import { DataTableTemplate } from "@/components/tables/TableTemplate";

type Props = {
  searchParams: {
    page?: string;
    limit?: string;
  };
};

export default async function Page({ searchParams }: Props) {
  const page = parseInt(searchParams.page || "1", 10);
  const limit = parseInt(searchParams.limit || "10", 10);

  const { data: users } = await getUserList(page, limit);

  console.log(users);

  return (
    <>
      <SiteHeader pageTitle="Dashboard" />

      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        <SectionCards />
        <div className="px-4 lg:px-6">
          <ChartAreaInteractive />
        </div>
        <UserDataTable
          data={users}
          columns={userColumns}
          title={"User Table"}
        />
        {/* <DataTableTemplate columns={users} data={userColumns} /> */}
      </div>
    </>
  );
}
