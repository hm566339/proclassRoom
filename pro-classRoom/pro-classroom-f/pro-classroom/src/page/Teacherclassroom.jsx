import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "submitted",
    totalAmount: "60",
  },
  {
    invoice: "INV002",
    paymentStatus: "submitted",
    totalAmount: "10",
  },
  {
    invoice: "INV003",
    paymentStatus: "submitted",
    totalAmount: "50",
  },
  {
    invoice: "INV004",
    paymentStatus: "not submitted",
    totalAmount: "",
  },
  {
    invoice: "INV005",
    paymentStatus: "not submitted",
    totalAmount: "",
  },
  {
    invoice: "INV006",
    paymentStatus: "submitted",
    totalAmount: "80",
  },
  {
    invoice: "INV007",
    paymentStatus: "not submitted",
    totalAmount: "",
  },
];

export const Teacherclassroom = () => {
  return (
    <Table>
      <TableCaption>A list of your recent Students.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Name</TableHead>
          <TableHead>Status</TableHead>

          <TableHead className="text-right">
            Presenters of Plagiarism{" "}
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice) => (
          <TableRow key={invoice.invoice}>
            <TableCell className="font-medium ">{invoice.invoice}</TableCell>
            <TableCell>{invoice.paymentStatus}</TableCell>
            <TableCell className="text-right">{invoice.totalAmount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={2}>Average </TableCell>
          <TableCell className="text-right">50</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};
