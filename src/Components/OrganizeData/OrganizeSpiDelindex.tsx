import {useEffect, useState} from 'react';
import { SpiDelindexProps } from '../../Interfaces/ISpiDelindex';
import ExcelFileReader from '../Utils/ExcelFileReader';
import GetLatestMonthAndYear from "../Utils/GetLatestMonthAndYear"
import ChartSpiDelindex from '../Charts/ChartSpiDelindex';

const OrganizeSpiDelindex = () => {
    const [xlsxData, setXlsxData] = useState<any[]>([]);
    const [monthAndYear, setMonthAndYear] = useState<string>('');
    const [excelJsonData, setExcelJsonData] = useState<any[]>([]);
    const [slicedData, setSlicedData] = useState<any[]>([]);

    const handleFileLoad = (data:any[]) => {
        setExcelJsonData(data);
    }

    useEffect(() => {
        const mappedData: SpiDelindexProps[] = excelJsonData.map((item:any) => {
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
            } as SpiDelindexProps
        });
    
        let lastIndex = -1;
        for (let i = mappedData.length -1; i >= 0; i--) {
            if (!isNaN(mappedData[i].Fisk) ) {
                lastIndex = i;
                break;
            }
        }
        const firstIndex = mappedData.findIndex((item) => !isNaN(item.Fisk));
        const slicedData = mappedData.slice(firstIndex, lastIndex + 1)
        setMonthAndYear(GetLatestMonthAndYear(slicedData));
        setSlicedData(slicedData);

    }, [excelJsonData])
    
    useEffect(() => {
        if(slicedData.length > 0 )
        {
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
                }
                calculatePercentageChange(slicedData)
        }
        
    }, [slicedData])

    const sortedArray = xlsxData.sort((a, b) => b.value - a.value);

    return(
        <>
        <ExcelFileReader onFileLoad={handleFileLoad}/>
        {
            (sortedArray.length > 0)
            ?
            <ChartSpiDelindex data={sortedArray} monthAndYear={monthAndYear}/>
            :
            null
        }
    </>)
}

export default OrganizeSpiDelindex;