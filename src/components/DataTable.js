import { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, TextField } from "@mui/material";

function DataTable({ tableData }) {
  const [search, setSearch] = useState("");
  const searchValue = (e) => {
    setSearch(e.target.value);
  };

  const FilteredData = () => {
    return tableData.filter(
      (user) =>
        user.productName.toLowerCase().includes(search.toLowerCase()) ||
        user.shortDescription.toLowerCase().includes(search.toLowerCase()) ||
        user.supplier.toLowerCase().includes(search.toLowerCase()) ||
        user.unit.toLowerCase().includes(search.toLowerCase())
    );
  };
  return (
    <>
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
              <TableCell sx={{ fontWeight: "600" }}>Product Name</TableCell>
              <TableCell sx={{ fontWeight: "600" }}>ShortDescription</TableCell>
              <TableCell sx={{ fontWeight: "600" }}>Supplier</TableCell>
              <TableCell sx={{ fontWeight: "600" }}>Product</TableCell>
              <TableCell sx={{ fontWeight: "600" }}>unit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {FilteredData().map(
              (
                { productName, shortDescription, supplier, product, unit },
                index
              ) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{productName}</TableCell>
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
    </>
  );
}

export default DataTable;
