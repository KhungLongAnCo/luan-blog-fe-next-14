// "use client";

import { ColumnDef } from "@tanstack/react-table";
import { CustomTable } from "./CustomTable";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

export const columns: ColumnDef<Payment>[] = [
  { accessorKey: "status", header: "Status" },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "amount", header: "Amount" },
];

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    { id: "728ed52f", amount: 100, status: "pending", email: "m@example.com" },
    // ...
  ];
}

export default async function DemoPage() {
  const data = await getData();

  return (
    <div className="container mx-auto py-10">
      <CustomTable columns={columns} data={data} />
    </div>
  );
}
