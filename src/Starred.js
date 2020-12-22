import React from "react";
import { List, Icon} from "semantic-ui-react";
import "../style.css";

const Starred = (props) => {
  const { listaStarred } = props;

  const listaStarredUser =
    listaStarred.length !== 0
      ? listaStarred.data.map((item) => (
          <List divided relaxed className="lista">
            <List.Item className="conteudo">
              <List.Icon name="github" size="large" verticalAlign="middle"/>
              <List.Content>
                <List.Header as="a">{item.name}</List.Header>
                <List.Description as="a">
                  Linguagem: {item.language}
                </List.Description>
                <List.Description as="a">
                  Tipo: Starred
                </List.Description>
                <List.Description as="a">
                  Link:{" "}
                  <a href={item.html_url}>
                    <Icon Icon name="world">
                      {" "}
                    </Icon>
                  </a>
                </List.Description>
              </List.Content>
            </List.Item>
          </List>
        ))
      : console.log("repositorio não encontrado");

  return (
    <div>
      <ul>{listaStarredUser}</ul>
    </div>
  );
};
export default Starred;