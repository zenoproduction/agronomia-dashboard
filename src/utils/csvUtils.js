export function exportToCsv(data, headers, filename) {
    if (!data || data.length === 0) return;

    const csvHeaders = headers.join(',');
    const csvRows = data.map(row => {
        return headers.map(h => {
            const val = row[h] != null ? row[h] : '';
            return `"${String(val).replace(/"/g, '""')}"`;
        }).join(',');
    });

    const csvContent = [csvHeaders, ...csvRows].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
