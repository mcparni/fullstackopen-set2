import React from 'react'

const Notification = ({ type,msg }) => {
  

  console.log(msg,type)
  if (msg.length === 0) {
    return null
  }
  return (
    <div className={"notification " + type}>
      {msg}
    </div>
  )
}

export default Notification