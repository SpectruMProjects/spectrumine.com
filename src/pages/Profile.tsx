import { useState } from 'react'

export default function Profile() {
  const [lol] = useState("lol")
  
  return <div>
    Profile
    {lol}
  </div>
}
