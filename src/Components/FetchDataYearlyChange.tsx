import React, {useState, useEffect} from "react";
import axios from 'axios';
import DataVisualizerYearlyChange, {DataYearlyChange} from "./DataVisualizerYearlyChange";

const client = axios.create({
    baseURL: "https://api.scb.se/OV0104/v1/doris/sv/ssd/START/PR/PR0101/PR0101A/KPICOI80MN"
});

const query = JSON.stringify({
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
  
        const [scbData, setScbData] = useState<DataYearlyChange[]>([]);
    
        useEffect( () => {
            const fetchData = async () => {
            try {
                let response = await client.post('', query);
                console.log("Från FetchDataComponent");
                console.log(response.data);
                const mappedData = response.data.data.map((item: any) => ({
                  month: item.key[1],
                  index: item.values[0]
                })) as DataYearlyChange[];
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
              <DataVisualizerYearlyChange data={scbData}/>
            </div>
        )
    }
    
    export default FetchDataYearlyKPI;