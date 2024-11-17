import { Box, Button } from "@mui/material";

export default function CustomButton({ text, bg, hoverBg, onClick }: { text: String, bg: String, hoverBg: String, onClick: ()=>void }) {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button variant="contained" size="small" className="m-2"
                onClick={onClick}
                sx={{
                    backgroundColor: `${bg}`, color: 'white', '&:hover': {
                        backgroundColor: `${hoverBg}`
                    }
                }}>{text}</Button>
        </Box>
    )
}