import React from 'react'
import GetInLineTitle from './GetInLineTitle'

export default function LoginPage() {
  return (
    <>
    <div>
      <GetInLineTitle/>
      Username <input type="text" /> <br/>
      Password <input type="text" /> <br/>
      <button>User Login</button> 
      <button>Admin Login</button>

    </div>
    </>
  )
}
