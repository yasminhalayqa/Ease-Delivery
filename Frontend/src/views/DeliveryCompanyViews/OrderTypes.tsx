import { Box, Button, IconButton } from "@mui/material";
import MiniDrawer from "../../components/Sidebar"
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

export default function OrderTypes() {
    const navigate = useNavigate()

    const columns: GridColDef[] = [
        { field: 'id', headerName: ' الرقم' },
        { field: 'name', headerName: 'النوع ' },

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
                        onClick={() => handleDeleteOrderType(params.row.id)}
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
            const response = await axios.get('http://localhost:3000/order_types/order_type')
            setData(response.data);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);

    const handleDeleteOrderType = async (id: number) => {
        try {
            const response = await axios.delete(`http://localhost:3000/order_types/order_type/${id}`)
            console.log(response);

            fetchData()
        } catch (error) {
            console.log(error);
        }
    }

    const delivery_company_id = sessionStorage.getItem('id')

    return (
        <MiniDrawer>
            <Box className="add-button">
                <Button variant="contained"
                    onClick={() => navigate('/add_order_type')}
                    sx={{
                        backgroundColor: '#4b49ac', color: 'white', '&:hover': {
                            backgroundColor: '#46489c'
                        }
                    }}>إضافة نوع شحنة </Button>
            </Box>
            <DataGrid rows={data?.orderTypes?.filter((item: any) => item.delivery_company_id == delivery_company_id).map((item: any) => ({ ...item, id: item.order_type_id })) ?? []} columns={columns} checkboxSelection sx={{ backgroundColor: 'white' }} />
        </MiniDrawer>
    )
}
