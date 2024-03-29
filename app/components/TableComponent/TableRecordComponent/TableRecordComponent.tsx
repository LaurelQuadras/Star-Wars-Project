import { useRouter } from "next/navigation";
import { TableRecordComponentProps } from "./TableRecordComponent.props";
import FavoriteIconComponent from "../../FavoriteIconComponent/FavoriteIconComponent";

export default function TableRecordComponent({
  planetData,
}: TableRecordComponentProps) {
  const router = useRouter();

  const onTableRecordClick = (): void => {
    const url = `/planets/${planetData.id}`;
    router.replace(url);
  };

  return (
    <div
      className="table-record-component"
      onClick={onTableRecordClick}
      data-testid="table-record-component"
    >
      {Object.entries(planetData)
        .slice(1)
        .map((tableRecordColumn: any, index: number) => (
          <div key={index} className="table-record-component__column">
            {tableRecordColumn[0] !== "favorite" ? (
              <span
                className={`table-record-component__column-${
                  tableRecordColumn[0] === "name" ? "-name" : "-text"
                }`}
                data-testid={`table-record-component-${tableRecordColumn[0]}-column`}
              >
                {tableRecordColumn[1]}
              </span>
            ) : (
              <FavoriteIconComponent planetData={planetData} />
            )}
          </div>
        ))}
    </div>
  );
}
