import "./assets/css/reset.css";
import "./App.scss";
import "./assets/css/font.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Containers
import Forms from "./containers/Forms";

// Components
import Header from "./components/Header";

// FONTAWESOME
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
library.add(faTimesCircle);

function App() {
  const [forms, setForms] = useState("");
  const [reload, setReload] = useState(false);
  return (
    <Router>
      <Header />

      <Switch>
        {/* <Route path="/form">
          <FormById />
        </Route>
        <Route path="/questions">
          <Payment />
        </Route> */}
        <Route path="/">
          <Forms
            forms={forms}
            setForms={setForms}
            reload={reload}
            setReload={setReload}
          />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
