import React from 'react';
import { Button } from '@mui/material';
import SpeedIcon from '@mui/icons-material/Speed';

const PerformanceButton: React.FC = () => {
  return (
    <Button
      variant="contained"
      startIcon={<SpeedIcon />}
      sx={{
        position: 'absolute',
        top: '1rem',
        left: '50%',
        transform: 'translateX(-50%)',
        backgroundColor: '#1976d2',
        '&:hover': {
          backgroundColor: '#1565c0',
        },
      }}
    >
      Performance
    </Button>
  );
};

export default PerformanceButton;
