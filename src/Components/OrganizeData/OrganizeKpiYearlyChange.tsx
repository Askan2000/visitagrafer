import {YearlyKpiChangeProps} from '../../Interfaces/IYearlyKpiChange';
import ChartKpiYearlyChange from '../Charts/ChartKpiYearlyChange';

interface Props {
    data: YearlyKpiChangeProps[];
}
  
const OrganizeKpiYearlyChange: React.FC<Props> = ({ data }) => {

    const slicedData = data.slice(-27);

    const dataMax = Math.max(...slicedData.map((item) => item.index));
    const dataMin = Math.min(...slicedData.map((item) => item.index));
    const yAxisDomain = [(dataMin - 0.1), (dataMax + 0.1)];

    return (
      <ChartKpiYearlyChange data={slicedData} yAxisDomain={yAxisDomain}/>
    );
};

export default OrganizeKpiYearlyChange;