import { Box, Button, IconButton } from "@mui/material";
import MiniDrawer from "../../components/Sidebar"
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import useFetchData from "../../hooks/useFetchData";

export default function Cities() {
    const navigate = useNavigate()

    const columns: GridColDef[] = [
        { field: 'id', headerName: ' الرقم' },
        { field: 'name', headerName: 'المدينة ' },
        { field: 'shipping_fees', headerName: 'رسوم التوصيل ' },


        {
            field: 'operations',
            headerName: 'العمليات',
            sortable: false,
            width: 150,
            renderCell: (params) => (
                <Box>
                    <IconButton
                        aria-label="delete"
                        color="error"
                        onClick={() => handleDeleteCity(params.row.id)}
                    >
                        <DeleteOutlineOutlinedIcon />
                    </IconButton>
                </Box>
            )
        }

    ]
    const [data, setData] = useState<any>([]);
    const delivery_company_id = sessionStorage.getItem('id')

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:3000/cities/cities')
            setData(response.data);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);

    const handleDeleteCity = async (id: number) => {
        try {
            const response = await axios.delete(`http://localhost:3000/cities/city/${id}`)
            console.log(response);

            fetchData()
        } catch (error) {
            console.log(error);
        }
    }
    console.log(data?.cities);

    return (
        <MiniDrawer>
            <Box className="add-button">
                <Button variant="contained"
                    onClick={() => navigate('/add_city')}
                    sx={{
                        backgroundColor: '#4b49ac', color: 'white', '&:hover': {
                            backgroundColor: '#46489c'
                        }
                    }}>إضافة مدينة </Button>
            </Box>
            <DataGrid rows={data?.cities?.filter((item: any) => item.delivery_company_id == delivery_company_id)?.map((item: any) => ({ ...item, id: item.city_id })) ?? []} columns={columns} checkboxSelection sx={{ backgroundColor: 'white' }} />
        </MiniDrawer>
    )
}
