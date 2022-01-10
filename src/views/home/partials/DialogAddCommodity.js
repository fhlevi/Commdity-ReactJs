import React from 'react';
import { Button, Box } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { v4 as uuid } from 'uuid'
// api
import ApiKomoditas from 'api/Komoditas';
// components
import BaseDialog from 'components/dialog/BaseDialog';
import FormInput from 'components/input/FormInput';
import FormSelect from 'components/input/FormSelect';

class DialogAddCommodity extends React.Component {
    constructor(props) {
        super(props);
        this.handleInput = this.handleInput.bind(this)
        this.handleCloseLocal = this.handleCloseLocal.bind(this)
        this.saveData = this.saveData.bind(this)
        this.clearDataOnState = this.clearDataOnState.bind(this)
        this.getDataSizes = this.getDataSizes.bind(this)
        this.handleSelectSize = this.handleSelectSize.bind(this)
        this.handleSelectCity = this.handleSelectCity.bind(this)
        this.getDataCities = this.getDataCities.bind(this)

        this.state = {
            isDialogLocal: false,
            commodity: {
                komoditas: '',
                price: '',
                area_kota: null,
                area_provinsi: null,
                size: 0
            },
            listSize: [],
            listCity: [],
            komoditasModel: null,
            isLoading: false
        }
    }

    handleCloseLocal() {
        this.setState({ isDialogLocal: false })
        this.props.close(false)
        this.clearDataOnState()
    }

    async getDataSizes() {
        try {
            const result = await this.state.komoditasModel.getDataSize()

            this.setState({ 
                listSize: result
            })
        } catch(e) {
            console.log("🚀 ~ file: DialogAddCommodity.js ~ DialogAddCommodity ~ getDataSize ~ e", e)
        }
    }

    async getDataCities() {
        try {
            const result = await this.state.komoditasModel.getDataCity()

            this.setState({ 
                listCity: result
            })
        } catch(e) {
            console.log("🚀 ~ file: DialogAddCommodity.js ~ DialogAddCommodity ~ getDataSize ~ e", e)
        }
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

    handleSelectSize(value) {
        this.setState({
            commodity: {
                ...this.state.commodity,
                size: value.size
            }
        })
    }

    handleSelectCity(value) {
        this.setState({
            commodity: {
                ...this.state.commodity,
                area_kota: value.city,
                area_provinsi: value.province,
            }
        })
    }

    initialModel() {
        let apiCommodity = new ApiKomoditas()
        
        this.setState({ 
            komoditasModel: apiCommodity
        })

        return Promise.resolve(true)
    }

    async componentDidMount() {
        await this.initialModel()
        this.getDataSizes()
        this.getDataCities()
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
                        <FormSelect 
                            name="Size"
                            items={this.state.listSize}
                            change={this.handleSelectSize}
                        />
                        <FormSelect 
                            name="Kota"
                            items={this.state.listCity}
                            change={this.handleSelectCity}
                        />
                    </Box>
                </BaseDialog>  
            </>
        );
    }
}
 
export default DialogAddCommodity;