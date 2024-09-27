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
      foto: "https://m.media-amazon.com/images/I/711d1QmQM4L._AC_SL1500_.jpg",
      title: "Pillow Top",
      description: "R$ 599,00",
      link: "https://www.amazon.com.br/Pillow-Toque-Pluma-Casal-espessura/dp/B0C47C86RR/ref=asc_df_B0C47C86RR/?tag=googleshopp00-20&linkCode=df0&hvadid=647426883978&hvpos=&hvnetw=g&hvrand=12473129598056628829&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=9100335&hvtargid=pla-2204922063812&psc=1&mcid=24747e5b522c34a78a411ceac5ee95e8#customerReviews",
    },
    {
      title: 'Organizador de Geladeira',
      foto: "https://m.media-amazon.com/images/I/51Pvq4I-mIL._AC_SL1200_.jpg",
      url: 'https://www.amazon.com.br/Organizadores-Geladeira-Arm%C3%A1rio-Alimentos-Vegetais/dp/B0C2JML33J/ref=sr_1_1_sspa?__mk_pt_BR=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=AVJYIOB5HZG8&dib=eyJ2IjoiMSJ9.COrtzoLKnSQibkZbNHEnUiy-8Ox10RfGqMNqQFaZeTALSyd_ggflQykIRUAhJc-sv3ykILr8ay_dtEcxZqOPlJsZAKLutjGvcJIOcjO6aLhiEWAaghnR3C9APmeD-a5cFQapJLLdWRj47oX_f6asQkdlAZC18M3k4jZlTbaW1KYdXTZxpvcB8Lz9iSGPtSVo9S3iEIigIu4uSWsXQ0Z0Ew9mVhXXcnYWO60GCutUrLcjvWGpXK6V2IbvkGakgI9kwN6UeBMPTUo3lKOZ3NpAUFMklTOYvpWcFUfaoJ9icpc.EoqncnFjJ8S8-kpwS71jbb2SY-oqcMM0VK_mOCJWb54&dib_tag=se&keywords=organizador+de+geladeira&qid=1725851039&sprefix=organizador+de+geladei%2Caps%2C189&sr=8-1-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&psc=1'
    },
    {
      title: 'Pote Hermetico',
      foto: "https://m.media-amazon.com/images/I/519ZH-Fhc1L._AC_SL1000_.jpg",
      url: 'https://www.amazon.com.br/Kit-Potes-Herm%C3%A9ticos-Pl%C3%A1stico-Electrolux/dp/B09XJL4B9H/ref=sr_1_5?__mk_pt_BR=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=3K29RQXDY2KJT&dib=eyJ2IjoiMSJ9.AXSNal2bQPawx3ZbYkw93QTF1bnKnEhqB_oWd-rl3ssa_Eqipo35VIh8XctXl9VMV9E6F6ucKcen8gyj-SGk1zDnPqn8W1YCWj85wAjsISHcaP8sGfKlXUv0hrm7ES7MxI8_w9y7-XXAo3jxaNSZDWkyYd0cc39CYUscHv97EVxRLWv5Rns1FfTr9hu0iugH1xan50yWIRJhxxYkP7S5scBD4O_pt86IqAxo6wt72bdSC_3kdlGH8MMGRlG58EC7ze_UalQy_uhmSbjQp2FeE89jvwALi1BRDKLZ1mxm6Kw.WNb_2Xoc20JOzAlohyFrhUNaTJb-L03NMi0ukFoj3Zk&dib_tag=se&keywords=pote%2Bhermetico&qid=1725850993&sprefix=pote%2Bhermeti%2Caps%2C193&sr=8-5&ufe=app_do%3Aamzn1.fos.6d798eae-cadf-45de-946a-f477d47705b9&th=1'
    },
    {
      title: 'Kit travesseiro',
      foto: "https://m.media-amazon.com/images/I/61M5fjeKWpL._AC_SL1200_.jpg",
      url: 'https://www.amazon.com.br/Kit-Travesseiro-Pe%C3%A7as-Percal-Fios/dp/B076PL3G89/ref=sr_1_8?__mk_pt_BR=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=3MJSWAHKLZ84X&dib=eyJ2IjoiMSJ9.NfB5YYfMeABq-AG_IWfrajpxlPIkJtGYgzX1Yvk2d2_DaTDsbXWrIh_fQbVcjfljZdKYrAokHXcE6_Io3fAdBbGg9v7YbEv8KCof70_7wFttu_-buwJDmmqY1hifRRiX0n4s00B6YhVyE7iBMnS--mKQLFTEnrlRQnvPLPGuZCvT7oUiMA3jtkluMOAQHx3tfdOlQK4WTn265a0PIaEsyjzTUb2cmDAjEoupQN3GILarHJBUji9U7ywJpQEi-SxcxMj3skyEUmU2SSFPIikY7wMcwzB8aWSzTtTfeUcnJ7k.C3TlHPNSsVL_VGSmvR76SYvim-mfeE6OIk78urW1o9E&dib_tag=se&keywords=kit+travesseiro&qid=1725851140&sprefix=kit+travesse%2Caps%2C193&sr=8-8&ufe=app_do%3Aamzn1.fos.a492fd4a-f54d-4e8d-8c31-35e0a04ce61e'
    },
    {
      title: 'Toalhas de banho',
      foto: "https://a-static.mlcdn.com.br/800x560/jogo-de-toalhas-banhao-gigante-karsten-lumina-4-pecas-fio-penteado-emcompre/emcompre/330724/2f82e25386eece9a06b153ba3d895d05.jpeg",
      url: 'https://www.magazineluiza.com.br/jogo-de-toalhas-banhao-gigante-karsten-lumina-4-pecas-fio-penteado-emcompre/p/ja4hb89a5a/cm/joto/?partner_id=64068&utm_source=pdp&utm_medium=share'
    },
    {
      title: 'Toalhas de rosto',
      foto: "https://m.media-amazon.com/images/I/71Pf-BNFE6L._AC_SL1000_.jpg",
      url: 'https://www.amazon.com.br/pe%C3%A7as-Toalha-Lavabo-Buddemeyer-Vision/dp/B0CVL6RWMF/ref=sr_1_45?__mk_pt_BR=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=147GBJBAD2DXY&dib=eyJ2IjoiMSJ9.wWdA7icKAyWtteVSKkS0b4dji-Ldo5zpZ_xbmKThzrqZkjGpP7xh3IBHBHshybUQsxTaF80mNX3-QENxG2bg22fFaLoN12vrpDxCobZ_Sxu-mtqddzcVkTEO9i81QB_sxSu68lIgxcBgLbIjFbA_iP0awgGVlhmUwNIxZZtkmi0kx_9nRPf2RQx-UJ-tPj6mH1_6SBu7lebm7QlfIXzWzLUqOP8JPbL_atuMj6nqOaN1zQprwG7J-Rj7OjJO35PwlpLkTbd-nVDrMmsiT-VGggLHVSIMHPyDoG1D8muC_3c.nRQFwKzZOzp9ubaSjEJqSbQz5oc5sFmVx5Oy5dcOi5E&dib_tag=se&keywords=toalha+de+banho&qid=1725851241&sprefix=toalhas+de+ban%2Caps%2C195&sr=8-45&ufe=app_do%3Aamzn1.fos.a492fd4a-f54d-4e8d-8c31-35e0a04ce61e'
    },
    {
      title: 'Tapetes de banheiro',
      foto: "https://m.media-amazon.com/images/I/61afNMVaijL._AC_SL1200_.jpg",
      url: 'https://www.amazon.com.br/Tapetes-Banheiro-Antiderrapante-Emborrachado-60x40cm/dp/B0CLQ336QR/ref=sr_1_9?__mk_pt_BR=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=1MBHB1RN9U6U5&dib=eyJ2IjoiMSJ9.qwojgIc1L4s_4aH40vHgzY_KJCifGovO5eu_97LxcHGpub_cnw-m_9BzAM8zl_S_xLexH8z6TIaifUIJuq4dSXczqQ4RyXdIKDybDGWIWh1P-ykHBae3wg05aUxfFIe11VIWqdYgnhm_Jimyv91UUtelh0HVle49qSmKVxitLPcR0ySsEFAayLfLsNt0A0JuoQawbIKn701LkYWORSxkzY3BL0aDP5GCoi5fyAj_tNPUrJKQF8zJNrVhNIAtgsCHSL314ZxWscJABQ8GxMS395bz75xNw74yKIDdfrg8588.cxWHEW5YxTS5eZPaway0l60TrOT7gB_BlhzVQQ9-8ug&dib_tag=se&keywords=tapete+de+banheiro&qid=1725851176&sprefix=tapetes+de+banhei%2Caps%2C192&sr=8-9'
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
