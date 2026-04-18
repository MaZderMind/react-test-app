import { useState, useRef, useCallback } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Paper,
  Divider,
  Fade,
  Collapse,
  InputAdornment,
} from '@mui/material';

import { Trash2, Plus, List as ListIcon } from 'lucide-react';

interface ListEntry {
  id: string;
  text: string;
  visible: boolean;
}

let counter = 0;
const makeId = () => `item-${++counter}-${Date.now()}`;

const INITIAL_ITEMS: ListEntry[] = [
  { id: makeId(), text: 'Einkaufen gehen', visible: true },
  { id: makeId(), text: 'Präsentation vorbereiten', visible: true },
  { id: makeId(), text: 'E-Mails beantworten', visible: true },
];

export default function App() {
  const [items, setItems] = useState<ListEntry[]>(INITIAL_ITEMS);
  const [inputValue, setInputValue] = useState('');
  const [inputError, setInputError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const visibleCount = items.filter((i) => i.visible).length;

  const handleAdd = useCallback(() => {
    const text = inputValue.trim();
    if (!text) {
      setInputError(true);
      inputRef.current?.focus();
      return;
    }
    setItems((prev) => [...prev, { id: makeId(), text, visible: true }]);
    setInputValue('');
    setInputError(false);
    inputRef.current?.focus();
  }, [inputValue]);

  const handleDelete = useCallback((id: string) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, visible: false } : item))
    );
    setTimeout(() => {
      setItems((prev) => prev.filter((item) => item.id !== id));
    }, 300);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleAdd();
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background:
          'radial-gradient(ellipse at 20% 10%, rgba(124,131,253,0.12) 0%, transparent 50%), radial-gradient(ellipse at 80% 90%, rgba(245,166,35,0.10) 0%, transparent 50%), #0F0F1A',
        display: 'flex',
        alignItems: 'flex-start',
        pt: { xs: 5, sm: 8 },
        pb: 8,
      }}
    >
      <Container maxWidth="sm">
        {/* Header */}
        <Fade in timeout={600}>
          <Box sx={{ mb: 5 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
              <Box
                sx={{
                  width: 36,
                  height: 36,
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, #F5A623 0%, #FFD07A 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 16px rgba(245,166,35,0.4)',
                }}
              >
                <ListIcon size={18} color="#1A1A2E" />
              </Box>
              <Typography variant="h4" component="h1" sx={{ color: 'text.primary' }}>
                Meine Liste
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ color: 'text.secondary', ml: '52px' }}>
              {visibleCount === 0
                ? 'Keine Einträge vorhanden'
                : `${visibleCount} ${visibleCount === 1 ? 'Eintrag' : 'Einträge'}`}
            </Typography>
          </Box>
        </Fade>

        {/* Input Card */}
        <Fade in timeout={700}>
          <Paper
            elevation={0}
            sx={{
              p: 2.5,
              mb: 3,
              border: '1px solid',
              borderColor: 'divider',
              background: 'rgba(26,26,46,0.8)',
              backdropFilter: 'blur(12px)',
            }}
          >
            <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'flex-start' }}>
              <TextField
                inputRef={inputRef}
                fullWidth
                variant="outlined"
                label="Neuer Eintrag"
                value={inputValue}
                onChange={(e) => {
                  setInputValue(e.target.value);
                  if (e.target.value.trim()) setInputError(false);
                }}
                onKeyDown={handleKeyDown}
                error={inputError}
                helperText={inputError ? 'Bitte Text eingeben' : undefined}
                size="small"
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <Plus size={16} color="#9896A4" />
                      </InputAdornment>
                    ),
                  },
                }}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleAdd}
                sx={{ whiteSpace: 'nowrap', minWidth: 'auto', px: 2.5, py: '8.5px' }}
                startIcon={<Plus size={16} />}
              >
                Hinzufügen
              </Button>
            </Box>
          </Paper>
        </Fade>

        {/* List Card */}
        <Fade in timeout={800}>
          <Paper
            elevation={0}
            sx={{
              border: '1px solid',
              borderColor: 'divider',
              background: 'rgba(26,26,46,0.8)',
              backdropFilter: 'blur(12px)',
              overflow: 'hidden',
            }}
          >
            {items.length === 0 ? (
              <Box
                sx={{
                  py: 6,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 1.5,
                }}
              >
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: '50%',
                    border: '1.5px dashed',
                    borderColor: 'divider',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <ListIcon size={20} color="#9896A4" />
                </Box>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Liste ist leer
                </Typography>
              </Box>
            ) : (
              <List disablePadding>
                {items.map((item, index) => (
                  <Collapse key={item.id} in={item.visible} timeout={280}>
                    <Box>
                      {index > 0 && <Divider sx={{ borderColor: 'divider' }} />}
                      <ListItem
                        disablePadding
                        sx={{
                          px: 2.5,
                          py: 0,
                          transition: 'background 0.15s',
                          '&:hover': {
                            background: 'rgba(245,166,35,0.04)',
                          },
                          '&:hover .delete-btn': {
                            opacity: 1,
                          },
                        }}
                        secondaryAction={
                          <IconButton
                            className="delete-btn"
                            edge="end"
                            aria-label={`Eintrag löschen`}
                            onClick={() => handleDelete(item.id)}
                            size="small"
                            sx={{
                              opacity: 0,
                              transition: 'opacity 0.15s, color 0.15s',
                              color: 'text.secondary',
                              '&:hover': {
                                color: 'error.main',
                                background: 'rgba(255,107,107,0.1)',
                              },
                            }}
                          >
                            <Trash2 size={16} />
                          </IconButton>
                        }
                      >
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1.5,
                            py: 1.5,
                            pr: 5,
                          }}
                        >
                          <Box
                            sx={{
                              width: 6,
                              height: 6,
                              borderRadius: '50%',
                              background: 'linear-gradient(135deg, #F5A623, #FFD07A)',
                              flexShrink: 0,
                            }}
                          />
                          <ListItemText
                            primary={item.text}
                            slotProps={{
                              primary: {
                                sx: {
                                  fontSize: '0.9375rem',
                                  color: 'text.primary',
                                  lineHeight: 1.5,
                                },
                              },
                            }}
                          />
                        </Box>
                      </ListItem>
                    </Box>
                  </Collapse>
                ))}
              </List>
            )}
          </Paper>
        </Fade>

        {items.length > 0 && (
          <Fade in timeout={1000}>
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
              <Typography variant="caption" sx={{ color: 'text.secondary', opacity: 0.5 }}>
                Hover über einen Eintrag zum Löschen
              </Typography>
            </Box>
          </Fade>
        )}
      </Container>
    </Box>
  );
}
