import type { BoxProps } from '@mui/material/Box';
import type { NavSectionProps } from 'src/components/nav-section';

import { varAlpha } from 'minimal-shared/utils';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
import { useBoolean } from 'minimal-shared/hooks';
import { useState, useEffect, useCallback } from 'react';

import Box from '@mui/material/Box';
import MenuList from '@mui/material/MenuList';
import { useTheme } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Dialog, { dialogClasses } from '@mui/material/Dialog';
import MenuItem, { menuItemClasses } from '@mui/material/MenuItem';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { SearchNotFound } from 'src/components/search-not-found';

import { ResultItem } from './result-item';
import { applyFilter, flattenNavSections } from './utils';

// ----------------------------------------------------------------------

export type SearchbarProps = BoxProps & {
  data?: NavSectionProps['data'];
};

export function Searchbar({ data: navItems = [], sx, ...other }: SearchbarProps) {
  const theme = useTheme();

  const { value: open, onFalse: onClose, onTrue: onOpen, onToggle } = useBoolean();
  const [searchQuery, setSearchQuery] = useState('');

  const handleClose = useCallback(() => {
    onClose();
    setSearchQuery('');
  }, [onClose]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'k' && event.metaKey) {
        onToggle();
        setSearchQuery('');
      }
    },
    [onToggle]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  const handleSearch = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSearchQuery(event.target.value);
  }, []);

  const formattedNavItems = flattenNavSections(navItems);

  const dataFiltered = applyFilter({
    inputData: formattedNavItems,
    query: searchQuery,
  });

  const notFound = searchQuery && !dataFiltered.length;

  const renderButton = () => (
    <Box
      onClick={onOpen}
      sx={[
        () => ({
          display: 'flex',
          alignItems: 'center',
          pr: { sm: 1 },
          pl: { sm: 15 },
          borderRadius: { sm: 1.5 },
          cursor: { sm: 'pointer' },
          bgcolor: { sm: varAlpha(theme.vars.palette.grey['500Channel'], 0.08) },
          transition: theme.transitions.create('background-color', {
            easing: theme.transitions.easing.easeInOut,
            duration: theme.transitions.duration.shortest,
          }),
          '&:hover': {
            bgcolor: {
              sm: varAlpha(theme.vars.palette.grey['500Channel'], 0.16),
            },
          },
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <IconButton disableRipple>
        {/* https://icon-sets.iconify.design/eva/search-fill/ */}
        <Iconify icon="mingcute:search-line" />
      </IconButton>

    </Box>
  );

  const renderList = () => (
    <MenuList
      disablePadding
      sx={{
        [`& .${menuItemClasses.root}`]: {
          p: 0,
          mb: 0,
          '&:hover': { bgcolor: 'transparent' },
        },
      }}
    >
      {dataFiltered.map((item) => {
        const partsTitle = parse(item.title, match(item.title, searchQuery));
        const partsPath = parse(item.path, match(item.path, searchQuery));

        return (
          <MenuItem disableRipple key={`${item.title}${item.path}`}>
            <ResultItem
              path={partsPath}
              title={partsTitle}
              href={item.path}
              labels={item.group.split('.')}
              onClick={handleClose}
            />
          </MenuItem>
        );
      })}
    </MenuList>
  );

  return (
    <>
      {renderButton()}

      <Dialog
        fullWidth
        closeAfterTransition
        maxWidth="sm"
        open={open}
        onClose={handleClose}
        transitionDuration={{ enter: theme.transitions.duration.shortest, exit: 0 }}
        PaperProps={{ sx: { mt: 15, overflow: 'unset' } }}
        sx={[
          () => ({
            [`& .${dialogClasses.container}`]: {
              alignItems: 'flex-start',
            },
          }),
        ]}
      >
        <Box sx={{ p: 3, borderBottom: `solid 1px ${theme.vars.palette.divider}` }}>
          <InputBase
            fullWidth
            autoFocus={open}
            placeholder="검색어 입력"
            value={searchQuery}
            onChange={handleSearch}
            startAdornment={
              <InputAdornment position="start">
                <Iconify icon="eva:search-fill" width={24} sx={{ color: 'text.disabled' }} />
              </InputAdornment>
            }
            endAdornment={<Label sx={{ letterSpacing: 1, color: 'text.secondary' }}>esc</Label>}
            inputProps={{ id: 'search-input', sx: { typography: 'h6' } }}
          />
        </Box>

        {notFound ? (
          <SearchNotFound query={searchQuery} sx={{ py: 15 }} />
        ) : (
          <Scrollbar
            sx={{
              px: 3,
              pb: 3,
              pt: 2,
              height: 400,
            }}
          >
            {renderList()}
          </Scrollbar>
        )}
      </Dialog>
    </>
  );
}
