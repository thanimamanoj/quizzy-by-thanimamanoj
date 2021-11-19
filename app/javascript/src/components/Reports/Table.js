import React, { useMemo } from "react";

import { useTable, useSortBy } from "react-table";

import { COLUMNS } from "./column";
import "./table.css";

const Table = ({ report }) => {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(
    () =>
      report.map(rep => {
        return {
          quiz_name: rep.quiz_name,
          name: `${rep.first_name} ${rep.last_name}`,
          email: rep.email,
          correct_answers_count: rep.correct_answers_count,
          incorrect_answers_count: rep.incorrect_answers_count,
        };
      }),
    []
  );

  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useSortBy
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup, index) => (
          <tr key={index} {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column, index) => (
              <th
                key={index}
                {...column.getHeaderProps(column.getSortByToggleProps())}
              >
                {column.render("Header")}
                <span>
                  {column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""}
                </span>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, index) => {
          prepareRow(row);
          return (
            <tr key={index} {...row.getRowProps()}>
              {row.cells.map((cell, index) => {
                return (
                  <td key={index} {...cell.getCellProps()}>
                    {cell.render("Cell")}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
