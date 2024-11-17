import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Card, CardContent } from '@mui/material';

export default function Tabs({ labels, contents, onTabChange, defualtValue }: { labels: String[], contents: JSX.Element[], onTabChange: Function, defualtValue: String }) {
    const [value, setValue] = React.useState(`${defualtValue}`);

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
        onTabChange(newValue)

    };
    console.log(value);

    return (
        <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Card>
                        <CardContent>
                            <TabList onChange={handleChange} aria-label="lab API tabs example">
                                {labels.map((label, index) => (
                                    <Tab key={index} label={label} value={label} />
                                ))}
                            </TabList>
                        </CardContent>
                    </Card>
                </Box>
                <Card className='mt-3'>
                    <CardContent>
                        {contents.map((content, index) => (
                            <TabPanel key={index} value={value}>{content}</TabPanel>
                        ))}
                    </CardContent>
                </Card>
            </TabContext>
        </Box>
    );
}