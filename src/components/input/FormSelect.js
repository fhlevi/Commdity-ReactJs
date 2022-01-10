import { FormControl, Grid, Select, MenuItem } from '@mui/material';
import React from 'react';

export default function FormSelect(props) {
    const [localSelected, setLocalSelected] = React.useState('');
    const { items, name, change } = props 

    const handleSelected = (e) => {
        const value = e.target.value

        setLocalSelected(value)
        change(value)
    } 

    return (
        <>
            {(items.length > 0) && (
                <>
                    <Grid sm={4} xs={12} item sx={{ fontWeight: 600 }}>{name}</Grid>
                    <Grid sm={8} xs={12} item>
                        <FormControl sx={{ my: 1, width: '100%' }} variant="outlined">
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                placeholder="choose"
                                value={localSelected}
                                className="efishery-form"
                                onChange={handleSelected}
                            >
                                {items.map((item, idx) => (
                                    <MenuItem value={item} key={idx}>
                                        {item.size ? item.size : item.city}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                </>       
            )}
        </>
    )
}