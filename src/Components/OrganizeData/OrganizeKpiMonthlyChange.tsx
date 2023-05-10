import ChartKpiMonthlyChange from "../Charts/ChartKpiMonthlyChange";
import {MonthlyKpiChangeProps} from "../../Interfaces/IMonthlyKpiChange"

  interface Props {
    data: MonthlyKpiChangeProps[];
  }

const OrganizeKpiMonthlyChange: React.FC<Props> = ({ data }) => 
{
    const slicedData = data.slice(-27);

    const dataMax = Math.max(...slicedData.map((item) => item.index));
    const dataMin = Math.min(...slicedData.map((item) => item.index));
    const yAxisDomain = [(dataMin - 0.1), (dataMax + 0.1)];

    return (
      <ChartKpiMonthlyChange data={slicedData} yAxisDomain={yAxisDomain}/>
    );
};

export default OrganizeKpiMonthlyChange;