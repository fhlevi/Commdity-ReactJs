import { Button, FormControl, OutlinedInput, InputAdornment, IconButton, Grid } from '@mui/material';
import { Box } from '@mui/system';
import BaseWrapper from 'components/wrapper/BaseWrapper';
import { BiSearch } from 'react-icons/bi';
import { BsPlusLg } from "react-icons/bs";
import React from 'react';
import DialogAddCommodity from 'views/home/partials/DialogAddCommodity';
import ListCommodity from 'views/home/ListCommodity';
import ApiKomoditas from 'api/Komoditas';

function HomeScreen() {
    const [isDialog, setIsDialog] = React.useState(false) 
    const [listData, setListData] = React.useState([])
    const [dataSearch, setDataSearch] = React.useState([])
    const [commodityModel, setCommodityModel] = React.useState(null)

    const HeadContent = (props) => {
        const { title, subTitle, btnName } = props
    
        const handleClick = () => {
            props.click()
        }
    
        return (
            <Box sx={{ 
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)'
            }}>
                <Box>
                    <Box sx={{ fontSize: 24, fontWeight: 600, mb: 1 }}>
                        {title}
                    </Box>
                    <Box sx={{ fontSize: 13, mb:3, color: 'rgba(0,0,0,.32)' }}>
                        {subTitle}
                    </Box>
                </Box>
                {
                    btnName && (
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Button 
                                className="efishery-button medium-button" 
                                variant="contained"
                                onClick={handleClick}
                            >
                                <BsPlusLg /> 
                                <Box sx={{ ml: 1 }}>
                                    {btnName}
                                </Box>
                            </Button>
                        </Box>
                    )
                }
            </Box>
        )
    }

    const handleOpen = () => {
        setIsDialog(true)
    }  

    const handleClose = (val) => {
        setIsDialog(val)
    }

    const handlerFilter = (_filter, value) => {
        if(
            (!!_filter.komoditas && _filter.komoditas.toLowerCase().includes(value.toLowerCase())) ||
            (!!_filter.size && _filter.size.toLowerCase().includes(value.toLowerCase())) || 
            (!!_filter.price && _filter.price.toLowerCase().includes(value.toLowerCase())) ||
            (!!_filter.area_kota && _filter.area_kota.toLowerCase().includes(value.toLowerCase())) ||
            (!!_filter.area_provinsi && _filter.area_provinsi.toLowerCase().includes(value.toLowerCase()))
        ) {
            return _filter
        }
    }

    function handleSearch(e) {
        const value = e.target.value
        if(value.length) {
            let search = dataSearch.filter(_filter => {
                return handlerFilter(_filter, value)
            })

            setListData(search)
        } else {
            setListData(dataSearch)
        }
    }

    React.useEffect(() => {
        setCommodityModel(new ApiKomoditas())
    }, [])

    React.useEffect(() => {
        const getData = async () => {
            if(!!commodityModel) {
                try {
                    const result = await commodityModel.getDataKomoditas()

                    setListData(result)
                    setDataSearch(result)
                } catch(e) {
                    console.log("🚀 ~ file: HomeScreen.js ~ getDataKomoditas ~ e", e)
                }
            }
        }

        getData()
    }, [commodityModel])

    return ( 
        <>
            <DialogAddCommodity 
                dialog={isDialog}
                close={handleClose}
            />
            <BaseWrapper>
                <HeadContent
                    title="Pengaturan Komoditas"
                    subTitle="Membantu kamu untuk mengatur informasi komoditas"
                    btnName="Tambah Komoditas"
                    click={handleOpen}
                />
                <Box>
                    <FormControl sx={{ my: 1, width: '100%', maxWidth: 450 }} variant="outlined">
                        <OutlinedInput
                            type="text"
                            onChange={handleSearch}
                            className="efishery-search"
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                    aria-label="toggle password visibility"
                                    edge="end"
                                    >
                                        <BiSearch />
                                    </IconButton>
                                </InputAdornment>
                            }
                            placeholder="Cari komoditas. . ."
                        />
                    </FormControl>
                </Box>
                <Grid xs={12} item>
                    <ListCommodity 
                        items={listData}
                    />
                </Grid>
            </BaseWrapper>
        </>
    );
}

export default HomeScreen;