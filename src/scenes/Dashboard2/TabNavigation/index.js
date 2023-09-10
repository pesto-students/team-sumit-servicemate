import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Employees from '../Employees';
import Services from '../Services';
import MyProfile from '../MyProfile';
import { useParams } from 'react-router';
import { useEffect } from 'react';
// import { useSelector } from 'react-redux';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}

        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `tab-${index}`,
        'aria-controls': `tabpanel-${index}`,
    };
}

export default function TabNavigation() {
    const [value, setValue] = React.useState(0);
    const [subTab, setSubTab] = React.useState(0);
    const { tab } = useParams()
    // const loggedInUser = useSelector(state => state.loggedInUser)

    useEffect(() => {
        if (tab === "appointments") {
            setValue(1);
        } else if (value !== 0) {
            setValue(0);
        }
    }, [tab])

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const tabMenu = [{
        id: "",
        label: "My Profile",
    },
    {
        id: "",
        label: "Appointments",
    }, {
        id: '',
        label: "Orders"
    }
    ]

    // const myProfileTabs=[{ name: "My Profile" }, { name: "Services" }, { name: "Employees" }]

    // const getMyProfileTabs=()=>{
    //     return loggedInUser&&loggedInUser.user? myProfileTabs:
    // }

    return (
        <Box
            sx={{ bgcolor: 'background.paper', }}
        >
            <Tabs
                // variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="tabs"
            // sx={{ borderRight: 1, borderColor: 'divider' }}
            >
                {
                    tabMenu.map((tab, i) => (
                        <Tab key={"tab-" + i} label={tab.label} {...a11yProps(i)} />
                    ))
                }
            </Tabs>
            <TabPanel value={value} index={0}>
                <Tabs
                    value={subTab}
                    onChange={(e, value) => setSubTab(value)}
                    aria-label="sub tabs"
                // sx={{ borderRight: 1, borderColor: 'divider' }}
                >
                    {[{ name: "My Profile" }, { name: "Services" }, { name: "Employees" }].map((subTab, subTabIndex) => (
                        <Tab key={"sub-tab-" + subTabIndex} label={subTab.name} {...a11yProps} />
                    ))}
                </Tabs>
                <TabPanel value={subTab} index={0}>
                    <MyProfile />
                </TabPanel>
                <TabPanel value={subTab} index={1}>
                    <Services></Services>
                </TabPanel>
                <TabPanel value={subTab} index={2}>
                    <Employees></Employees>
                </TabPanel>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <h1>No Appointments found</h1>
            </TabPanel>
            <TabPanel value={value} index={2}>
                <h1>No Orders found</h1>
            </TabPanel>
        </Box>
    );
}
