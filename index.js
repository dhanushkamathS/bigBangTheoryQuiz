var readlineSync = require('readline-sync')
var questions = require('./question')
var leaderBoard = require('./leaderboard')
var chalk = require('chalk')
const emoji = require('node-emoji');
const smiley = emoji.get('smiley')
const confused = emoji.get('confused')
const angry = emoji.get('angry')
const kissing = emoji.get('kissing_heart')


console.log(chalk.whiteBright.bold("welcome to the game"))
console.log(chalk.yellowBright(smiley+" Are you a true fan of big bang theory "+smiley))
console.log(chalk.yellowBright("There are 15 questions"))

var willPlayGame = readlineSync.question(chalk.blueBright('Press '+chalk.greenBright('y ')+'to start the game ...\n'))

if(willPlayGame.toLowerCase() != 'y'){
  console.log(chalk.blueBright("Play when you are free .. bye bye"))
  process.exit(1)
}



var totalScore =0,wrongCount=0;

const printScore = (scoreValue) => {

    return  console.log(chalk.yellowBright('score : ') + chalk.whiteBright(scoreValue))
}

const specialWrongAnswer = (wrongValue) =>{ 
    if(wrongValue <=4) {
      return console.log(chalk.red('wrong answer '+confused))
    }
    if(wrongValue >= 5 && wrongValue <=14){
      return console.log(chalk.red('bro r u sure u know me '+confused,confused))
    }
    if(wrongValue > 14){
      return console.log(chalk.red('why are you taking this quiz , why why '+angry))
    }
  }
  
  const specialRightAnswer = (rightValue) =>{ 
    if(rightValue <=4) {
      return console.log(chalk.greenBright('nice nice nice nice '+smiley))
    }
    if(rightValue >= 5 && rightValue <=14){
      return console.log(chalk.greenBright('wow you really do know me '+kissing))
    }
    if(rightValue > 14){
      return console.log(chalk.greenBright('your are a really close friend for sure '+kissing,kissing))
    }
  }

const validateQuestion = (qNo) => {
    const {question,options,answer} = questions[qNo]
    printScore(totalScore)
    console.log(question)
    console.log(`1) ${options[0]}\n2) ${options[1]}\n3) ${options[2]}\n4) ${options[3]}`)
    var ans = readlineSync.question('choose the option ?\n')
    if(options[ans-1] == answer){
        totalScore++
        specialRightAnswer(totalScore)
        console.log(chalk.whiteBright('\n---------------------------------'))
        console.log(chalk.whiteBright('---------------------------------\n'))  
        return 
    }
    specialWrongAnswer(wrongCount)
    console.log(chalk.whiteBright('\n---------------------------------'))
    console.log(chalk.whiteBright('---------------------------------\n'))
    return 
}

const didMakeItToleaderBoard = () =>{
    var temp =0;
    console.log(chalk.redBright('\n leaderboard\n'))
    leaderBoard.map((player)=>{
      console.log(chalk.whiteBright(player[0]+' : '+player[1]+' points'))
     })
    leaderBoard.map((player)=>{
     if(player[1]>temp){
       temp = player[1];
     }
    })
    printScore(totalScore)
    if(totalScore > temp){
      console.log(chalk.greenBright("\n\nsuper you made it to the leaderboard"))
      console.log(chalk.greenBright(('send me screenshot .I will add you to leader board')))
      return
    }
    console.log(chalk.red("better luck next time"))

}


const main =()=>{
    for(var i =0; i < questions.length ; i++){
    validateQuestion(i)
}

}

main()
didMakeItToleaderBoard()

