import React, {useState, useEffect} from 'react';
import {YearlyKpiChangeProps} from '../../Interfaces/IYearlyKpiChange';
import ExcelFileReader from "../Utils/ExcelFileReader";
import ChartSpiKpi from '../Charts/ChartSpiKpi';
import {KpiAndSpiProps} from '../../Interfaces/IKpiAndSpi';

interface Props {
    data: YearlyKpiChangeProps[]
};

const OrganizeSpiKpiYearlyChange: React.FC<Props> = ({data}) => {
    const [xlsxData, setXlsxData] = useState<any[]>([]);
    const [combinedData, setCombinedData] = useState<KpiAndSpiProps[]>([]);
    const [excelJsonData, setExcelJsonData] = useState<any[]>([]);

    const handleFileLoad = (data: any[]) => {
    setExcelJsonData(data.slice(200, -5));
    }

    // Metod för att ta fram årlig förändringstakt från array med index
    useEffect(() => {
    const calculatePercentageChange = (props:any[]) => {
        const spi = props.map((item: any) => {
            return{
                month: item.__EMPTY,
                value: item.__EMPTY_13
            }
        });
    
        const yearlyChangeArray = spi.slice(12).map((currentItem, index) => {
            const prevItem = spi[index];
            const percentageChange = ((currentItem.value / prevItem.value) - 1) * 100;
            return {
                month: currentItem.month,
                percentageChange: percentageChange
            };
            });
            setXlsxData(yearlyChangeArray);
        };
    calculatePercentageChange(excelJsonData);

    }, [excelJsonData]);

    // Skapar array med data att plotta. Körs bara när state ändras för xlsxData eller data
    useEffect(( ) => {
        if(xlsxData.length > 0 && data.length > 0){
            const slicedDataToFitSPI = data.slice(460);
            const combinedDataArray: KpiAndSpiProps[] = slicedDataToFitSPI.map((item:any, index:number ) => {
            const spiDataPoint = xlsxData[index];
            return {
                month: item.month,
                restSpi: spiDataPoint,
                restKpi: item.index
            };
            }) as KpiAndSpiProps[];

            const slicedCombinedData = combinedDataArray.slice(-25)
            setCombinedData(slicedCombinedData);
        }
    }, [xlsxData, data]);

    const dataMax = Math.max(
        ...combinedData.map((item) => item.restSpi),
        ...combinedData.map((item) => item.restKpi)
    )
    const dataMin = Math.min(
        ...combinedData.map((item) => item.restSpi),
        ...combinedData.map((item) => item.restKpi)
    )
    const yAxisDomain = [(dataMin - 2), (dataMax + 2)];

    return(
    <>
        <ExcelFileReader onFileLoad={handleFileLoad} />
        {
            (xlsxData.length > 0 && data.length > 0)
            ?
            <ChartSpiKpi data={combinedData} yAxisDomain={yAxisDomain}/>
            : null
        }
    </>
    )
}

export default OrganizeSpiKpiYearlyChange;