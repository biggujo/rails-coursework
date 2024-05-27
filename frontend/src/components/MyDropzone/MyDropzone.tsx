import { Box, Typography, useTheme } from '@mui/material';
import { DropEvent, useDropzone } from 'react-dropzone';
import { useEffect, useState } from 'react';
import { Nullable } from '../../interfaces';
import myToast from '../../utils/myToast.tsx';
import MyAvatar from '../MyAvatar/MyAvatar.tsx';

interface Props {
  title: string;
  onAddFile: <T extends File>(file: T[], event: DropEvent) => void;
}

const MAX_ATTACHMENT_SIZE_MB = 2;
const AVAILABLE_IMAGE_EXTENSIONS = ['.jpeg', '.jpg', '.png', '.webp'];

function MyDropzone({ title, onAddFile }: Props) {
  const [file, setFile] = useState<Nullable<File & { preview: string }>>(null);
  const theme = useTheme();

  const { isFocused, isDragAccept, getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': AVAILABLE_IMAGE_EXTENSIONS,
    },
    maxSize: 1048576 * MAX_ATTACHMENT_SIZE_MB, // 2 MB
    maxFiles: 1,
    onDropAccepted: onAddFile,
    onDrop: acceptedFiles => {
      setFile(
        Object.assign(acceptedFiles[0], {
          preview: URL.createObjectURL(acceptedFiles[0]),
        })
      );
    },
    onError: () => {
      myToast({
        message: 'Only PNG/WEBP/JPEG of size 2 MB or less are allowed',
        severity: 'error',
      });
    },
  });

  // Avoid memory leaks
  useEffect(() => {
    return () => {
      if (!file) {
        return;
      }

      URL.revokeObjectURL(file.preview);
    };
  }, []);

  return (
    <Box>
      <Box position={'relative'}>
        <Typography
          variant={'caption'}
          sx={{
            position: 'absolute',
            color: '#00000099',
            top: '-0.5rem',
            left: '8px',
            bgcolor: '#ffffff',
            px: '4px',
          }}
        >
          {title}
        </Typography>
        <Box
          component="section"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 2,
            border:
              isFocused || isDragAccept
                ? `1px solid ${theme.palette.primary.main}`
                : '1px solid #80808060',
            borderRadius: 1,
          }}
        >
          <Box
            {...getRootProps({ className: 'dropzone' })}
            sx={{
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 1,
              border: '1px solid #80808060',
            }}
          >
            <input
              {...getInputProps()}
              style={{
                display: 'block',
                width: '420px',
                height: '100px',
                padding: '20px',
                opacity: 0,
              }}
            />
            <Typography
              variant="body1"
              sx={{
                position: 'absolute',
              }}
            >
              Drag 'n' drop some files here, or click to select files
            </Typography>
          </Box>
          {file?.preview && (
            <Box
              py={2}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Typography py={1}>Preview:</Typography>
              <MyAvatar
                alt={'Uploaded photo'}
                src={file.preview}
                onLoad={() => {
                  URL.revokeObjectURL(file.preview);
                }}
              />
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default MyDropzone;
