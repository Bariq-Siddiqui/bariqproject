import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red,purple,blue } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Grid } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import ShareIcon from '@mui/icons-material/Share';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function RecipeReviewCard(props) {
    const { text, email, fullName, timestamp } = props;
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Grid container spacing={2} alignItems="center" textAlign='center' padding='2%' justifyContent="center">
        <Grid item xs={11} sm={9} md={7} lg={5}>
        <Card>
            <CardHeader sx={{ textAlign:"left"}}
                avatar={
                    <Avatar sx={{ bgcolor: purple[500],}} aria-label="recipe">
                        {fullName.slice(0,1)}
                    </Avatar>
                    
                    
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title={fullName}    
                subheader={email}
                
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary" sx={{ textAlign:"left"}}>
                    {text}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="share">
                    <ThumbUpIcon sx={{ color: blue[500],}}/>
                </IconButton>
                <IconButton aria-label="add to favorites">
                    <FavoriteIcon sx={{ color: red[500],}}/>
                </IconButton>
                <IconButton aria-label="share">
                    <ShareIcon sx={{ color: blue[500],}}/>
                </IconButton>
            </CardActions>
            
        </Card>
        </Grid>
        </Grid>
    );
}