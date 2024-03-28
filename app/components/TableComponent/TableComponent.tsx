import { PlanetData } from "@/app/models/planetData";
import TableHeaderComponent from "./TableHeaderComponent/TableHeaderComponent";
import TableRecordComponent from "./TableRecordComponent/TableRecordComponent";

export default function TableComponent() {
  const ar: PlanetData[] = [
    {
      name: "Yavin",
      climate: "temperate",
      diameter: 10200,
      population: 1000,
      favorite: false,
    },
    {
      name: "Hoth",
      climate: "frozen",
      diameter: 7200,
      population: "unknown",
      favorite: false,
    },
    {
      name: "Dagobah",
      climate: "murky",
      diameter: 8900,
      population: "unknown",
      favorite: false,
    },
    {
      name: "Bespin",
      climate: "temperate",
      diameter: 11800,
      population: 6000000,
      favorite: false,
    },
    {
      name: "Endor",
      climate: "temperate",
      diameter: 4900,
      population: 4500000000000,
      favorite: false,
    },
  ];

  return (
    <div className="table-component">
      <TableHeaderComponent />
      {ar.map((value: any, index: number) => (
        <TableRecordComponent key={index} planetData={value} />
      ))}
    </div>
  );
}
