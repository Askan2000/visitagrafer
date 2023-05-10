import {YearlyChangeTotKpiAndRestProps} from "../../Interfaces/IYearlyChangeTotKpiAndRest"
import ChartKpiYearlyChangeTotAndRest from "../Charts/ChartKpiYearlyChangeTotAndRest";

  interface Props {
    data: YearlyChangeTotKpiAndRestProps[];
  }
  
const OrganizeTotKpiAndRest: React.FC<Props> = ({data}) => {
    
    const firstValidIndexRestIndex = data.findIndex((item) => !isNaN(item.indexRest));
    const filteredData = data.slice(firstValidIndexRestIndex);

    const slicedData = filteredData.slice(-25);

    const maxIndex = Math.max(
        ...slicedData.map((item) => item.indexKPI),
        ...slicedData.map((item) => item.indexRest)
    )
    const minIndex = Math.min(
        ...slicedData.map((item) => item.indexKPI),
        ...slicedData.map((item) => item.indexRest)
    )
    const yAxisDomain = [minIndex - 1, maxIndex + 1];

    return (
      <ChartKpiYearlyChangeTotAndRest data={slicedData} yAxisDomain={yAxisDomain}/>
      );
};

export default OrganizeTotKpiAndRest;