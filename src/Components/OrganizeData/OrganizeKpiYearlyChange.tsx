
import {YearlyKpiChangeProps} from '../../Interfaces/IYearlyKpiChange';
import ChartKpiYearlyChange from '../VisualizeData/ChartKpiYearlyChange';

interface Props {
    data: YearlyKpiChangeProps[];
}

const OrganizeKpiYearly: React.FC<Props> = ({data}) => {

    //Möjligen att data kan slice:as här
    
    return(
    <div> 
        <ChartKpiYearlyChange data={data}/>
    </div>
    )
}

export default OrganizeKpiYearly;