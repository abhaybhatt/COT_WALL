import React from 'react';

import {useDispatch} from 'react-redux';
import { getPosts } from '../../actions/posts.js';
import Posts from "../Posts/Posts.js";
import Form from "../Form/Form.js";
import {Container, Grow,Grid} from '@material-ui/core'
import useStyles from '../../styles.js';

const Home = () =>{
    const [currentId, setCurrentId] = React.useState(null);
    const dispatch = useDispatch();
    const classes = useStyles();
  
    React.useEffect(() => {
      dispatch(getPosts());
    }, [currentId, dispatch]);

    return(
        <Grow in>
          <Container>
            <Grid className={classes.mainContainer}  container justify="space-between" alignItems="stretch" spacing={3}>
              <Grid item xs={12} sm={7}>
                <Posts setCurrentId={setCurrentId} />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Form currentId={currentId} setCurrentId={setCurrentId} />
              </Grid>
            </Grid>
          </Container>
        </Grow>
    )
}
export default Home;