import { useEffect, useState } from "react";
import { useAuth } from "../hook/useAuth";
import {
  Box,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Pagination,
} from "@mui/material";
import Loading from "../components/Loading";

function Dashboard() {
  const [token] = useAuth();
  const [search, setSearch] = useState("");
  const [tableData, setTableData] = useState([]);
  const [total_count, setTotal_count] = useState(null);
  const [page, setPage] = useState(1);
  const searchValue = (e) => {
    setSearch(e.target.value);
  };
  const handleChange = (event, value) => {
    setPage(value);
  };
  const paginationCount = Math.ceil(total_count / 100);

  const FilteredData = () => {
    return tableData.filter(
      (user) =>
        user.sku.toLowerCase().includes(search.toLowerCase()) ||
        user.shortDescription.toLowerCase().includes(search.toLowerCase()) ||
        user.supplier.toLowerCase().includes(search.toLowerCase()) ||
        user.unit.toLowerCase().includes(search.toLowerCase())
    );
  };
  useEffect(() => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + `${token}`);
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Cookie", "PHPSESSID=qd9l3lmujpbiqi754liv37v3nu");

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`https://toko.ox-sys.com/variations?page=${page}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setTableData(result.items);
        setTotal_count(result.total_count);
      })
      .catch((error) => console.log("error", error));
  }, [page]);
  return (
    <Box sx={{ padding: "50px" }}>
      {tableData.length > 0 ? (
        <Box>
          <Box>
            <TextField
              value={search}
              sx={{ width: "100%", my: "30px" }}
              onChange={searchValue}
              id="outlined-basic"
              label="Search for items"
              variant="outlined"
            />
          </Box>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: "600" }}>Number</TableCell>
                  <TableCell sx={{ fontWeight: "600" }}>Sku</TableCell>
                  <TableCell sx={{ fontWeight: "600" }}>
                    ShortDescription
                  </TableCell>
                  <TableCell sx={{ fontWeight: "600" }}>Supplier</TableCell>
                  <TableCell sx={{ fontWeight: "600" }}>Product</TableCell>
                  <TableCell sx={{ fontWeight: "600" }}>unit</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {FilteredData().map(
                  (
                    { sku, shortDescription, supplier, product, unit },
                    index
                  ) => (
                    <TableRow key={index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{sku}</TableCell>
                      <TableCell>{shortDescription}</TableCell>
                      <TableCell>{supplier}</TableCell>
                      <TableCell>{product}</TableCell>
                      <TableCell>{unit}</TableCell>
                    </TableRow>
                  )
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              my: "30px",
            }}
          >
            <Pagination
              count={paginationCount}
              page={page}
              onChange={handleChange}
            />
          </Box>
        </Box>
      ) : (
        <Box>
          <Loading />
        </Box>
      )}
    </Box>
  );
}

export default Dashboard;
