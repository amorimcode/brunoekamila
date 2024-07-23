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
      foto: "https://m.media-amazon.com/images/I/61G0nm+-tuL._AC_SL1500_.jpg",
      title: "Ferro de Passar Philips Walita Easyspeed Plus DST3010/32",
      description: "R$ 179,99",
      link: "https://www.amazon.com.br/PHILIPS-DST3010-32-Ferro-EcoPower/dp/B09GHLKBBZ/ref=asc_df_B09GHLKBBZ/?tag=googleshopp00-20&linkCode=df0&hvadid=379817891759&hvpos=&hvnetw=g&hvrand=1367586525661694519&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=1001729&hvtargid=pla-1529055327311&mcid=732c292512583aa7a744e805e4749ffe&th=1",
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
      foto: "https://m.media-amazon.com/images/I/61a64NePxQS._AC_SL1200_.jpg",
      title: 'Escorredor de Louças',
      url: 'https://www.amazon.com.br/Escorredor-Pratos-Porta-Talheres-Inox/dp/B0786TZMTH/ref=asc_df_B0786TZMTH/?tag=googleshopp00-20&linkCode=df0&hvadid=379816330550&hvpos=&hvnetw=g&hvrand=6923050339492184368&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=9100335&hvtargid=pla-815190436292&psc=1&mcid=69ff8567da3d38aa97885ed15a6dc52a'
    },
    {
      title: 'Organizador de Geladeira',
      foto: "https://m.media-amazon.com/images/I/51Pvq4I-mIL._AC_SL1200_.jpg",
      url: 'https://www.amazon.com.br/KIT-C-2-Organizadores-Geladeira/dp/B09R5RYL7X/ref=asc_df_B09R5RYL7X/?tag=googleshopp00-20&linkCode=df0&hvadid=557926986208&hvpos=&hvnetw=g&hvrand=14598484904077665038&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=1001729&hvtargid=pla-1646371101982&psc=1&mcid=43353e189cbe3704846d62d6e78d73ac'
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
      title: 'Cabides de madeira maciça',
      foto: "https://m.media-amazon.com/images/I/81LnYLK5v+L._AC_SL1500_.jpg",
      url: 'https://www.amazon.com.br/Cabides-para-Terno-Madeira-S%C3%B3lida/dp/B09RQ1X9DG/ref=asc_df_B09RQ1X9DG/?tag=googleshopp00-20&linkCode=df0&hvadid=379725476299&hvpos=&hvnetw=g&hvrand=10520428875965645672&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=1001729&hvtargid=pla-1637394179166&psc=1&mcid=c4140f3161383c88aa109c199b92f51a'
    },
    {
      title: 'Cesto de roupas',
      foto: "https://m.media-amazon.com/images/I/71VkDPv0+XL._AC_SL1500_.jpg",
      url: 'https://www.amazon.com.br/Redondo-Retangular-Banheiro-Lavanderia-Forrado/dp/B0D1RSVW1W/ref=asc_df_B0D1RKSBM6/?tag=googleshopp00-20&linkCode=df0&hvadid=647405851320&hvpos=&hvnetw=g&hvrand=4601906378263327794&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=1001729&hvtargid=pla-2300348620495&mcid=ba6834265c3b372999d79890a19135bb&t'
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
      title: 'Espelho',
      foto: "https://m.media-amazon.com/images/I/31w+giSwHaL._AC_SL1000_.jpg",
      url: 'https://www.amazon.com.br/Espelho-Pinterest-Org%C3%A2nico-Industrial-60x110cm/dp/B0CSLCRCXS/ref=sr_1_2?dib=eyJ2IjoiMSJ9.z9UPutrfnYC69BceKt1hGlA0-erLwU4PG7_5R4xyslKvt7yYcci4IKluyVLN-umtPVWTPfBZqwNXfPoGzLWCPyxZbjvJ3Amp591NZqmH3erIVFDgpBMfpIhIFVQj8_cuMaR8bDKk_dro3oGqcNG4EnRnooaOnrGDPnoYt_grry0f6bPGUPlPb-_H0vhlzEC0_AhTu8bJ6vmEbhzCSo-G64MrA790OSpvGKGe3ABSzPvjwZYXXDZ046tR6dLAPS5ejmlM3FEAm7EigmVSfR39Q2hk9vpyCLo3dnZZmVxvs_c.-NH7HG20EU9ST7cexnIuYpv1qKgVo0_EZdGqid90KVo&dib_tag=se&keywords=casa%2Bdomo%2Bespelho&qid=1719350386&sr=8-2&ufe=app_do%3Aamzn1.fos.4bb5663b-6f7d-4772-84fa-7c7f565ec65b&th=1'
    },
    {
      title: 'Jarra de vidro',
      foto: "https://m.media-amazon.com/images/I/715sQGCzGjL._AC_SL1500_.jpg",
      url: 'https://www.amazon.com.br/Wincy-Jarra-Vidro-Cromada-VDA11046/dp/B09R82XT4V/ref=sr_1_5?crid=3MVF5K234Y84H&dib=eyJ2IjoiMSJ9.CDcFHWOl6RBdXivbiVLZnSrGo4JXO6oOA5UbCjzR4XVDdvvAXcXHnS_iuEuZWo373mvsqbJJCLanNPLTD-ksQx7R3v5Ets1kmfci1mwkv-WxyxJPRV0l0F0nEpTXSI5G34hUZVvQfzNBmWm8mN57EEDJ5bEkqZEGMB0WtLW9YSV5Y0oTi-89QfqlroLMqI_XpY9dst8YLKDuaN2RppVktxLzK8amhG58VF3xUxE7kBhJq7pYIKmt5UrE3o2asZE6Qcfb8WPG_-uStR5uvvAFHEb9OyEEhBGlCfaPAO-znBM.KnImSz_5PxGqsw2NoT3P4yiTuWzjFcjHlwojuAdxo2k&dib_tag=se&keywords=jarra+de+suco&qid=1719350475&sprefix=jarro+%2Caps%2C190&sr=8-5'
    },
    {
      title: 'Tabua de cortar',
      foto: "https://m.media-amazon.com/images/I/61P1w5oCmzL._AC_SL1200_.jpg",
      url: 'https://www.amazon.com.br/T%C3%A1buas-Teca-Suporte-Organizador-Stolf/dp/B08VRP737Y/ref=asc_df_B08VRP737Y/?tag=googleshopp00-20&linkCode=df0&hvadid=405263819486&hvpos=&hvnetw=g&hvrand=8393475656483584909&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=1001729&hvtargid=pla-1209365709496&psc=1&mcid=06b367fa4bc734f7b6ebddc223e4dbff'
    },
    {
      title: 'Mixer',
      foto: "https://m.media-amazon.com/images/I/711xy6JhdXL._AC_SL1500_.jpg",
      url: 'https://www.amazon.com.br/Electrolux-4011AHBR407-Mixer-EIB10/dp/B09B2M8N4T/ref=asc_df_B09B2M8N4T/?tag=googleshopp00-20&linkCode=df0&hvadid=455483639906&hvpos=&hvnetw=g&hvrand=17852786299648926179&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=1001729&hvtargid=pla-1416833357664&mcid=3fb019560064391ab1a1d5365c365039&th=1'
    },
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
