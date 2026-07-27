import React from "react";

const STATUS_STYLES = {
  available:
    "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400",
  occupied:
    "bg-brand-500/10 text-brand-500 dark:bg-brand-400/10 dark:text-brand-400",
  reserved: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
  out_of_service:
    "bg-gray-100 text-gray-500 dark:bg-navy-700 dark:text-gray-400",
  active:
    "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400",
  bill_requested:
    "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400",
  paid: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
  pending:
    "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  preparing: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
  ready: "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400",
  served: "bg-gray-100 text-gray-500 dark:bg-navy-700 dark:text-gray-400",
};

const STATUS_LABELS = {
  available: "Available",
  occupied: "Occupied",
  reserved: "Reserved",
  out_of_service: "Out of Service",
  active: "Active",
  bill_requested: "Bill Requested",
  paid: "Paid",
  pending: "Pending",
  preparing: "Preparing",
  ready: "Ready",
  served: "Served",
};

const StatusBadge = ({ status, className = "" }) => {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-bold ${STATUS_STYLES[status] || STATUS_STYLES.pending} ${className}`}
    >
      {STATUS_LABELS[status] || status}
    </span>
  );
};

export default StatusBadge;
