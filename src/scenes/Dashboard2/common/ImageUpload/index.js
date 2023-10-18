import { Button, Grid, styled } from '@mui/material';
import React, { useState } from 'react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { SfThumbnail } from '@storefront-ui/react';
import PersonIcon from '@mui/icons-material/Person';
import { PropTypes } from 'prop-types';
import { Box } from '@mui/system';
import { useEffect } from 'react';
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
  const { label = 'Upload a photo', handleImageUpload, image, id = 'image', name = 'image', alt = 'image', multiple = false, images = [] } = props;
  const [imagePreview, setImagePreview] = useState(null);

  const handleFileUpload = (e) => {
    e.preventDefault();
    const selectedFiles = multiple ? e.target.files : e.target.files[0];
    const previewFiles = multiple ? getPreviewFromFiles(selectedFiles) : URL.createObjectURL(selectedFiles);
    setImagePreview(previewFiles);
    handleImageUpload(selectedFiles, previewFiles);
  };

  const getPreviewFromFiles = (files) => {
    return Object.values(files).map(url => URL.createObjectURL(url));
  };

  useEffect(() => {
    if (images?.length)
      setImagePreview(typeof images?.[0] === 'object' ? getPreviewFromFiles(images) : images);
  }, [images]);


  return (
    <Grid cont>
      {multiple ?
        <Grid container spacing={imagePreview?.length && 4}>
          {imagePreview?.map((image, imageIndex) => (
            <Grid item key={'image-' + imageIndex}>
              <img style={{ height: '100%', objectFit: 'cover' }} src={image} alt={alt}></img>
            </Grid>
          ))}
        </Grid>
        :
        <Box sx={{ height: 150, width: 150 }}>
          {image ?
            <SfThumbnail size="xl" className='w-full h-full'>
              <img style={{ height: '100%', objectFit: 'cover' }} src={imagePreview || image} alt={alt}></img>
            </SfThumbnail>
            :
            <PersonIcon sx={{ height: 150, width: 150 }}></PersonIcon>
          }
        </Box>}
      <Button
        component="label"
        variant="text"
        startIcon={<CloudUploadIcon />}
      >
        {label}
        <VisuallyHiddenInput onChange={handleFileUpload} type="file" multiple accept="image/*" id={id} name={name}
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
  multiple: PropTypes.bool,
  images: PropTypes.array
};