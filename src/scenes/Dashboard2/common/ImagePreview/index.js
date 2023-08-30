import React, { useState } from 'react';
import { Dialog, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { PropTypes } from 'prop-types';

function ImagePreview({ imageUrl, linkText = '' }) {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <img
                src={imageUrl}
                alt="Thumbnail"
                onClick={handleOpen}
                style={{ cursor: 'pointer', height: "100px", width: "100px" }}
            />
            <p onClick={handleOpen}>{linkText}</p>
            <Dialog open={imageUrl && open} onClose={handleClose}>
                <IconButton
                    edge="end"
                    color="inherit"
                    onClick={handleClose}
                    aria-label="close"
                    sx={{
                        position: 'absolute',
                        top: '8px',
                        right: '8px',
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <img src={imageUrl} alt="Image Preview" />
            </Dialog>
        </div>
    );
}

ImagePreview.propTypes = {
    imageUrl: PropTypes.string.isRequired,
    linkText: PropTypes.string.isRequired,
}

export default ImagePreview;

