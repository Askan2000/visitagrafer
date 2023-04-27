import React, {useCallback} from "react";
import { LineChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
Legend, BarChart, LabelList, Label } from "recharts";
import FileSaver from "file-saver";
import { useCurrentPng } from "recharts-to-png";

export interface DataYearlyChangeTotAndRest {
    month: number;
    indexKPI: number;
    indexRest: number;
  };

  interface Props {
    data: DataYearlyChangeTotAndRest[];
  }

const DataVisualizer: React.FC<Props> = ({ data}) => 
{
  const [getPng, { ref, isLoading }] = useCurrentPng();

  const handleDownload = useCallback(async () => {
    const png = await getPng();

    if (png) {
      FileSaver.saveAs(png, 'KPI_restaurang_och_totalt_årstakt.png');
    }
  }, [getPng]);
    
    const firstValidIndexRestIndex = data.findIndex((item) => !isNaN(item.indexRest));
    const filteredData = data.slice(firstValidIndexRestIndex);

    //Spara en delmängd av datan
    const slicedData = filteredData.slice(-25);

    const dataKpiMax = Math.max(...slicedData.map((item) => item.indexKPI));
    const dataRestMax = Math.max(...slicedData.map((item) => item.indexRest));
    const dataMax = dataKpiMax > dataRestMax ? dataKpiMax : dataRestMax;
    
    console.log("DataKpiMax är: ", dataKpiMax);
    console.log("dataRestMax är: ", dataRestMax);
    console.log("DataMax är: ", dataMax);

    const yAxisDomain = [0, Math.ceil(dataMax / 10) * 10 + 10];

    return (
      <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
        <div>
          <h3>Försäljningsprisutveckling på restaurang enligt KPI, och KPI totalt <br/> Senaste 25 månaderna</h3>
          <h5>Procentuell förändring jämfört med motsvarande månad föregående år</h5>
          <div style={{ fontStyle: "italic" }}>Källa: KPI/SCB</div>
            <LineChart width={800} height={400} data={slicedData} ref={ref}
              margin={{ top: 20, right: 50, left: 50, bottom: 50 }}>
              <XAxis dataKey="month" interval={0} angle={-45} textAnchor="end" 
              tickMargin={20}/>
              <YAxis hide />
              <Tooltip />
              <Line name="KPI totalt" type="monotone" dataKey="indexKPI" stroke="#479A96"  />
              <Line name="Restaurang" type="monotone" dataKey="indexRest" stroke="#AEBD15" />
              <Legend verticalAlign="top" height={36}/>

            </LineChart>
          <br/>
          <button onClick={handleDownload}>
            {isLoading ? 'Laddar ner...' : 'Exportera'}
          </button>
        </div>
      </div>
      );
};

export default DataVisualizer;