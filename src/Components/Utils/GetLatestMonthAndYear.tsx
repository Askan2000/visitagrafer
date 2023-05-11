
//Räkna ut senaste månad och år i datan
const GetLatestMonthAndYear = (props:any) => {
    const formatter = new Intl.DateTimeFormat('se', { month: 'long', year: 'numeric' });
    const datum = new Date(2000, 12);
    datum.setMonth(props.length -1);
    const monthAndYear = formatter.format(new Date(datum.getFullYear(), datum.getMonth()-1));
    return(
        monthAndYear
    );
}

export default GetLatestMonthAndYear;