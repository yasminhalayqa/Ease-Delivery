import React from 'react';
import { Button } from '@mui/material';
import * as XLSX from 'xlsx';

interface ExportToExcelProps {
    data: any[]; // Data to be exported
    fileName: string; // Name of the exported Excel file
}

export const handleExportToExcel = ({ data, fileName }: ExportToExcelProps) => {
    // Convert data to Excel workbook
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

    // Convert workbook to Excel binary
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

    // Create Blob object from binary data
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });

    // Download Blob as Excel file
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${fileName}.xlsx`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
};
