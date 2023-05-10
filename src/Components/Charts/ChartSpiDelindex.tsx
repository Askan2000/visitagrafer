import {useCallback} from 'react';
import { XAxis, YAxis, Tooltip, BarChart, Bar} from "recharts";
import FileSaver from "file-saver";
import { useCurrentPng } from "recharts-to-png";
import round from '../Utils/DecimalHandler'
import { SpiDelindexProps } from '../../Interfaces/ISpiDelindex';

const customLabel = (props: any) => {
    const {
       x, y, width, value
      } = props;
      const customValue = round(value, 1).toFixed(1);
      console.log("customValue: ", customValue)
      return(
      <text x={x + width + 5} y={y} dy={18} textAnchor='start'>
        {customValue}
      </text>
      )
}

interface Props {
    data: SpiDelindexProps[],
    monthAndYear: string
}

const ChartSpiDelindex: React.FC<Props> = ({data, monthAndYear}) => {
    const [getPng, { ref, isLoading }] = useCurrentPng();

    const handleDownload = useCallback(async () => {
        const png = await getPng();
        if (png) {
        FileSaver.saveAs(png, 'SPI livsmedel delindex.png');
        }
    }, [getPng]);
 
return(
    <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div>
            <BarChart layout='vertical' width={800} height={500}  ref={ref}
            margin={{ top: 100, right: 40, left: 150, bottom: 50 }} data={data}>
            <text x={20} y={20} 
            style={{fontSize: 24, fontWeight: 'bold', fill: '#595959'}}>
            Restaurangernas inköpspriser per produktkategori, {monthAndYear}
            </text>
            <text x={20} y={45} 
            style={{fontSize: 18, fill: '#595959'}}>
            Procentuell förändring jämfört med motsvarande månad föregående år
            </text>
            <text x={20} y={70} 
            style={{fontSize: 16, fontStyle:'italic', fill: '#595959'}}>
            Källa: Storhushållsprisindex
            </text>
            <XAxis hide dataKey="value" type="number" />
            <YAxis tick={{width: 200}} dataKey="label" type="category" interval={0}/>
            <Tooltip />
            <Bar dataKey="value" fill="#AEBD15" label={customLabel}/>
            </BarChart>
        <br/>
        <button onClick={handleDownload}>
            {isLoading ? 'Laddar ner...' : 'Exportera'}
        </button>
        </div>
    </div>
  )
}

export default ChartSpiDelindex;