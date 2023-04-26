import {utils, read} from 'xlsx';
import {useState,useCallback} from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend} from "recharts";
import FileSaver from "file-saver";
import { useCurrentPng } from "recharts-to-png";

const KpiAndSPI = () => {
    const [xlsxData, setXlsxData] = useState<any>([]);

    const [getPng, { ref, isLoading }] = useCurrentPng();

    const handleDownload = useCallback(async () => {
    const png = await getPng();

    // Verify that png is not undefined
    if (png) {
      // Download with FileSaver
      FileSaver.saveAs(png, 'SPI och KPI restauranger årstakt.png');
    }
  }, [getPng]);

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
      
                console.log("JasonData från excel: ", jsonRows);
      
                const slicedData = jsonRows.slice(200, -5);
                console.log("Slicad data: ", slicedData);
                
                calculatePercentageChange(slicedData)
              }
            }
          };
          reader.readAsArrayBuffer(file);
        }
      }
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
          console.log("såhär blev spi-procent-arrayen", yearlyChangeArray)
          const slicedYearlyChange = yearlyChangeArray.slice(-25);
          setXlsxData(slicedYearlyChange);

        };
        //<Line name="KPI totalt" type="monotone" dataKey="indexKPI" stroke="#479A96"  />

    return(<>
        <input type="file" onChange={handleFileUpload} />
<div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
        <div>
          <h3>Inköpspriser på livsmedel för restaurangföretag (t.o.m. november) <br/>
           och försäljningspriser på restaurang till konsument (KPI - COICOP) </h3>
          <h5>Procentuell förändring jämfört med motsvarande månad föregående år</h5>
          <div style={{ fontStyle: "italic" }}>Källa: KPI/SCB och Storhushålls </div>
            <LineChart width={800} height={400} data={xlsxData} ref={ref}
              margin={{ top: 20, right: 50, left: 50, bottom: 50 }}>
              <XAxis dataKey="month" interval={0} angle={-45} textAnchor="end" 
              tickMargin={20}/>
              <YAxis hide />
              <Tooltip />
              <Line name="Inköpspriser på restaurangföretag" type="monotone" dataKey="percentageChange" stroke="#AEBD15" />
              <Legend verticalAlign="top" height={36}/>

            </LineChart>
          <br/>
          <button onClick={handleDownload}>
            {isLoading ? 'Laddar ner...' : 'Exportera'}
          </button>
        </div>
      </div>
      </>
    )
}

export default KpiAndSPI;