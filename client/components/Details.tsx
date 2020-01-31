import * as React from 'react'
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Paper, Grid, Typography } from '@material-ui/core';
import { WeatherInterface } from '../interfaces'

type DetailProps = {
  data: WeatherInterface
}

const useStyles = makeStyles(() =>
  createStyles({
    paper: {
      padding:20,
    }
  }),
);


const Details: React.FunctionComponent<DetailProps> = ({ data }) => {
  const classes = useStyles();

  return (
    <Paper elevation={4} className={classes.paper}>
      <Grid spacing={2} container>
        <Grid key={1} item md={2}>
          <img width={60} src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} /><br/>
        </Grid>
        <Grid key={2} item md={10}>
          <Typography variant="h6">Weather at {`${data.name}, ${data.sys.country}`}</Typography>
          <Typography variant="body2">{`${data.weather[0].main}, ${data.weather[0].description}`}</Typography>
        </Grid>
        <Grid key={3} item xs={6}>
          <Typography variant="overline">Coordinates</Typography><br/>
          <Typography variant="body2">{`Latitude ${data.coord.lat}, Longitude ${data.coord.lon}`}</Typography>
        </Grid>
        <Grid key={4} item xs={6}>
          <Typography variant="overline">Current Temperature</Typography><br/>
          <Typography variant="body2">{`${(data.main.temp - 273.15).toFixed(2)} °C`}</Typography>
        </Grid>
        <Grid key={5} item xs={6}>
          <Typography variant="overline">Max Temp. for the day</Typography><br/>
          <Typography variant="body2">{`${(data.main.temp_max - 273.15).toFixed(2)} °C`}</Typography>
        </Grid>
        <Grid key={6} item xs={6}>
          <Typography variant="overline">Min Temp. for the day</Typography><br/>
          <Typography variant="body2">{`${(data.main.temp_min - 273.15).toFixed(2)} °C`}</Typography>
        </Grid>
        <Grid key={7} item xs={6}>
          <Typography variant="overline">Humidity</Typography><br/>
          <Typography variant="body2">{`${data.main.humidity}%`}</Typography>
        </Grid>
        <Grid key={8} item xs={6}>
          <Typography variant="overline">Wind Speed</Typography><br/>
          <Typography variant="body2">{`${data.wind.speed} metres/sec, ${data.wind.deg} degrees`}</Typography>
        </Grid>
        <Grid key={9} item xs={6}>
          <Typography variant="overline">Cloudiness</Typography><br/>
          <Typography variant="body2">{`${data.clouds.all}%`}</Typography>
        </Grid>
        <Grid key={10} item xs={6}>
          <Typography variant="overline">Pressure</Typography><br/>
          <Typography variant="body2">{`${data.main.pressure} hPa`}</Typography>
        </Grid>
        <Grid key={11} item xs={6}>
          <Typography variant="overline">Sunrise</Typography><br/>
          <Typography variant="body2">{`${(new Date(data.sys.sunrise as number * 1000)).toTimeString().slice(0, 5)} `}</Typography>
        </Grid>
        <Grid key={12} item xs={6}>
          <Typography variant="overline">Sunset</Typography><br/>
          <Typography variant="body2">{`${new Date(data.sys.sunset as number * 1000).toTimeString().slice(0, 5)} `}</Typography>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default Details;
