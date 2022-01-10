import { FormControl, OutlinedInput, Grid } from '@mui/material';

export default function FormInput(props) {
    return (
        <>
            <Grid sm={4} xs={12} item sx={{ fontWeight: 600 }}>{props.name}</Grid>
            <Grid sm={8} xs={12} item>
                <FormControl sx={{ my: 1, width: '100%' }} variant="outlined">
                    <OutlinedInput
                        type="text"
                        name={props.name.toLowerCase()}
                        className="efishery-form"
                        placeholder={props.placeholder ? props.placeholder : ''}
                        onChange={props.change}
                    />
                </FormControl>
            </Grid>
        </>
    )
}