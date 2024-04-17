package oslomet.oblig3data1700;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class BillettRepository {
    @Autowired
    private JdbcTemplate db;

    public void lagreBillett(Billett bill){
        String statement= "INSERT INTO BillettDB (film, antall, fornavn, etternavn, telefonnr, epost) Values(?,?,?,?,?,?)";
        db.update(statement, bill.getFilm(),bill.getAntall(), bill.getFornavn(), bill.getEtternavn(), bill.getTelefonnr(), bill.getEpost());
    }


    public List<Billett> hentAlleBilletter(){
        String statement= "SELECT * FROM BillettDB ORDER BY etternavn";
        List<Billett> alleBilletter = db.query(statement, new BeanPropertyRowMapper(Billett.class));
        return alleBilletter;
    }

    public void slettAlleBilletter(){
        String statement= "DELETE FROM BillettDB";
        db.update(statement);
    }
}