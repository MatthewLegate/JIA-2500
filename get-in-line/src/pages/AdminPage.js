import * as React from 'react';
// import { Button } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
import GetInLineTitle from '../components/GetInLineTitle';
import LogoutButton from '../components/LogoutButton';


// const navigate = useNavigate();

function goToTable() {
    alert('taking you to queues');
//    navigate('/about')  
}

export default function AdminPage() {
  return (
    <div>
      <GetInLineTitle/>
              <button onClick={goToTable}>
                  View Your Queues
                  </button>
              <button>
                  Settings
                  </button>
              <LogoutButton/>
    </div>
  )
}
