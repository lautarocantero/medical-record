import * as XLSX from 'xlsx';
import moment from 'moment';

const fitToColumn = (data: Array<any>) => {
  const columnWidths = [];
  for (const property in data[0]) {
    if (property) {
      columnWidths.push({
        wch: Math.max(
          property ? property.toString().length : 0,
          ...data.map((obj) => (obj[property] ? obj[property].toString().length : 0)),
        ),
      });
    }
  }

  return columnWidths;
};

const filtToColumnList = (data: Array<any>) => {
  const columnWidths: Array<any> = [];
  data.forEach((element: any) => {
    for (const property in element) {
      if (property) {
        columnWidths.push({
          wch: Math.max(
            property ? property.toString().length : 0,
            ...data.map((obj) => (obj[property] ? obj[property].toString().length : 0)),
          ),
        });
      }
    }
  });
  return columnWidths;
};

export const exportFromJson = (data: Array<any>, columns: Array<string>, name: string) => {
  const ws = XLSX.utils.json_to_sheet(data, {
    header: columns,
  });

  const wscols = fitToColumn(data);
  ws['!cols'] = wscols;
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, name + moment().format('YYYY-MM-DD'));
  XLSX.writeFile(wb, `${name + moment().format('-YYYY-MM-DD')}.xlsx`);
};

export const exportFromJsonToList = ({ data, columnsTitle, name, sheetNames }: any) => {
  // Convierte en arreglo el objeto que llega
  const formmatedData: any = Object.values(data);
  const wb = XLSX.utils.book_new();
  const workSheets: Array<XLSX.WorkSheet> = [];

  // Carga las hojas con sus titulos
  for (let i = 0; i < sheetNames.length; i += 1) {
    workSheets[i] = XLSX.utils.json_to_sheet([]);
    if (i === 0) {
      XLSX.utils.sheet_add_aoa(workSheets[i], columnsTitle[0]);
      const wcols = filtToColumnList(formmatedData[i]);
      workSheets[i]['!cols'] = wcols;
    } else if (i === 1) {
      XLSX.utils.sheet_add_aoa(workSheets[i], columnsTitle[1]);
      const wcols = filtToColumnList(formmatedData[i]);
      workSheets[i]['!cols'] = wcols;
    }
  }

  // Agrega la data al excel y las hojas al libro
  sheetNames.forEach((element: any, index: number): any => {
    if (index === 0) {
      XLSX.utils.sheet_add_json(workSheets[index], formmatedData[index], { origin: 'A2', skipHeader: true });
      XLSX.utils.book_append_sheet(wb, workSheets[index], sheetNames[index]);
    } else {
      XLSX.utils.sheet_add_json(workSheets[index], formmatedData[index], { origin: 'A2', skipHeader: true });
      XLSX.utils.book_append_sheet(wb, workSheets[index], sheetNames[index]);
    }
  });

  // Crea el archivo
  XLSX.writeFile(wb, `${name + moment().format('YYYY-MM-DD')}.xlsx`);
};
