import React from 'react'


const Yhteensa = ({kurssi}) => {
  
  const osat = kurssi.osat
  const yhteensa = osat.reduce(
    (accumulator, currentValue) => 
      accumulator + currentValue.tehtavia 
      ,0
  )

 
  return(
    <p>yhteensä {yhteensa} tehtävää</p>
  )
  
}

export default Yhteensa