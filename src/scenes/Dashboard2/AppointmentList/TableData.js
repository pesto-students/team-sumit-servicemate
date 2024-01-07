import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import MoreVertIcon from '@mui/icons-material/MoreVert';
// import Popover from '@mui/material/Popover';
import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PropTypes from 'prop-types';
// function createData(name, calories, fat, carbs, protein) {
//   return { name, calories, fat, carbs, protein };
// }

// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];

export default function TableData({ rows = [[]], columns = [], actions = [] }) {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [activeRow, setActiveRow] = React.useState(null);

  const handleClick = (event, index) => {
    setAnchorEl(event.currentTarget);
    setActiveRow(index);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setActiveRow(null);
  };

  const open = Boolean(anchorEl);
  // const id = open ? 'simple-popover' : undefined;


  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {
              columns.map((column, columnIndex) => (
                <TableCell key={'col-' + columnIndex}>{column.name}</TableCell>
              ))
            }
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, rowIndex) => (
            <TableRow
              key={'row-' + rowIndex}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              {row.map((rowData, rowDataIndex) => (
                <TableCell component="th" scope="row" style={{ borderRight: 'none', borderLeft: 'none' }} key={'rowData-' + rowDataIndex}>
                  {rowData}
                </TableCell>
              ))}
              <TableCell component="th" scope="row" style={{ borderRight: 'none', borderLeft: 'none' }} key={'row-' + rowIndex}>
                <Tooltip title="Actions">
                  <IconButton
                    onClick={e => handleClick(e, rowIndex)}
                    size="small"
                    sx={{ ml: 2 }}
                    aria-controls={open ? 'action-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                  >
                    <MoreVertIcon></MoreVertIcon>
                  </IconButton>
                </Tooltip>
                <Menu
                  anchorEl={anchorEl}
                  id="action-menu"
                  open={open && rowIndex === activeRow}
                  onClose={handleClose}
                  onClick={handleClose}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      overflow: 'visible',
                      filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                      mt: 1.5,
                      '& .MuiAvatar-root': {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      '&:before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                  anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                  {actions.map((action, actionIndex) => (
                    <MenuItem key={'action-' + actionIndex} onClick={action.handler.bind(this, row, rowIndex)}>
                      {action.label}
                    </MenuItem>
                  ))}
                </Menu>

              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

TableData.propTypes = {
  rows: PropTypes.array,
  columns: PropTypes.array,
  actions: PropTypes.array,
};