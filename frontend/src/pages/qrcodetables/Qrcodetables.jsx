import { useState, useEffect } from "react";
import TableRow from './TableRow';
import "./Qrcodetables.css";
import Modal from 'react-modal';
import axios from 'axios';

const Qrcodetables = ({ url }) => {
    const [tables, setTables] = useState([]);
    const [loading, setLoading] = useState(true)
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [tableNumber, setTableNumber] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const fetchTables = async () => {
        try {
            const response = await axios.get(url + '/api/table/');
            setTables(response.data.data);
        } catch (error) {
            console.error('Error fetching tables:', error);
            alert('Error fetching tables');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTables();
    }, []);

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const handleTableNumberChange = (e) => {
        setTableNumber(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // API call to add table using axios
        try {
            const response = await axios.post(url + '/api/table/add', { number: tableNumber });

            const result = response.data;
            if (result.success) {
                setTables([...tables, { number: tableNumber }]);
                setTableNumber('');
                closeModal();
            } else {
                alert(result.message);
            }
        } catch (error) {
            console.error('Error adding table:', error);
            alert('Error adding table');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await axios.post(url + '/api/table/remove/', { id: id });
            const result = response.data;
            if (result.success) {
                setTables(tables.filter(table => table._id !== id));
            } else {
                alert(result.message);
            }
        } catch (error) {
            console.error('Error deleting table:', error);
            alert('Error deleting table');
        }
    };

    return (
        <div>
            <div className="header">
                <h2>QR Code liste Tables</h2>
                <div className="addButton" onClick={openModal}>add new</div>
            </div>
            <div className="table-responsive">
                <table border={"1px"}>
                    <thead>
                        <tr>
                            <th>QR Code</th>
                            <th>Table Number</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? <tr><td colSpan={3}>loading...</td></tr> :
                            tables.length > 0 ?
                                tables.map((table, index) => (
                                    <TableRow
                                        key={index}
                                        table={table}
                                        onDelete={handleDelete}
                                    />
                                )) :
                                <tr><td colSpan={3}>No data for the moment</td></tr>
                        }
                    </tbody>
                </table>
            </div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Add Table"
            >
                <h2>Add New Table</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Table Number:
                        <input
                            type="number"
                            value={tableNumber}
                            onChange={handleTableNumberChange}
                            required
                        />
                    </label>
                    <button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Submitting...' : 'Submit'}
                    </button>
                    <button type="button" onClick={closeModal} disabled={isSubmitting}>
                        Cancel
                    </button>
                </form>
            </Modal>
        </div>
    );
}

export default Qrcodetables;