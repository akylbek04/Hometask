import { useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import { DebounceInput } from "react-debounce-input";

import TableRow from "@mui/material/TableRow";
import { Avatar } from "@mui/material";


const columns = [
  {
    id: "image",
    label: "Avatar",
    minWidth: 170,
  },
  {
    id: "name",
    label: "Name",
    minWidth: 100,
  },
  {
    id: "species",
    label: "Species",
    minWidth: 170,
  },
  {
    id: "status",
    label: "Status",
    minWidth: 170,
  },
];

export default function Home({ data }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [input, setInput] = useState("");
  

  const filtered = data.filter((el) => el.name.toLowerCase().includes(input.toLowerCase()))

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <DebounceInput
        minLength={3}
        debounceTimeout={500}
        onChange={(e) => setInput(e.target.value)}
        value={input}
      />
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.length &&
              filtered.map((el) => {
                const {
                  id,
                  name,
                  type,
                  status,
                  species,
                  gender,
                  origin,
                  location,
                  image,
                } = el;
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={id}>
                    <TableCell align="right">
                      <Avatar src={image} alt={name} />
                    </TableCell>
                    <TableCell>{name}</TableCell>
                    <TableCell>{species}</TableCell>
                    <TableCell>{status}</TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
