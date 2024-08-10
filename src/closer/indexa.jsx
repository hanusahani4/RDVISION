import React from 'react';

//Components
import Topnav from '../Components/Topnav';
import Sidenav from '../Components/Sidenav';
import Cardinfo from '../Components/Cardinfo';
import TaskProgress from '../Components/TaskProgress';
import Worktime from '../Components/Worktime';
import Chart from '../Components/Chart';


//pages
import Live_tickets from '../Pages/live_tickets';


function indexa() {


  return (

    <>
      <div className="superadmin-page">

        <Sidenav />

        <div className="my-container main-content-block2658 active-cont">
          <Topnav />

          <div className="container-fluid mt-3">
            <Cardinfo />
          </div>

          <div className="container-fluid mt-3">
            <TaskProgress />
          </div>

          <div className="container-fluid mt-3">
            <Worktime />
          </div>

          <div className="container-fluid mt-3">
            <Chart />
          </div>


          <div className="container-fluid mt-3">
            <Live_tickets />
          </div>


        </div>
      </div>
    </>
  );
}


export default indexa