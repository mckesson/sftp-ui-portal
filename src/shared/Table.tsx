import React, { useState, useMemo } from "react";
import {
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  IconButton,
  TablePagination,
  Box,
  Skeleton,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const Table = ({
  data,
  columns,
  onDelete,
  onEdit,
  pagination = true,
  onRowClick,
  pending,
  noDataText,
  itemsPerPageOptions = [5, 10, 20],
}) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(itemsPerPageOptions[0]);

  const sortedData = useMemo(() => {
    if (!sortConfig.key) return data;
    return [...data].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });
  }, [data, sortConfig]);

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const handleChangePage = (_, newPage) => setCurrentPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(0);
  };

  return (
    <Box>
      <TableContainer style={{ minWidth: "100%", width: "1020px" }}>
        <MuiTable
          size="small"
          className={columns.length > 9 ? "large-table" : ""}
        >
          {data.length > 0 && (
            <TableHead>
              <TableRow>
                {columns.map((col) => (
                  <TableCell
                    align={col.align}
                    key={col.id}
                    style={{
                      width: col.width,
                      minWidth: col.minWidth,
                    }}
                  >
                    <TableSortLabel
                      active={sortConfig.key === col.id}
                      direction={
                        sortConfig.key === col.id ? sortConfig.direction : "asc"
                      }
                      onClick={() => handleSort(col.id)}
                    >
                      {col.name}
                    </TableSortLabel>
                  </TableCell>
                ))}
                {(onEdit || onDelete) && <TableCell>Actions</TableCell>}
              </TableRow>
            </TableHead>
          )}
          <TableBody>
            {pending ? (
              <TableRow>
                <TableCell colSpan={columns.length}>
                  <Skeleton />
                  <Skeleton />
                  <Skeleton />
                  <Skeleton />
                  <Skeleton />
                </TableCell>
              </TableRow>
            ) : data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length}>
                  <Box className="center-data" py={4}>
                    <Typography variant="h5" sx={{ color: "#00000061" }}>
                      {noDataText || "No records found"}
                    </Typography>
                  </Box>
                </TableCell>
              </TableRow>
            ) : (
              sortedData
                .slice(
                  currentPage * rowsPerPage,
                  (currentPage + 1) * rowsPerPage
                )
                .map((row) => (
                  <TableRow key={row.id} hover>
                    {columns.map((col) => (
                      <TableCell
                        key={col.id}
                        align={col.align}
                        onClick={() =>
                          col.id === "clientPartnerName" && onRowClick?.(row)
                        }
                      >
                        {row[col.id]}
                      </TableCell>
                    ))}
                    {(onEdit || onDelete) && (
                      <TableCell>
                        {onEdit && (
                          <IconButton onClick={() => onEdit(row)}>
                            <EditIcon />
                          </IconButton>
                        )}
                        {onDelete && (
                          <IconButton onClick={() => onDelete(row.id)}>
                            <DeleteIcon />
                          </IconButton>
                        )}
                      </TableCell>
                    )}
                  </TableRow>
                ))
            )}
          </TableBody>
        </MuiTable>
      </TableContainer>
      {pagination && data.length > 0 && (
        <TablePagination
          rowsPerPageOptions={itemsPerPageOptions}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={currentPage}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}
    </Box>
  );
};

export default Table;
