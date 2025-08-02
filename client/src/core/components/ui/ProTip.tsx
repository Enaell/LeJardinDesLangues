import React from 'react';
import { Box } from '@mui/material';
import { FlexRow } from '@core/components';

type ProTipProps = {
  children: React.ReactNode;
  className?: string;
};

export const ProTip = ({ children, className = '' }: ProTipProps) => {
  return (
    <Box className={`bg-blue-50 border-l-4 border-blue-400 p-4 ${className}`}>
      <FlexRow>
        <Box className="flex-shrink-0">
          <span className="text-blue-400">💡</span>
        </Box>
        <Box className="ml-3">
          <p className="text-sm text-blue-700">{children}</p>
        </Box>
      </FlexRow>
    </Box>
  );
};
