import React, {useState, useEffect} from "react";
import axios from 'axios';
import DataVisualizerMonthlyChange, {DataMonthlyChange} from "./DataVisualizerMonthlyChange";

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
          "000003TL"
        ]
      }
    }
  ],
  "response": {
    "format": "json"
  }
});

const FetchDataMonthlyKPI: React.FC = () => { 
  
    const [scbData, setScbData] = useState<DataMonthlyChange[]>([]);

    useEffect( () => {
        const fetchData = async () => {
        try {
            let response = await client.post('', query);
            console.log("Från FetchDataComponent");
            console.log(response.data);
            const mappedData = response.data.data.map((item: any) => ({
              month: item.key[1],
              index: item.values[0]
            })) as DataMonthlyChange[];
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
          <DataVisualizerMonthlyChange data={scbData}/>
        </div>
    )
}

export default FetchDataMonthlyKPI;

