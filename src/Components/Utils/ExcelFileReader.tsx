import { read, utils } from "xlsx";

//Metod för att hantera uppladdad fil
const ExcelFileReader  = ({onFileLoad}: any) => {

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
            const jsonRows = utils.sheet_to_json(wb.Sheets[sheets[0]]);
            onFileLoad(jsonRows);
          }
        }
      };
      reader.readAsArrayBuffer(file);
    }
  }
  
  return(
       <input data-cy="file-button" type="file" onChange={handleFileUpload} />
  );
};

export default ExcelFileReader;