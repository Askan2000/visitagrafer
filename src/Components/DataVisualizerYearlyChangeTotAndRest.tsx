import React, {useCallback} from "react";
import { LineChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
Legend, BarChart, LabelList, Label } from "recharts";
import FileSaver from "file-saver";
import { useCurrentPng } from "recharts-to-png";

export interface DataYearlyChangeTotAndRest {
    monthKPI: number;
    indexKPI: number;
    monthRest: number;
    indexRest: number;
  };
/* 
export interface DataYearlyChangeTot {
    month: number;
    index: number;
  }; */

  interface Props {
    data: DataYearlyChangeTotAndRest[];
  }

const DataVisualizer: React.FC<Props> = ({ data}) => 
{

  const [getPng, { ref, isLoading }] = useCurrentPng();

  const handleDownload = useCallback(async () => {
    const png = await getPng();

    // Verify that png is not undefined
    if (png) {
      // Download with FileSaver
      FileSaver.saveAs(png, 'KPI_restaurang_och_totalt_årstakt.png');
    }
  }, [getPng]);

    console.log("från Visualizer årstakt")
    console.log(data);
    //Spara en delmängd av datan
    const slicedData = data.slice(-27);
    console.log(slicedData)

    const dataKpiMax = Math.max(...data.map((item) => item.indexKPI));
    const dataRestMax = Math.max(...data.map((item) => item.indexRest));
    const dataMax = dataKpiMax > dataRestMax ? dataKpiMax : dataRestMax;

    const yAxisDomain = [0, Math.ceil(dataMax / 10) * 10 + 10];

    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div>
          <h2>Försäljningsprisutveckling på restaurang enligt KPI, och KPI totalt
Senaste 25 månaderna</h2>
          <h4>Procentuell förändring jämfört med motsvarande månad föregående år</h4>
          <div style={{ fontStyle: "italic" }}>Källa: KPI/SCB</div>
            <BarChart width={800} height={400} data={slicedData} ref={ref}
              margin={{ top: 20, right: 40, left: 40, bottom: 50 }}>
              <XAxis dataKey="month" interval={0} angle={-45} textAnchor="end" 
              tickMargin={20}/>
              <YAxis hide domain= {yAxisDomain}/>
              <Tooltip />
              <Bar isAnimationActive={false}  dataKey="index" fill="#AEBD15">
                <Label
                  value="Graftitel"
                  position="insideTop"
                  style={{ fontSize: "24px", fontWeight: "bold", fill: "#333" }} />
                <LabelList dataKey="index" position="top"/>
              </Bar>
            </BarChart>
          <br/>
          <button onClick={handleDownload}>
            {isLoading ? 'Laddar ner...' : 'Exportera'}
          </button>
        </div>
      </div>
      );
};

export default DataVisualizer;