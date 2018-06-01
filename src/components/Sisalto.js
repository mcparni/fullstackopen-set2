import React from 'react'
import Osa from './Osa'

const Sisalto = ({kurssi}) => { 
  const osat = kurssi.osat
  return(
    <div>
      {osat.map(osa=><Osa key={osa.id} osa={osa} />)}
    </div>
  )
}

export default Sisalto