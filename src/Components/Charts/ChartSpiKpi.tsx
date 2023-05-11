import FileSaver from "file-saver";
import { useCallback } from "react";
import { Legend, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";
import { useCurrentPng } from "recharts-to-png";
import round from "../Utils/DecimalHandler";
import {KpiAndSpiProps} from '../../Interfaces/IKpiAndSpi'

interface Props {
    data: KpiAndSpiProps[]
    yAxisDomain: number[]
};

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

const ChartSpiKpi: React.FC<Props> = ({data, yAxisDomain}) => {

    const [getPng, {ref, isLoading}] = useCurrentPng();

    const handleDownload = useCallback(async () => {
        const png = await getPng();
        if (png) {
        FileSaver.saveAs(png, 'SPI och KPI restauranger årstakt.png');
        }
    }, [getPng]);
    
    return(
    <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}> 
        <div>
            <LineChart width={800} height={550} data={data} ref={ref}
            margin={{ top: 110, right: 40, left: 50, bottom: 50 }}>
            <text x={20} y={20} 
            style={{fontSize: 24, fontWeight: 'bold', fill: '#595959'}}>
            Inköpspriser på livsmedel för restaurangföretag (t.o.m. {data[data.length-1]?.month})
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
            <button onClick={handleDownload} >
                {isLoading ? 'Laddar ner...' : 'Exportera'}
            </button>
        </div>
    </div>
    )
}

export default ChartSpiKpi;