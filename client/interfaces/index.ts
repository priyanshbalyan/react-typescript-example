export type Weather = {
  id: number
  main: string
  description: string
  icon: string
}

export type WeatherInterface = {
  coord: {
    [key: string]: number
  }
  weather: Weather[]
  main: {
    [key: string]: number
  }
  name: string
  clouds: {
    [key: string]: number
  }
  cod: number
  id: number
  dot: number
  visibility: number
  wind: {
    [key: string]: number
  }
  sys: {
    [key: string]: string | number
  }
  dt: number
}
