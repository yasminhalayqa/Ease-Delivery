import { Box, Button, IconButton } from "@mui/material";
import MiniDrawer from "../../components/Sidebar"
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Stores() {
    const navigate = useNavigate()

    const columns: GridColDef[] = [
        { field: 'id', headerName: ' الرقم' },
        { field: 'name', headerName: 'اسم الشركة' },
        { field: 'phone_number', headerName: ' رقم الهاتف' },
        { field: 'email', headerName: ' الإيميل' },
        { field: 'city', headerName: ' المدينة' },
        { field: 'area', headerName: ' المنطقة' },
        { field: 'address', headerName: 'العنوان بالكامل' },
        { field: 'compnay_branches_num', headerName: ' عدد أفرع الشركة' },
        // { field: 'logo', headerName: 'اللوجو', width: 140 },

        {
            field: 'operations',
            headerName: 'العمليات',
            sortable: false,
            width: 150,
            renderCell: (params) => (
                <Box>
                    <IconButton
                        onClick={() => navigate(`/edit_store/${params.row.id}`)}
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
            const response = await axios.get('http://localhost:3000/users/store')
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
            const response = await axios.delete(`http://localhost:3000/users/store/${id}`)
            console.log(response);

            fetchData()
        } catch (error) {
            console.log(error);
        }
    }
    console.log(data?.stores);
    const delivery_company_id = sessionStorage.getItem('id')

    return (
        <MiniDrawer>
            <Box className="add-button">
                <Button variant="contained"
                    onClick={() => navigate('/add_store')}
                    sx={{
                        backgroundColor: '#4b49ac', color: 'white', '&:hover': {
                            backgroundColor: '#46489c'
                        }
                    }}>إضافة شركة </Button>
            </Box>
            <DataGrid rows={data?.stores?.filter((item: any) => item.delivery_company_id == delivery_company_id).map((item: any) => ({
                ...item,
                city: item?.city?.name,
                area: item?.area?.name
            })) ?? []} columns={columns} checkboxSelection sx={{ backgroundColor: 'white' }} />
        </MiniDrawer>
    )
}
