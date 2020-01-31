import * as React from 'react'
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { NextPage } from 'next'
import { MenuItem, Select, Button, Grid, Fade, LinearProgress, Zoom } from '@material-ui/core';
import axios from 'axios';
import Details from '../components/Details';
import { WeatherInterface } from '../interfaces'

const BASE_URL = 'http://localhost:3001';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      marginLeft: 'auto',
      minWidth: 120,
      marginRight: 'auto',
      marginTop: 20,
      padding: 20,
      maxWidth: 600
    }
  }),
);


const cities = ['San Francisco', 'Chicago', 'New York', 'Massachusetts', 'Kentucky'];

const IndexPage: NextPage = () => {
  const classes = useStyles();
  const [location, setLocation] = React.useState<string>('');
  const [loading, setLoading] = React.useState<boolean>(false);
  const [data, setData] = React.useState<WeatherInterface | null>(null);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    if (!event.target.value) {
      setData(null);
    }
    setLocation(event.target.value as string);
  };

  const handleClick = async () => {
    setData(null);
    setLoading(true);
    try {
      const response = await axios.post(`${BASE_URL}/weather`, { location });
      setData(response.data);
    } catch(err) {
      console.log(err);
    }
    setLoading(false);
  }
  
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={10}>
        <Select
          fullWidth
          displayEmpty
          labelId="select-label"
          value={location}
          onChange={handleChange}>
          <MenuItem value="" disabled>Select a location</MenuItem>  
          {cities.map(city => {
            return (<MenuItem value={city}>{city}</MenuItem>);
          })}
        </Select>
        </Grid>
        <Grid item xs={2}>
          <Button
            fullWidth
            variant="outlined"
            color="primary"
            disabled={loading}
            onClick={handleClick}>
            Go
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Fade in={loading}>
            <LinearProgress />
          </Fade>
          <Zoom in={!!data}>
            <div>
              {data && <Details data={data}/>}
            </div>
          </Zoom>
        </Grid>
      </Grid>
    </div>
  );
}

export default IndexPage
