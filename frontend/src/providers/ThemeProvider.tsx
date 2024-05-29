import {
  Box,
  ThemeProvider as MuiThemeProvider,
  createTheme,
} from '@mui/material';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const theme = createTheme({
  palette: {
    primary: {
      50: '#faf5ff',
      main: '#805ad5',
      light: '#b794f4',
      dark: '#553c9a',
    },
  },
});

export default function ThemeProvider({ children }: Props) {
  return (
    <MuiThemeProvider theme={theme}>
      <Box
        sx={{
          '.messageLeft': {
            position: 'relative',
            marginLeft: '20px',
            paddingBlock: '12px',
            paddingInline: '20px',
            backgroundColor: '#f3f3f3',
            border: `1px solid #808080`,
            borderRadius: '7px',
            '&:after': {
              content: "''",
              position: 'absolute',
              width: '0',
              height: '0',
              borderBottom: `15px solid #f3f3f3`,
              borderLeft: '15px solid transparent',
              borderRight: '15px solid transparent',
              bottom: '0',
              left: '-15px',
            },
            '&:before': {
              content: "''",
              position: 'absolute',
              width: '0',
              height: '0',
              borderBottom: `16.5px solid #808080`,
              borderLeft: '16px solid transparent',
              borderRight: '16px solid transparent',
              bottom: '-1px',
              left: '-17.5px',
            },
          },
          '.messageRight': {
            position: 'relative',
            marginRight: '20px',
            paddingBlock: '12px',
            paddingInline: '20px',
            backgroundColor: '#faf5ff',
            border: `1px solid ${theme.palette.primary.main}`,
            borderRadius: '7px',
            '&:after': {
              content: "''",
              position: 'absolute',
              width: '0',
              height: '0',
              borderBottom: `15px solid #faf5ff`,
              borderLeft: '15px solid transparent',
              borderRight: '15px solid transparent',
              bottom: '0',
              right: '-15px',
            },
            '&:before': {
              content: "''",
              position: 'absolute',
              width: '0',
              height: '0',
              borderBottom: `16.5px solid ${theme.palette.primary.main}`,
              borderLeft: '16px solid transparent',
              borderRight: '16px solid transparent',
              bottom: '-1px',
              right: '-17px',
            },
          },
        }}
      >
        {children}
      </Box>
    </MuiThemeProvider>
  );
}
