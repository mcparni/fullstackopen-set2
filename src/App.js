import React from 'react'
import Kurssi from './components/Kurssi'

const App = () => {
  const kurssi = {
    nimi: 'Half Stack -sovelluskehitys',
    osat: [
      {
        id : 1,
        nimi: 'Reactin perusteet',
        tehtavia: 10
      },
      {
        id : 2,
        nimi: 'Tiedonvälitys propseilla',
        tehtavia: 7
      },
      {
        id : 3,
        nimi: 'Komponenttien tila',
        tehtavia: 14
      },
      {
        id : 4,
        nimi: 'Kaikkea muuta',
        tehtavia: 12
      }
    ]
  }
  return (
    <div>
     <Kurssi kurssi={kurssi} />
    </div>
  )
}

export default App