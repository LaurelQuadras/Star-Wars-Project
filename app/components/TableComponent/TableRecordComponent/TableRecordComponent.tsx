import { TableRecordComponentProps } from "./TableRecordComponent.props";
import FavoriteComponent from "../../FavoriteComponent/FavoriteComponent";

export default function TableRecordComponent({
  planetData,
}: TableRecordComponentProps) {
  return (
    <div className="table-record-component">
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
              <FavoriteComponent />
            )}
          </div>
        )
      )}
    </div>
  );
}
