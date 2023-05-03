import {utils, read} from 'xlsx';
import {useState,useCallback} from 'react';
import { XAxis, YAxis, Tooltip, BarChart, Bar} from "recharts";
import FileSaver from "file-saver";
import { useCurrentPng } from "recharts-to-png";
import round from '../Utils/DecimalHandler'

interface SpiDelindexData{
    month: string,
    MjölGrynBröd: number,
    Kött: number,
    Fisk: number,
    MjölkOstÄgg: number,
    Matfett: number,
    Frukt: number,
    Grönsaker: number,
    SockerGlass: number,
    ÖvrigaLivsmedel: number,
    KaffeMm: number,
    LäskJuiceMm: number,
    LivsmedelExklDryck: number,
    Sprit: number,
    Vin: number,
    Öl: number
}

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

const SpiDelindex = () => {
    const [xlsxData, setXlsxData] = useState<any[]>([]);
    const [monthAndYear, setMonthAndYear] = useState<string>('');
    const [getPng, { ref, isLoading }] = useCurrentPng();

    //Metod för Export-knappen som sparar xlsx-fil på disk, med hjälp av xlsx-biblioteket
    const handleDownload = useCallback(async () => {
        const png = await getPng();
        if (png) {
        FileSaver.saveAs(png, 'SPI livsmedel delindex.png');
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
                const jsonSheetData = utils.sheet_to_json(wb.Sheets[sheets[0]]);
                console.log("Spidata: ", jsonSheetData)
                const mappedData: SpiDelindexData[] = jsonSheetData.map((item:any, index:any) => {
                    return{
                        month: Object.values(item)[0],
                        MjölGrynBröd: Object.values(item)[1],
                        Kött: Object.values(item)[2],
                        Fisk: Object.values(item)[3],
                        MjölkOstÄgg: Object.values(item)[4],
                        Matfett: Object.values(item)[5],
                        Frukt: Object.values(item)[6],
                        Grönsaker: Object.values(item)[7],
                        SockerGlass: Object.values(item)[8],
                        ÖvrigaLivsmedel: Object.values(item)[9],
                        KaffeMm: Object.values(item)[11],
                        LäskJuiceMm: Object.values(item)[12],
                        LivsmedelExklDryck: Object.values(item)[14],
                        Sprit: Object.values(item)[15],
                        Vin: Object.values(item)[16],
                        Öl: Object.values(item)[17]
                    } as SpiDelindexData
                })

                let lastIndex = -1;
                for (let i = mappedData.length -1; i >= 0; i--) {
                    if (!isNaN(mappedData[i].Fisk) ) {
                        lastIndex = i;
                        break;
                    }
                }
                const firstIndex = mappedData.findIndex((item) => !isNaN(item.Fisk));
                const slicedData = mappedData.slice(firstIndex, lastIndex + 1)
                calculateDataMonthAndYear(slicedData)
                calculatePercentageChange(slicedData)
              }
            }
          };
          reader.readAsArrayBuffer(file);
        }
      }

    //Räkna ut senaste månad och år i data
    const calculateDataMonthAndYear = (props:any) => {
        const formatter = new Intl.DateTimeFormat('se', { month: 'long', year: 'numeric' });
        const datum = new Date(2000, 12);
        datum.setMonth(props.length -1);
        const monthAndYear = formatter.format(new Date(datum.getFullYear(), datum.getMonth()-1));
        setMonthAndYear(monthAndYear);
    }

    // Metod för att ta fram årlig förändringstakt från array med index
    const calculatePercentageChange = (props:any[]) => {
    const lastTwelveMonths = props.slice((props.length - 13));

    const yearlyChangeArray = [
        {label: "Mjöl, gryn, bröd", value: (lastTwelveMonths[lastTwelveMonths.length-1].MjölGrynBröd/lastTwelveMonths[0].MjölGrynBröd -1 ) * 100},
        {label: "Kött", value: (lastTwelveMonths[lastTwelveMonths.length-1].Kött/lastTwelveMonths[0].Kött -1 ) * 100},
        {label: "Fisk", value: (lastTwelveMonths[lastTwelveMonths.length-1].Fisk/lastTwelveMonths[0].Fisk -1 ) * 100},
        {label: "Mjölk, ost, ägg", value: (lastTwelveMonths[lastTwelveMonths.length-1].MjölkOstÄgg/lastTwelveMonths[0].MjölkOstÄgg -1 ) * 100},
        {label: "Matfett", value: (lastTwelveMonths[lastTwelveMonths.length-1].Matfett/lastTwelveMonths[0].Matfett -1 ) * 100},
        {label: "Frukt", value: (lastTwelveMonths[lastTwelveMonths.length-1].Frukt/lastTwelveMonths[0].Frukt -1 ) * 100},
        {label: "Grönsaker", value: (lastTwelveMonths[lastTwelveMonths.length-1].Grönsaker/lastTwelveMonths[0].Grönsaker -1 ) * 100},
        {label: "Socker, glass", value: (lastTwelveMonths[lastTwelveMonths.length-1].SockerGlass/lastTwelveMonths[0].SockerGlass -1 ) * 100},
        {label: "Övriga livsmedel", value: (lastTwelveMonths[lastTwelveMonths.length-1].ÖvrigaLivsmedel/lastTwelveMonths[0].ÖvrigaLivsmedel -1 ) * 100},
        {label: "Kaffe mm", value: (lastTwelveMonths[lastTwelveMonths.length-1].KaffeMm/lastTwelveMonths[0].KaffeMm -1 ) * 100},
        {label: "Läsk, juice, mm", value: (lastTwelveMonths[lastTwelveMonths.length-1].LäskJuiceMm/lastTwelveMonths[0].LäskJuiceMm -1 ) * 100},
        {label: "Livsmedel, exkl dryck", value: (lastTwelveMonths[lastTwelveMonths.length-1].LivsmedelExklDryck/lastTwelveMonths[0].LivsmedelExklDryck -1 ) * 100},
        {label: "Sprit", value: (lastTwelveMonths[lastTwelveMonths.length-1].Sprit/lastTwelveMonths[0].Sprit -1 ) * 100},
        {label: "Vin", value: (lastTwelveMonths[lastTwelveMonths.length-1].Vin/lastTwelveMonths[0].Vin -1 ) * 100},
        {label: "Öl", value: (lastTwelveMonths[lastTwelveMonths.length-1].Öl/lastTwelveMonths[0].Öl -1 ) * 100}
    ]
    setXlsxData(yearlyChangeArray);
    console.log("yearlyChange: ", yearlyChangeArray)
    }

    const sortedArray = xlsxData.sort((a, b) => b.value - a.value);

    return(
        <>
            <input type="file" onChange={handleFileUpload} />
            {
            (xlsxData.length > 0)
            ?
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div>
                    <BarChart layout='vertical' width={800} height={500}  ref={ref}
                    margin={{ top: 100, right: 40, left: 150, bottom: 50 }} data={sortedArray}>
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
            :
            null
        }
        </>
    )
}

export default SpiDelindex;