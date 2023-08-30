import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import PropTypes from "prop-types";
import { Autocomplete, Typography } from '@mui/material';

export default function AddService({ showDialog, setShowDialog, handleServiceDataSubmit, rowId }) {
    const [open, setOpen] = React.useState(false);
    const [pictures, setPictures] = React.useState([]);
    const [serviceData, setServiceData] = React.useState({})
    console.log("🚀 ~ file: index.js:16 ~ AddService ~ serviceData:", serviceData)

    const handleClose = () => {
        setShowDialog(false);
    };

    React.useEffect(() => {
        setOpen(showDialog.show)
    }, [showDialog.show])

    const handleFormChange = (e, dropDownValue) => {
        const { name, value } = e && (dropDownValue ? { name: e?.target.id?.split("-")[0], value: dropDownValue.name } : e.target)
        setServiceData({ ...serviceData, [name]: value })
    }

    const handleServiceImagesUpload = (e) => {
        const files = e.target.files;
        const imagesArray = [];
        if (files) {
            files.map(file => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    imagesArray.push(reader.result);
                    if (imagesArray.length === files.length) {
                        setPictures(imagesArray);
                    }
                };
                reader.readAsDataURL(file);
            })
        }
    }


    // const idProofTypes = [{ name: "Aadhar Card" }, { name: "PAN Card" }, { name: "Voter ID" }]
    // const cities = [{ name: "Delhi" }, { name: "Maharashtra" }, { name: "Karnataka" }]
    // const countries = [{ name: "India" }]
    const categories = [{ name: "Plumber" }, { name: "Carpenter" }, { name: "Electrician" }]

    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add Service</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <Typography variant='subtitle2' sx={{ marginBottom: 1 }}> Add a service details to display on the portal.</Typography>
                    </DialogContentText>
                    <section key={"service"} className="flex flex-col gap-4 mb-2 time-slots app-flex-1-1-33">
                        <TextField name='name' label="Name" onChange={handleFormChange}></TextField>
                        <section className='emp-pictures-upload flex items-center gap-4'>
                            <section className='emp-pictures'>
                                <label htmlFor={"emp-pictures"}>
                                    <Button variant="outlined" component="span">
                                        Upload Service Pictures
                                        <input type="file" style={{ display: "none" }} id={"service-pictures"} name='pictures'
                                            accept="image/*" multiple={true}
                                            onChange={handleServiceImagesUpload}
                                        />
                                    </Button>
                                </label>
                                {pictures && (
                                    <section>
                                        <h2>Preview:</h2>
                                        {pictures.map((picture, index) => (
                                            <img key={"pic-" + index} src={picture} alt={"picture" + picture.name} style={{ width: '100%', maxHeight: 120, objectFit: "contain" }} />
                                        ))}
                                    </section>
                                )}
                            </section>
                        </section>
                        <Autocomplete multiple options={categories} getOptionLabel={(option) => option.name} renderInput={(params) => <TextField {...params} onChange={handleFormChange} label={"Categories"}></TextField>}></Autocomplete>
                        <TextField label='Charges' name='charges' placeholder='Rs/hour' variant='outlined' required onChange={handleFormChange}></TextField>
                    </section>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button
                        variant='outlined'
                        onClick={() => {
                            handleServiceDataSubmit({ ...serviceData, pictures, id: rowId })
                            handleClose()
                        }}
                        disabled={!serviceData.name}
                    >+ Add</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

AddService.propTypes = {
    showDialog: PropTypes.object,
    setShowDialog: PropTypes.func,
    handleServiceDataSubmit: PropTypes.func,
    rowId: PropTypes.number,
}