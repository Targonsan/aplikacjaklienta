var express = require('express');
const zleceniaModels=require('../models/zlecenia');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  const dane= {
    charkater:false,
    forma_wspol:false,
    cel_badans:false,
    badania_niepews:false,
    badania_tolers:false

  }
    res.render('zlecenia2',{title:'Dodaj zlecenie',body:{},errors:{},dane})
});
function isPayed(data){
    if(data==='tak') return true;
    else return false;
  
  }
router.post('/',(req,res)=>{
  // console.log(req.body);
    const body=req.body;
    // console.log(body)
    // console.log(body);
    // funkcja sprawdzajaca co się podało w formualrzu w radio buttons
    // console.log(body.oplacono,'to co wykonało się w body.oplacono');
    
    const charakter=isPayed(body.char_zlecenia)
    const forma_wspol=isPayed(body.form_wspolpracy)
    const cel_badans=isPayed(body.cel_badan)
    const badania_niepews=isPayed(body.badania_niepew)
    const badania_tolers=isPayed(body.badania_toler)
    const dane= {
      charkater:charakter,
      forma_wspol:forma_wspol,
      cel_badans:cel_badans,
      badania_niepews:badania_niepews,
      badania_tolers:badania_tolers

    }
    console.log("co to jest charkter "+ body.char_zlecenia);
    console.log( 'co kryje zmienna charkater ? '+dane.charkater);
    console.log( 'co kryje zmienna forma_wspol ? '+dane.forma_wspol);
    console.log( 'co kryje zmienna  cel_badans? '+dane.cel_badans);
    console.log( 'co kryje zmienna badania_niepews? '+dane.badania_niepews);
    console.log( 'co kryje zmienna badania_tolers? '+dane.badania_tolers);
    // console.log(Radio_button);
    // const cena_net=body.c_brutto -  vat;
    // console.log("vat: ",vat,' cena netto: ',cena_net );
  // wykonywanie zapisu do naszej bazy danej 
    const zlecenieData=new zleceniaModels({
      
        nazwa_firmy:body.nazwa_firmy ,
        adres: body.adres_firmy,
        nip:body.nip_firmy,

        imieINazwisko:body.dane_przedstawiciela,
        nrTel_firmy:body.nr_tel_firmy,
        adresMailowyFirmy:body.adres_mail_firmy,
        adresMailowyFaktura:body.adres_mail_faktura,
        AdresFizycznyFaktura:body.adres_fizyczny_faktura,
        
        adresPlatnik:body.Adres_platnik,
        imieINazwiskoPlatnik:body.Dane_platnik,
        nrTel_Platnik:body.nr_tel_platnik,
        adresMailowyPlatnik:body.adres_mail_platnik,

        charakter_zlecenia:charakter,
        Forma_wspolpracy:forma_wspol,
        cel_badan:cel_badans,
        wynik_badan_niepewnosc:badania_niepews,
        wynik_badan_tolerancja:badania_tolers,
        Obiekt_bada:body.obiekt_badan,
        info_dodatkowe:body.dodatkowe_informacje
      // oznaczenie_wejsciowe:body.ozn_wejscia,
      // zlecajacy:body.zlecajacy,
      // nr_swiadectwa:body.nr_swiadectwa,
      // data_otrzymania:body.d_otrzymania,
      // platnik_nazwa:body.platnik_nazwa,
      // data_zlecenia:body.d_zlecenia,
      // data_wyk_swiadectwa:body.d_wyk_swiadectwa,
      // oplacono:Radio_button,
      // cena_brutto:body.c_brutto,
      // cena_netto:cena_net,
      // vat:vat,
      // email:body.adres_mail,
      // storyOfEdit:''
  
    });
    // ewentualne błędy w wvalidacji danych !

   const errors = zlecenieData.validateSync();
   
    zlecenieData.save((err)=>{
      // console.log(err);
      if(err){
        
        res.render('zlecenia2',{title:'Dodaj zlecenie',errors,body,dane});
        return;
      }
      res.redirect('/news/przeslano')
    });
  })
  router.get('/przeslano', function(req, res) {
   
      res.render('index',{title:'Przesłano twoje zlecenie poprawnie',})
  });

module.exports = router;







