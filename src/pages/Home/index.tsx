/* eslint-disable jsx-a11y/iframe-has-title */
import React, { useEffect } from "react";

import Header from "../../components/Header";

import larissa from "../../assets/img/larissa.png";
import atendimento from "../../assets/img/atendimento.jpg";
import logo2 from "../../assets/svg/logo2.svg";

import AOS from "aos";

import "./styles.scss";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

import Logo from "../../assets/svg/logo.svg";
import Countdown from "../../components/Countdown";

const Home = () => {
  const mapsSrc = `https://maps.google.com/maps?q=${"R. Luiz Alfredo Falcão Bauer, 174 - Jardim Shangai, Campinas - SP, 13056-642".replaceAll(
    " ",
    "+"
  )}&output=embed`;

  const marriageDate = new Date("2024-10-12T18:00:00");

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  }, []);

  return (
    <div className="home-page">
      <Header />
      <section id="inicio" className="hero d-flex align-items-center">
        <div className="container">
          <div className="row content">
            <div className="col-lg-6 d-flex flex-column justify-content-center">
              <div data-aos="fade-up" data-aos-delay="600">
                <div className="logo2">
                  <img src={logo2} className="img-fluid" alt="" />
                  <Countdown targetDate={marriageDate} />
                </div>
              </div>
            </div>
            <div className="col-lg-4 text-center verses">
              <h5>Colossenses 3:14</h5>
              <span>
                Acima de tudo, porém, revistam-se do amor, que é o elo perfeito.
              </span>
            </div>
          </div>
        </div>
      </section>

      <section
        id="about"
        className="about"
        data-aos="fade-up"
        data-aos-delay="400"
      >
        <div className="container" data-aos="fade-up">
          <div className="row gx-0">
            <div
              className="col-lg-6 d-flex flex-column justify-content-center"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div className="content">
                <h3>Sobre</h3>
                <h2>
                  O objetivo do meu trabalho é cuidar de você com todo cuidado e
                  atenção que eu gostaria de ter durante um tratamento.
                </h2>
                <p>
                  Aqui você encontra reabilitação fisioterapêutica para traumas
                  ortopédicos, auxílio e preparo para pré operatório, pós
                  operatório imediato, pós operatório tardio e quiropraxia
                  clínica. Tratamentos com foco em terapias manuais, um
                  tratamento particular e individualizado!
                </p>
              </div>
            </div>

            <div
              className="col-lg-6 d-flex"
              data-aos="zoom-out"
              data-aos-delay="200"
            >
              <img src={atendimento} className="img-fluid" alt="" />
            </div>
          </div>
        </div>
      </section>

      <section id="location" data-aos="fade-up" data-aos-delay="400">
        <div className="container">
          <div className="content">
            <Row>
              <Col>
                <h3>Localização</h3>
                <h2>
                  R. Luiz Alfredo Falcão Bauer, 174 - Jardim Shangai, Campinas -
                  SP, 13056-642
                </h2>
                <p>
                  Nosso consultório está localizado no Jardim Shangai, próximo a
                  garagem da URCA na região do Ouro Verde, contando com um
                  ambiente confortável e seguro preparado especialmente para
                  receber você.
                </p>
              </Col>
              <Col>
                <div id="maps">
                  <iframe
                    src={mapsSrc}
                    height="350"
                    allowFullScreen={true}
                    loading="lazy"
                  ></iframe>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </section>

      <section id="contact" data-aos="fade-up" data-aos-delay="400">
        <div className="container">
          <h2>Contato</h2>
          <div className="content">
            <div className="icons">
              <a
                href="https://www.facebook.com/laaacipreste.fisio"
                target="_blank"
                rel="noreferrer"
              >
                <i className="fab fa-facebook fa-lg"></i>
              </a>
              <a
                href="https://instagram.com/laaacipreste.fisio?utm_medium=copy_link"
                target="_blank"
                rel="noreferrer"
              >
                <i className="fab fa-instagram fa-lg"></i>
              </a>
              <a
                href="https://api.whatsapp.com/send?phone=5519996985985&text=Ol%C3%A1%2C+gostaria+de+agendar+uma+avalia%C3%A7%C3%A3o"
                target="_blank"
                rel="noreferrer"
              >
                <i className="fab fa-whatsapp fa-lg"></i>
              </a>
              <a
                href="https://g.co/kgs/jJvmpa"
                target="_blank"
                rel="noreferrer"
              >
                <i className="fab fa-google fa-lg"></i>
              </a>
            </div>
            <h3>Agende seu horário ou avaliação conosco!</h3>
          </div>
        </div>
      </section>

      <br />
      <br />
    </div>
  );
};

export default Home;
