import React, {useState, useEffect} from "react";
import axios from 'axios';
import DataVisualizerYearlyTotAndRest, {DataYearlyChangeTotAndRest} from "./DataVisualizerYearlyChangeTotAndRest";

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

    const FetchDataYearlyKPI: React.FC = () => { 
  
        const [scbData, setScbData] = useState<DataYearlyChangeTotAndRest[]>([]);
    
        useEffect( () => {
            const fetchData = async () => {
            try {
                let responseTot = await client.post('KPItotM', queryKpiTot);
                let responseRest = await client.post('KPICOI80MN', queryKpiRest);

                console.log("Från FetchDataComponentTot");
                console.log(responseTot.data);
                console.log("Från FetchDataComponentRest");
                console.log(responseRest.data);
                const totData = responseTot.data.data;
                const restData = responseRest.data.data;
                console.log("Data data tot: ");

                console.log(totData)
                var c = [...totData, ...restData]
                console.log(c);

                console.log(c);

                const mappedData = responseTot.data.data.map((item: any) => ({
                  month: item.key[1],
                  index: item.values[0]
                })) as DataYearlyChangeTotAndRest[];
                setScbData(mappedData);
            }
            catch (error) {
                console.log(error);
            }
            };
            fetchData();
            
        }, []);
    
        return(
            <div>
              <DataVisualizerYearlyTotAndRest data={scbData}/>
            </div>
        )
    }
    
    export default FetchDataYearlyKPI;