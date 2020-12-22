import React, { useState } from "react";
import {Form, Card, Image, Icon} from 'semantic-ui-react';
import axios from "axios";
import "./App.css";
import Repos from "./Repos/Repos";
import Starred from "./Starred/Starred";



const App = () => {
  const [name, setName] = useState("");
  const [userName, setUsername] = useState("");
  const [seguidores, setSeguidores] = useState("");
  const [seguindo, setSeguindo] = useState("");
  const [repos, setRepos] = useState("");
  const [avatar, setAvatar] = useState("");
  const [userInput, setUserInput] = useState("");
  const [error, setErros] = useState("");
  const [listaRepos, setListaRepos] = useState([]);
  const [listaStarred, setListaStarred] = useState([]);

  const setData = ({ name, login, followers, following, public_repos, avatar_url}) => {
    setName(name);
    setUsername(login);
    setSeguidores(followers);
    setSeguindo(following);
    setRepos(public_repos);
    setAvatar(avatar_url);
  };

  const controladorPesquisa = (e) => {
    setUserInput(e.target.value);
  };

  const controladorSubmit = () => {
    axios.get(`https://api.github.com/users/${userInput}`)

      .then((response) => {
        if(response.message) {
          setErros(response.menssage)
        } else {
          setData(response.data)
      }
    })  
  };



  const controladorListaRepos = async () => {
    try {
      const resultadoRepos = await axios.get(
        `https://api.github.com/users/${userInput}/repos`
      );

      setListaRepos(resultadoRepos);
    } catch (err) {
      console.log(err);
    }
  };

  const controladorListaStarred = async () => {
    try {
      const resultadoStarred = await axios.get(
        `https://api.github.com/users/${userInput}/starred`
      );
      
      setListaStarred(resultadoStarred);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="fundo">
        <div className="cabecalo">GitHub Api</div>
      <div className="procura">
        <Form onSubmit={controladorSubmit}>
          <Form.Group>
            <Form.Input
              placeholder="Nome de usuário"
              name="Procurar"
              onChange={controladorPesquisa}
            />
            <Form.Button content="Pesquisar" />
          </Form.Group>
        </Form>
      </div>
      {error ? (
        <h1>{error}</h1>
      ) : (
        <div className="perfil">
          <Card>
            <Image src={avatar} wrapped ui={false} alt={avatar} />
            <Card.Content>
              <Card.Header>{name}</Card.Header>
              <Card.Meta>{userName}</Card.Meta>
            </Card.Content>
            <Card.Content extra>
                <Icon name="user"></Icon>
                {seguidores} Seguidores
            </Card.Content>
            <Card.Content extra>
                <Icon name="user"></Icon>
                {repos} Repositorios
            </Card.Content>
            <Card.Content extra>
                <Icon name="user"></Icon>
                {seguindo} Seguindo
            </Card.Content>
          </Card>
        </div>
      )}
      <div className="botaoReposStarred">
        <Form.Button onClick={controladorListaRepos}>Repos</Form.Button>
        <Form.Button onClick={controladorListaStarred}>Starred</Form.Button>
      </div>

      <Repos listaRepos={listaRepos} />
      <Starred listaStarred={listaStarred} />
    </div>
  );
};

export default App;
