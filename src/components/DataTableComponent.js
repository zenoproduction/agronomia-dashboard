import React, { useState } from 'react';
import { FaSearch, FaChevronLeft, FaChevronRight, FaTemperatureHigh, FaTint, FaCloudShowersHeavy, FaShoppingBasket, FaHourglassHalf } from 'react-icons/fa';
import ExportButtonsComponent from './ExportButtonsComponent';

const DataTableComponent = ({ data }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(20);
    const [searchTerm, setSearchTerm] = useState('');

    if (!data || data.length === 0) return <p>In attesa di dati...</p>;

    const filteredData = data.filter(row =>
        Object.values(row).some(value =>
            String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    const totalPages = Math.ceil(filteredData.length / rowsPerPage);
    const startIndex = (currentPage - 1) * rowsPerPage;
    const currentData = filteredData.slice(startIndex, startIndex + rowsPerPage);

    const handlePageChange = (direction) => {
        if (direction === 'prev' && currentPage > 1) {
            setCurrentPage(currentPage - 1);
        } else if (direction === 'next' && currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handleRowsChange = (e) => {
        setRowsPerPage(Number(e.target.value));
        setCurrentPage(1);
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    return (
        <div className="table-container">
            <div className="table-header">
                <h3>Dati simulati</h3>
                <div className="table-controls">
                    <div className="search-wrapper">
                        <FaSearch className="search-icon" />
                        <input
                            type="text"
                            placeholder="Cerca..."
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                    </div>
                    <ExportButtonsComponent data={filteredData} />
                </div>
            </div>

            <table>
                <thead>
                <tr>
                    <th>Data</th>
                    <th><FaTemperatureHigh /> Temperatura (°C)</th>
                    <th><FaTint /> Umidità (%)</th>
                    <th><FaCloudShowersHeavy /> Precipitazioni (mm)</th>
                    <th><FaShoppingBasket /> Raccolto (kg)</th>
                    <th><FaHourglassHalf /> Tempo Crescita (gg)</th>
                </tr>
                </thead>
                <tbody>
                {currentData.map((row, index) => (
                    <tr key={index}>
                        <td>{new Intl.DateTimeFormat('it-IT', {
                            day: '2-digit',
                            month: '2-digit',
                            year: '2-digit'
                        }).format(new Date(row.timestamp))}</td>
                        <td>{row.temperatura}</td>
                        <td>{row.umidita}</td>
                        <td>{row.precipitazioni}</td>
                        <td>{row.raccolto}</td>
                        <td>{row.tempoCrescita}</td>
                    </tr>
                ))}
                </tbody>
            </table>

            <div className="table-footer">
                <div className="left">
                    <label>
                        Visualizza:
                        <select value={rowsPerPage} onChange={handleRowsChange}>
                            <option value="20">20</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                        </select>
                    </label>
                </div>
                <div className="right">
                    <button className="button-green" onClick={() => handlePageChange('prev')} disabled={currentPage === 1}>
                        <FaChevronLeft />
                    </button>
                    <span>Pagina {currentPage} di {totalPages}</span>
                    <button className="button-green" onClick={() => handlePageChange('next')} disabled={currentPage === totalPages}>
                        <FaChevronRight />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DataTableComponent;
