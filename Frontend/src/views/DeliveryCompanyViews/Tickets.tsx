import { Card, CardContent, TextField, Typography } from "@mui/material";
import MiniDrawer from "../../components/Sidebar"
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import useFetchData from "../../hooks/useFetchData";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import usePutData from "../../hooks/usePutData";

export default function Tickets() {
    const navigate = useNavigate()
    const { data: stores } = useFetchData('http://localhost:3000/users/store') as any
    const [dialog, setDialog] = useState(false)
    const [status, setStatus] = useState('')
    const [ticket_id, setTiecketID] = useState()
    const delivery_company_id = sessionStorage.getItem('id')
    const columns: GridColDef[] = [
        { field: 'id', headerName: ' الرقم' },
        { field: 'title', headerName: 'العنوان' },
        { field: 'description', headerName: 'الوصف' , width:250},
        { field: 'status', headerName: ' الحالة' },
        { field: 'store', headerName: 'الشركة' },
        { field: 'createdAt', headerName: 'تاريخ الإنشاء', width:200 },
        // {
        //     field: 'view',
        //     headerName: 'عرض التفاصيل',
        //     renderCell: (params) => (
        //         <Button
        //             variant="contained"
        //             sx={{
        //                 backgroundColor: '#28a0aa', color: 'white', '&:hover': {
        //                     backgroundColor: '#28a0aa'
        //                 }
        //             }} onClick={() => navigate(`/order_details/${params.row.id}`)
        //             }
        //         >
        //             عرض التفاصيل
        //         </Button>
        //     ),
        // },
        {
            field: 'edit',
            headerName: 'تعديل الحالة',
            renderCell: (params) => (
                <Button variant="contained"
                    // onClick={() => navigate(`/edit_ticket/${params.row.id}`)}
                    onClick={() => { setDialog(true); setTiecketID(params.row.id) }}
                    sx={{
                        backgroundColor: '#7367f0', color: 'white', marginRight: '20px', '&:hover': {
                            backgroundColor: '#6d5fe1'
                        }
                    }}
                >
                    تعديل
                </Button>
            ),
        },

    ]
    const [data, setData] = useState<any>([]);
    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:3000/tickets/tickets')
            setData(response.data);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);

    const { putData: putData } = usePutData(`http://localhost:3000/tickets/ticket/${ticket_id}`)

    const editStatus = async () => {
        try {
            const response = await putData({ status: status })
            setDialog(false)
        } catch (error) {
            console.log(error);

        }
    }

    const rows = data?.tickets?.filter((item: any) => item.delivery_company_id == delivery_company_id)
        .map((item: any) => {
            const store = stores?.stores?.find((store: any) => store.id === item.store_id);
            return {
                ...item,
                id: item.ticket_id,
                store: store ? store.name : 'Unknown',
            };
        }) ?? [];
    return (
        <MiniDrawer>
            <Card className="mb-4">
                <CardContent>
                    <Typography>
                        الدعم الفني
                    </Typography>
                </CardContent>
            </Card>
            <DataGrid rows={rows} columns={columns} sx={{ backgroundColor: 'white' }} />
            <Dialog open={dialog} onClose={() => setDialog(false)} sx={{
                "& .MuiDialog-container": {
                    "& .MuiPaper-root": {
                        width: "100%",
                        maxWidth: "450px",
                    },
                },
            }}>
                <DialogTitle> تعديل حالة التذكرة</DialogTitle>
                <DialogContent >

                    <TextField fullWidth value={status} onChange={(e: any) => setStatus(e.target.value)} />
                </DialogContent>
                <DialogActions>
                    <Button variant="contained"
                        sx={{
                            backgroundColor: '#4b49ac', color: 'white', '&:hover': {
                                backgroundColor: '#46489c'
                            }
                            , marginLeft: '20px'
                        }}
                        onClick={editStatus}
                    >
                        تأكيد
                    </Button>
                    <Button variant="contained"
                        onClick={() => setDialog(false)}
                        sx={{
                            backgroundColor: '#ea5455', color: 'white', '&:hover': {
                                backgroundColor: '#ea5455'
                            }
                        }}
                    >
                        إلغاء
                    </Button>
                </DialogActions>
            </Dialog>
        </MiniDrawer>
    )
}
