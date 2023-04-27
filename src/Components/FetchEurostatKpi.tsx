import React, {useState, useEffect} from "react";
import axios, {AxiosResponse} from 'axios';
import DataVisualizerEurostat, { euostatDataIndex } from "./DataVisualizerEurostat";

const client = axios.create({
    baseURL: "https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/"
});

const indexUrl = "PRC_HICP_MIDX?format=JSON&lang=EN&coicop=cp111&unit=I15&geo="

  /* interface EurostatResponse {
    data: {
      value: number
      dimension: { time: { category: { label:  number } } };
    };
  }

  const countries = ["SE", "DK", "NO", "FI"]; */

    const FetchEurostatData: React.FC = () => { 
  
        const [eurostatIndex, setEurostatIndex] = useState<euostatDataIndex[]>([]);
        const [error, setError] = useState<string | null>(null);
    
        useEffect( () => {
            const fetchData = async () => {
            try {
                let responseIndexSE = await client.get(indexUrl + 'SE');
                let responseIndexDK = await client.get(indexUrl + 'DK');
                let responseIndexNO = await client.get(indexUrl + 'NO');
                let responseIndexFI = await client.get(indexUrl + 'FI');
/* 
                const responses: AxiosResponse<EurostatResponse>[] = await Promise.all(
                    countries.map((country => client.get(indexUrl + country) ))
                ); */
             
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
    
                console.log("trix månad: ", indexMonth)
                console.log("trix index se: ", seIndexData)

                /* const eurostatIndexData: EurostatData[] = responses[0].data.data.value.map((item:any, index: number) => {
                    const countryData = responses.map(response => Object.entries(response.data.value)[index][1]);
                    const month = responses[0].data.data.dimension.time.category.label[index];
                    return {
                      month: month,
                      indexSE: countryData[0],
                      indexDK: countryData[1],
                      indexNO: countryData[2],
                      indexFI: countryData[3],
                    } as EurostatData;
                  }); */

                const mappedEurostatIndex: euostatDataIndex[] = seIndexData.map((item:any, index: any) => {
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
                    } as euostatDataIndex;
                }); 
                console.log("eurostatdata från fetch: ", mappedEurostatIndex)           
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
                <DataVisualizerEurostat data={eurostatIndex}/>
            </div>
        )
    }
    
    export default FetchEurostatData;