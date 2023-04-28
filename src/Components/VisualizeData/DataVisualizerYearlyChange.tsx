import React, {useCallback} from "react";
import { LineChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
Legend, BarChart, LabelList, Label } from "recharts";
import FileSaver from "file-saver";
import { useCurrentPng } from "recharts-to-png";
import { round } from "../Utils/DecimalHandler";

export interface DataYearlyChange {
    month: number;
    index: number;
  };

  interface Props {
    data: DataYearlyChange[];
  }

  const customLabel = (props: any) => {
    const {
       x, y, value
      } = props;
      const customValue = round(value, 1).toFixed(1);
      return(
      <text x={x} y={y} dy={-10} textAnchor='top'>
        {customValue}
      </text>
      )
  };
  
const YearlyChange: React.FC<Props> = ({ data }) => 
{
  const [getPng, { ref, isLoading }] = useCurrentPng();

  const handleDownload = useCallback(async () => {
    const png = await getPng();

    if (png) {
      FileSaver.saveAs(png, 'KPI_restaurang_årstakt.png');
    }
  }, [getPng]);

    //Spara en delmängd av datan
    const slicedData = data.slice(-27);
    console.log(slicedData)

    const dataMax = Math.max(...slicedData.map((item) => item.index));
    const dataMin = Math.min(...slicedData.map((item) => item.index));
    const yAxisDomain = [(dataMin - 0.1), (dataMax + 0.1)];

    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div>
            <BarChart width={800} height={500} data={slicedData} ref={ref}
              margin={{ top: 100, right: 40, left: 40, bottom: 50 }}>
                <text x={20} y={20} 
                style={{fontSize: 24, fontWeight: 'bold', fill: '#595959'}}>
                  Restaurangprisernas utveckling, årstakt
                </text>
                <text x={20} y={45} 
                style={{fontSize: 18, fill: '#595959'}}>
                  Procentuell förändring jämfört med motsvarande månad föregående år
                </text>
                <text x={20} y={70} 
                style={{fontSize: 16, fontStyle:'italic', fill: '#595959'}}>
                  Källa: KPI/SCB
                </text>
              <XAxis dataKey="month" interval={0} angle={-45} textAnchor="end" 
              tickMargin={20}/>
              <YAxis hide domain= {yAxisDomain}/>
              <Tooltip />
              <Bar isAnimationActive={false} dataKey="index" fill="#AEBD15" label={customLabel}/>
            </BarChart>
          <br/>
          <button onClick={handleDownload}>
            {isLoading ? 'Laddar ner...' : 'Exportera'}
          </button>
        </div>
      </div>
    );
};

export default YearlyChange;