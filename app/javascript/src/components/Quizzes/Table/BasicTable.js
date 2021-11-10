import React, { useMemo, useState } from "react";

import { useHistory } from "react-router-dom";
import { useTable } from "react-table";

import { COLUMNS } from "./columns";
import Modal from "./Modal";

const BasicTable = ({ tdata, destroyQuiz }) => {
  const [open, setOpen] = useState(false);
  const [id, setId] = useState(0);
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
                    {/* <th className="px-6 py-3 bg-gray-50"></th> */}
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
                              className="block w-64 px-6 py-4 text-xl font-medium
                              leading-8 text-bb-purple capitalize truncate"
                              {...cell.getCellProps()}
                            >
                              {cell.render("Cell")}
                            </td>
                            <td className="px-6 py-4 text-sm font-medium leading-5 text-right cursor-pointer">
                              <a
                                className="text-2xl text-center transition cursor-pointer duration-300ease-in-out ri-pencil-fill hover:text-bb-yellow"
                                onClick={() => {
                                  history.push(
                                    `/quizzes/${row.original.id}/edit`
                                  );
                                }}
                              >
                                Edit
                              </a>
                            </td>
                            <td className="px-6 py-4 text-sm font-medium leading-5 text-right cursor-pointer">
                              <a
                                className="text-red-500
                              hover:text-red-700 ri-delete-bin-line text-2xl text-center transition cursor-pointer duration-300ease-in-out"
                                onClick={() => {
                                  setOpen(true);
                                  setId(row.original.id);
                                }} //handleDelete(row.original.id)} //destroyQuiz(row.original.id)
                              >
                                Delete
                              </a>
                              {open ? (
                                <Modal
                                  setOpen={setOpen}
                                  id={id}
                                  destroyQuiz={destroyQuiz}
                                />
                              ) : null}
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
