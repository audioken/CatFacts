// Hämta referenser till knappar och DOM-element
let btnFact = document.getElementById("btnFact"); // Knapp för att hämta en enda faktatext
let btnFacts = document.getElementById("btnFacts"); // Knapp för att hämta flera fakta
let btnColors = document.getElementById("btnColors"); // Aktivera färger

let facts = document.getElementById("facts"); // Lista där flera fakta ska visas
let fact = document.getElementById("fact"); // Header där en enskild faktatext ska visas

let isColorsActivated = false;

// BUTTON 1
// Hämtar en enda faktatext om katter via API
btnFact.addEventListener('click', async () => { 
    
    try{

        const url = 'https://catfact.ninja/fact'; // API för att hämta en slumpmässig faktatext
        const data = await fetch(url); // Skicka begäran till API:et
        const response = await data.json(); // Omvandla svaret till JSON

        fact.style.visibility="visible";

        fact.style.display = "block";
        facts.style.display = "none";

        if (isColorsActivated){

            fact.style.color = "black";

            // Slumpa en färg
            const randomColor = `rgb( 
            ${Math.floor(Math.random() * 256)}, 
            ${Math.floor(Math.random() * 256)}, 
            ${Math.floor(Math.random() * 256)})`;

            // Använd slumpad färg som bakgrund för faktan
            fact.style.backgroundColor = randomColor;
        }
        else{
            fact.style.backgroundColor = `rgba(211,82,82,0.267)`;
            fact.style.color = `rgb(165,42,42)`;
        }

        // Visa faktan i headern
        fact.textContent = response.fact;

    } catch (error) {
    console.error('Fel vid hämtning:', error);
    alert('Det gick inte att hämta fakta. Försök igen senare.');
    };
});

// BUTTON 2
// Hämtar flera (max 5) fakta om katter via API
btnFacts.addEventListener('click', async () => { 
    
    try{

        const url = 'https://catfact.ninja/facts?limit=5'; // API med 'limit'-parameter för att begränsa till 5 fakta
        const data = await fetch(url); // Skicka begäran till API:et
        const response = await data.json(); // Omvandla svaret till JSON

        facts.style.visibility="visible";

        fact.style.display = "none";
        facts.style.display = "block";
        
        // Denna var enklare, men är den lika effektiv?
        facts.textContent = "";

        // Iterera genom arrayen av fakta och lägg till dem i listan
        response.data.forEach(fact => {

            const li = document.createElement('li'); // Skapa ett nytt <li>-element
            li.textContent = fact.fact; // Lägg till faktatext i list-elementet

            if (isColorsActivated){

                // Slumpa en färg
                const randomColor = `rgb( 
                ${Math.floor(Math.random() * 256)}, 
                ${Math.floor(Math.random() * 256)}, 
                ${Math.floor(Math.random() * 256)})`;

                // Använd slumpad färg som bakgrund för faktan
                li.style.backgroundColor = randomColor;
            }
            else{
                li.style.backgroundColor = `rgba(211,82,82,0.267)`;
                li.style.color = `rgb(165,42,42)`
            }


            // Lägg till det nya <li> i listan
            facts.appendChild(li); 
        });

    } catch (error) {
    console.error('Fel vid hämtning:', error);
    alert('Det gick inte att hämta fakta. Försök igen senare.');
    }
});

btnColors.addEventListener('click', () => {

    try{
        
        isColorsActivated = !isColorsActivated;

        if (isColorsActivated){
            btnColors.style.backgroundColor = "lightgreen";
            btnColors.textContent = "Colors ON";
        }
        else{
            btnColors.style.backgroundColor = "rgb(255, 99, 71)"
            btnColors.textContent = "Colors OFF";
        }

    } catch (error) {
        console.error('Fel vid knapptryckning:', error);
        alert('Det gick inte att aktivera färger. Försök igen.');
    }
});

