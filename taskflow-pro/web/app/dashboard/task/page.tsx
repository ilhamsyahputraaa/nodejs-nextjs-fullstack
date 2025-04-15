import { DataTable } from "@/components/data-table";
import { SectionCards } from "@/components/section-cards";
import React from "react";
import data from "../data.json";
import { SiteHeader } from "@/components/site-header";

export default function page() {
  return (
    <div>
      <SiteHeader pageTitle={"Task"} />

      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        <SectionCards />
        <DataTable data={data} />
      </div>
    </div>
  );
}
