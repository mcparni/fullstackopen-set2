import React from 'react'
import Otsikko from './Otsikko'
import Sisalto from './Sisalto'
import Yhteensa from './Yhteensa'


const Kurssi = ({kurssit}) => {
  return (
    <div>
    {kurssit.map(kurssi => (
      <div key={kurssi.id + kurssi.nimi}>
        <Otsikko key={kurssi.id} kurssi={kurssi} />
        <Sisalto key={kurssi.osat.id} kurssi={kurssi} />
        <Yhteensa key={kurssi.nimi} kurssi={kurssi} />
      </div>
    ))}
    </div>
  )
}

export default Kurssi