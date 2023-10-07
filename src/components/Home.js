import { useState } from "react";
import { DebounceInput } from "react-debounce-input";
import {
  Paper,
  Table,
  TableBody,
  TableHead,
  Avatar,
  TableContainer,
  Button,
  TableCell,
  Tooltip,
  Typography,
  Toolbar,
  TableRow,
  Box,
  AppBar,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import PersonIcon from "@mui/icons-material/Person";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";

import Search from "@mui/icons-material/Search";
import { RiAliensFill } from "react-icons/ri";
import { IoIosPerson } from "react-icons/io";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../context/context";

const columns = [
  {
    id: "image",
    label: "Avatar",
    minWidth: 170,
  },
  {
    id: "name",
    label: "Name",
    minWidth: 170,
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
const statuses = {
  Dead: <PersonOffIcon />,
  Alive: <PersonIcon />,
  unknown: <ContactSupportIcon />,
};

const Species = {
  Human: <IoIosPerson />,
  Alien: <RiAliensFill />,
};

export default function Home() {
  const [activePage, setActivePage] = useState(1);
  const [rowsPerPage] = useState(5);
  const [input, setInput] = useState("");
  const { data } = useGlobalContext();
  const totalPages = Math.ceil(data.length / rowsPerPage);
  console.log(data, "<<<");

  const prev = () => {
    if (activePage > 1) {
      setActivePage((prev) => prev - 1);
    }
  };
  const next = () => {
    if (activePage < totalPages) {
      setActivePage((prev) => prev + 1);
    }
  };

  const start = (activePage - 1) * rowsPerPage;
  const end = activePage * rowsPerPage;
  const sliced = data.slice(start, end);

  const filtered = sliced.filter((el) =>
    el.name.toLowerCase().includes(input.toLowerCase())
  );

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Avatar
              alt="Rick&Morty"
              src={`https://pngimg.com/d/rick_morty_PNG39.png`}
              sx={{ width: 56, height: 56 }}
            />
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            >
              Rick&Morty API
            </Typography>

            <DebounceInput
              minLength={2}
              debounceTimeout={500}
              onChange={(e) => setInput(e.target.value)}
              value={input}
              className="w-25 mx-auto my-3 border rounded p-1 ps-2"
              placeholder="search by name..."
            />
            <Search className="hover"></Search>
          </Toolbar>
        </AppBar>
      </Box>
      <Paper
        sx={{
          width: "100%",
          overflow: "hidden",
          borderTop: "1px solid lightgrey ",
        }}
      >
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    style={{ minWidth: column.minWidth, fontWeight: "600" }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filtered.length ? (
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
                    <TableRow hover role="checkbox" key={id}>
                      <TableCell align="right">
                        <Avatar src={image} alt={name} />
                      </TableCell>

                      <TableCell>
                        <Link to={`/character/${id}`}>{name}</Link>
                      </TableCell>

                      <TableCell sx={{ fontSize: "22px" }}>
                        <Tooltip placement="top" title={species}>
                          {Species[species]}
                        </Tooltip>
                      </TableCell>
                      <TableCell>
                        <Tooltip placement="top" title={status}>
                          {statuses[status]}
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={12} align="center">
                    No person & alien found!
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <Button onClick={prev} disabled={activePage === 1}>
        <ArrowBackIcon />
      </Button>

      <Button onClick={next} disabled={activePage === totalPages}>
        <ArrowForwardIcon />
      </Button>
    </>
  );
}
