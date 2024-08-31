import { GridOption } from 'slickgrid-react';

const GridOptions: GridOption = {
  //datasetIdPropertyName: 'uid',
  enableAutoResize: true, // true by default
  enableCellNavigation: true,
  enableHeaderMenu: false,
  enableFiltering: true,
  enableCheckboxSelector: false,
  enableRowSelection: true,
  enablePagination: true,
  forceFitColumns: true,
  pagination: {
    pageSizes: [5, 10, 15, 20, 25, 50],
    pageSize: 15,
  },
  rowSelectionOptions: {
    // True (Single Selection), False (Multiple Selections)
    selectActiveRow: true,
  },
  //autoHeight:true,
  rowHeight: 35,
  headerRowHeight: 0,
  enableColumnPicker: true,
  // exportOptions: {
  //   exportWithFormatter: true
  // },
  enableGridMenu: false,
  gridMenu: {
    columnTitle: 'Columns',
    menuWidth: 17,
    hideExportCsvCommand: true,
    resizeOnShowHeaderRow: true,
  },
  enableColumnReorder: false,
  gridWidth: '100%',
  gridHeight: 500,
  enableCellMenu: false,
};

const ConfigSettings = {
  gridOptions: GridOptions,
};

export default ConfigSettings;
