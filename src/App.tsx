import { useState } from 'react'
import AdresseForm from './AdresseForm'

import './App.css'

function App() {
  const [address, setAddress] = useState<string>("")

  const handleChangeAddress = (address: string) => {
    setAddress(address);
  }
  return (
    <>
      <div>
        <AdresseForm onAddressChange={handleChangeAddress}/>
      </div>
    </>
  )
}

export default App
