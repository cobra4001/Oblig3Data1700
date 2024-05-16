package oslomet.oblig3data1700;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;


@RestController
public class IndexController {

    @Autowired
    private BillettRepository rep;

    @PostMapping("/lagreData")
    public void lagreBilletter(@RequestBody Billett data){
        rep.lagreBillett(data);
    }



    @PutMapping("/oppdatereBillett")
    public List<Billett> oppdatereBilletter(@RequestBody Billett oppdater) {
        rep.oppdaterbillett(oppdater);
        return rep.hentAlleBilletter();

    }



    @GetMapping("/getData")
    public List<Billett> getBilletter() {
        return rep.hentAlleBilletter();
    }


    @DeleteMapping("/clearBillett")
    public void slettBillett(@RequestBody int slett){
        rep.slettBillett(slett);
    }




    @DeleteMapping("/clearData")
    public void slettBilletter(){
        rep.slettAlleBilletter();
    }


}

