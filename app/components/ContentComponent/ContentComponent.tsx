import { ContentComponentProps } from "./ContentComponent.props";
import TableComponent from "../TableComponent/TableComponent";

export default function ContentComponent({
  planetsData,
}: ContentComponentProps) {
  return (
    <div className="content-component">
      <span className="content-component__text">Planets</span>
      <TableComponent planetsData={planetsData} />
    </div>
  );
}
