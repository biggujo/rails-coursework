import {
  Box,
  IconButton,
  ImageList,
  ImageListItem,
  Typography,
  useTheme,
} from '@mui/material';
import { DropEvent, useDropzone } from 'react-dropzone';
import { useEffect, useState } from 'react';
import myToast from '../../utils/myToast.tsx';
import MyAvatar from '../MyAvatar/MyAvatar.tsx';
import CloseIcon from '@mui/icons-material/Close';
import { useTranslation } from 'react-i18next';

interface Props {
  title: string;
  onAddFile: <T extends File>(file: T[], event: DropEvent) => void;
  maxFiles: number;
}

const MAX_ATTACHMENT_SIZE_MB = 2;
const AVAILABLE_IMAGE_EXTENSIONS = ['.jpeg', '.jpg', '.png', '.webp'];

function MyDropzone({ title, onAddFile, maxFiles }: Props) {
  const [files, setFiles] = useState<Array<File & { preview: string }>>([]);
  const theme = useTheme();
  const { t } = useTranslation();

  const { isFocused, isDragAccept, getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': AVAILABLE_IMAGE_EXTENSIONS,
    },
    maxSize: 1048576 * MAX_ATTACHMENT_SIZE_MB, // 2 MB
    maxFiles: maxFiles || 1,
    onDropAccepted: onAddFile,
    onDrop: acceptedFiles => {
      setFiles(
        acceptedFiles.map(file =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
    onError: () => {
      myToast({
        message: t('dropzone.validationError'),
        severity: 'error',
      });
    },
  });

  // Avoid memory leaks
  useEffect(() => {
    return () => files.forEach(file => URL.revokeObjectURL(file.preview));
  }, [files]);

  const handleRemoveAttachmentByIndex = (givenIndex: number) => {
    setFiles(prevState =>
      prevState.filter((_, index) => {
        if (index === givenIndex) {
          URL.revokeObjectURL(prevState[index].preview);
        }

        return index !== givenIndex;
      })
    );
  };

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
                width: '400px',
                height: '100px',
                opacity: 0,
              }}
            />
            <Typography
              variant="body1"
              sx={{
                position: 'absolute',
              }}
            >
              {t('dropzone.actionMessage')}
            </Typography>
          </Box>
          {files.length > 0 && (
            <Typography fontWeight={'bold'} pt={2}>
              {t('dropzone.attachments')}:
            </Typography>
          )}
          {files.length > 0 && maxFiles === 1 && (
            <Box
              py={2}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Typography py={1}>{t('dropzone.preview')}:</Typography>

              <MyAvatar
                alt={t('dropzone.uploadedPhoto')}
                src={files[0].preview}
                onLoad={() => {
                  URL.revokeObjectURL(files[0].preview);
                }}
                size={'large'}
              />
            </Box>
          )}
          {files.length > 0 && maxFiles > 1 && (
            <ImageList sx={{ width: '100%' }} rowHeight={150}>
              {files.map((file, index) => (
                <ImageListItem
                  key={file.name}
                  sx={{
                    position: 'relative',
                  }}
                >
                  <img alt={t('dropzone.uploadedPhoto')} src={file.preview} />
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 4,
                      right: 4,
                      bgcolor: '#ffffff',
                      borderRadius: '50%',
                      border: '1px solid #808080',
                    }}
                    onClick={() => handleRemoveAttachmentByIndex(index)}
                  >
                    <IconButton size={'small'}>
                      <CloseIcon />
                    </IconButton>
                  </Box>
                </ImageListItem>
              ))}
            </ImageList>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default MyDropzone;
