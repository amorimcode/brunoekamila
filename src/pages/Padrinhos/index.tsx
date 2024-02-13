/* eslint-disable jsx-a11y/alt-text */
import Header from "../../components/Header";
import "./styles.scss";

import madrinhas from "../../assets/img/madrinhas.jpeg";
import padrinho from "../../assets/img/padrinho.jpeg";

const Padrinhos = () => {
  const isMobile = window.innerWidth < 768;

  return (
    <>
      <Header />

      <div className="padrinhos-page">
        <div className="container">
          <h1>Queridos Padrinhos</h1>

          <p>
            Queridos padrinhos, obrigado por aceitarem nosso convite. Ficamos
            imensamente felizes por compartilhar esse momento especial, não
            seria o mesmo sem vocês!
          </p>

          <h3>Para o grande dia</h3>

          <p>
            É importante que vocês cheguem com 40 minutos de antecedência, não
            podemos nos atrasar, ok?
          </p>

          <h3>Paleta de cores para você se inspirar</h3>

          {/* corações coloridos */}

          <i
            className="fas fa-circle fa-8x"
            style={{
              color: "#54582f",
            }}
          ></i>
          <i
            className="fas fa-circle fa-8x"
            style={{
              color: "#86895d",
            }}
          ></i>
          <i
            className="fas fa-circle fa-8x"
            style={{
              color: "#bec092",
            }}
          ></i>
          <i
            className="fas fa-circle fa-8x"
            style={{
              color: "#f8fbca",
            }}
          ></i>

          <h3
            style={{
              marginTop: 100,
            }}
          >
            Madrinha
          </h3>

          <p>
            Queremos que nesse dia você se sinta linda e confortável, então o
            modelo do vestido é de sua preferência contanto que seja longo!
          </p>

          <img
            src={madrinhas}
            style={{
              width: isMobile ? "100%" : "22rem",
              borderRadius: "8px",
            }}
          />

          <br />

          <h3>Padrinho</h3>

          <p>
            Para você, indicamos um terno preto, camisa branca e a gravata
            também na cor verde oliva, combinando com sua acompanhante.
          </p>

          <img
            src={padrinho}
            style={{
              width: isMobile ? "100%" : "22rem",
              borderRadius: "8px",
            }}
          />
          <br />
          <br />
          <br />
          <br />
        </div>
      </div>
    </>
  );
};

export default Padrinhos;
