import FileSaver from "file-saver";
import { useCallback } from "react";
import { Line, LineChart, XAxis, YAxis, Legend, Tooltip } from "recharts";
import { useCurrentPng } from "recharts-to-png";

export interface euostatDataIndex {
    month: number;
    indexSE: number;
    indexDK: number;
    indexNO: number;
    indexFI: number;
  };

interface Props {
    data: euostatDataIndex[];
}

const DataVisualizerEurostat: React.FC<Props> = ({data}) => {

    const [getPng, { ref, isLoading }] = useCurrentPng();

    const handleDownload = useCallback(async () => {
    const png = await getPng();

    if (png) {
      FileSaver.saveAs(png, 'Restaurangprisernas utveckling i norden.png');
    }
    }, [getPng]);

    const ticks = data.filter((item, index) => index % 12 === 0).map((item) => item.month);
    const slicedData = data.slice(216);
    
    const maxIndex = Math.max(
        ...slicedData.map((item) => item.indexSE),
        ...slicedData.map((item) => item.indexDK),
        ...slicedData.map((item) => item.indexNO),
        ...slicedData.map((item) => item.indexFI)
    )
        const yAxisDomain = [90, Math.ceil(maxIndex / 10) * 10];
        console.log("yaxisDomain: ", yAxisDomain)
        console.log("slicad data:", slicedData)
return(<>
    {
        (data.length > 0 ) 
        ?
        <div style={{display:"flex", justifyContent:"center"}} >
        <div>
        <h3>Prisutveckling för restaurangnäringarna i Norden </h3>
          <h5>Index, januari 2015 = 100. Data till och med {slicedData[slicedData.length-1]?.month}</h5>
          <div style={{ fontStyle: "italic" }}>Källa: Eurostat</div>
            <LineChart data={slicedData} width={700} height={400} ref={ref}
                margin={{ top: 20, right: 30, left: 30, bottom: 50 }}>
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

export default DataVisualizerEurostat;