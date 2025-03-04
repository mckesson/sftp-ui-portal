import React, { useState, useMemo } from "react";
import {
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  TablePagination,
  Box,
  Skeleton,
  Typography,
} from "@mui/material";

// Define the types for columns and row data
interface Column {
  id: string;
  name: string;
  align?: "inherit" | "left" | "center" | "right" | "justify";
  width?: number;
  minWidth?: number;
}

interface TableProps<T> {
  data: T[];
  columns: Column[];
  pagination?: boolean;
  onRowClick?: (row: T) => void;
  pending?: boolean;
  noDataText?: string;
  itemsPerPageOptions?: number[];
}

const Table = <T,>({
  data,
  columns,
  pagination = true,
  onRowClick,
  pending,
  noDataText,
  itemsPerPageOptions = [5, 10, 20],
}: TableProps<T>) => {
  const [sortConfig, setSortConfig] = useState<{
    key: string | null;
    direction: "asc" | "desc";
  }>({ key: null, direction: "asc" });
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(itemsPerPageOptions[0]);

  const sortedData = useMemo(() => {
    if (!sortConfig.key) return data;
    return [...data].sort((a, b) => {
      if (a[sortConfig.key as keyof T] < b[sortConfig.key as keyof T]) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (a[sortConfig.key as keyof T] > b[sortConfig.key as keyof T]) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });
  }, [data, sortConfig]);

  const handleSort = (key: string) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const handleChangePage = (_: unknown, newPage: number) =>
    setCurrentPage(newPage);
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(0);
  };

  // Extracted logic for rendering the body rows
  const renderTableBody = () => {
    if (pending) {
      return (
        <TableRow>
          <TableCell colSpan={columns.length}>
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </TableCell>
        </TableRow>
      );
    }

    if (data.length === 0) {
      return (
        <TableRow>
          <TableCell colSpan={columns.length}>
            <Box className="center-data" py={4}>
              <Typography variant="h5" sx={{ color: "#00000061" }}>
                {noDataText ?? "No records found"}
              </Typography>
            </Box>
          </TableCell>
        </TableRow>
      );
    }

    return sortedData
      .slice(currentPage * rowsPerPage, (currentPage + 1) * rowsPerPage)
      .map((row, index) => (
        <TableRow key={index} hover onClick={() => onRowClick?.(row)}>
          {columns.map((col) => (
            <TableCell key={col.id} align={col.align}>
              {row[col.id as keyof T]}
            </TableCell>
          ))}
        </TableRow>
      ));
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
              </TableRow>
            </TableHead>
          )}
          <TableBody>{renderTableBody()}</TableBody>
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
