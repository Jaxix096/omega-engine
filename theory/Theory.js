import { ExponentialCost, FirstFreeCost, LinearCost } from "../api/Costs";
import { Localization } from "../api/Localization";
import { parseBigNumber, BigNumber } from "../api/BigNumber";
import { theory } from "../api/Theory";
import { Utils } from "../api/Utils";

var id = "glitch_theory";
var name = "My Custom Theory";
var description = "An implementation of... what? everything you buy will only works while offline";
var authors = "Sky == liver";
var version = 1;

var currency;
var a1, a2, a3, b1;

var init = () => {
  currency = theory.createCurrency();
  
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

  
    /////////////////////
    // Permanent Upgrades
    theory.createPublicationUpgrade(0, currency, 1e10);
    theory.createBuyAllUpgrade(1, currency, 1e13);
    theory.createAutoBuyerUpgrade(2, currency, 1e30);
}

var getPrimaryEquation = () => {
    let result = "\\dot{\\rho} = a_1";

    result += "a_2";
  
    result += "a_3";
    
    result += "b_1 \times ";
   
    result += "q";

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

init();