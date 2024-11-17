import { Box, Button, IconButton } from "@mui/material";
import MiniDrawer from "../../components/Sidebar"
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import { useNavigate } from "react-router-dom";
// import useFetchData from "../../hooks/useFetchData";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Subscribers() {
    const navigate = useNavigate()

    const columns: GridColDef[] = [
        { field: 'id', headerName: ' الرقم' },
        { field: 'name', headerName: ' الاسم' },
        { field: 'phone_number', headerName: ' رقم الهاتف' },
        { field: 'email', headerName: ' الإيميل', width: 150 },
        { field: 'address', headerName: ' العنوان' },
        { field: 'compnay_branches_num', headerName: ' عدد أفرع الشركة' },
        // { field: 'compnay_order_num', headerName: ' عدد الطلبات', width: 100 },
        // { field: 'logo', headerName: 'اللوجو', width: 140 },

        {
            field: 'operations',
            headerName: 'الإجراءات',
            sortable: false,
            width: 150,
            renderCell: (params) => (
                <Box>
                    <IconButton
                        onClick={() => navigate(`/edit_subscriber/${params.row.id}`)}
                        aria-label="edit"
                        color="primary"
                    >
                        <EditNoteOutlinedIcon />
                    </IconButton>
                    <IconButton
                        aria-label="delete"
                        color="error"
                        onClick={() => handleDeleteSubscriber(params.row.id)}
                    >
                        <DeleteOutlineOutlinedIcon />
                    </IconButton>
                </Box>
            )
        }

    ]
    const [data, setData] = useState<any>([]);
    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:3000/users/delivery_company')
            setData(response.data);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);

    const handleDeleteSubscriber = async (id: number) => {
        try {
            const response = await axios.delete(`http://localhost:3000/users/delivery_company/${id}`)
            fetchData()
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }
    const filteredRows = data?.delivery_company?.filter((item: any) => item.active === true) ?? [];

    return (
        <MiniDrawer>
            <Box className="add-button">
                <Button variant="contained"
                    onClick={() => navigate('/add_subscriber')}
                    sx={{
                        backgroundColor: '#4b49ac', color: 'white', '&:hover': {
                            backgroundColor: '#46489c'
                        }
                    }}>إضافة مشترك</Button>
            </Box>
            <DataGrid rows={filteredRows} columns={columns} checkboxSelection sx={{ backgroundColor: 'white' }} />
        </MiniDrawer>
    )
}
