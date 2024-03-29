/* eslint-disable jsx-a11y/iframe-has-title */
import React, { useEffect } from "react";

import Header from "../../components/Header";

import calendar from "../../assets/svg/calendar.svg";
import atendimento from "../../assets/img/atendimento.jpg";
import logo2 from "../../assets/svg/logo2.svg";

import AOS from "aos";

import "./styles.scss";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

import Logo from "../../assets/svg/logo.svg";
import Countdown from "../../components/Countdown";

const Home = () => {
  const mapsSrc = `https://maps.google.com/maps?q=${"R. Pastor Virgílio Mota dos Reis Pessoa, 75 - Jardim Vista Alegre, Campinas - SP, 13056-531".replaceAll(
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
                  <div className="count">
                    <Countdown targetDate={marriageDate} />
                  </div>
                </div>
              </div>
            </div>
            <div
              className="col-lg-4 text-center verses"
              style={
                {
                  // selection color
                }
              }
            >
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
        <div
          className="container"
          data-aos="fade-up"
          style={{
            borderRadius: "4px",
          }}
        >
          <div className="row gx-0">
            <div
              className="col-lg-6 d-flex flex-column justify-content-center"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div
                className="content"
                style={{
                  borderRadius: "4px",
                }}
              >
                <h3>SAVE THE DATE</h3>
                <h2>12 de outubro de 2024</h2>
                <p>
                  Estamos muito felizes em compartilhar esse momento tão
                  especial com vocês. Contamos com a presença de todos para
                  celebrar o amor e a união de duas vidas.
                </p>
              </div>
            </div>

            <div
              className="col-lg-6 d-flex"
              data-aos="zoom-out"
              data-aos-delay="200"
            >
              <img
                src={calendar}
                className="img-fluid"
                alt=""
                style={{
                  // borderRadius: "4px",
                  width: "100%",
                }}
              />
            </div>
          </div>
        </div>
      </section>

      <section id="location" data-aos="fade-up" data-aos-delay="400">
        <div className="container">
          <div className="content">
            <Row>
              <Col>
                <h3>Localização da cerimônia</h3>
                <h2>
                  R. Pastor Virgílio Mota dos Reis Pessoa, 75 - Jardim Vista
                  Alegre, Campinas - SP, 13056-531
                </h2>
                {/* <p>
                  Nosso consultório está localizado no Jardim Shangai, próximo a
                  garagem da URCA na região do Ouro Verde, contando com um
                  ambiente confortável e seguro preparado especialmente para
                  receber você.
                </p> */}
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
        <div
          className="container"
          style={{
            borderRadius: "4px",
          }}
        >
          <h2>Contato</h2>
          <div className="content">
            <div className="icons">
              {/* <a
                href="https://www.facebook.com/laaacipreste.fisio"
                target="_blank"
                rel="noreferrer"
              >
                <i className="fab fa-facebook fa-lg"></i>
              </a> */}
              <a
                href="https://instagram.com/xmorim?utm_medium=copy_link"
                target="_blank"
                rel="noreferrer"
              >
                <i className="fab fa-instagram fa-lg"></i>
              </a>
              <a
                href="https://api.whatsapp.com/send?phone=5519991123574"
                target="_blank"
                rel="noreferrer"
              >
                <i className="fab fa-whatsapp fa-lg"></i>
              </a>
              {/* <a
                href="https://g.co/kgs/jJvmpa"
                target="_blank"
                rel="noreferrer"
              >
                <i className="fab fa-google fa-lg"></i>
              </a> */}
            </div>
            <h3>Qualquer dúvida entre em contato</h3>
          </div>
        </div>
      </section>

      <br />
      <br />
    </div>
  );
};

export default Home;
