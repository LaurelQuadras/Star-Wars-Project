export default function TableHeaderComponent() {
  const tableHeaderColumns: string[] = [
    "Name",
    "Climate",
    "Diameter",
    "Population",
    "Favorite",
  ];
  return (
    <div className="table-header-component">
      {tableHeaderColumns.map((tableHeaderColumn: string, index: number) => (
        <div key={index} className="table-header-component__column">
          <span className="table-header-component__column--text">
            {tableHeaderColumn}
          </span>
        </div>
      ))}
    </div>
  );
}
