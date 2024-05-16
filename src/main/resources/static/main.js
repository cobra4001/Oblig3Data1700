const Film = document.getElementById("Film");
const Antall = document.getElementById("Antall");
const Fornavn = document.getElementById("Fornavn");
const Etternavn = document.getElementById("Etternavn");
const Telefonnr = document.getElementById("Telefonnr");
const Epost = document.getElementById("Epost");
const table = document.getElementById("billett-table-body")
const Form = document.getElementById("Form")
Form.addEventListener("submit", async (e) => {
    e.preventDefault();
    o = 0;
    await validateInputs();
    if (o === 1) {
        console.log("Vi hadde en error");
    } else{
        const Listen = {
            film : Film.value ,
            antall : Antall.value ,
            fornavn : Fornavn.value ,
            etternavn : Etternavn.value,
            telefonnr : Telefonnr.value ,
            epost : Epost.value

        }
// Legge til Update og delete per billett
        try {
            await postrequest(Listen);
        }catch (error){
            console.log("Try post request ", error);
        }


    }
    try {
       let post  = await getrequest();

            await formknapper(post);



    }catch (error){
        console.log("Try get request ", error);
    }

});

document.getElementById("button").onclick = async function() {
    try {
        await getclear();
    }catch (error){
        console.log("Try clear request ", error);
    }
    console.log("Knapp klikket for slettbutton");

}


const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector(".error");

    errorDisplay.innerText = message;
    inputControl.classList.add("error");
    inputControl.classList.remove("success");
};

const setSuccess = (element) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector(".error");

    errorDisplay.innerText = "";
    inputControl.classList.add("success");
    inputControl.classList.remove("error");
};


const isValidEmail = (Epost) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(Epost).toLowerCase());
};

const isValidTelefonnr = (Telefonnr) => {
    const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    return re.test(String(Telefonnr).toLowerCase());
};

const isValidFornavn = (Fornavn) => {
    const re = /^[a-zA-Z ]+$/;
    return re.test(String(Fornavn).toLowerCase());
};
const isValidEtternavn = (Etternavn) => {
    const re = /^[a-zA-Z ]+$/;
    return re.test(String(Etternavn).toLowerCase());
};
let o = 0;

const validateInputs = async () => {

    const AntallValue = Antall.value.trim();
    const FornavnValue = Fornavn.value.trim();
    const EtternavnValue = Etternavn.value.trim();
    const TelefonnrValue = Telefonnr.value.trim();
    const EpostValue = Epost.value.trim();


    if (Film.value === "Velg film") {
        setError(Film, "Du må velge film");
        o = 1;
    } else {
        setSuccess(Film);
    }


    if (AntallValue === "") {
        setError(Antall, "Du må velge antall");
        o = 1;
    } else {
        setSuccess(Antall);
    }

    if (FornavnValue === "") {
        setError(Fornavn, "Du må skrive inn et fornavn");
        o = 1;
    } else if (!isValidFornavn(FornavnValue)) {
        o = 1
        setError(Fornavn, "Skriv inn et gyldig fornavn")
    } else {
        setSuccess(Fornavn);
    }

    if (EtternavnValue === "") {
        setError(Etternavn, "Du må skrive inn et etternavn");
        o = 1;
    } else if (!isValidEtternavn(EtternavnValue)) {
        setError(Etternavn, "Skriv inn et gyldig Etternavn")
        o = 1;
    } else {
        setSuccess(Etternavn);
    }

    if (TelefonnrValue === "") {
        setError(Telefonnr, "Skriv inn et telefonnr");
        o = 1;
    } else if (!isValidTelefonnr(TelefonnrValue)) {
        setError(Telefonnr, "Skriv inn et gyldig telefonnr +4790235323")
        o = 1;
    } else {
        setSuccess(Telefonnr);
    }

    if (EpostValue === "") {
        setError(Epost, "Epost er nødvendig");
        o = 1;
    } else if (!isValidEmail(EpostValue)) {
        setError(Epost, "Skriv inn en gyldig Epost adresse");
        o = 1;
    } else {
        setSuccess(Epost);
    }


}
function postrequest(post) {
    return new Promise(function(resolve, reject) {
        let xhttp = new XMLHttpRequest();
        xhttp.open("POST", "/lagreData", true);
        xhttp.setRequestHeader("Content-Type", "application/json")
        xhttp.onreadystatechange = function() {
            if( xhttp.readyState===4 ){
                if (xhttp.status===200){
                    document.getElementById("Form").reset();
                    console.log("Data lagret")
                    resolve()
                } else{
                    console.error("Data ikke lagret ")
                    reject(xhttp.status)

                }
            }


        }
        xhttp.send(JSON.stringify(post));

    })

}


function getrequest() {
    return new Promise(function(resolve, reject) {
        let xhttp = new XMLHttpRequest();
        xhttp.open("GET", "/getData", true);
        xhttp.onreadystatechange = function() {
            if( xhttp.readyState===4 ){
                if (xhttp.status===200){
                    let post = JSON.parse(xhttp.responseText);
                    console.log("Getrequest fikk data")
                    let billett = "";
                    for (let i = 0; i < post.length ; i++) {
                        billett += `
                    <tr>
                        <form id="opp${post[i].id}">
                           
                            <td> ${post[i].id}</td>
                            <td> 
                                <select>
                                 `

                        if(post[i].film === 'Grusomme meg 2'){
                            billett+=`
                                <option value='Grusomme meg 2' selected>Grusomme meg 2</option>
                                <option value='Rebel Moon'>Rebel Moon</option>
                                <option value='Dune'>Dune</option>
                        
                            `

                        } else if(post[i].film === 'Rebel Moon'){
                            billett+=`
                                 <option value='Grusomme meg 2'>Grusomme meg 2</option>
                                 <option value='Rebel Moon' selected>Rebel Moon</option>
                                 <option value='Dune'>Dune</option>
                            `

                        } else if(post[i].film === 'Dune'){
                          billett+=`
                                <option value='Grusomme meg 2'>Grusomme meg 2</option>
                                <option value='Rebel Moon'>Rebel Moon</option>
                                <option value='Dune' selected>Dune</option>
                          
                          
                          `
                        } else{
                            console.log("Blobfish")
                        }

                        billett+=`                               
                                </select>
                            </td>
                            <td> <input type="number" min="1" value = "${post[i].antall}"/></td>
                            <td> <input type ="text" value = "${post[i].fornavn}"/></td>
                            <td> <input type ="text" value = "${post[i].etternavn}"/></td>
                            <td> <input type ="tel" maxlength="11" value = "${post[i].telefonnr}"/></td>
                            <td> <input type ="email" value = "${post[i].epost}"/></td>
                            
                            <button type="submit" value="oppdater" >
                            
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-clockwise" viewBox="0 0 16 16">
                                  <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z"/>
                                  <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466"/>
                                </svg>
                            
                            </button>
                        
                            <button type="submit" value="slett" >
                              
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                                     <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
                                  </svg>
                            </button>
                       
                        </form>    
                        
                    </tr>
                    `
                    }
                    if(post && post.length > 0){
                        console.log("Post returned data", post)
                        table.innerHTML = billett;

                        resolve(post)
                    } else{
                        console.log("Post returned null", post);
                        reject(post)
                    }


                } else{
                    console.error("Data ikke lagret ", xhttp.status)
                    reject(xhttp.status)
                }
            }

        }
        xhttp.send();
    })

}

function oppdatereBillett() {

    return new Promise(function(resolve, reject) {
        let xhttp = new XMLHttpRequest();
        xhttp.open("PUT", "/oppdatereBillett", true);
        xhttp.onreadystatechange = function() {
            if( xhttp.readyState===4 ){
                if (xhttp.status===200){
                let post = JSON.parse(xhttp.responseText);
                document.getElementById("billett-table-body").innerHTML = "";
                    let billett = "";
                   console.log("Test oppdater billett")
                    if(post && post.length > 0){
                        console.log("Post returned data", post)
                        table.innerHTML = billett;
                        resolve(post)
                    } else{
                        console.log("Post returned null", post);
                        reject(post)
                    }


                } else{
                    console.error("Data ikke lagret ", xhttp.status)
                    reject(xhttp.status)
                }


            }



        }
        xhttp.send();


    })

}
function slettenBillett(){
    return new Promise(function(resolve, reject) {
        let xhttp = new XMLHttpRequest();
        xhttp.open("DELETE", "/clearBillett", true);
        xhttp.onreadystatechange = function() {
            if( xhttp.readyState===4 ){
                if (xhttp.status===200){
                    console.log("Data slettet");
                    resolve()
                } else{
                    console.error("Data ikke slettet ");
                    reject(xhttp.status)
                }
            }

        }
        xhttp.send()
    })
}



function getclear() {
    return new Promise(function(resolve, reject) {
        let xhttp = new XMLHttpRequest();
        xhttp.open("DELETE", "/clearData", true);
        xhttp.onreadystatechange = function() {
            if( xhttp.readyState===4 ){
                if (xhttp.status===200){
                    table.innerHTML = "";
                    console.log("Data slettet");
                    resolve()
                } else{
                    console.error("Data ikke slettet ");
                    reject(xhttp.status)
                }
            }

        }
        xhttp.send()
    })
}

async function formknapper(post){

    for (let i = 0; i < post.length ; i++) {
        try{
            document.getElementById("opp"+post[i].id).addEventListener("submit", function(event){
            console.log("AaaSDSAD")

            });

            document.getElementById("opp"+post[i].id).addEventListener("submit", function(event){
                event.preventDefault();
                console.log("Error prevent")

            });



        } catch(e){
        console.log("FEIL", e)

        }
        /*
        document.getElementById("opp"+post[i].id).addEventListener("submit", function(event){
            console.log("DSADSADSA")
            event.preventDefault();
            console.log("AAAA")
            const data = new FormData(this);
            const action = event.submitter.value;
            if(action === "oppdater"){
                console.log("Oppdater")


            } else if(action === "slett"){

                console.log("Slett")

            } else{
                console.log("Eror kunne ikke finne action")

            }

        })
*/
    }


}
