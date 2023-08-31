import React from 'react';
import { Skeleton as MuiSkeleton} from '@mui/material';

const FullPageSkeleton = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh', // Set height to 100% of the viewport height
      }}
    >
    
      <MuiSkeleton
        variant="rect"
        width="100%"
        height="75%" // Set width and height to cover the entire screen
      />
    </div>
  );
};

export default FullPageSkeleton;