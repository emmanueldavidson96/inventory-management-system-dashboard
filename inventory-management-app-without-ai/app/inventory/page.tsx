"use client";

import { useGetProductsQuery } from "@/api/api";
import Header from "@/(components)/Header";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { Box, Chip, Rating } from "@mui/material";
import numeral from "numeral";

const columns: GridColDef[] = [
  {
    field: "productId",
    headerName: "ID",
    width: 110,
  },
  {
    field: "name",
    headerName: "Product Name",
    flex: 1,
    minWidth: 220,
  },
  {
    field: "price",
    headerName: "Price",
    width: 140,
    renderCell: (params) => (
      <span className="font-semibold text-green-600">
        {numeral(params.value).format("$0,0.00")}
      </span>
    ),
  },
  {
    field: "rating",
    headerName: "Rating",
    width: 180,
    sortable: true,
    renderCell: (params) =>
      params.value ? (
        <Box className="flex items-center gap-2 h-full">
          <Rating
            value={Number(params.value)}
            precision={0.5}
            readOnly
            size="small"
          />
          <span className="text-sm text-gray-600">{params.value}</span>
        </Box>
      ) : (
        <span className="text-gray-400">N/A</span>
      ),
  },
  {
    field: "stockQuantity",
    headerName: "Stock",
    width: 150,
    renderCell: (params) => {
      const stock = params.value as number;

      return (
        <Chip
          size="small"
          label={stock.toLocaleString()}
          color={stock > 500 ? "success" : stock > 100 ? "warning" : "error"}
          variant="filled"
        />
      );
    },
  },
];

export default function Inventory() {
  const { data: products, isLoading, isError } = useGetProductsQuery();

  if (isLoading) {
    return (
      <div className="py-8 text-center text-gray-500">Loading products...</div>
    );
  }

  if (isError || !products) {
    return (
      <div className="py-8 text-center text-red-500">
        Failed to load inventory.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Header name="Inventory" />

      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
        <DataGrid
          rows={products}
          columns={columns}
          getRowId={(row) => row.productId}
          checkboxSelection
          disableRowSelectionOnClick
          slots={{
            toolbar: GridToolbar,
          }}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
                page: 0,
              },
            },
          }}
          pageSizeOptions={[10, 25, 50]}
          sx={{
            border: 0,
            minHeight: 650,

            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#f8fafc",
              fontWeight: 700,
              fontSize: "0.9rem",
              borderBottom: "1px solid #e5e7eb",
            },

            "& .MuiDataGrid-columnHeaderTitle": {
              fontWeight: 700,
            },

            "& .MuiDataGrid-row": {
              transition: "background-color .2s ease",
            },

            "& .MuiDataGrid-row:hover": {
              backgroundColor: "#f8fafc",
            },

            "& .MuiDataGrid-cell": {
              borderBottom: "1px solid #f1f5f9",
            },

            "& .MuiDataGrid-footerContainer": {
              borderTop: "1px solid #e5e7eb",
            },

            "& .MuiCheckbox-root": {
              color: "#3b82f6",
            },
          }}
        />
      </div>
    </div>
  );
}
