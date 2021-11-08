import React, { useMemo } from "react";

import { useHistory } from "react-router-dom";
import { useTable } from "react-table";

import { COLUMNS } from "./columns";

const BasicTable = ({ tdata }) => {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => tdata, []);
  let history = useHistory();
  const tableInstance = useTable({
    columns,
    data,
  });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;
  return (
    <div className="flex flex-col mt-10 ">
      <div className="my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div className="overflow-hidden border-b border-gray-200 shadow md:custom-box-shadow">
            <table
              className="min-w-full divide-y divide-gray-200"
              {...getTableProps()}
            >
              <thead>
                {headerGroups.map((headerGroup, index) => (
                  <tr key={index} {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column, i) => (
                      <th
                        key={i}
                        className="px-6 py-3 text-xs font-bold leading-4 tracking-wider
        text-left text-bb-gray-600 text-opacity-50 uppercase bg-gray-50"
                        {...column.getHeaderProps()}
                      >
                        {column.render("Header")}
                      </th>
                    ))}
                    <th className="px-6 py-3 bg-gray-50"></th>
                  </tr>
                ))}
              </thead>
              <tbody
                {...getTableBodyProps()}
                className="bg-white divide-y divide-gray-200"
              >
                {rows.map((row, index) => {
                  prepareRow(row);
                  return (
                    <tr key={index} {...row.getRowProps()}>
                      {row.cells.map((cell, i) => {
                        return (
                          <>
                            <td
                              key={i}
                              className="block w-64 px-6 py-4 text-sm font-medium
            leading-8 text-bb-purple capitalize truncate"
                              {...cell.getCellProps()}
                            >
                              {cell.render("Cell")}
                            </td>
                            <td className="px-6 py-4 text-sm font-medium leading-5 text-right cursor-pointer">
                              <i
                                className="text-2xl text-center transition cursor-pointer duration-300ease-in-out ri-edit-line hover:text-bb-yellow"
                                onClick={() => {
                                  history.push(
                                    `/quizzes/${row.original.id}/edit`
                                  );
                                }}
                              ></i>
                            </td>
                          </>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicTable;
