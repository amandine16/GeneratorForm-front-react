import "./assets/css/reset.css";
import "./App.scss";
import "./assets/css/font.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useState } from "react";

// Containers
import Forms from "./containers/Forms";
import FormEdit from "./containers/FormEdit";
import Form from "./containers/Form";
// Components
import Header from "./components/Header";

function App() {
  const [forms, setForms] = useState("");
  const [reload, setReload] = useState(false);
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/forms/:id/edit">
          <FormEdit
            forms={forms}
            setForms={setForms}
            reload={reload}
            setReload={setReload}
          />
        </Route>
        <Route path="/forms/:id">
          <Form />
        </Route>
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

// GESTION DES ERREURS
// si j'essaie d'aller sur la page d'édition de formulaire, sans passer par la selection d'un formulaire (donc pas d'id dans mon url), alors je suis redirigé sur la home
// Si mes requetes renvoie une erreur, une modal s'ouvre avec un message personnalisé en fonction de l'erreur
// Si mes requetes fonctionnent , une modale s'ouvre avec un message personnalisé de succès
// La modale de success est la meme pour toutes les requetes validée, MAIS Si je supprime un form, je suis redirigé vers la home (je test le contenu du msg de succes pour rediriger ou non)
