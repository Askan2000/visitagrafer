import FileSaver from "file-saver";
import { useCallback } from "react";
import { useCurrentPng } from "recharts-to-png";



const FileDownloader = ({fileDownloaderFunction}:any) => {
    const [getPng, { ref, isLoading }] = useCurrentPng();


    //Metod för Export-knappen som sparar xlsx-fil på disk, med hjälp av xlsx-biblioteket
    const handleDownload = useCallback(async () => {
        const png = await getPng();
        if (png) {
        FileSaver.saveAs(png, 'SPI och KPI restauranger årstakt.png');
        }
    }, [getPng]);

    return(
        <button onClick={handleDownload}>
                {isLoading ? 'Laddar ner...' : 'Exportera'}
        </button>
    )
}

export default FileDownloader