import * as React from 'react';
import GetInLineTitle from '../components/GetInLineTitle';
import LogoutButton from '../components/LogoutButton';
import { useNavigate } from 'react-router-dom';


export default function NewAccountPage() {
    let navigate = useNavigate();
    return (
      <div>
        <GetInLineTitle/>
                <button onClick={() => navigate('/user')}>
                    this is an account page
                    </button>
                <button>
                    in progress
                    </button>
                <LogoutButton/>
      </div>
    )
  }