import ChartEurostatKpi from "../Charts/ChartEurostatKpi";
import { EuostatKpiProps } from "../../Interfaces/IEurostatKpi";

interface Props {
    data: EuostatKpiProps[];
}

const OrganizeEurostatKpi: React.FC<Props> = ({data}) => {

    const ticks = data.filter((item, index) => index % 12 === 0).map((item) => item.month);
    const slicedData = data.slice(216);
    
    const maxIndex = Math.max(
        ...slicedData.map((item) => item.indexSE),
        ...slicedData.map((item) => item.indexDK),
        ...slicedData.map((item) => item.indexNO),
        ...slicedData.map((item) => item.indexFI)
    )
        const yAxisDomain = [90, Math.ceil(maxIndex / 10) * 10];
   
return(
    <ChartEurostatKpi data={slicedData} yAxisDomain={yAxisDomain} ticks={ticks}/>
    )
}

export default OrganizeEurostatKpi;