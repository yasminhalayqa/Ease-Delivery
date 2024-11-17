import { Box, Button, IconButton } from "@mui/material";
import MiniDrawer from "../../components/Sidebar"
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Salesmen() {
    const navigate = useNavigate()

    const columns: GridColDef[] = [
        { field: 'id', headerName: ' الرقم' },
        { field: 'name', headerName: 'الاسم' },
        { field: 'phone_number', headerName: ' رقم الهاتف' },
        { field: 'email', headerName: ' الإيميل' },
        { field: 'city', headerName: ' المدينة' },
        { field: 'area', headerName: ' المنطقة' },
        { field: 'address', headerName: 'العنوان بالكامل' },
        {
            field: 'operations',
            headerName: 'العمليات',
            sortable: false,
            width: 150,
            renderCell: (params) => (
                <Box>
                    <IconButton
                        onClick={() => navigate(`/edit_salesman/${params.row.id}`)}
                        aria-label="edit"
                        color="primary"
                    >
                        <EditNoteOutlinedIcon />
                    </IconButton>
                    <IconButton
                        aria-label="delete"
                        color="error"
                        onClick={() => handleDeleteSalesman(params.row.id)}
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
            const response = await axios.get('http://localhost:3000/users/salesman')
            setData(response.data);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);

    const handleDeleteSalesman = async (id: number) => {
        try {
            const response = await axios.delete(`http://localhost:3000/users/salesman/${id}`)
            fetchData()
            console.log(response);

        } catch (error) {
            console.log(error);
        }
    }
    const delivery_company_id = sessionStorage.getItem('id')

    return (
        <MiniDrawer>
            <Box className="add-button">
                <Button variant="contained"
                    onClick={() => navigate('/add_salesman')}
                    sx={{
                        backgroundColor: '#4b49ac', color: 'white', '&:hover': {
                            backgroundColor: '#46489c'
                        }
                    }}>إضافة مندوب توصيل </Button>
            </Box>
            <DataGrid rows={data?.salesMen?.filter((item: any) => item.delivery_company_id == delivery_company_id).map((item: any) => ({
                ...item,
                city: item?.city?.name,
                area: item?.area?.name
            })) ?? []} columns={columns} checkboxSelection sx={{ backgroundColor: 'white' }} />
        </MiniDrawer>
    )
}
