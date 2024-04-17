package oslomet.oblig3data1700;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

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

    @GetMapping("/getData")
    public List<Billett> getBilletter() {
        return rep.hentAlleBilletter();
    }

    @GetMapping("/clearData")
    public void slettBilletter(){
        rep.slettAlleBilletter();
    }
}