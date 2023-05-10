export {}

/* import FileSaver from "file-saver";
import { useCallback } from "react";
import { useCurrentPng } from "recharts-to-png";



const FileDownloader = () => {
    const [getPng, { ref, isLoading }] = useCurrentPng();

    console.log("hej från fileDownloader")

    //Metod för Export-knappen som sparar xlsx-fil på disk, med hjälp av xlsx-biblioteket
    const handleDownload = useCallback(async () => {
        const png = await getPng();
        console.log("hej från fileDownloader use callback, png:", png)
        if (png) {
        FileSaver.saveAs(png, 'SPI och KPI restauranger årstakt.png');
        }
    }, [getPng]);

    return(
        <div >
        <button onClick={handleDownload} >
                {isLoading ? 'Laddar ner...' : 'Exportera'}
        </button>
        </div>
    )
}

export default FileDownloader */