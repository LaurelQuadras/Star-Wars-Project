import { TableRecordComponentProps } from "./TableRecordComponent.props";
import FavoriteIconComponent from "../../FavoriteIconComponent/FavoriteIconComponent";

export default function TableRecordComponent({
  planetData,
  onTableRecordClick,
}: TableRecordComponentProps) {
  return (
    <div
      className="table-record-component"
      onClick={() => onTableRecordClick(planetData.name)}
    >
      {Object.entries(planetData).map(
        (tableRecordColumn: any, index: number) => (
          <div key={index} className="table-record-component__column">
            {tableRecordColumn[0] !== "favorite" ? (
              <span
                className={`table-record-component__column-${
                  tableRecordColumn[0] === "name" ? "-name" : "-text"
                }`}
              >
                {tableRecordColumn[1] !== undefined
                  ? tableRecordColumn[1]
                  : "unknown"}
              </span>
            ) : (
              <FavoriteIconComponent />
            )}
          </div>
        )
      )}
    </div>
  );
}
