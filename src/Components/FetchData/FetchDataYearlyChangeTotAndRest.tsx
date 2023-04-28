import React, {useState, useEffect} from "react";
import axios from 'axios';
import DataVisualizerYearlyTotAndRest, {DataYearlyChangeTotAndRest} from "../VisualizeData/DataVisualizerYearlyChangeTotAndRest";

const client = axios.create({
    baseURL: "https://api.scb.se/OV0104/v1/doris/sv/ssd/START/PR/PR0101/PR0101A"
});

const queryKpiTot = JSON.stringify({
    "query": [
      {
        "code": "ContentsCode",
        "selection": {
          "filter": "item",
          "values": [
            "000004VV"
          ]
        }
      }
    ],
    "response": {
      "format": "json"
    }
  });

const queryKpiRest = JSON.stringify({
"query": [
    {
    "code": "VaruTjanstegrupp",
    "selection": {
        "filter": "vs:VaruTjänstegrCoicopB",
        "values": [
        "11.1"
        ]
    }
    },
    {
    "code": "ContentsCode",
    "selection": {
        "filter": "item",
        "values": [
        "000002ZI"
        ]
    }
    } 
    ],
    "response": {
    "format": "json"
    }
});

const YearlyKPIAndRest: React.FC = () => { 

    const [scbData, setScbData] = useState<DataYearlyChangeTotAndRest[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect( () => {
        const fetchData = async () => {
        try {
            let responseTot = await client.post('KPItotM', queryKpiTot);
            let responseRest = await client.post('KPICOI80MN', queryKpiRest);

            const totData = responseTot.data.data;
            const restData = responseRest.data.data;
            
            const mappedTotAndRest: DataYearlyChangeTotAndRest[] = totData.map((tot:any, index: any) => {
            const rest = restData[index];
                
                return {
                    month: tot.key[0],
                    indexKPI: tot.values[0],
                    indexRest: rest.values[0]
                } as DataYearlyChangeTotAndRest;
            });
            setScbData(mappedTotAndRest);
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
            <DataVisualizerYearlyTotAndRest data={scbData}/>
        </div>
    )
}

export default YearlyKPIAndRest;