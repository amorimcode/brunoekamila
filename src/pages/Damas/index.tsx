/* eslint-disable jsx-a11y/alt-text */
import Header from "../../components/Header";
import "./styles.scss";

import damas from "../../assets/img/damas.jpeg";

const Damas = () => {
  const isMobile = window.innerWidth < 768;

  return (
    <>
      <Header />

      <div className="padrinhos-page">
        <div className="container">
          <h1>Damas de honra</h1>

          <p>
            Querida dama de honra, obrigado por aceitar nosso convite. Ficamos
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
              color: "#ff58ae",
            }}
          ></i>
          <i
            className="fas fa-circle fa-8x"
            style={{
              color: "#ff2c97",
            }}
          ></i>
          <i
            className="fas fa-circle fa-8x"
            style={{
              color: "#ef007e",
            }}
          ></i>

          <h3
            style={{
              marginTop: 100,
            }}
          >
            Dama de honra
          </h3>

          <p>
            Queremos que nesse dia você se sinta linda e confortável, então o
            modelo do vestido é de sua preferência contanto que seja longo!
          </p>

          <img
            src={damas}
            style={{
              width: isMobile ? "100%" : "22rem",
              borderRadius: "8px",
            }}
          />

          <br />

          <br />
          <br />
        </div>
      </div>
    </>
  );
};

export default Damas;
