import BaseDialog from 'components/dialog/BaseDialog';
import React from 'react';
import { Button, FormControl, OutlinedInput, Grid } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Box } from '@mui/system';
import ApiKomoditas from 'api/Komoditas';
import { v4 as uuid } from 'uuid'

class DialogAddCommodity extends React.Component {
    constructor(props) {
        super(props);
        this.handleInput = this.handleInput.bind(this)
        this.handleCloseLocal = this.handleCloseLocal.bind(this)
        this.saveData = this.saveData.bind(this)
        this.clearDataOnState = this.clearDataOnState.bind(this)

        this.state = {
            isDialogLocal: false,
            commodity: {
                komoditas: '',
                price: '',
                area_kota: null,
                area_provinsi: null,
                size: 0
            },
            komoditasModel: null,
            isLoading: false
        }
    }

    handleCloseLocal () {
        this.setState({ isDialogLocal: false })
        this.props.close(false)
        this.clearDataOnState()
    }

    handleInput(event) {
        const { value, name } = event.target;
        let data = this.state.commodity;
        
        data[name] = value
    }

    async saveData() {
        try {
            this.setState({ isLoading: true })

            let payload = {
                ...this.state.commodity,
                uuid: uuid()
            }

            await this.state.komoditasModel.saveDataKomoditas(payload)

            this.handleCloseLocal()
        } catch (e) {
            console.log(e)
        } finally {
            this.setState({ isLoading: false })
        }
    }

    clearDataOnState() {
        this.setState({
            commodity: {
                komoditas: '',
                price: '',
                area_kota: null,
                area_provinsi: null,
                size: 0
            },
        })
    }

    componentDidMount() {
        let apiCommodity = new ApiKomoditas()
        
        this.setState({ 
            komoditasModel: apiCommodity
        })
    }

    static getDerivedStateFromProps(props) {
        const { dialog } = props

        return {
            isDialogLocal: dialog
        }
    }

    render() {
        const { isDialogLocal } = this.state

        const Action = () => {
            return (
                <Box>
                    <Button 
                        sx={{ mr: 1 }} 
                        className="efishery-button btn-white"
                        onClick={this.handleCloseLocal}
                    >
                        Batal
                    </Button>
                    <LoadingButton
                        variant="contained"
                        className="efishery-button" 
                        onClick={this.saveData}
                        loading={this.state.isLoading}
                    >
                        Simpan
                    </LoadingButton>
                </Box>
            )
        }

        const FormInput = (props) => {
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

        return (
            <>
                <BaseDialog 
                    isDialog={isDialogLocal}
                    title="Tambah Komoditas"
                    closeDialog={this.handleCloseLocal}
                    action={<Action />}
                >
                    <Box sx={{ 
                        display: 'flex', 
                        flexWrap: 'wrap', 
                        flex: '1 1 auto', 
                        justifyContent: 'space-between', 
                        alignItems: 'center' 
                    }}>
                        <FormInput 
                            name="Komoditas"
                            change={this.handleInput}
                        />
                        <FormInput 
                            name="Price"
                            change={this.handleInput}
                        />
                    </Box>
                </BaseDialog>  
            </>
        );
    }
}
 
export default DialogAddCommodity;