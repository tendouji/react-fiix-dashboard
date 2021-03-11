import React from "react";
import styled from "styled-components";
import { lighten } from "polished";
import { 
    colorRange,
    elementSizes, 
    fontSizes, 
    gaps 
} from "../../constants/layout";
import { StyledColorProps, TableDataType } from "../../models";
import withMeiosis, { WithMeiosisProps } from "../HOC";

type TableProps = {
    tableData: TableDataType;
    className?: string,
}

const Table: React.FC<TableProps & WithMeiosisProps> = ({globalStates, tableData, className}) => {
    return (
        <TableWrapper 
            className={[
                "table",
                (!!tableData.highlightAltRow ? ' highlight-alt-row' : ''),
                (!!tableData.columnRelayoutResponsive ? ' column-relayout' : ''),
                (!!tableData.cellNoWrap ? ' cell-no-wrap' : ''),
                (!!className ? ' ' + className : '')
            ].join('')} 
            themeColor={globalStates!.themeColor}
        >
            <table>
                { tableData.headerData 
                    ? <tr className="table-header">{ 
                        tableData.headerData.map( (item: string | number, key: number) => <th key={`th-${key}`}>{ item }</th>) 
                    }</tr>
                    : null
                }
                { tableData.rowData.map( (rowItem: any, key1: number) => 
                    <tr>{ rowItem.map((item: string | number, key2: number) => 
                        <td key={`td-${key1}-${key2}`}>
                            { tableData.headerData 
                                ? <span className="label">{ tableData.headerData[key2] }</span>
                                : null
                            }
                            <span className="value">{ item }</span>
                        </td>
                    ) }</tr>
                )}
            </table>
        </TableWrapper>
    );
};

export default withMeiosis(Table);


const TableWrapper = styled.div<StyledColorProps>`
    width: 100%;
    border: ${ props => elementSizes.Border1Pixel(lighten(colorRange.L4, props.themeColor.grayColor!)) };
    overflow-x: auto;

    & table {
        width: 100%;
        border: 0;
        border-collapse: collapse;
    
        & th, td {
            padding: ${ gaps.Small };
        }
    
        & th {
            background-color: ${ props => lighten(colorRange.L3, props.themeColor.grayColor!) };
            color: #fff;
        }
    
        & td {
            font-size: ${fontSizes.Common};

            & .label {
                display: none;
                font-weight: 500;
                margin-right: ${gaps.XSmall};

                &:after {
                    content: ':';
                }
            }
        }

        & tr {
            border-bottom: ${ props => elementSizes.Border1Pixel(lighten(colorRange.L5, props.themeColor.grayColor!)) };
            
            &:last-child {
                border-bottom: 0;
            }

            & th {
                text-align: left;
            }
        }
    }

    &.cell-no-wrap {
        & table {
            & th, td {
                white-space: nowrap;
            }        
        }    
    }

    &.highlight-alt-row {
        & table {
            & tr {
                &:nth-child(odd) {
                    background-color: ${ props => lighten(colorRange.L5, props.themeColor.grayColor!) };
                }
            }        
        }    
    }

    &.column-relayout {
        @media screen and (max-width: ${elementSizes.MediaScreenMediumWidth}) {
            & table {
                & td {
                    display: flex;
                    width: 100%;
                    padding: ${ gaps.XSmall } ${ gaps.Small };
                    box-sizing: border-box;
        
                    & .label {
                        display: inline;
                    }
                }
            
                & th {
                    display: none;
                }
            
                & tr {
                    display: block;
                    width: 100%;
                    padding: ${ gaps.Small } 0;

                    &.table-header {
                        display: none;
                    }
                }
            }
        }
    }
`;