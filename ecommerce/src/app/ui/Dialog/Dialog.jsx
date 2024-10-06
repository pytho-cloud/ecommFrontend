import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { Select, MenuItem } from '@mui/material';
import { useState, useEffect } from 'react';
import { fetchCheckoutProductAndUser } from '@/app/home/cart/cartapi';
import ListItem from '@mui/material/ListItem';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog({ open, onClose, wishListId }) {
    const [addressOpen, setAddressOpen] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState('');
    const [rows, setRows] = useState([]);
    const [userDetails, setUserDetails] = useState({});
    const [addresses, setAddresses] = useState({});
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [myAddress, setMyAddress] = useState([]);

    const handleAddressClick = () => {
        setAddressOpen(prev => !prev);
    };

    const handleSelectChange = (event) => {
        setSelectedAddress(event.target.value);
        setAddressOpen(false);
    };

    // Fetch all products for the wishlist
    const getAllProduct = async (wishListId) => {
        try {
            const key = `${wishListId}_${localStorage.getItem('user')}_${localStorage.getItem('email')}`;
            const data = await fetchCheckoutProductAndUser(key);

            setName(data.name)
            setPhone(data.phone)
            setMyAddress(data.addresses);
            setEmail(data.email) ;

            const cartItems = data.product[0]?.cart_items || [];




            const fetchedRows = cartItems.map(item => ({
                name: item.product_name,
                description: item.product_description,
                price: item.product_price,
                quantity: item.quantity,
            }));

            setRows(fetchedRows);
        } catch (error) {
            console.error("Error fetching wishlist products:", error);
        }
    };

    // Fetch wishlist products when component mounts
    useEffect(() => {
        if (wishListId) {
            getAllProduct(wishListId);
        }
    }, [wishListId]);

    // Log myAddress when it updates
    useEffect(() => {
        console.log(myAddress, "myAddress updated");
        console.log(name, "name also updated")
    }, [myAddress, name, phone,email]);

    return (
        <Dialog fullScreen open={open} onClose={onClose} TransitionComponent={Transition}>
            <AppBar sx={{ position: 'relative' }}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={onClose} aria-label="close">
                        <CloseIcon />
                    </IconButton>
                    <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                        Checkout for Wishlist: {wishListId}
                    </Typography>
                    <Button autoFocus color="inherit" onClick={onClose}>
                        Save
                    </Button>
                </Toolbar>
            </AppBar>

            <List>
                <ListItemButton>
                    <ListItemText primary="Name" secondary={name || 'N/A'} />
                </ListItemButton>
                <Divider />
                <ListItemButton>
                    <ListItemText primary="Phone Number" secondary={phone || 'N/A'} />
                </ListItemButton>
                <Divider />
                <ListItemButton>
                    <ListItemText primary="Email" secondary={email || 'N/A'} />
                </ListItemButton>
                <Divider />

                {/* Collapsible Address Section */}
                <ListItemButton onClick={handleAddressClick}>
                    <ListItemText primary="Address" secondary={selectedAddress || 'No address selected'} />
                    {addressOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={addressOpen} timeout="auto" unmountOnExit>
                    <Select
                        value={selectedAddress}
                        onChange={handleSelectChange}
                        displayEmpty
                        fullWidth
                        sx={{ mb: 2 }}
                    >
                        <MenuItem value="" disabled>Select an Address</MenuItem>
                        {myAddress.map((address) => (
                            <MenuItem key={address} value={address}>
                                {address} {/* Displaying the address */}
                            </MenuItem>
                        ))}
                    </Select>
                    <List component="div" disablePadding>
                        <ListItem sx={{ pl: 4 }}>
                            <ListItemText primary={selectedAddress || "Please select an address from the dropdown above."} />
                        </ListItem>
                    </List>
                </Collapse>

            </List>

            {/* Table Section */}
            <TableContainer component={Paper} sx={{ mt: 2 }}>
                <Table aria-label="wishlist items table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Product Name</TableCell>
                            <TableCell>Quantity</TableCell>
                            <TableCell align="right">Price</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.name}>
                                <TableCell>{row.name}</TableCell>
                                <TableCell>{row.quantity}</TableCell>
                                <TableCell align="right">${row.price}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <button className="bg-green-500 text-white rounded px-4 py-2 w-24 m-5">
                Pay
            </button>
        </Dialog>
    );
}
