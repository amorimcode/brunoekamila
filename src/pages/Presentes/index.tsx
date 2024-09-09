import Header from "../../components/Header";
import { onValue, ref } from "firebase/database";
import { db } from "../../services/firebase";
import { PostType } from "../../types/models";
import { useState } from "react";
import { useEffect } from "react";

import "./styles.scss";
import Card from "../../components/Card";
import Masonry from "react-masonry-css";

const Presentes = () => {
  const breakpointColumnsObj = {
    default: 3,
    1100: 3,
    700: 1,
    500: 1,
  };
  const [posts, setPosts] = useState<any>([
    {
      foto: "https://m.media-amazon.com/images/I/51aMLR56W1S._AC_SL1000_.jpg",
      title: "Aparelho de Jantar 20 Peças Roma Branco",
      description: "R$ 699,99",
      link: "https://www.amazon.com.br/APARELHO-JANTAR-PE%C3%87AS-ROMA-BRANCO/dp/B077BWFH3Z/ref=asc_df_B077BWFH3Z/?tag=googleshopp00-20&linkCode=df0&hvadid=379715627214&hvpos=&hvnetw=g&hvrand=10517298326519869899&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=1001729&hvtargid=pla-813302545329&psc=1&mcid=fceb4b56ee323decb3eaca93249d35f0",
    },
    {
      foto: "https://m.media-amazon.com/images/I/51JvLuUbaUL._AC_SL1000_.jpg",
      title: "Jogo de Copos Nadir Figueiredo Lights Drink 410ml 12 Peças",
      description: "R$ 55,99",
      link: "https://www.amazon.com.br/Copos-Lights-Drink-410ml-Nadir/dp/B07PP8FMTY/ref=asc_df_B07PP8FMTY/?tag=googleshopp00-20&linkCode=df0&hvadid=379685432142&hvpos=&hvnetw=g&hvrand=13094017039981043948&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=1001729&hvtargid=pla-926667362852&psc=1&mcid=d882b9d277f63f208f69c137c2083102",
    },
    {
      foto: "https://m.media-amazon.com/images/I/61EDp631OLL._AC_SL1000_.jpg",
      title: "Conjunto de Sobremesa Cancun 7 Peças Ruvolo",
      description: "R$ 159,90",
      link: "https://www.amazon.com.br/Conjunto-Sobremesa-Pe%C3%A7as-Cancun-Ruvolo/dp/B078BMGZ6J/ref=asc_df_B078BMGZ6J/?tag=googleshopp00-20&linkCode=df0&hvadid=379816330550&hvpos=&hvnetw=g&hvrand=12986771712994326610&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=1001729&hvtargid=pla-892441309864&psc=1&mcid=697cae12a9f83ff1a23b4fff901b2252",
    },
    {
      foto: "https://m.media-amazon.com/images/I/41azTQkW5cL._AC_SL1200_.jpg",
      title: "Tabua de passar",
      description: "R$ 599,00",
      link: "https://www.amazon.com.br/PASSAR-EXTRA-FORTE-PASSA-MANGAS/dp/B09BWYSNPY/ref=asc_df_B09BWYSNPY/?tag=googleshopp00-20&linkCode=df0&hvadid=379773097631&hvpos=&hvnetw=g&hvrand=13089944302423642110&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=9100335&hvtargid=pla-1456287705521&psc=1&mcid=484de34bd7013da598e364f8fcbae5d5",
    },
    {
      foto: "https://m.media-amazon.com/images/I/711d1QmQM4L._AC_SL1500_.jpg",
      title: "Pillow Top",
      description: "R$ 599,00",
      link: "https://www.amazon.com.br/Pillow-Toque-Pluma-Casal-espessura/dp/B0C47C86RR/ref=asc_df_B0C47C86RR/?tag=googleshopp00-20&linkCode=df0&hvadid=647426883978&hvpos=&hvnetw=g&hvrand=12473129598056628829&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=9100335&hvtargid=pla-2204922063812&psc=1&mcid=24747e5b522c34a78a411ceac5ee95e8#customerReviews",
    },
    {
      title: 'Organizador de Geladeira',
      foto: "https://m.media-amazon.com/images/I/51Pvq4I-mIL._AC_SL1200_.jpg",
      url: 'https://www.amazon.com.br/T%C3%A1buas-Teca-Suporte-Organizador-Stolf/dp/B08VRP737Y/ref=sr_1_7?__mk_pt_BR=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=26Y1HYISAODQZ&dib=eyJ2IjoiMSJ9.8nil0ip8ih-1FA3MD4ayhWmFMFxTs6S_Cz4BaGrVtYocOn9j6hOKzGyllhNwQPHrWp1Oq-wjm3CeNtZyCiGej6UYixSMLkXAJGUciqcY-akMXP_S0EDIrTh9K9HMco-EAMHCS3MkUl6zcit6d7p1VwIlAp4dUptixLBEQ-ubpFTO6HHV9DEZw6OBx-H9pYHLtO5oa5Wm1mV83Q5E7_0Cg55UbtPxHKWqXgaplZ8-9p4-W_y8ORQfEQz7BnHcTxY1n6LBWfNYk9LtJ_VA-1LSRRsh3mLAZ8unyziOPtgcBwo.UPDrii6GsGQ6OS0cWnATw-VlFcGHSTuP7lvom28VFec&dib_tag=se&keywords=tabua&qid=1725850701&sprefix=tab%2Caps%2C188&sr=8-7&ufe=app_do%3Aamzn1.fos.6d798eae-cadf-45de-946a-f477d47705b9'
    },
    {
      title: 'Pote Hermetico',
      foto: "https://m.media-amazon.com/images/I/519ZH-Fhc1L._AC_SL1000_.jpg",
      url: 'https://www.amazon.com.br/Kit-Potes-Herm%C3%A9ticos-Pl%C3%A1stico-Electrolux/dp/B09XJL4B9H/ref=asc_df_B09XJL4B9H/?tag=googleshopp00-20&linkCode=df0&hvadid=379725881673&hvpos=&hvnetw=g&hvrand=14598484904077665038&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=1001729&hvtargid=pla-1662902312395&mcid=93036d57993a35b7af417811b1a3528a&th=1'
    },
    {
      title: 'Porta Tempero',
      foto: "https://m.media-amazon.com/images/I/61OG7XRQh5L._AC_SL1200_.jpg",
      url: 'https://www.amazon.com.br/Porta-Tempero-Condimento-Giratorio-Cozinha/dp/B08L5M5V6H/ref=asc_df_B08L5M5V6H/?tag=googleshopp00-20&linkCode=df0&hvadid=456273449207&hvpos=&hvnetw=g&hvrand=15582696808799468820&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=1001729&hvtargid=pla-1091134025254&psc=1&mcid=a7349087334b31238947b7723d0bd04e'
    },
    {
      title: 'Kit travesseiro',
      foto: "https://m.media-amazon.com/images/I/61M5fjeKWpL._AC_SL1200_.jpg",
      url: 'https://www.amazon.com.br/Kit-Travesseiro-Pe%C3%A7as-Percal-Fios/dp/B076PL3G89/ref=asc_df_B076PL3G89/?tag=googleshopp00-20&linkCode=df0&hvadid=379720772128&hvpos=&hvnetw=g&hvrand=10782962139143374491&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=1001729&hvtargid=pla-836223934257&psc=1&mcid=f81c6189036939c2846b9f680237c774'
    },
    {
      title: 'Toalhas de banho',
      foto: "https://m.media-amazon.com/images/I/711T4hQ51qL._AC_SL1000_.jpg",
      url: 'https://www.amazon.com.br/Toalhas-Karsten-Algod%C3%A3o-Felpuda-67x135cm/dp/B07XYFFRT3/ref=asc_df_B07XYFFRT3/?tag=googleshopp00-20&linkCode=df0&hvadid=379720655980&hvpos=&hvnetw=g&hvrand=15633358883949040535&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=1001729&hvtargid=pla-933209315899&psc=1&mcid=6bbc2ff4e86832bb9f2b273276da0a4a'
    },
    {
      title: 'Toalhas de rosto',
      foto: "https://m.media-amazon.com/images/I/71Pf-BNFE6L._AC_SL1000_.jpg",
      url: 'https://www.amazon.com.br/pe%C3%A7as-Toalha-Lavabo-Buddemeyer-Vision/dp/B0CVL6RWMF/ref=asc_df_B0CVL6RWMF/?tag=googleshopp00-20&linkCode=df0&hvadid=647401007163&hvpos=&hvnetw=g&hvrand=16906705353066234386&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=1001729&hvtargid=pla-2293974871673&mcid=b3eab8089a41385596a42196a093d9f2&th=1'
    },
    {
      title: 'Tapetes de banheiro',
      foto: "https://m.media-amazon.com/images/I/61afNMVaijL._AC_SL1200_.jpg",
      url: 'https://www.amazon.com.br/Tapetes-Banheiro-Antiderrapante-Emborrachado-60x40cm/dp/B0CLQ336QR/ref=asc_df_B0CLQ336QR/?tag=googleshopp00-20&linkCode=df0&hvadid=647603346200&hvpos=&hvnetw=g&hvrand=7775287222266336419&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=1001729&hvtargid=pla-2267084157784&psc=1&mcid=a7e7fa4fbf5437a19c89defb65e31f84'
    },
    {
      title: 'Jarra de vidro',
      foto: "https://m.media-amazon.com/images/I/715sQGCzGjL._AC_SL1500_.jpg",
      url: 'https://www.amazon.com.br/Wincy-Jarra-Vidro-Cromada-VDA11046/dp/B09R82XT4V/ref=sr_1_5?__mk_pt_BR=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=344932FP8M553&dib=eyJ2IjoiMSJ9.CDcFHWOl6RBdXivbiVLZnZhl7y-ynOeCCnNa4xkdF5QWU5e2qoYA0Ri4vnTNl7ZF_zxy48wLWJCVlNKos3zOqmlU2K-IpetcpDucshz8PUPUw0Qfeq5PyNyWQ-Lmda3FxpMftqaFPxDAuLfi9V-CY9SuLybenSfOLNYh1v2wQQi_MhD0dw-c8M5fuldDBcKve_m-rf1GT8uLvZk50g3eoXQqVz_W2hh8ol5tmuM9dMqLjIE4JV3eK6cE1zwUoCQ1Altvr3nq6xpElb4cRzyfcxTqWTXwmbcTYkN_G48VivA.aRyq0cTuruiJP4AOmuTcK8jx1PH9ciHKuzf85FOoyn4&dib_tag=se&keywords=jarra+de+vidro&qid=1725850655&sprefix=jarra+de+vid%2Caps%2C206&sr=8-5'
    },
    {
      title: 'Tabua de cortar',
      foto: "https://m.media-amazon.com/images/I/61P1w5oCmzL._AC_SL1200_.jpg",
      url: 'https://www.amazon.com.br/T%C3%A1buas-Teca-Suporte-Organizador-Stolf/dp/B08VRP737Y/ref=sr_1_7?__mk_pt_BR=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=26Y1HYISAODQZ&dib=eyJ2IjoiMSJ9.8nil0ip8ih-1FA3MD4ayhWmFMFxTs6S_Cz4BaGrVtYocOn9j6hOKzGyllhNwQPHrWp1Oq-wjm3CeNtZyCiGej6UYixSMLkXAJGUciqcY-akMXP_S0EDIrTh9K9HMco-EAMHCS3MkUl6zcit6d7p1VwIlAp4dUptixLBEQ-ubpFTO6HHV9DEZw6OBx-H9pYHLtO5oa5Wm1mV83Q5E7_0Cg55UbtPxHKWqXgaplZ8-9p4-W_y8ORQfEQz7BnHcTxY1n6LBWfNYk9LtJ_VA-1LSRRsh3mLAZ8unyziOPtgcBwo.UPDrii6GsGQ6OS0cWnATw-VlFcGHSTuP7lvom28VFec&dib_tag=se&keywords=tabua&qid=1725850701&sprefix=tab%2Caps%2C188&sr=8-7&ufe=app_do%3Aamzn1.fos.6d798eae-cadf-45de-946a-f477d47705b9'
    }
  ]);


  return (
    <>
      <Header />
      <div className="posts-page">
        <div className="container text-center">
          <div
            style={{
              width: "70%",
              textAlign: "center",
              alignContent: "center",
              alignItems: "center",
              margin: "0 auto",
            }}
          >
            <h1>Lista de presentes</h1>

            <p>Queridos amigos e familiares,</p>
            <p>Estamos muito felizes em compartilhar este momento especial de nossas vidas com vocês! Para aqueles que desejam nos presentear, gostaríamos de informar que aceitamos presentes através de PIX (52306431884), facilitando a sua contribuição de maneira prática e segura.</p>
            <p>Se preferirem, também temos uma lista de presentes sugestiva! Caso escolha nos presentear com algum item desta lista, pedimos que nos avisem para que este item possa ser retirado da mesma.</p>
            <p>Desde já, agradecemos por fazerem parte deste dia tão significativo para nós.</p>
            <p>Com carinho,</p>
            <p>Bruno & Kamila</p>

            <br />
            <br />
          </div>

          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid posts"
            columnClassName="my-masonry-grid_column"
          >
            {posts.map((post: PostType) => (
              <Card
                key={post.key}
                code={post.key}
                title={post.title}
                // description={post.description}
                images={post.images}
                link={post.link}
                foto={post.foto}
              />
            ))}
          </Masonry>

          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
        </div>
      </div>
    </>
  );
};

export default Presentes;
