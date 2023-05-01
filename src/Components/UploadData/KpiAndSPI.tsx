import {utils, read} from 'xlsx';
import {useState,useCallback, useEffect} from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend} from "recharts";
import FileSaver from "file-saver";
import { useCurrentPng } from "recharts-to-png";
import axios from 'axios';
import {DataYearlyChange} from "../VisualizeData/DataVisualizerYearlyChange";
import { round } from '../Utils/DecimalHandler';

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

    const customLabel = (props: any) => {
        const {
           x, y, value
          } = props;
            const customValue = round(value, 1).toFixed(1);
            return(
            <text x={x} y={y} dy={-7} dx={-5} fontSize='10' textAnchor='top'>
              {customValue}
            </text>
            )
      };

const KpiAndSPI = () => {
    const [xlsxData, setXlsxData] = useState<any[]>([]);
    const [scbData, setScbData] = useState<DataYearlyChange[]>([]);
    const [combinedData, setCombinedData] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);

    const [getPng, { ref, isLoading }] = useCurrentPng();

    //Metod för Export-knappen som sparar xlsx-fil på disk, med hjälp av xlsx-biblioteket
    const handleDownload = useCallback(async () => {
        const png = await getPng();
        if (png) {
        FileSaver.saveAs(png, 'SPI och KPI restauranger årstakt.png');
        }
    }, [getPng]);

    //Metod för att hantera uppladdad fil genom knappen
    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {

        const file = event.target.files?.[0];
      
        if (file) {
          const reader = new FileReader();
          reader.onload = (event) => {
            const fileContent = event.target?.result;
      
            if (fileContent) {
              const wb = read(event.target.result);
              const sheets = wb.SheetNames;
      
              if (sheets.length) {
                const jsonRows = utils.sheet_to_json(wb.Sheets[sheets[0]]);
                const slicedData = jsonRows.slice(200, -5);
                calculatePercentageChange(slicedData)
              }
            }
          };
          reader.readAsArrayBuffer(file);
        }
      }

    // Metod för att ta fram årlig förändringstakt från array med index
    const calculatePercentageChange = (props:any[]) => {
    const spi = props.map((item: any) => {
        return{
            month: item.__EMPTY,
            value: item.__EMPTY_13
        }
    });
    const yearlyChangeArray = spi.slice(12).map((currentItem, index) => {
        const prevItem = spi[index];
        const percentageChange = ((currentItem.value / prevItem.value) - 1) * 100;
        return {
            month: currentItem.month,
            percentageChange: percentageChange
        };
        });
        setXlsxData(yearlyChangeArray);
    };

    // Metod för API-anrop till SCB och spara data i state
    useEffect( () => {
        const fetchData = async () => {
        try {
            let response = await client.post('', query);
            const mappedData = response.data.data.map((item: any) => ({
                month: item.key[1],
                index: item.values[0]
            })) as DataYearlyChange[];
            setScbData(mappedData);
        }
        catch (error) {
            setError("An error occurred while fetching data.");
        }
        };
        fetchData();
        
    }, []);

    // Skapar array med data att plotta. Körs bara när state ändras för xlsxData el scbData
    useEffect(( ) => {
        if(xlsxData.length > 0 && scbData.length > 0){
            const slicedDataToFitSPI = scbData.slice(460);
            const combinedDataArray = slicedDataToFitSPI.map((item:any, index:number ) => {
                
            const spiDataPoint = xlsxData[index];
            return {
                month: item.month,
                restSpi: spiDataPoint,
                restKpi: item.index
            };
            });

            const slicedCombinedData = combinedDataArray.slice(-25)
            setCombinedData(slicedCombinedData);
        }
    }, [xlsxData, scbData]);

    const dataMax = Math.max(
        ...combinedData.map((item) => item.restSpi),
        ...combinedData.map((item) => item.restKpi)
    )
    const dataMin = Math.min(
        ...combinedData.map((item) => item.restSpi),
        ...combinedData.map((item) => item.restKpi)
    )
    const yAxisDomain = [(dataMin - 2), (dataMax + 2)];
    
    if (error) {
        return <div>{error}</div>;
    }
    return(
    <>
        <input type="file" onChange={handleFileUpload} />
        {
            (xlsxData.length > 0 && scbData.length > 0)
            ?
            <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}> 
                <div>
                    <LineChart width={800} height={550} data={combinedData} ref={ref}
                    margin={{ top: 110, right: 40, left: 50, bottom: 50 }}>
                    <text x={20} y={20} 
                    style={{fontSize: 24, fontWeight: 'bold', fill: '#595959'}}>
                    Inköpspriser på livsmedel för restaurangföretag (t.o.m. {scbData[scbData.length-1]?.month})
                    </text>
                    <text x={20} y={45} 
                    style={{fontSize: 24, fontWeight: 'bold', fill: '#595959'}}>
                    och försäljningspriser på restaurang till konsument (KPI - COICOP)
                    </text>
                    <text x={20} y={70} 
                    style={{fontSize: 18, fill: '#595959'}}>
                    Procentuell förändring jämfört med motsvarande månad föregående år
                    </text>
                    <text x={20} y={95} 
                    style={{fontSize: 16, fontStyle:'italic', fill: '#595959'}}>
                    Källa: KPI/SCB och Storhushållsprisindex
                    </text>
                    <XAxis dataKey="month" interval={0} angle={-45} textAnchor="end" 
                    tickMargin={20}/>
                    <YAxis hide domain={yAxisDomain}/>
                    <Tooltip />
                    <Line isAnimationActive={false} name="Restaurangpriser till konsument" type="monotone" dataKey="restKpi" 
                    stroke="#AEBD15" label={customLabel}/>
                    <Line isAnimationActive={false} name="Inköpspriser på restaurangföretag" type="monotone" dataKey="restSpi.percentageChange" 
                    stroke="#479A96" label={customLabel}/>
                    <Legend verticalAlign="top" height={50}/>
                    </LineChart>
                    <br/>
                    <button onClick={handleDownload}>
                        {isLoading ? 'Laddar ner...' : 'Exportera'}
                    </button>
                </div>
            </div>
            : null
        }
      </>
    )
}

export default KpiAndSPI;