import FileSaver from "file-saver";
import { useCallback } from "react";
import { Line, LineChart, XAxis, YAxis, Legend, Tooltip } from "recharts";
import { useCurrentPng } from "recharts-to-png";
import {EuostatKpiProps} from "../../Interfaces/IEurostatKpi"

interface Props {
    data: EuostatKpiProps[],
    yAxisDomain: number[],
    ticks: number[]
}

const ChartEurostatKpi: React.FC<Props> = ({data, yAxisDomain, ticks}) => {

    const [getPng, { ref, isLoading }] = useCurrentPng();

    const handleDownload = useCallback(async () => {
    const png = await getPng();

    if (png) {
      FileSaver.saveAs(png, 'Restaurangprisernas utveckling i norden.png');
    }
    }, [getPng]);

return(<>
    {
        (data.length > 0 ) 
        ?
        <div style={{display:"flex", justifyContent:"center"}} >
        <div>
            <LineChart data={data} width={800} height={500} ref={ref}
                margin={{ top: 100, right: 40, left: 40, bottom: 50 }}>
                <text x={20} y={20} 
                style={{fontSize: 24, fontWeight: 'bold', fill: '#595959'}}>
                  Prisutveckling för restaurangnäringarna i Norden
                </text>
                <text x={20} y={45} 
                style={{fontSize: 18, fill: '#595959'}}>
                  Index, januari 2015 = 100. Data till och med {data[data.length-1]?.month}
                </text>
                <text x={20} y={70} 
                style={{fontSize: 16, fontStyle:'italic', fill: '#595959'}}>
                  Källa: Eurostat
                </text>
                <XAxis dataKey="month" interval={0} angle={-45} textAnchor="end" 
                tickMargin={20} ticks={ticks}/>
                <YAxis domain={yAxisDomain} tickCount={12}/>
                <Line dot={false} name="Sverige" dataKey={"indexSE"} type="monotone" stroke="#575F0B"
                strokeDasharray="2 2"/>
                <Line dot={false} name="Danmark" dataKey={"indexDK"} type="monotone" stroke="#E8857C"
                strokeDasharray="5 5"/>
                <Line dot={false} name="Norge" dataKey={"indexNO"} type="monotone" stroke="#D73526"/>
                <Line dot={false} name="Finland" dataKey={"indexFI"} type="monotone" stroke="#00B0F0"/>
                <Legend verticalAlign="top" height={36}/>
                <Tooltip />
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

export default ChartEurostatKpi;