import React, { useState, useMemo } from "react";
import { toast } from "sonner";
import {
  useTables,
  useTableFilters,
  useCreateTable,
  useUpdateTable,
  useDeleteTable,
  useUpdateTableStatus,
  useUpdateTableActive,
} from "@scan/restaurants";

import TableHeader from "../components/TableHeader";
import TableFilters from "../components/TableFilters";
import TableGrid from "../components/TableGrid";
import TableFormModal from "../components/TableForm";

const TablePage = () => {
  const [filters, setFilters] = useState({
    status: "all",
    floor: "all",
    section: "all",
  });

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTable, setEditingTable] = useState(null);

  // 1. Fetch default all tables list for meta/dropdown options & top summary metrics
  const { data: allTablesRes, isLoading: isAllLoading } = useTables();
  const allTables = useMemo(() => {
    return allTablesRes?.data || allTablesRes || [];
  }, [allTablesRes]);

  // Determine if active filters are applied
  const isFiltered =
    filters.status !== "all" ||
    filters.floor !== "all" ||
    filters.section !== "all";

  // Build filter params object for useTableFilters
  const filterParams = useMemo(() => {
    const params = {};
    if (filters.status !== "all") params.status = filters.status;
    if (filters.floor !== "all") params.floor = filters.floor;
    if (filters.section !== "all") params.section = filters.section;
    return params;
  }, [filters]);

  // 2. Fetch filtered tables when filters are active
  const { data: filteredTablesRes, isLoading: isFilterLoading } =
    useTableFilters(filterParams);

  // Compute final table list to display
  const tables = useMemo(() => {
    if (isFiltered) {
      return filteredTablesRes?.data || filteredTablesRes || [];
    }
    return allTables;
  }, [isFiltered, filteredTablesRes, allTables]);

  const isLoading = isFiltered ? isFilterLoading : isAllLoading;

  // Extract unique floors & sections for filter options
  const availableFloors = useMemo(() => {
    return Array.from(new Set(allTables.map((t) => t.floor).filter(Boolean)));
  }, [allTables]);

  const availableSections = useMemo(() => {
    return Array.from(new Set(allTables.map((t) => t.section).filter(Boolean)));
  }, [allTables]);

  // Mutations
  const { mutate: createTable } = useCreateTable();
  const { mutate: updateTable } = useUpdateTable();
  const { mutate: deleteTable } = useDeleteTable();
  const { mutate: updateStatus } = useUpdateTableStatus();
  const { mutate: updateActive } = useUpdateTableActive();

  // Handlers
  const handleOpenForm = (table = null) => {
    setEditingTable(table);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setEditingTable(null);
    setIsFormOpen(false);
  };

  const handleFormSubmit = (payload) => {
    if (editingTable) {
      updateTable(
        { tableId: editingTable.id, payload },
        {
          onSuccess: () => {
            toast.success(`Table ${payload.tableNumber} updated successfully!`);
            handleCloseForm();
          },
          onError: (err) =>
            toast.error(err.message || "Failed to update table"),
        },
      );
    } else {
      createTable(payload, {
        onSuccess: () => {
          toast.success(`Table ${payload.tableNumber} created successfully!`);
          handleCloseForm();
        },
        onError: (err) => toast.error(err.message || "Failed to create table"),
      });
    }
  };

  const handleDelete = (id, tableNumber) => {
    if (
      window.confirm(`Are you sure you want to delete Table ${tableNumber}?`)
    ) {
      deleteTable(id, {
        onSuccess: () => toast.success(`Table ${tableNumber} deleted`),
        onError: (err) => toast.error(err.message || "Failed to delete table"),
      });
    }
  };

  const handleStatusChange = (tableId, tableNumber, newStatus) => {
    updateStatus(
      { tableId, status: newStatus },
      {
        onSuccess: () =>
          toast.success(`Table ${tableNumber} set to ${newStatus}`),
        onError: (err) => toast.error(err.message || "Status update failed"),
      },
    );
  };

  const handleToggleActive = (tableId, tableNumber, currentIsActive) => {
    const nextState = !currentIsActive;
    updateActive(
      { tableId, isActive: nextState },
      {
        onSuccess: () =>
          toast.success(
            `Table ${tableNumber} ${nextState ? "activated" : "deactivated"}`,
          ),
        onError: (err) => toast.error(err.message || "Active toggle failed"),
      },
    );
  };

  return (
    <div className="min-h-screen w-full bg-lightPrimary p-5 font-dm text-navy-700 dark:bg-navy-900 dark:text-white">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-6">
        {/* Header & Metric Summary Cards */}
        <TableHeader
          allTables={allTables}
          onAddClick={() => handleOpenForm()}
        />

        {/* Filter Bar */}
        <TableFilters
          filters={filters}
          onFilterChange={setFilters}
          floors={availableFloors}
          sections={availableSections}
        />

        {/* Tables Grid Grouped by Floor */}
        {isLoading ? (
          <div className="flex h-64 items-center justify-center rounded-[20px] bg-white dark:border dark:border-white/10 dark:bg-navy-800">
            <div className="h-9 w-9 animate-spin rounded-full border-4 border-brand-500 border-t-transparent dark:border-brand-400" />
          </div>
        ) : (
          <TableGrid
            tables={tables}
            onEdit={handleOpenForm}
            onDelete={handleDelete}
            onStatusChange={handleStatusChange}
            onToggleActive={handleToggleActive}
          />
        )}
      </div>

      {/* Form Modal */}
      <TableFormModal
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        onSubmit={handleFormSubmit}
        initialData={editingTable}
      />
    </div>
  );
};

export default TablePage;
