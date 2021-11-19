import React, { useMemo, useState } from "react";

import { Button, Typography } from "@bigbinary/neetoui/v2";
import { useHistory } from "react-router-dom";
import { useTable } from "react-table";

import "components/Reports/table.css";

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
              // className="min-w-full divide-y divide-gray-200"
              {...getTableProps()}
            >
              <thead>
                {headerGroups.map((headerGroup, index) => (
                  <tr key={index} {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column, i) => (
                      <th
                        key={i}
                        className="px-6 py-3 text-s font-bold leading-4 tracking-wider
         text-left text-bb-black text-opacity-50 uppercase bg-gray-50"
                        {...column.getHeaderProps()}
                      >
                        {column.render("Header")}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody
                {...getTableBodyProps()}
                //className="bg-white divide-y divide-gray-200"
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
                              // className="block w-64 px-6 py-4 text-xl font-medium
                              // leading-8 text-bb-purple truncate"
                              {...cell.getCellProps()}
                            >
                              <Typography style="h4">
                                {cell.render("Cell")}
                              </Typography>
                            </td>
                            <td //className="px-4 py-4 text-sm font-medium leading-5 text-right cursor-pointer"
                            >
                              <Button
                                label="Show"
                                onClick={() => {
                                  history.push(
                                    `/quizzes/${row.original.id}/show`
                                  );
                                }}
                                style="secondary"
                                size="large"
                              />
                            </td>
                            <td
                            //className="px-4 py-4 text-sm font-medium leading-5 text-right cursor-pointer"
                            >
                              <Button
                                label="Edit"
                                onClick={() => {
                                  history.push(
                                    `/quizzes/${row.original.id}/edit`
                                  );
                                }}
                                style="secondary"
                                icon={"ri-pencil-fill"}
                                iconPosition="left"
                                size="large"
                              />
                            </td>
                            <td
                            //className="px-4 py-4 text-sm font-medium leading-5 text-right cursor-pointer"
                            >
                              <Button
                                label="Delete"
                                onClick={() => {
                                  setOpen(true);
                                  setId(row.original.id);
                                }}
                                style="danger"
                                icon="ri-delete-bin-line"
                                iconPosition="left"
                                size="large"
                              />
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
