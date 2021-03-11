import React from "react";
import withMeiosis, { WithMeiosisProps } from "../../../components/HOC";
import Table from "../../../components/Table";
import { TableDataType } from "../../../models";


type ComponentTableProps = {
    className?: string,
    // onShowHide?: () => void,
}

const ComponentTable: React.FC<ComponentTableProps & WithMeiosisProps> = ({globalActions, globalStates, className}) => {
    const getTableDataHandler = (type: string): TableDataType => {
        let tableData: TableDataType = {
            headerData: ['Company', 'Contact', 'Country'],
            rowData: [
                ['Alfreds Futterkiste',	'Maria Anders',	'Germany'],
                ['Centro comercial Moctezuma', 'Francisco Chang', 'Mexico'],
                ['Ernst Handel', 'Roland Mendel', 'Austria'],
                ['Island Trading', 'Helen Bennett', 'UK'],
                ['Laughing Bacchus Winecellars', 'Yoshi Tannamuri', 'Canada'],
                ['Magazzini Alimentari Riuniti', 'Giovanni Rovelli', 'Italy']
            ],
        };
        
        switch(type) {
            case 'basic': 
                tableData = {
                    ...tableData,
                    highlightAltRow: false,
                    cellNoWrap: false,
                    columnRelayoutResponsive: false,
                };                    
            break;
            case 'highlight-alt-row': 
                tableData = {
                    ...tableData,
                    highlightAltRow: true,
                    cellNoWrap: true,
                    columnRelayoutResponsive: false,
                };                    
        break;
            case 'column-relayout': 
                tableData = {
                    ...tableData,
                    highlightAltRow: true,
                    cellNoWrap: true,
                    columnRelayoutResponsive: true,
                };                    
        break;
            default:
        }

        return tableData;
    }
    
    return <div className="component-table">
        <h1>Table</h1>
        <h4>Basic Table</h4>
        <Table tableData={getTableDataHandler('basic')} />
        <br />
        <br />

        <h4>Table with alternate row highlight</h4>
        <Table tableData={getTableDataHandler('highlight-alt-row')} />
        <br />
        <br />
        
        <h4>Responsive behaviour with content Relayout (&lt;800px)</h4>
        <p>This table component by default uses simple scrollable content when screen width is lesser than 800px.</p>
        <p>The component also provides another alternative re-layout when at the same screen width as shown below. (Resize the screen width to lesser than 800px to see the behaviour)</p>
        <Table tableData={getTableDataHandler('column-relayout')} />
        <br />
        <br />
    </div>;
}

export default withMeiosis(ComponentTable);
