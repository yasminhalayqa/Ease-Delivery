import MiniDrawer from "../../components/Sidebar"
import { Box, Button, IconButton } from "@mui/material";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import useFetchData from "../../hooks/useFetchData";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from "react";
import usePutData from "../../hooks/usePutData";
import { useNavigate } from "react-router-dom";

export default function SubscriptionRequests() {
    const [open, setOpen] = useState(false)
    const [open2, setOpen2] = useState(false)
    const [selectedCompany, setSelectedCompany] = useState<any>(null);
    const [id, setId] = useState<number | null>(null)
    const { data } = useFetchData('http://localhost:3000/users/delivery_company') as any
    const { putData } = usePutData(`http://localhost:3000/users/active/delivery_company/${id}`)

    const navigate = useNavigate()

    const filteredRows = data?.delivery_company?.filter((item: any) => item.active === false) ?? [];

    const update = async () => {
        const newData = {
            "active": true,
        }
        try {
            const response = await putData(newData)
            console.log(response);
            navigate('/subscribers')
        } catch (error) {
            console.log(error);
        }
    }

    const handleDetailsOpen = (id: number) => {
        const company = filteredRows.find((item: any) => item.id === id);
        setSelectedCompany(company);
        setOpen2(true);
    }

    const columns: GridColDef[] = [
        { field: 'id', headerName: ' الرقم' },
        { field: 'name', headerName: ' الاسم' },
        { field: 'phone_number', headerName: ' رقم الهاتف' },
        { field: 'address', headerName: ' العنوان' },
        {
            field: 'operation', headerName: ' الإجراءات', sortable: false, width: 300,
            renderCell: (params) => (
                <Box display='flex' alignItems='center'>
                    <Box>
                        <Button variant="contained"
                            sx={{
                                backgroundColor: '#4b49ac', color: 'white', '&:hover': {
                                    backgroundColor: '#46489c'
                                }
                            }}
                            onClick={() => handleDetailsOpen(params.row.id)}
                        > عرض التفاصيل</Button>
                    </Box>
                    <IconButton onClick={() => { setOpen(true); setId(params.row.id) }}>
                        <CheckCircleOutlineIcon color="success" />
                    </IconButton>
                </Box>)
        },
    ]

    return (
        <MiniDrawer>
            <DataGrid rows={filteredRows} columns={columns} checkboxSelection sx={{ backgroundColor: 'white' }} />
            <Dialog
                
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"تأكيد الطلب "}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        هل انت موافق على تأكيد طلب العميل للانضمام للنظام ؟
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)} color="error"> رفض </Button>
                    <Button onClick={update} autoFocus color="primary">
                        موافق
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog
            sx={{
                "& .MuiDialog-container": {
                    "& .MuiPaper-root": {
                        width: "100%",
                        maxWidth: "450px",
                    },
                },
            }}
                open={open2}
                onClose={() => setOpen2(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {" عرض تفاصيل شركة التوصيل "}
                </DialogTitle>
                <DialogContent>
                    {selectedCompany && (
                        <DialogContentText id="alert-dialog-description">
                            <strong>الاسم:</strong> {selectedCompany.name} <br />
                            <strong>رقم الهاتف:</strong> {selectedCompany.phone_number} <br />
                            <strong>العنوان:</strong> {selectedCompany.address} <br />
                            <strong>عدد أفرع الشركة:</strong> {selectedCompany.compnay_branches_num} <br />
                            <strong>عدد الطلبات الشهري المتوقع:</strong> {selectedCompany.compnay_order_num} <br />
                        </DialogContentText>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen2(false)}> إغلاق </Button>
                </DialogActions>
            </Dialog>
        </MiniDrawer>
    )
}
