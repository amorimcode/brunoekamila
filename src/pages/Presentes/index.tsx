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
      title: "Geladeira DB44 Inverse Frost Free 400 Litros Electrolux 110v",
      description: "R$ 3.658,41",
      foto: "https://a-static.mlcdn.com.br/800x560/geladeira-db44-inverse-frost-free-400-litros-electrolux/carrefouroficial/900008135/1c3162760f8b8736a077edd90a64885d.jpeg",
      link: "https://www.magazineluiza.com.br/geladeira-db44-inverse-frost-free-400-litros-electrolux/p/hc2ga10b9a/ed/rinv/?seller_id=carrefouroficial&region_id=123481&utm_source=google&utm_medium=pla&utm_campaign=&partner_id=71263&gad_source=1&gclid=CjwKCAiAuNGuBhAkEiwAGId4auWdGGYa3avOg2XbFFDcJODFpDpv0Xjya84PzjdX09V7s-RkRYLbOhoCzT4QAvD_BwE&gclsrc=aw.ds",
    },
    {
      foto: "https://m.media-amazon.com/images/I/41MPK1xTsGL._AC_SL1000_.jpg",
      title: "Microondas Philco Branco PMO23BB 110V",
      description: "R$ 570,18",
      link: "https://www.amazon.com.br/Micro-ondas-Philco-Branco-Pmo23bb-110v/dp/B097CJVNWS/ref=sr_1_3?__mk_pt_BR=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=2BOX9JH07WG14&dib=eyJ2IjoiMSJ9.EyNvvPwWjv3J2vYYLJOr75tn6ey1tjOrsxvqVRTn7h2V7EFWTc-ccVN2Y74FL72IMikVYc7bQ3g1BCWx-OmNAynz8VJLrq4UJDAw-Slsmt_DkMCY_0ZICe160TgK3DDmYK1_yp0Y5ox-L-3z730M4CrBsDB0TXld-NpG_S9gVtitmaY1bRZ7JDGoqT3wL400t1RfKuFgSPCKTVdf98PMbVwGrz_hALcCU4GtvTKnR3hwYtGRbaSdvL516gtLGqTCAnUQL70uACHHDksOmN-srIZiTwmF6OtUxCJm4731Z78.ONO-7yj6zPPadhYMBej1P8w2-t0bCrle7pDMrdUg-T4&dib_tag=se&keywords=Micro-ondas%2BPhilco%2B20l%2BBranco%2B110&qid=1708478992&s=appliances&sprefix=micro-ondas%2Bphilco%2B20l%2Bbranco%2B11%2Cappliances%2C263&sr=1-3&ufe=app_do%3Aamzn1.fos.25548f35-0de7-44b3-b28e-0f56f3f96147&th=1",
    },
    {
      foto: "https://a-static.mlcdn.com.br/800x560/forno-eletrico-air-fry-oven-philco-pfe36s-36l-4-em-1/britania/6053/1ea74c40265a9ba4a24c7bf621c779d3.jpeg",
      title: "Forno Elétrico Air Fry Oven Philco PFE36S 36L 4 em 1",
      description: "R$ 638,31",
      link: "https://www.magazineluiza.com.br/forno-eletrico-air-fry-oven-philco-pfe36s-36l-4-em-1/p/abdf30a9f3/ed/frne/?seller_id=britania&region_id=123481&utm_source=google&utm_medium=pla&utm_campaign=&partner_id=73975&gad_source=1&gclid=CjwKCAiAuNGuBhAkEiwAGId4avnNmZyqVgcBQwkdX_GatDguEIc8JFKT6GdK_8ESoLQk8OGN5DvcPRoCoNoQAvD_BwE&gclsrc=aw.ds",
    },
    {
      title: "Jogo de Facas Tramontina Plenus 23498015 6 Peças",
      description: "R$ 159,54",
      foto: "https://m.media-amazon.com/images/I/81EXZyPHYEL._AC_SL1500_.jpg",
      link: "https://www.amazon.com.br/Facas-Pe%C3%A7as-Tramontina-Plenus-23498015/dp/B0772XQ7XQ/ref=asc_df_B0772XQ7XQ/?tag=googleshopp00-20&linkCode=df0&hvadid=379714275348&hvpos=&hvnetw=g&hvrand=1085407482333365417&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=1001729&hvtargid=pla-810029703099",
    },
    {
      foto: "https://m.media-amazon.com/images/I/61waSycODiL._AC_SL1500_.jpg",
      title: "Jogo de Talheres Tramontina 66906774 para Churrasco 12 Peças",
      description: "R$ 222,09",
      link: "https://www.amazon.com.br/Tramontina-66906774-Faqueiro-Churrasco-Pe%C3%A7as/dp/B076M9JG3T/ref=asc_df_B076M9JG3T/?tag=googleshopp00-20&linkCode=df0&hvadid=379738014645&hvpos=&hvnetw=g&hvrand=1085407482333365417&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=1001729&hvtargid=pla-809744448222&psc=1&mcid=a0062b2b61343dea8324bf1f5ca122f5",
    },
    {
      foto: "https://m.media-amazon.com/images/I/61jglev5nyL._AC_SL1500_.jpg",
      title: "Jogo de Utensílios de Cozinha Silicone e Madeira 10 Peças",
      description: "R$ 148,99",
      link: "https://www.amazon.com.br/cozinha-silicone-antiaderente-madeira-essenciais/dp/B0C2FFW2CL/ref=asc_df_B0C2FFW2CL/?tag=googleshopp00-20&linkCode=df0&hvadid=647439836835&hvpos=&hvnetw=g&hvrand=17904126453781871853&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=1001729&hvtargid=pla-2202079411918&psc=1&mcid=afc59fd38fe03fbcbad2e08c40258312",
    },
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
      foto: "https://m.media-amazon.com/images/I/71Hu52JwP-L._AC_SL1280_.jpg",
      title: "Jogo de Taças de Vinho Vidro Diamante 340ml 6 Peças",
      description: "R$ 56,00",
      link: "https://www.amazon.com.br/Ta%C3%A7as-Vinho-Vidro-Diamante-340ML/dp/B093TM4536/ref=asc_df_B093TM4536/?tag=googleshopp00-20&linkCode=df0&hvadid=379685432142&hvpos=&hvnetw=g&hvrand=13094017039981043948&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=1001729&hvtargid=pla-1421489404729&psc=1&mcid=00fa8fcc8bd5358ea3e990a68b08fe17",
    },
    {
      foto: "https://imgs.casasbahia.com.br/55065343/1g.jpg?imwidth=500",
      title: "Liquidificador Philco PLQ2100PI Turbo Preto 1400W",
      description: "R$ 199,00",
      link: "https://www.casasbahia.com.br/liquidificador-philco-plq2100pi-turbo-preto-1400w-com-12-velocidades-55065343/p/55065343?utm_medium=cpc&utm_source=GP_PLA&IdSku=55065343&idLojista=10037&tipoLojista=1P&&utm_campaign=gg_pmax_core_elpo&gad_source=1&gclid=CjwKCAiAuNGuBhAkEiwAGId4ajbzhBZ5kMTLP_ufUxy8VwU4K4eOlBiewGQIVn8QsaJkq-9y9Gl70xoCv6cQAvD_BwE&gclsrc=aw.ds",
    },
    {
      foto: "https://m.media-amazon.com/images/I/51zY-q88FlL._AC_SL1000_.jpg",
      title: "Máquina de Lavar",
      description: "R$3.599,00",
      link: "https://www.amazon.com.br/M%C3%A1quina-Intelig%C3%AAncia-Artificial-LG-FV5013WC4/dp/B09DLDC5PF/ref=asc_df_B09DLDC5PF/?tag=googleshopp00-20&linkCode=df0&hvadid=456273449207&hvpos=&hvnetw=g&hvrand=18277527134601080566&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=1001729&hvtargid=pla-1629243383232&psc=1&mcid=9942e5e3af893e8f909da5187cd5aa72",
    },
    {
      foto: "https://m.media-amazon.com/images/I/61hDt2yNWNL._AC_SL1000_.jpg",
      title: "Smart TV QLED UHD Samsung QN43LS03B",
      description: "R$ 2.949,00",
      link: "https://www.amazon.com.br/Smart-QLED-UHD-Samsung-QN43LS03B/dp/B0B4V9FQDS/ref=asc_df_B0B4V9FQDS/?tag=googleshopp00-20&linkCode=df0&hvadid=379720128954&hvpos=&hvnetw=g&hvrand=12232758346380343954&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=1001729&hvtargid=pla-1841059313224&psc=1&mcid=9db7ae1d66ce3f81a412a508d03993e6",
    },
    {
      foto: "https://m.media-amazon.com/images/I/51GzD85tkxL._AC_SL1000_.jpg",
      title: "Cama Box Casal Perfect Umaflex",
      description: "R$ 1.899,00",
      link: "https://www.amazon.com.br/Cama-Box-Casal-Perfect-Umaflex/dp/B0C3KR491L/ref=asc_df_B0C3KR491L/?tag=googleshopp00-20&linkCode=df0&hvadid=647622510938&hvpos=&hvnetw=g&hvrand=7740019447258115451&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=1001729&hvtargid=pla-2202091652553&psc=1&mcid=254d701ec3e03bf290540e340558c772",
    },
    {
      foto: "https://product-hub-prd.madeiramadeira.com.br/868958/images/507b96aa-4121-4bec-99ef-4c30846f96b6linhogelo1696860971200zoom.jpg?width=700&canvas=1:1&bg-color=FFF",
      title: "Sofá Cama Retrátil e Reclinável 200cm Julia",
      description: "R$ 1.699,88",
      link: "https://www.madeiramadeira.com.br/sofa-cama-retratil-e-reclinavel-200cm-julia-868958.html?origem=pla-868958&utm_source=google&utm_medium=cpc&utm_content=sofa-retratil-5142&utm_term=&utm_id=17560363577&gad_source=1&gclid=CjwKCAiAuNGuBhAkEiwAGId4arPqZq4di459v0VK3phhekfKcWHpCCcXoRYWakXeBz0mPeRS9ptc3RoCTb8QAvD_BwE",
    },
    {
      foto: "https://m.media-amazon.com/images/I/71qT4lIC7cL._AC_SL1200_.jpg",
      title: "Sofá Retrátil e Reclinável 3 Lugares Suede Cinza",
      description: "R$ 2.149,00",
      link: "https://www.amazon.com.br/Retr%C3%A1til-Reclin%C3%A1vel-Lugares-Suede-Cinza/dp/B0BGVTL3X2/ref=asc_df_B0BGVTL3X2/?tag=googleshopp00-20&linkCode=df0&hvadid=647438380750&hvpos=&hvnetw=g&hvrand=8739803263044110091&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=1001729&hvtargid=pla-2264109306691&psc=1&mcid=20fe477f83aa3875ae8d8042ac850fb2",
    },
    {
      foto: "https://m.media-amazon.com/images/I/61G0nm+-tuL._AC_SL1500_.jpg",
      title: "Ferro de Passar Philips Walita Easyspeed Plus DST3010/32",
      description: "R$ 179,99",
      link: "https://www.amazon.com.br/PHILIPS-DST3010-32-Ferro-EcoPower/dp/B09GHLKBBZ/ref=asc_df_B09GHLKBBZ/?tag=googleshopp00-20&linkCode=df0&hvadid=379817891759&hvpos=&hvnetw=g&hvrand=1367586525661694519&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=1001729&hvtargid=pla-1529055327311&mcid=732c292512583aa7a744e805e4749ffe&th=1",
    },
    {
      foto: "https://m.media-amazon.com/images/I/61AjgTFEaRL._AC_SL1000_.jpg",
      title: "Jogo de Panelas Tramontina Alumínio Antiaderente 7 Peças",
      description: "R$ 413,30",
      link: "https://www.amazon.com.br/Tramontina-Alum%C3%ADnio-Revestimento-Antiaderente-Starflon/dp/B0CDR1SKHR/ref=asc_df_B0CDR1SKHR/?tag=googleshopp00-20&linkCode=df0&hvadid=647505722315&hvpos=&hvnetw=g&hvrand=7583489123641235927&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=1001729&hvtargid=pla-2206855884661&psc=1&mcid=d4262a6774a7312bac3737e94b9de4ce",
    },
    {
      foto: "https://m.media-amazon.com/images/I/81ubjq2DfxL._AC_SL1500_.jpg",
      title: "Panela de Pressão Tramontina Vancouver Alumínio 4,5 Litros",
      description: "R$ 189,91",
      link: "https://www.amazon.com.br/Tramontina-Vancouver-Alum%C3%ADnio-Revestimento-Antiaderente/dp/B0CD4SCM33/ref=asc_df_B0CD4SCM33/?tag=googleshopp00-20&linkCode=df0&hvadid=647429706147&hvpos=&hvnetw=g&hvrand=5549170002979248470&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=1001729&hvtargid=pla-2201893611338&mcid=d2e86ca0b4bc30358a5dc5573bbe2b22&th=1",
    },
    {
      foto: "https://m.media-amazon.com/images/I/51RKjJvDP8L._AC_SL1500_.jpg",
      title: "Jogo de Assadeiras Tramontina Alumínio Antiaderente 3 Peças",
      description: "R$ 173,70",
      link: "https://www.amazon.com.br/Assadeiras-Alum%C3%ADnio-Revestimento-Antiaderente-Tramontina/dp/B008R7SQ40/ref=asc_df_B008R7SQ40/?tag=googleshopp00-20&linkCode=df0&hvadid=379715626932&hvpos=&hvnetw=g&hvrand=16588126120752909019&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=1001729&hvtargid=pla-457736022201&mcid=09f9568ec2f1346e83434bc9729edf60&th=1",
    },
    {
      foto: "https://m.media-amazon.com/images/I/61EDp631OLL._AC_SL1000_.jpg",
      title: "Conjunto de Sobremesa Cancun 7 Peças Ruvolo",
      description: "R$ 159,90",
      link: "https://www.amazon.com.br/Conjunto-Sobremesa-Pe%C3%A7as-Cancun-Ruvolo/dp/B078BMGZ6J/ref=asc_df_B078BMGZ6J/?tag=googleshopp00-20&linkCode=df0&hvadid=379816330550&hvpos=&hvnetw=g&hvrand=12986771712994326610&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=1001729&hvtargid=pla-892441309864&psc=1&mcid=697cae12a9f83ff1a23b4fff901b2252",
    },
    {
      foto: "https://m.media-amazon.com/images/I/51X6C1aXaxL._AC_SL1000_.jpg",
      title: "Jogo de Assadeiras com Tampa de Vidro Marinex Alumínio 6 Peças",
      description: "R$ 146,88",
      link: "https://www.amazon.com.br/Assadeiras-Marinex-Pe%C3%A7as-Tampa-Vidro/dp/B082M6W4VX/ref=asc_df_B082M6W4VX/?tag=googleshopp00-20&linkCode=df0&hvadid=379727342281&hvpos=&hvnetw=g&hvrand=5081619589372033858&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=1001729&hvtargid=pla-896953145889&psc=1&mcid=2cd9f06494cc33a3a441149ff664f158",
    },
    {
      foto: "https://m.media-amazon.com/images/I/71wDXh0bvkL._AC_SL1500_.jpg",
      title: "Sanduicheira Elétrica Ondulada Electrolux",
      description: "R$ 199,90",
      link: "https://www.amazon.com.br/Sanduicheira-ondulada-el%C3%A9trico-Electrolux-antiaderente/dp/B0CCBYBPPQ/ref=asc_df_B0CCBYBPPQ/?tag=googleshopp00-20&linkCode=df0&hvadid=675730870792&hvpos=&hvnetw=g&hvrand=1728106102672376401&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=1001729&hvtargid=pla-2244241595902&mcid=d92cea5236f6353585a97e6af024134e&th=1",
    },
    {
      foto: "https://m.media-amazon.com/images/I/81gd5mHT2NL._AC_SL1500_.jpg",
      title: "Ventilador de Mesa Mondial Turbo 40cm VTX-40-8P 3 Velocidades",
      description: "R$ 189,90",
      link: "https://www.amazon.com.br/Ventilador-Turbo-Velocidades-Mondial-VTX-40-8P/dp/B07YL7P5XY/ref=asc_df_B07YL7P5XY/?tag=googleshopp00-20&linkCode=df0&hvadid=379720649038&hvpos=&hvnetw=g&hvrand=13667427652532073244&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=1001729&hvtargid=pla-847430805973&mcid=4c0e5a5deddb3dfdaed909c16ade05bf&th=1",
    },
    {
      foto: "https://m.media-amazon.com/images/I/31KedS5l8NL._AC_SL1000_.jpg",
      title: "Aspirador de Pó Vertical Electrolux",
      description: "R$ 219,90",
      link: "https://www.amazon.com.br/Aspirador-vertical-com-STK12-127V/dp/B08SBLCFB3/ref=asc_df_B08SBLCFB3/?tag=googleshopp00-20&linkCode=df0&hvadid=379725476635&hvpos=&hvnetw=g&hvrand=10569202923120223327&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=1001729&hvtargid=pla-1286515127230&mcid=07712927be0e3c1bac6c7beed75472f0&th=1",
    },
    {
      foto: "https://m.media-amazon.com/images/I/41nMVp8b13S._SL1000_.jpg",
      title: "Filtro de Água PURIFICADOR DE ÁGUA PURE4X PE12G BIVOLT",
      description: "R$ 599,00",
      link: "https://www.amazon.com.br/PURIFICADOR-%C3%81GUA-PURE4X-PE12G-BIVOLT/dp/B08X5Z81LK/ref=asc_df_B08X66RQ48/?tag=googleshopp00-20&linkCode=df0&hvadid=457277241281&hvpos=&hvnetw=g&hvrand=835743660782390111&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=1001729&hvtargid=pla-1188621312704&mcid=5a1a0394a62833f99192eabcd17f6a62&th=1",
    },
  ]);

  // useEffect(() => {
  //   const starCountRef = ref(db, "posts/");
  //   onValue(starCountRef, (snapshot) => {
  //     const data = snapshot.val();
  //     let arr = Object.keys(data).map((k) => data[k]);
  //     setPosts(
  //       arr.sort(function (a, b) {
  //         return a.datetime < b.datetime ? 1 : a.datetime > b.datetime ? -1 : 0;
  //       })
  //     );
  //   });
  // }, []);

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

            <p>
              Preparamos esta lista de presentes, sintam-se à vontade para nos
              presentearem da forma que acharem melhor e mais viável. Essa lista
              é apenas uma sugestão!
            </p>

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
                description={post.description}
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
