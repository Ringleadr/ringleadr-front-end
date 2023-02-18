import { Grid } from "semantic-ui-react";
import ApplicationPage from "../applications/ApplicationPage";
import { HashRouter, Route, Routes } from "react-router-dom";
import SideNav from "../side-nav/side-nav";
import NetworkPage from "../networks/NetworkPage";
import StoragePage from "../storage/StoragePage";
import NodePage from "../nodes/NodePage";
import OverviewPage from "../overview/OverviewPage";
import New from "../new/New";

function Home() {
  return (
    <HashRouter>
      <Grid>
        <Grid.Column width={2}>
          <SideNav />
        </Grid.Column>
        <Grid.Column width={12}>
          <Routes>
            <Route path="/" element={<OverviewPage />} />
             {/*<Route path="/applications" element={<ApplicationPage />} /> */}
             {/*<Route path="/networks" element={<NetworkPage />} /> */}
             {/*<Route path="/storage" element={<StoragePage />} /> */}
             <Route path="/nodes/*" element={<NodePage />} />
            <Route path="/new/*" element={<New />} />
          </Routes>
        </Grid.Column>
      </Grid>
    </HashRouter>
  );
}

export default Home;
