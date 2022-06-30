import { ExponentialCost, FirstFreeCost, LinearCost } from "../api/Costs";
import { Localization } from "../api/Localization";
import { parseBigNumber, BigNumber } from "../api/BigNumber";
import { theory } from "../api/Theory";
import { Utils } from "../api/Utils";

var id = "glitch_theory";
var name = "My Custom Theory";
var description = "An implementation of... what? everything you buy will only works while offline";
var authors = "Glitch";
var version = 1;

var currency;
var a1, a2, a3, b1, b2;

var init = () => {
  currency = theory.createCurrency();
  currency2 = theory.createCurrency("q", "q");
  
  currency2.value = BigNumber.ONE;
  
    // a1
    {
        let getDesc = (level) => "a_1=" + getA1(level).toString(0);
        a1 = theory.createUpgrade(0, currency, new FirstFreeCost(new ExponentialCost(5, Math.log2(1.75))));
        a1.getDescription = (_) => Utils.getMath(getDesc(a1.level));
        a1.getInfo = (amount) => Utils.getMathTo(getDesc(a1.level), getDesc(a1.level + amount));
    }
  
    // a2
    {
        let getDesc = (level) => "a_2=" + getA2(level).toString(0);
        a2 = theory.createUpgrade(1, currency, new FirstFreeCost(new ExponentialCost(500, Math.log2(1.75))));
        a2.getDescription = (_) => Utils.getMath(getDesc(a2.level));
        a2.getInfo = (amount) => Utils.getMathTo(getDesc(a2.level), getDesc(a2.level + amount));
    }
  
    // a3
    {
        let getDesc = (level) => "a_3=" + getA3(level).toString(0);
        a3 = theory.createUpgrade(2, currency, new FirstFreeCost(new ExponentialCost(20000, Math.log2(1.75))));
        a3.getDescription = (_) => Utils.getMath(getDesc(a3.level));
        a3.getInfo = (amount) => Utils.getMathTo(getDesc(a3.level), getDesc(a3.level + amount));
    }
  
    // b1
    {
        let getDesc = (level) => "b_1=" + getB1(level).toString(0);
        b1 = theory.createUpgrade(3, currency, new FirstFreeCost(new ExponentialCost(5e6, Math.log2(1.75))));
        b1.getDescription = (_) => Utils.getMath(getDesc(b1.level));
        b1.getInfo = (amount) => Utils.getMathTo(getDesc(b1.level), getDesc(b1.level + amount));
    }
  
    // b2
    {
        let getDesc = (level) => "b_2=" + getB1(level).toString(0);
        b2 = theory.createUpgrade(4, currency, new FirstFreeCost(new ExponentialCost(5e9, Math.log2(1.75))));
        b2.getDescription = (_) => Utils.getMath(getDesc(b2.level));
        b2.getInfo = (amount) => Utils.getMathTo(getDesc(b2.level), getDesc(b2.level + amount));
    }

  
    /////////////////////
    // Permanent Upgrades
    theory.createPublicationUpgrade(0, currency, 1e10);
    theory.createBuyAllUpgrade(1, currency, 1e13);
    theory.createAutoBuyerUpgrade(2, currency, 1e30);
  
    ///////////////////////
    //// Milestone Upgrades
    theory.setMilestoneCost(new LinearCost(20, 20));

    /////////////////
    //// Achievements
    achievement1 = theory.createAchievement(0, "You Played!", "i show think.", () => true);
}

var tick = (elapsedTime, multiplier) => {
    let dt = BigNumber.from(elapsedTime * multiplier);
    let bonus = theory.publicationMultiplier;
    currency.value += dt * bonus * getA1(a1.level) * getA2(a2.level) * getA3(a3.level) * getB1(b1.level).sqrt()
    currency2.value += dt * getB1(b1.level)
}

var getPrimaryEquation = () => {
    let result = "\\dot{\\rho} = a_1";

    result += "a_2";
  
    result += "a_3";
    
    result += "b_1 \\times ";
   
    result += "\\sqrt{q}";

    return result;
}

var getSecondaryEquation = () => theory.latexSymbol + "=\\max\\rho^{0.6}";
var getPublicationMultiplier = (tau) => tau.pow(0.308) / BigNumber.from(13);
var getPublicationMultiplierFormula = (symbol) => "\\frac{{" + symbol + "}^{0.308}}{13}";
var getTau = () => currency.value.pow(0.6);

var getA1 = (level) => Utils.getStepwisePowerSum(level, 5, 10, 0);
var getA2 = (level) => Utils.getStepwisePowerSum(level, 3, 8, 1);
var getA3 = (level) => Utils.getStepwisePowerSum(level, 25, 7, 1);
var getB1 = (level) => Utils.getStepwisePowerSum(level, 9, 8, 2);
var getB2 = (level) => Utils.getStepwisePowerSum(level, 12, 25, 2);

init();
