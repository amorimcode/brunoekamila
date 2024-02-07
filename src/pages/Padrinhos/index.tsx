import Header from "../../components/Header";
import "./styles.scss";

const Padrinhos = () => {
  return (
    <>
      <Header />

      <div className="padrinhos-page">
        <div className="container">
          <h1>Queridos Padrinhos</h1>

          <p>
            Obrigado por aceitarem o convite. Nosso dia são seria o mesmo sem a
            presença de vocês.
          </p>

          <h2>Para o grande dia</h2>

          <p>
            Chegar com meia hora de antecedência ao local da cerimônia. Não
            podemos atrasar, ok?
          </p>
        </div>
      </div>
    </>
  );
};

export default Padrinhos;
