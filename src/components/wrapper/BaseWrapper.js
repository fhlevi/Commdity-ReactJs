import { Card } from '@mui/material';
import { Box } from '@mui/system';


function BaseWrapper(props) {
    return ( 
        <>
            <Card variant="outlined">
                <Box sx={{ 
                    py: 2.5,
                    px: 2 
                }}>
                    {props.children}
                </Box>
            </Card>
        </>
    );
}

export default BaseWrapper;