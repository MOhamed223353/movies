import React, { useEffect, useState } from 'react'
import axios from 'axios'
import styles from './Home.module.scss'
import Movies from '../Movies/Movies'
import Tvshows from '../Tvshows/Tvshows'
import People from '../People/People'

export default function Home() {

return(
<>
<Movies/>
<Tvshows/>
<People/>


</>
)

}