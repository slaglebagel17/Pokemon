// pick the words to replace
const loopText = elementType => {
  const elements = document.querySelectorAll(elementType);
  for (let i = 0; i < elements.length; i += 1) {
    if (
      elements[i].innerHTML.indexOf("class=") === -1 &&
	  elements[i].innerHTML.indexOf("id=") === -1 &&
	  elements[i].innerHTML.indexOf("src=") === -1
    ) {
      elements[i].innerHTML = elements[i].innerHTML.replace(/person/gi, "pokemon trainer");
      elements[i].innerHTML = elements[i].innerHTML.replace(/people/gi, "pokemon trainers");
      elements[i].innerHTML = elements[i].innerHTML.replace(/catch/gi, "catch 'em all!");
      elements[i].innerHTML = elements[i].innerHTML.replace(/pet/gi, "Pokemon");
	    elements[i].innerHTML = elements[i].innerHTML.replace(/reptile/gi, "poison type Pokemon");
	    elements[i].innerHTML = elements[i].innerHTML.replace(/mammal/gi, "normal type Pokemon");
      elements[i].innerHTML = elements[i].innerHTML.replace(/plant/gi, "grass type Pokemon");
      elements[i].innerHTML = elements[i].innerHTML.replace(/Veterinary/gi, "Poke Center");
      elements[i].innerHTML = elements[i].innerHTML.replace(/cat/gi, "Eevee");
      elements[i].innerHTML = elements[i].innerHTML.replace(/dog/gi, "Growlithe");
	    elements[i].innerHTML = elements[i].innerHTML.replace(/bird/gi, "Spearow");
      elements[i].innerHTML = elements[i].innerHTML.replace(/horse/gi, "Horsea");
	    elements[i].innerHTML = elements[i].innerHTML.replace(/snake/gi, "Ekans");
	    elements[i].innerHTML = elements[i].innerHTML.replace(/frog/gi, "Poliwag");
	    elements[i].innerHTML = elements[i].innerHTML.replace(/mouse/gi, "Pikachu");
	    elements[i].innerHTML = elements[i].innerHTML.replace(/fish/gi, "Magikarp");
      elements[i].innerHTML = elements[i].innerHTML.replace(/USA/gi, "Kanto");
	    elements[i].innerHTML = elements[i].innerHTML.replace(/america/gi, "Kanto");
	    elements[i].innerHTML = elements[i].innerHTML.replace(/china/gi, "Johto");
	    elements[i].innerHTML = elements[i].innerHTML.replace(/california/gi, "New Bark Town");
      elements[i].innerHTML = elements[i].innerHTML.replace(/Mexico/gi, "Hoenn");
      
    }
  }
};
// replace the words
loopText("p");
loopText("a");
loopText("h1");
loopText("h2");
loopText("h3");
loopText("h4");
loopText("h5");
loopText("h6");
loopText("span"); 
loopText("section");
loopText("div");



const pokemonStore = {
  //jolteon
  0: '<img class="wild-pokemon" src="https://i.pinimg.com/originals/16/17/e6/1617e654042c91da3a2f9145ffd36e97.gif">',
  //growlithe
  1: '<img class="wild-pokemon" src="http://31.media.tumblr.com/21e9ab876cd84558592f3bcfb21c37fc/tumblr_ml5q06jBQc1s5h198o1_500.gif">',
  //suicune
  2: '<img class="wild-pokemon" src="http://gifimage.net/wp-content/uploads/2018/04/pokemon-sprites-gif-13.gif">',
  //eevee
  3: '<img class="wild-pokemon" src="http://rs248.pbsrc.com/albums/gg199/alex061095/Pokemon%20Sprites/eevee.gif~c200">',
  //pikachu
  4: '<img class="wild-pokemon"  src="https://i.gifer.com/1V94.gif">',
  //charmander
  5: '<img class="wild-pokemon" src="http://rs77.pbsrc.com/albums/j61/Black_kitsune_Rioku/Pokemon%20Platinum%20Animated%20Sprites/CharmanderPlatinum.gif~c200">',
  //squirtle
  6: '<img class="wild-pokemon" src="http://rs77.pbsrc.com/albums/j61/Black_kitsune_Rioku/Pokemon%20Platinum%20Animated%20Sprites/Squirtle.gif~c200">',
  //mewtwo
  7: '<img class="wild-pokemon" src="https://78.media.tumblr.com/94dd642bae4af0f8f29b4187f8b00f9a/tumblr_mkv8xzNuYo1s3bc1no1_500.gif">',
  //Snorlax
  8: '<img class="wild-pokemon" src="https://78.media.tumblr.com/6eff72a4406552302fead4a9e13f5ee2/tumblr_oi5n67fG6L1vr3vrmo1_500.gif">',
  //bulbasaur
  9: '<img class="wild-pokemon" src="http://rs1265.pbsrc.com/albums/jj514/Narcotic-Dementia/All%20Pokemon%20Sprites%20Animated/001.gif~c200">',
}
const pokemonStoreCount = Object.keys(pokemonStore).length

class WildPokemon {
  constructor() {
    //generates a random number, based on the pokemonStore key length. This random number is used to access a random pokemon.
    this.pokemonRandomNumber = Math.floor(Math.random()*pokemonStoreCount);
    //accesses the pokemon store to obtain the HTML for a random pokemon
    this.html = $(`${pokemonStore[this.pokemonRandomNumber]}`);
    // this.currentDirection = Math.floor(Math.random()*360);
    $('body').append(this.html);
    this.randomLeftPosition = this.randomLeftPosition();
    this.randomTopPosition = this.randomTopPosition(); 
    this.html.css({ top: this.randomTopPosition, left: this.randomLeftPosition });
    
    //sets a random id to each pokemon so it can be deleted
    this.id = Math.floor(Math.random() * 10000); 
    this.html.attr("id", this.id)

    //if you click on the specific pokemon, the following happens
    $(`#${this.id}`).click( () => {
      //finds the pokemon's location
      const position = this.html.position();
      const pokeballHTML = $('<img class="pokeball" src="http://pokemongoinfo.bitballoon.com/pokeball.gif">')
      
      //removes the pokemon, adds in the moving pokeball in the current Pokemon location.
      //pokemon is being "caught". It is not caught or escaped yet. 
      $(`#${this.id}`).remove();
      $('body').append(pokeballHTML);
      $(pokeballHTML).offset(position)

      //determines if pokemon will be caught or escapes, then triggers in 3 seconds
      const caughtChance = Math.random()
      if (caughtChance > 0.50) {
          setTimeout(() => caught(), 3000); 
      }
      else {
          setTimeout(() => escape(), 3000); 
      }

      //removes pokeball catching img, inputs caught image, and the removes caught image
      const caught = () => {
        $('.pokeball').first().remove();
        const pokemonCaught = $('<img class="pokeball caught" src="https://static1.squarespace.com/static/568a844d7086d7b18194bc08/t/57a0e952ff7c5034bcc2cad2/1470163296172/">')
        $('body').append(pokemonCaught);
        $(pokemonCaught).offset(position)        
        setTimeout(() => $('.pokeballCaught').first().remove(), 3000);          
      }

      //removes pokeball catching img, inputs escape image, and the removes escape image      
      const escape = () => {
        $('.pokeball').first().remove();
        const pokemonEscape = $('<img class="pokeball escape" src="https://media.giphy.com/media/zbLHPKicbPEWY/giphy.gif">')
        $('body').append(pokemonEscape) 
        $(pokemonEscape).offset(position)
        setTimeout(() => $('.pokeballEscape').first().remove(), 800);    
      }
    })
    
    //end of constructor, starts the movement of Pokemon
    this.move()
  }

//-------------------------------Prototype Methods-------------------------------//

  randomLeftPosition(){
    return Math.floor(Math.random() * (window.innerWidth-150))
  }
  randomTopPosition(){
    return Math.floor(Math.random() * (window.innerHeight-150)) 
  }
  move(){
    //move in a random direction
    //change direction every 2-5 seconds
     const position = this.html.position();  
     const randomMoveTime = Math.floor(Math.random() * 1000) + 1600;
     const randomLeftPosition =  Math.floor(Math.random() * (window.innerWidth-150))
     const randomTopPosition = Math.floor(Math.random() * (window.innerHeight-150)) 
     this.html.animate({top: randomTopPosition, left: randomLeftPosition}, randomMoveTime) 
     setTimeout(this.move.bind(this), randomMoveTime)
  }
}

class caughtPokemon {
  constructor(pokemonID) {
    //When a pokemon was caught, we knew its type, AKA it's number in the store. Pokemon ID is this number
    this.html = $(`${pokemonStore[pokemonID]}`);
    this.level = 1;
    this.experence = {currentXP: 0, levelUpXP: 100}
    this.hp = 20 + Math.floor(Math.random()*10)
    this.attack = 10 + Math.floor(Math.random()*5)
  }
  gainExperience(){
    this.experience[currentXP] += 20 + Math.floor(Math.random()*50);
    if (this.experience[currentXP] > this.experience[levelUpXP]){
      this.experience[currentXP] = this.experience[levelUpXP] - this.expereince[currentXP]
      this.levelUp() 
    }
  }
  levelUp(){
    this.experience[levelUpXP] *= 1.2
    this.level += 1; 
    this.hp += 10 Math.floor(Math.random()*5)
    this.attack += 4 Math.floor(Math.random()*3)
  }
}

$('button').click( () => {
  const newPokemon = new WildPokemon();
})

$('.wild-pokemon').click( () => {
  const newPokemon = new WildPokemon();
})
