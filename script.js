//Wire in selectors
var buildButton = document.getElementById("build");
var pointTarget = document.getElementById("points");
var selectedArmy = document.getElementById("army");
var armyType = document.getElementsByName("army-focus");
var optionArt = document.getElementById("include-art");
var optionMech = document.getElementById("include-mech");

//Global variables
var army;
var armyFocus;
var option;


//Add event listeners for build button
buildButton.addEventListener("click", validate);
document.addEventListener("keypress", function()
{
    if(event.keyCode == 13)
    {
        validate();
    }});

function selectionConfirm(){

};

function parseOptions(){
    var option1 = optionArt.checked;
    var option2 = optionMech.checked;
    //Only run if necessary
    if(option1 || option2){
    if(option1 && option2)
    {
        option = "using mechanized infantry and artillery units";
    }
    else if(option1){
        option = "using limbered artillery";
    }
    else{
        option = "using mechanized infantry";
    }
    }
    else{
        option = "";
    }
}

function parseArmyType(){
    for(item in armyType){
        if(armyType[item].checked){
        switch(armyType[item].value){
            case "balance":
                armyFocus = "balanced";
                break;
            case "firepower":
                armyFocus = "large caliber";
                break;
            case "heavy":
                armyFocus = "heavily armoured"
                break;
            case "mech":
                armyFocus = "mechanized";
                break;
        }
    //Result logged, break from function    
    return 0;
    }
        }
}

function armySelectionFormatter(){
    switch(selectedArmy.value){
        case "us":
            army = "United States";
            break;
        case "germany":
            army = "German";
            break;
        case "soviet":
            army = "Soviet";
            break;
        case "britain":
            army = "British";
            break;
        case "japan":
            army = "Japanese";
            break;
        case "italy":
            army = "Italian";
                break;
    }
}

function validate(){

    generateList();

    ///FORM VALIDATION - TEMPORARILY DISABLED
    /*
    armySelectionFormatter();
    parseArmyType();
    parseOptions();
     if(pointTarget.value > 0){
         if(armyFocus!= undefined && option !== undefined){
         alert("You've chosen a " + pointTarget.value + " point " + armyFocus + " " +
         army + " force " + option);
         }
         else if(armyFocus!== undefined){
            alert("You've chosen a " + pointTarget.value + " point " + armyFocus + " " +
            army + " force ");
         }
         else if(option!== undefined){
            alert("You've chosen a " + pointTarget.value + " point " + army + " force "
             + option);
         }
         else{
            alert("You've chosen a " + pointTarget.value + " point " + army + " force");
         }
     }
     else{
         alert("Error: Enter Point Target!")
     } */
};

/////////////////////////////////////////////////////////////////////////////

//Objects
//NOTE: PLACEHOLDER UNTIL MORE DATABASE KNOWLEDGE

//Unit template
var unitTemplate = {
    army: "",
    description: "",
    cost: [],
    weapons: [],
    weapon_desc: "",
    damage_value: 0, 
    options: [],
    sp_rules: {},
    artillery: false,
    mechanized: false,
};

/////////////////////////////////////////////////////////
// Start of US Tank Units
// FIND A BETTER WAY TO DO THIS

var m3a1_stuart =  unitTemplate;
m3a1_stuart.army="United States";
m3a1_stuart.cost = [92, 115, 148],
m3a1_stuart.weapon_desc = "1 gyro-stabilised turret-mounted light anti-tank gun with coaxial MMG and a forward facing hull-mounted MMG";
m3a1_stuart.weapons = ["light AT", "MMG", "MMG"];
m3a1_stuart.damage_value = 8;
m3a1_stuart.options = ["Recce"];
m3a1_stuart.sp_rules = ["Vulnerable"];

var m36b1_jackson =  unitTemplate;
m36b1_jackson.army="United States";
m36b1_jackson.cost = [244, 305, 366],
m36b1_jackson.weapons = ["super heavy AT", "MMG"];
m36b1_jackson.weapon_desc = "1 turret-mounted super heavy anti-tank gun and forward facing hull-mounted MMG";
m36b1_jackson.damage_value = 9;
m36b1_jackson.options = ["May add a pintle-mounted HMG for +25pts"];
m36b1_jackson.sp_rules = ["Open-topped"];

var m8_scott =  unitTemplate;
m8_scott.army="United States";
m8_scott.cost = [112, 140, "NA"],
m8_scott.weapons = ["light howitzer", "HMG"];
m8_scott.weapon_desc = "1 light howitzer in open-topped turret and 1 pintle-mounted HMG on the turret with a 360° arc of fire";
m8_scott.damage_value = 8;
m8_scott.sp_rules = ["Open-topped"];

var us_tanks = {m3a1_stuart, m36b1_jackson, m8_scott};


function compare(first, second)
{
    //Returns true if first value is greater
    if(first > second)
    {return true;}
    else{
        return false;
    }

}

function findLargest(numberArray){
    index = 0;
    current = numberArray[0];
    for(i=1;i<numberArray.length;i++)
    {
        if(!compare(current, numberArray[i]))
        {
            //Item is not the largest
            //Set as largest
            current = numberArray[i];
            console.log("Index value is: " + index);
            index = i;
        }
    }

numberArray.splice(index,1);
return current;
}

function recursiveFindLargest(numberArray, sortedArray){
    index = 0;
    var changed = false;
    current = numberArray[0];
    for(i=0;i<numberArray.length;i++)
    {
        if(!compare(current, numberArray[i]))
        {
            //Item is not the largest
            //Set as largest
            current = numberArray[i];
            index = i;
            changed = true;
        }
    }
if(changed){
//Add new item
sortedArray.push(current);
//Remove old item
numberArray.splice(index,1);
recursiveFindLargest(numberArray, sortedArray);
}
return 0;
}

function recursiveSort(numberArray, iter){
  
//Start at 0
var current = numberArray[0];
change=false;
var index = 0;


for(var i=0;i<numberArray.length-iter;i++)
{
    if(current<numberArray[i])
    {
        //Next number is larger. Re-assign current and track index
        current=numberArray[i]
        index = i;
        change=true;
    }
    }

    if(change){
        numberArray.splice(index,1);
        numberArray.push(current)
        iter++;
        recursiveSort(numberArray, iter);
    }

    
    else{
    if(iter<numberArray.length)
    {
        current = numberArray[0];
        numberArray.splice(0,1);
        numberArray.push(current);
        iter++;
        recursiveSort(numberArray, iter);
    }
}
  
return 0;
}

function sortTanks(){

//Iterative approach. Take first number. Compare to every other number.
// If pass, put in structure. If fail, take new number, re-run comparison
//Repeat

//First sort on individual vars to prove the algorithm
var first = 4468436;
var second = 4532;
var third = 764;
var fourth = 843;
var fifth = 1;


var values = [first, second, third, fourth, fifth];
var sorted = [];

console.log("Original array is: " + values);
recursiveSort(values, 0)
console.log("Sorted Array is: " + values);

}

function generateList(){

   // console.log("In Function- confirm tank access");
    //console.log(m36b1_jackson);
    sortTanks();

}





