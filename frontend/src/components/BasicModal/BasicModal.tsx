import { Box, IconButton, Modal } from '@mui/material';
import useToggle from '../../hooks/useToggle.ts';
import { createPortal } from 'react-dom';
import CloseIcon from '@mui/icons-material/Close';
import { ReactElement, useEffect } from 'react';
import { Nullable } from '../../interfaces';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  height: 600,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  pt: 0,
  overflowY: 'scroll',
};

interface Props {
  toggler: ReactElement;
  modalContent: ReactElement;
  onOpen: Nullable<() => void>;
  onClose: Nullable<() => void>;
}

export default function BasicModal({
  toggler,
  modalContent,
  onOpen,
  onClose,
}: Props) {
  const { isOpen, toggle } = useToggle();

  useEffect(() => {
    if (!isOpen) {
      onClose && onClose();
      return;
    }

    onOpen && onOpen();
    // eslint-disable-next-line
  }, [isOpen]);

  return (
    <div>
      <Box onClick={toggle}>{toggler}</Box>
      {createPortal(
        <Modal open={isOpen} onClose={toggle}>
          <Box sx={style}>
            <IconButton
              sx={{
                position: 'relative',
                border: '1px solid #80808099',
                borderRadius: '50%',
                top: '15px',
                color: '#80808099',
                left: '395px',
              }}
              onClick={toggle}
            >
              <CloseIcon />
            </IconButton>
            {modalContent}
          </Box>
        </Modal>,
        document.getElementById('modal') as Element
      )}
    </div>
  );
}
