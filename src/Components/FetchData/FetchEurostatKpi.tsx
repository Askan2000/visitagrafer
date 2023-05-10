import React, {useState, useEffect} from "react";
import axios from 'axios';
import OrganizeEurostatKpi from "../OrganizeData/OrganizeEurostatKpi";
import { EuostatKpiProps } from "../../Interfaces/IEurostatKpi";

const client = axios.create({
    baseURL: "https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/"
});

const indexUrl = "PRC_HICP_MIDX?format=JSON&lang=EN&coicop=cp111&unit=I15&geo="

    const EurostatData: React.FC = () => { 
  
        const [eurostatIndex, setEurostatIndex] = useState<EuostatKpiProps[]>([]);
        const [error, setError] = useState<string | null>(null);
    
        useEffect( () => {
            const fetchData = async () => {
            try {
                let responseIndexSE = await client.get(indexUrl + 'SE');
                let responseIndexDK = await client.get(indexUrl + 'DK');
                let responseIndexNO = await client.get(indexUrl + 'NO');
                let responseIndexFI = await client.get(indexUrl + 'FI');

                const seIndexData = Object.entries(responseIndexSE.data.value).map(([, value]) => ({
                    value
                  }));

                const dkIndexData = Object.entries<number>(responseIndexDK.data.value).map(([, value]) => ({
                    value
                }));

                const noIndexData = Object.entries(responseIndexNO.data.value).map(([, value]) => ({
                    value
                  }));
                  
                const fiIndexData = Object.entries(responseIndexFI.data.value).map(([,value]) => ({
                    value
                }));

                const indexMonth = Object.entries(
                    responseIndexSE.data.dimension.time.category.label).map(([,value]) => ({
                    value
                    }));

                const mappedEurostatIndex: EuostatKpiProps[] = seIndexData.map((item:any, index: any) => {
                    const dk = dkIndexData[index];
                    const no = noIndexData[index];
                    const fi = fiIndexData[index];
                    const date = indexMonth[index]
                    return {
                        month: date.value,
                        indexSE: item.value,
                        indexDK: dk.value,
                        indexNO: no.value,
                        indexFI: fi.value,
                    } as EuostatKpiProps;
                }); 
                setEurostatIndex(mappedEurostatIndex);
            }
            catch (error) {
                setError("An error occurred while fetching data.");
            }
            };
            fetchData();
            
        }, []);
    
    if (error) {
        return <div>{error}</div>;
    }
    return(
        <div>
            <OrganizeEurostatKpi data={eurostatIndex}/>
        </div>
    )
}

export default EurostatData;