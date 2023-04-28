import React, {useCallback} from "react";
import { LineChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
Legend, BarChart, LabelList, Label } from "recharts";
import FileSaver from "file-saver";
import { useCurrentPng } from "recharts-to-png";
import { round } from "../Utils/DecimalHandler";

export interface DataYearlyChangeTotAndRest {
    month: number;
    indexKPI: number;
    indexRest: number;
  };

  interface Props {
    data: DataYearlyChangeTotAndRest[];
  }

  const customLabel = (props: any) => {
    const {
       x, y, value
      } = props;
      const customValue = round(value, 1).toFixed(1);
      return(
      <text x={x} y={y} dy={-5} fontSize='10' textAnchor='middle'>
        {customValue}
      </text>
      )
  };
  
const YearlyChangeTotAndRest: React.FC<Props> = ({ data}) => 
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

    const maxIndex = Math.max(
        ...slicedData.map((item) => item.indexKPI),
        ...slicedData.map((item) => item.indexRest)
    )
    const minIndex = Math.min(
        ...slicedData.map((item) => item.indexKPI),
        ...slicedData.map((item) => item.indexRest)
    )
    const yAxisDomain = [minIndex - 1, maxIndex + 1];

    return (
      <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
        <div>
            <LineChart width={800} height={500} data={slicedData} ref={ref}
              margin={{ top: 100, right: 40, left: 50, bottom: 50 }}>
                <text x={20} y={20} 
                style={{fontSize: 24, fontWeight: 'bold', fill: '#595959'}}>
                  Försäljningsprisutveckling på restaurang enligt KPI, och KPI totalt
                </text>
                <text x={20} y={45} 
                style={{fontSize: 24, fontWeight: 'bold', fill: '#595959'}}>
                  Senaste 25 månaderna
                </text>
                <text x={20} y={70} 
                style={{fontSize: 18, fill: '#595959'}}>
                  Procentuell förändring jämfört med motsvarande månad föregående år
                </text>
                <text x={20} y={95}
                style={{fontSize: 16, fontStyle:'italic', fill: '#595959'}}>
                  Källa: KPI/SCB
                </text>
              <XAxis dataKey="month" interval={0} angle={-45} textAnchor="end" 
              tickMargin={20}/>
              <YAxis hide domain={yAxisDomain}/>
              <Tooltip />
              <Line dot={false} isAnimationActive={false} name="KPI totalt" type="monotone" dataKey="indexKPI" stroke="#479A96" label={customLabel} />
              <Line dot={false} isAnimationActive={false} name="Restaurang" type="monotone" dataKey="indexRest" stroke="#AEBD15" label={customLabel} />
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

export default YearlyChangeTotAndRest;