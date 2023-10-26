const section = document.querySelector('section')  
const playerScores = document.querySelector('span')
const comboCount = document.querySelector('.totalCombo')
var scores = 0  //the default score is 0
var combo = 1 //the default combo is 0
playerScores.textContent = scores
var timer = document.getElementById("timer")
var seconds = document.createElement("p")
var id2 //id reference to the interval
var num
var checkTimer = 0

function genNum () {
    num = document.getElementById("num").value
    const arr = [];
    if(num % 3 == 0 && num > 3 )  //check if the entered number is larger than 3 and the number is a multiple of 3
    {
        for (i = 1; i <= num/3; i++)
        {
            for (j = 0; j < 3; j++)
            {
                arr.push(i)  //input the numbers to the array
                console.log(i)
            }
        }
        console.log(arr)
        const cardArr = shuffle(arr)  //randomize the sequence
        return cardArr
    }
    else
    {
        alert("Please enter the multiple of three and don't enter 3 because it will be too easy!")
    } 
    
}
    
function shuffle (numArray) {
    numArray.sort(() => Math.random() - 0.5)  //add a random sorting value to perfrom shuffle
    console.log("The array is : ", numArray)
    return numArray
}

function cardGen () {
  combo = 1
  scores = 0
  combo = 0
  comboCount.innerHTML = combo
  if (checkTimer == 1)
  { 
    seconds.parentNode.replaceChild(timer, seconds);  
    timer.style.visibility = "visible"  //show the Timer ON button
    clearInterval(id2)  //clear the timer
    checkTimer = 0
  }
  playerScores.textContent = scores  //reset the score
  section.innerHTML =""
  const cardNum = genNum()
  console.log("The cardGen is : ", cardNum)
  if (cardNum.length / 3 >= 3){
  section.style.gridTemplateColumns = 'repeat(${cardNum.length / 3}, 1 fr)'  //extend the card in vertical direction
  console.log("CARD ", cardNum.length / 3)
  }

  cardNum.forEach((item) =>
     {
        const card = document.createElement("div")
        const inner = document.createElement("div")
        const front = document.createElement("div")
        const img = document.createElement("img")
        const back = document.createElement("div")
        

        card.classList = "card"
        inner.classList = "inner" 
        front.classList = "front"
        back.classList = "back"
           
        img.src = "qmark.png"
        back.innerHTML = item
        card.setAttribute('name', item)  //assign the number value for matching

        section.appendChild(card)  
        card.appendChild(inner)
        inner.appendChild(front)
        inner.appendChild(back)
        front.appendChild(img)

        card.addEventListener('click', function(e) {    //when the card is clicked, toggle the flipping event and perform matching
            card.classList.toggle('toggle')
            if (card.classList.contains("flipped")){  //check if same card is clicked 
                card.classList.remove("flipped")
            }
            else{
                card.classList.add("flipped")
            }
            checkCard()
        })
     }
  )
}

function checkWin () {
    const matchedCards = document.querySelectorAll('.matched')
    if(matchedCards.length == num)
    {
        alert("You win! Congratulations!")
        if(checkTimer == 1){
        seconds.parentNode.replaceChild(timer, seconds);
        timer.style.visibility = "visible"
        clearInterval(id2)
        checkTimer = 0
        }
    }
    else {
        console.log("One step closer to winning", matchedCards.length)    
    }
}

function checkCard () {
    const flippedCards = document.querySelectorAll('.flipped')
    console.log("The flipped card = ",flippedCards.length )
    if(flippedCards.length === 2)
    {
        if(flippedCards[0].getAttribute('name') === flippedCards[1].getAttribute('name'))   //if the first card and second card is matched
        {
            console.log("match")
            flippedCards.forEach((card)=>{
                //card.classList.remove('flipped')
                card.style.pointerEvents = "none"
            })
        }
        else{
            console.log("wrong")  
             scores = scores - 1
             combo = 0
              comboCount.innerHTML = combo
             playerScores.textContent = scores
            flippedCards.forEach((card)=>{
                card.classList.remove('flipped')
                setTimeout(() => card.classList.remove('toggle'), 500)
            })
        }
    }
    else if(flippedCards.length === 3)
    {
        if(flippedCards[0].getAttribute('name') === flippedCards[2].getAttribute('name') && flippedCards[1].getAttribute('name') === flippedCards[2].getAttribute('name'))
        {
            console.log("match")
            scores = scores + 3 * combo
            combo++
            comboCount.innerHTML = combo
            playerScores.textContent = scores

            flippedCards.forEach((card)=>{
                card.classList.remove('flipped')
                card.classList.add("matched")
                card.style.pointerEvents = "none"
                checkWin()
            })
        }
        else
        {
            console.log("wrong")
            scores = scores - 1
            combo = 0
            comboCount.innerHTML = combo
            playerScores.textContent = scores

            flippedCards.forEach((card)=>{
                card.classList.remove('flipped')
                setTimeout(() => card.classList.remove('toggle'), 500)
                card.style.pointerEvents = null
            })
        }
    }
}

function countDown() {
    var counter = 60
    checkTimer = 1
    seconds.innerHTML = counter
    timer.style.visibility = "hidden"
    timer.parentNode.replaceChild(seconds, timer)

    id = setInterval(() => {
        counter = counter - 1
    if(counter < 0) {
        seconds.parentNode.replaceChild(timer, seconds);
        clearInterval(id);
        alert("GameOver!")
        checkTimer = 0
        timer.style.visibility = "visible"
    } 
    else {
        seconds.innerHTML = counter;
    }
    }    ,1000)
    id2 = id
}
 
cardGen()  