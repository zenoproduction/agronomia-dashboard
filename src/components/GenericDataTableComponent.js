import React, { useState } from 'react';

const GenericDataTableComponent = ({ data, columns, title = 'Tabella dati', csvFilename = 'esportazione.csv' }) => {
    const [search, setSearch] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(20);
    const [currentPage, setCurrentPage] = useState(1);

    const filteredData = data.filter(row =>
        columns.some(col =>
            String(row[col.key] ?? '')
                .toLowerCase()
                .includes(search.toLowerCase())
        )
    );

    const totalPages = Math.ceil(filteredData.length / rowsPerPage);
    const paginatedData = filteredData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

    return (
        <div className="table-container">
            <div className="table-header">
                <h4>{title}</h4>
                <div className="table-controls">
                    <input
                        type="text"
                        placeholder="Cerca..."
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setCurrentPage(1);
                        }}
                    />
                </div>
            </div>

            <table>
                <thead>
                <tr>
                    {columns.map((col, index) => (
                        <th key={index} style={{ textAlign: col.align || 'center' }}>{col.label}</th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {paginatedData.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        {columns.map((col, colIndex) => (
                            <td
                                key={colIndex}
                                style={{ textAlign: col.align || 'center' }}
                            >
                                {col.format ? col.format(row[col.key]) : row[col.key]}
                            </td>
                        ))}
                    </tr>
                ))}
                </tbody>

            </table>

            <div className="table-footer">
                <div className="left">
                    Mostra
                    <select value={rowsPerPage} onChange={e => {
                        setRowsPerPage(Number(e.target.value));
                        setCurrentPage(1);
                    }}>
                        <option value={20}>20</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                    </select>
                    elementi
                </div>
                <div className="right">
                    Pagina {currentPage} di {totalPages}
                    <button onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} disabled={currentPage === 1}>«</button>
                    <button onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages}>»</button>
                </div>
            </div>
        </div>
    );
};

export default GenericDataTableComponent;
