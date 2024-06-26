package oslomet.oblig3data1700;

public class Billett {
    private String film;
    private Integer antall;
    private String fornavn;
    private String etternavn;
    private String telefonnr;
    private String epost;

    private int id;

    public Billett(String film, Integer antall, String fornavn, String etternavn, String telefonnr, String epost, int id) {
        this.film = film;
        this.antall = antall;
        this.fornavn = fornavn;
        this.etternavn = etternavn;
        this.telefonnr = telefonnr;
        this.epost = epost;
        this.id = id;
    }

    public Billett() {
    }
    public String getFilm() {
        return film;
    }

    public Integer getAntall() {
        return antall;
    }

    public String getFornavn() {
        return fornavn;
    }

    public String getEtternavn() {
        return etternavn;
    }

    public String getTelefonnr() {
        return telefonnr;
    }

    public String getEpost() {
        return epost;
    }

    public Integer getId() {return id;}

    public void setFilm(String film) {
        this.film = film;
    }

    public void setAntall(Integer antall) {
        this.antall = antall;
    }

    public void setFornavn(String fornavn) {
        this.fornavn = fornavn;
    }

    public void setEtternavn(String etternavn) {
        this.etternavn = etternavn;
    }

    public void setTelefonnr(String telefonnr) {
        this.telefonnr = telefonnr;
    }

    public void setEpost(String epost) {
        this.epost = epost;
    }

    public void setId(int id) {
        this.id = id;
    }
}