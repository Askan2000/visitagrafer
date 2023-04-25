import React, {useCallback} from "react";
import { LineChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
Legend, BarChart, LabelList, Label } from "recharts";
import FileSaver from "file-saver";
import { useCurrentPng } from "recharts-to-png";

/* import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
 */

export interface Data {
    month: number;
    index: number;
  };

  interface Props {
    data: Data[];
  }

const DataVisualizer: React.FC<Props> = ({ data }) => 
{

  const [getPng, { ref, isLoading }] = useCurrentPng();

  const handleDownload = useCallback(async () => {
    const png = await getPng();

    // Verify that png is not undefined
    if (png) {
      // Download with FileSaver
      FileSaver.saveAs(png, 'KPI_restaurang_månadstakt.png');
    }
  }, [getPng]);


    console.log("från Visualizer")
    console.log(data);

    //Spara en delmängd av datan
    const slicedData = data.slice(-27);
    console.log(slicedData)

    const dataMax = Math.max(...data.map((item) => item.index));
    const yAxisDomain = [0, Math.ceil(dataMax / 10) * 10 + 10];

    return (
      <div>
      <h2>Restaurangprisernas utveckling, månadstakt</h2>
      <h4>Procentuell förändring jämfört med föregående månad</h4>
      <div style={{ fontStyle: "italic" }}>Källa: KPI/SCB</div>
      <BarChart width={600} height={400} data={slicedData} ref={ref}
        margin={{ top: 20, right: 40, left: 40, bottom: 50 }}>
        <XAxis dataKey="month" interval={0} angle={-45} textAnchor="end" 
        tickMargin={20}/>
        <YAxis hide domain= {yAxisDomain}/>
        <Tooltip />
        <Bar isAnimationActive={false}  dataKey="index" fill="#AEBD15">
          <Label
            value="My Title"
            position="insideTop"
            style={{ fontSize: "24px", fontWeight: "bold", fill: "#333" }} />
          <LabelList dataKey="index" position="top"/>
        </Bar>
      </BarChart>
        <br/>
        <button onClick={handleDownload}>
          {isLoading ? 'Laddar ner...' : 'Spara graf'}
        </button>
      </div>
      
      );
};

export default DataVisualizer;