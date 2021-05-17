const xlsx = require('xlsx');
const path = require('path');

const date = () => {
    const ts = Date.now();

    const date = new Date(ts);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const today = year + "-"+ month+ "-"+ day;

    return today;
}

const exportExcel = (data, workSheetColumnNames, excel, workSheetName) => {

    const workBook = xlsx.utils.book_new();
    const workSheetData = [
        workSheetColumnNames,
        ...data
    ];
    const workSheet = xlsx.utils.aoa_to_sheet(workSheetData);
    xlsx.utils.book_append_sheet(workBook, workSheet, workSheetName);
    xlsx.writeFile(workBook, excel);
}

const exportsArticlesToExcel = (articles) => {

    const excel = date() +"-"+ "Articulos.xlsx";

    const workSheetColumnNames = [
        "ID",
        "ETIQUETA",
        "CLASIFICACIÓN",
        "TIPO DE ARTICULO",
        "RAMA",
        "DISPONIBILIDAD",
        "ESTADO",
        "PERTENECE",
        "OBSERVACIONES",
        "FECHA DE INGRESO",
    ];
    const workSheetName = 'Articulos';

    const data = articles.rows.map(article => {
        return [
            article.id, article.label, article.Tipo.classif,
            article.Tipo.article_type_name, article.branch,
            article.available_state, article.physical_state,
            article.Asociado ? article.Asociado.label : '', article.obs,
            article.createdAt
        ];
    });
    const excel_file = exportExcel(data,workSheetColumnNames,excel,workSheetName);

    return excel_file;
}

module.exports = exportsArticlesToExcel;