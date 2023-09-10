import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
// import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
import "./styles/cardView.scss"
import PropTypes from "prop-types"

const ExpandMore = styled((props) => {
    const { ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function EmployeeCard({ labels, data, key }) {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Card key={key} sx={{ width: "100%", marginBottom: "1rem" }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        {data.name?.slice(0, 1).toUpperCase()}
                    </Avatar>
                }
                // action={
                // <IconButton aria-label="settings">
                //     <MoreVertIcon />
                // </IconButton>
                // }
                title={data.name}
                subheader="September 14, 2016"
            />
            <CardMedia
                component="img"
                // height="104"
                image={data.photo}
                alt={data.proofType}
                sx={{
                    height: 194,
                    objectFit: "contain"
                }}
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {/* This impressive paella is a perfect party dish and a fun meal to cook
                    together with your guests. Add 1 cup of frozen peas along with the mussels,
                    if you like. */}
                </Typography>
                <section>
                    <section className='flex gap-1'>
                        <Typography className='flex-1'>
                            {labels.find(({ field }) => field === "proofType")?.headerName}
                        </Typography>
                        <Typography className='flex-2'>
                            {data.proofType}
                        </Typography>
                    </section>
                    <section className='flex gap-1'>
                        <Typography className='flex-1'>
                            {labels.find(({ field }) => field === "address")?.headerName}
                        </Typography>
                        <section className='flex-2'>
                            <Typography>
                                {`${data.address}, ${data.city},`}
                            </Typography>
                            <Typography>
                                {`${data.pinCode}, ${data.state}, ${data.country}`}
                            </Typography>
                        </section>
                    </section>
                </section>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share">
                    <ShareIcon />
                </IconButton>
                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </ExpandMore>
            </CardActions>
        </Card>
    );
}

EmployeeCard.propTypes = {
    data: PropTypes.object,
    index: PropTypes.number,
    key: PropTypes.string,
    labels: PropTypes.arr
}