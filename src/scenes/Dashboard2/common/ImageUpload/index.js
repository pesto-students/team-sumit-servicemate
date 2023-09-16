import { Button, Grid, styled } from '@mui/material';
import React, { useState } from 'react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { SfThumbnail } from '@storefront-ui/react';
import PersonIcon from '@mui/icons-material/Person';
import { PropTypes } from 'prop-types';
import { Box } from '@mui/system';
const VisuallyHiddenInput = styled('input')`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  white-space: nowrap;
  width: 1px;
`;

const ImageUpload = (props) => {
  const { label = "Upload a photo", handleImageUpload, image, id = 'image', name = 'image', alt = 'image' } = props;
  const [imagePreview, setImagePreview] = useState(null)

  const handleFileUpload = (e) => {
    e.preventDefault();

    const reader = new FileReader();
    const file = e.target.files[0];

    reader.onloadend = () => {
      setImagePreview(reader.result);
      handleImageUpload({ [id]: file })
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  }



  return (
    <Grid cont>
      <Box sx={{ height: 150, width: 150 }}>
        {image ?
          <SfThumbnail size="xl" className='w-full h-full'>
            <img style={{ height: '100%', objectFit: 'cover' }} src={imagePreview || image} alt={alt}></img>
          </SfThumbnail>
          :
          <PersonIcon sx={{ height: 150, width: 150 }}></PersonIcon>
        }
      </Box>
      <Button
        component="label"
        variant="text"
        startIcon={<CloudUploadIcon />}
      >
        {label}
        <VisuallyHiddenInput onChange={handleFileUpload} type="file" accept="image/*" id={id} name={name}
        />
      </Button>
    </Grid>
  );
};

export default ImageUpload;

ImageUpload.propTypes = {
  label: PropTypes.string,
  handleImageUpload: PropTypes.func,
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  id: PropTypes.string,
  name: PropTypes.string,
  alt: PropTypes.string,
}