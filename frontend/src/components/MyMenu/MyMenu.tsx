import { Box, Fade, IconButton, Menu, MenuItem } from '@mui/material';
import { ReactElement, useRef } from 'react';
import useToggle from '../../hooks/useToggle.ts';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Nullable } from '../../interfaces';

interface Props {
  actions: Array<{
    title: string | ReactElement;
    action: Nullable<() => void>;
  }>;
}

export default function MyMenu({ actions }: Props) {
  const anchorRef = useRef(null);

  const { isOpen, toggle } = useToggle();

  return (
    <Box>
      <IconButton
        ref={anchorRef}
        onClick={toggle}
        sx={{
          ml: '200px',
        }}
      >
        <MoreVertIcon />
      </IconButton>
      {anchorRef.current && (
        <Menu
          anchorEl={anchorRef.current}
          open={isOpen}
          onClose={toggle}
          TransitionComponent={Fade}
        >
          {actions.map(({ title, action }, index) => (
            <MenuItem
              onClick={() => {
                if (action === null) {
                  return;
                }

                toggle();
                action();
              }}
              key={index}
            >
              {title}
            </MenuItem>
          ))}
        </Menu>
      )}
    </Box>
  );
}
