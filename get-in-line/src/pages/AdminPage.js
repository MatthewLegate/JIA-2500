import * as React from 'react';
import GetInLineTitle from '../components/GetInLineTitle';
import LogoutButton from '../components/LogoutButton';
import { useNavigate } from 'react-router-dom';

function goToTable() {
    alert('taking you to queues');
    
}

export default function AdminPage() {
  let navigate = useNavigate();
  return (
    <div>
      <GetInLineTitle/>
              <button onClick={() => navigate('/user')}>
                  View Your Queues
                  </button>
              <button>
                  Settings
                  </button>
              <LogoutButton/>
    </div>
  )
}
