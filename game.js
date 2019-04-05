import { PHASER_OZ } from "./assets/phaserOZ.js";
if (typeof PHASER_OZ === "undefined"){
  PHASER_OZ = {};
}

const DEFAULT_X = -1000;
const DEFAULT_Y = -1000;
const BUILDING_VAR = 46;

var config = {
    type: Phaser.AUTO,
    parent: gameArea,
    width: 640,
    height: 480,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

class TitleScreen{
  constructor(){
    this.scene; this.background; this.title; this.image; this.button = []; this.text;
  }
  create(scene){
    this.scene = new PHASER_OZ.Scene(scene);
    this.background = new PHASER_OZ.Image(scene,DEFAULT_X,DEFAULT_Y,"titleBack");
    this.title = new PHASER_OZ.Image(scene,DEFAULT_X,DEFAULT_Y,"titleLogo");
    this.image = new PHASER_OZ.Image(scene,DEFAULT_X,DEFAULT_Y,"titleImage");
    this.button[0] = new PHASER_OZ.Button(scene,DEFAULT_X,DEFAULT_Y,"button",200);
    this.button[1] = new PHASER_OZ.Button(scene,DEFAULT_X,DEFAULT_Y,"button",200);
    this.text = new PHASER_OZ.Text(scene,DEFAULT_X,DEFAULT_Y);
    this.image.obj.setScale(0.75);
    this.button[0].group[9].obj.setText("はじめから");
    this.button[0].on("pointerup",()=>{this.buttonFunc("はじめから");});
    this.button[1].group[9].obj.setText("つづきから");
    this.button[1].on("pointerup",()=>{this.buttonFunc("つづきから");});
    this.text.obj.setText("ver 0.4");
    this.scene.add(this.background,320,240);
    this.scene.add(this.title,320,80);
    this.scene.add(this.image,320,240);
    this.scene.add(this.button[0],320,380);
    this.scene.add(this.button[1],320,440);
    this.scene.add(this.text,580,460)
  }
  buttonFunc(str){
    system.initiate();
    if(str == "つづきから"){
      system.loadData();
    }
    system.drawItem(variable.builtBuildingArray);
    system.drawEmpireStatus();
    this.scene.hide();
    mainScreen.scene.appear();
    sound.piano37.obj.play();
    system.makeViewPhase();
    alertScreen.scene.appear();
    sound.button.obj.play();
  }
}
class MainScreen{
  constructor(){
    this.scene; this.back; this.msgWin; this.stsWin; this.leftButton; this.rightButton; this.item = [];
  }
  create(scene){
    this.scene = new PHASER_OZ.Scene();
    this.back = new PHASER_OZ.Image(scene,DEFAULT_X,DEFAULT_Y,"mainBack");
    this.msgWin = new PHASER_OZ.Window(scene,DEFAULT_X,DEFAULT_Y,"window",472,104);
    this.stsWin = new PHASER_OZ.Window(scene,DEFAULT_X,DEFAULT_Y,"window",144,464);
    this.leftButton = new PHASER_OZ.Button(scene,DEFAULT_X,DEFAULT_Y,"button",228,48);
    this.rightButton = new PHASER_OZ.Button(scene,DEFAULT_X,DEFAULT_Y,"button",228,48);
    for(var i = 0; i < 40; i ++){
      this.item[i] = new PHASER_OZ.Sprite(scene,DEFAULT_X,DEFAULT_Y,"icon");
      this.item[i].obj.setScale(2);
      this.item[i].obj.setInteractive();
      this.item[i].obj.on("pointerover",this.overFunc(i));
      this.item[i].obj.on("pointerout",this.outFunc(i));
      this.item[i].obj.on("pointerup",this.upFunc(i));
    }
    this.stsWin.group[9].obj.setOrigin(0.5,0);
    this.stsWin.group[9].moveXY(0,-220);
    this.rightButton.on("pointerover",()=>{this.rightButtonOverFunc()});
    this.rightButton.on("pointerout",()=>{this.rightButtonOutFunc()});
    this.rightButton.on("pointerup",()=>{this.rightButtonUpFunc()});
    this.leftButton.on("pointerover",()=>{this.leftButtonOverFunc()});
    this.leftButton.on("pointerout",()=>{this.leftButtonOutFunc()});
    this.leftButton.on("pointerup",()=>{this.leftButtonUpFunc()});
    this.scene.add(this.back,320,240);
    this.scene.add(this.msgWin,244,60);
    this.scene.add(this.stsWin,560,240);
    this.scene.add(this.leftButton,122,448);
    this.scene.add(this.rightButton,358,448);
    for(var i = 0; i < 8; i ++){
      this.scene.add(this.item[i],42 + i * 58,154);
    }
    for(var i = 8; i < 16; i ++){
      this.scene.add(this.item[i],42 + (i-8) * 58,212);
    }
    for(var i = 16; i < 24; i ++){
      this.scene.add(this.item[i],42 + (i-16) * 58,270);
    }
    for(var i = 24; i < 32; i ++){
      this.scene.add(this.item[i],42 + (i-24) * 58,328);
    }
    for(var i = 32; i < 40; i ++){
      this.scene.add(this.item[i],42 + (i-32) * 58,386);
    }
  }
  overFunc(i){
    return ()=>{
      var text = "《" + variable.buildingArray[variable.drawedBuildingArray[i]].name + "》\n\n" + variable.buildingArray[variable.drawedBuildingArray[i]].explain;
      mainScreen.stsWin.group[9].obj.setText(text);
    };
  }
  outFunc(i){
    return ()=>{
      system.drawEmpireStatus();
    };
  }
  upFunc(i){
    return ()=>{
      if(variable.phase == "buy"){
        if(empire.money >= variable.buildingArray[variable.shopItemArray[i]].price && variable.builtBuildingArray[39] == 0){
          empire.money -= variable.buildingArray[variable.shopItemArray[i]].price;
          var text = "【" + variable.buildingArray[variable.shopItemArray[i]].name + "】を購入しました！"
          sound.buy.obj.play();
          buildingFunc.buyFunc(variable.buildingArray[variable.shopItemArray[i]].buyFunctionNum);
          system.empireStatusFloor();
          mainScreen.msgWin.group[9].obj.setText(text);
          for(var j = 0; j < 40; j ++){
            if(variable.builtBuildingArray[j] == 0){
              variable.builtBuildingArray[j] = variable.shopItemArray[i];
              break;
            }
          }
          variable.shopItemArray[i] = 0;
          system.drawItem(variable.shopItemArray);
        } else {
          mainScreen.msgWin.group[9].obj.setText("お金が足りないか、施設が一杯です。\n施設は40個までしか建てられません。\n施設を売却してください。");
        }
        system.saveData();
      }
      if(variable.phase == "sell"){
        if(variable.buildingArray[variable.builtBuildingArray[i]].id != 2){
          empire.money += Math.floor(variable.buildingArray[variable.builtBuildingArray[i]].price * 0.1);
          sound.buy.obj.play();
          buildingFunc.sellFunc(variable.buildingArray[variable.builtBuildingArray[i]].sellFunctionNum);
          system.empireStatusFloor();
          variable.builtBuildingArray[i] = 0;
          for(var j = 0; j < 40; j ++){
            if(j >= i){
              if(j == 39){
                variable.builtBuildingArray[j] = 0;
              }else{
                variable.builtBuildingArray[j] = variable.builtBuildingArray[j + 1];
              }
            }
          }
        } else {
          sound.shutter.obj.play();
          mainScreen.msgWin.group[9].obj.setText("宮廷を売却することはできません！");
        }
        system.drawItem(variable.builtBuildingArray);
        system.saveData();
      }
    }
  }
  rightButtonOverFunc(){
    if(variable.phase == "view"){
      system.drawTimeSkipExplain();
    }
    if(variable.phase == "buy"){
      mainScreen.stsWin.group[9].obj.setText("《戻る》\n\n王国のメイン画\n面に戻ります。");
    }
  }
  rightButtonOutFunc(){
      system.drawEmpireStatus();
  }
  rightButtonUpFunc(){
    if(variable.phase == "view"){
      system.timeSkip();
    }
    if(variable.phase == "buy" || variable.phase == "sell"){
      variable.phase = "view";
      system.drawItem(variable.builtBuildingArray);
      system.makeViewPhase();
    }
    sound.button.obj.play();
  }
  leftButtonOverFunc(){
    if(variable.phase == "view"){
      system.drawShopExplain();
    }
    if(variable.phase == "buy"){
      mainScreen.stsWin.group[9].obj.setText("《施設の売却》\n\n施設を売却しま\nす。購入時の値\n段の１割が返却\nされます。");
    }
  }
  leftButtonOutFunc(){
      system.drawEmpireStatus();
  }
  leftButtonUpFunc(){
    if(variable.phase == "view" || variable.phase == "sell"){
      variable.phase = "buy";
      system.drawItem(variable.shopItemArray);
      mainScreen.leftButton.group[9].obj.setText("施設を売却する");
      mainScreen.rightButton.group[9].obj.setText("戻る");
      mainScreen.msgWin.group[9].obj.setText("どの施設を購入しますか？\nマウスオーバー/タップ長押しでアイコンの詳細が見られます");
    } else if(variable.phase == "buy"){
      variable.phase = "sell";
      system.drawItem(variable.builtBuildingArray);
      mainScreen.leftButton.group[9].obj.setText("施設を購入する");
      mainScreen.rightButton.group[9].obj.setText("戻る");
      mainScreen.msgWin.group[9].obj.setText("どの施設を売却しますか？\nマウスオーバー/タップ長押しでアイコンの詳細が見られます\n売却益は、購入時の値段の1割です。");
    }
    sound.button.obj.play();
  }
}
class AlertScreen{
  constructor(){
    this.scene; this.veil; this.window; this.text; this.button;
  }
  create(scene){
    this.scene = new PHASER_OZ.Scene();
    this.veil = new PHASER_OZ.Veil(scene,DEFAULT_X,DEFAULT_Y);
    this.window = new PHASER_OZ.Window(scene,DEFAULT_X,DEFAULT_Y,"window",400,200);
    this.button = new PHASER_OZ.Button(scene,DEFAULT_X,DEFAULT_Y,"button",100,48);
    this.text = new PHASER_OZ.Text(scene,DEFAULT_X,DEFAULT_Y);
    this.veil.obj.setAlpha(0.4);
    this.veil.obj.setScale(1.5);
    this.window.group[9].obj.setText("");
    this.button.on("pointerup",()=>{this.buttonFunc()});
    this.button.group[9].obj.setText("了解");
    this.text.obj.setText("デフォルトテキストデフォルトテキスト\nデフォルトテキストデフォルトテキスト\nデフォルトテキストデフォルトテキスト\nデフォルトテキストデフォルトテキスト");
    this.scene.add(this.veil,320,240);
    this.scene.add(this.window,320,240);
    this.scene.add(this.button,320,300)
    this.scene.add(this.text,320,210);
  }
  buttonFunc(){
      this.scene.hide();
      if(variable.pushAlertButtonToTitle){
        mainScreen.scene.hide();
        titleScreen.scene.appear();
      }
      sound.shutter.obj.play();
  }
}
class System{
  constructor(){

  }
  saveData(){
    localStorage.setItem("shopItemNum",variable.shopItemNum);
    localStorage.setItem("year",empire.year);
    localStorage.setItem("population",empire.population);
    localStorage.setItem("money",empire.money);
    localStorage.setItem("food",empire.food);
    localStorage.setItem("happiness",empire.happiness);
    localStorage.setItem("science",empire.science);
    localStorage.setItem("force",empire.force);
    localStorage.setItem("culture",empire.culture);
    localStorage.setItem("religion",empire.religion);
    localStorage.setItem("sightseeing",empire.sightseeing);
    localStorage.setItem("politics",empire.politics);
    localStorage.setItem("conglaturation",variable.conglaturation);
    for(var i = 0; i < 40; i ++){
      var key = "builtBuilding" + i;
      localStorage.setItem(key,variable.builtBuildingArray[i]);
    }
    for(var i = 0; i < 40; i ++){
      var key = "shopItem" + i;
      localStorage.setItem(key,variable.shopItemArray[i]);
    }
  }
  loadData(){
    if(localStorage.getItem("year") != undefined){
      variable.shopItemNum = localStorage.getItem("shopItemNum");
      empire.year = localStorage.getItem("year");
      empire.population = localStorage.getItem("population");
      empire.money = localStorage.getItem("money");
      empire.food = localStorage.getItem("food");
      empire.happiness = localStorage.getItem("happiness");
      empire.science = localStorage.getItem("science");
      empire.force = localStorage.getItem("force");
      empire.culture = localStorage.getItem("culture");
      empire.religion = localStorage.getItem("religion");
      empire.sightseeing = localStorage.getItem("sightseeing");
      empire.politics = localStorage.getItem("politics");
      variable.conglaturation = localStorage.getItem("conglaturation");
      for(var i = 0; i < 40; i ++){
        var key = "builtBuilding" + i;
        variable.builtBuildingArray[i] = localStorage.getItem(key);
      }
      for(var i = 0; i < 40; i ++){
        var key = "shopItem" + i;
        variable.shopItemArray[i] = localStorage.getItem(key);
      }
      alertScreen.text.obj.setText("おかえりなさい、皇帝どの！\n引き続き大帝国を作っていきましょう！\n施設を売買することで国の方向性が決まります。\n詳しくはマウスオーバー/タップ長押しで！");
      this.empireStatusFloor();
    }
  }
  initiate(){
    variable.phase = "view";
    for(var i = 0; i < 40; i ++){
      variable.builtBuildingArray[i] = 0;
    }
    variable.builtBuildingArray[0] = 2;
    variable.shopItemNum = 12;
    empire.year = 1;
    empire.population = 100;
    empire.money = 100;
    empire.food = 100;
    empire.happiness = 100;
    empire.science = 1;
    empire.force = 1;
    empire.culture = 1;
    empire.religion = 1;
    empire.sightseeing = 1;
    empire.politics = 1;
    variable.pushAlertButtonToTitle = false;
    alertScreen.text.obj.setText("はじめまして！皇帝どの！\nこれから大帝国を作っていきましょう！\n施設を売買することで国の方向性が決まります。\n詳しくはマウスオーバー/タップ長押しで！");
    this.chooseShopItem();
  }
  drawItem(array){
    for(var i = 0; i < 40; i ++){
      variable.drawedBuildingArray[i] = array[i];
      if(array[i] == 0){
        mainScreen.item[i].obj.setScale(0);
      }else{
        mainScreen.item[i].obj.setScale(2);
        mainScreen.item[i].obj.setFrame(variable.buildingArray[array[i]].iconNum);
      }
    }
  }
  drawEmpireStatus(){
    var text = "皇紀" + empire.year + "年\n\n【人口】\n" + empire.population + "人\n\n" + "【所持金】\n" + empire.money + "G\n\n" + "【食料】\n" + empire.food + "\n\n【幸福】\n" + empire.happiness + "\n\n科学:" + empire.science + "\n軍事:" + empire.force + "\n文化:" + empire.culture + "\n信仰:" + empire.religion + "\n観光:" + empire.sightseeing + "\n政治:" + empire.politics;
    mainScreen.stsWin.group[9].obj.setText(text);
  }
  drawTimeSkipExplain(){
    var text = "《時間送り》\n\n現在の施設で時\n間を進めます。\n\n自動セーブが行\nわれます。"
    mainScreen.stsWin.group[9].obj.setText(text);
  }
  drawShopExplain(){
    var text = "《施設売買》\n\n所持金を使用し\nて施設を購入、\nまたは売却しま\nす。\n\n品揃えはランダ\nムで時間をすす\nめることで更新\nされます。"
    mainScreen.stsWin.group[9].obj.setText(text);
  }
  materialLoadEnd(){
    titleScreen.create(gameScene);
    mainScreen.create(gameScene);
    alertScreen.create(gameScene);
    sound.create(gameScene);
    titleScreen.scene.appear();
  }
  makeViewPhase(){
    mainScreen.leftButton.group[9].obj.setText("施設を売買する");
    mainScreen.rightButton.group[9].obj.setText("時間を進める");
    mainScreen.msgWin.group[9].obj.setText("施設を売買して次の1年に備えましょう！\nマウスオーバー/タップ長押しでアイコンの詳細が見られます");
  }
  timeSkip(){
    for(var i = 0; i < 40; i ++){
      buildingFunc.timeSkip(variable.buildingArray[variable.builtBuildingArray[i]].functionNum);
    }
    empire.year ++;
    this.empireStatusFloor();
    this.gameOverCheck();
    if(variable.pushAlertButtonToTitle == false){
      this.chooseShopItem();
      system.saveData();
      this.randomEvent();
    }
  }
  empireStatusFloor(){
    empire.population = Math.floor(empire.population);
    empire.money = Math.floor(empire.money);
    empire.food = Math.floor(empire.food);
    empire.happiness = Math.floor(empire.happiness);
    empire.science = Math.floor(empire.science);
    empire.force = Math.floor(empire.force);
    empire.culture = Math.floor(empire.culture);
    empire.religion = Math.floor(empire.religion);
    empire.sightseeing = Math.floor(empire.sightseeing);
    empire.politics = Math.floor(empire.politics);
  }
  gameOverCheck(){
    if(empire.population < 0){
      alertScreen.text.obj.setText("国民がいなくなりました...\n帝国は滅亡しました...");
      variable.pushAlertButtonToTitle = true;
      alertScreen.scene.appear();
    } else if(empire.food < 0){
      alertScreen.text.obj.setText("食料が底を付きました...\n帝国は滅亡しました...");
      variable.pushAlertButtonToTitle = true;
      alertScreen.scene.appear();
    } else if(empire.money < 0){
      alertScreen.text.obj.setText("国庫が底を付きました...\n帝国は滅亡しました...");
      variable.pushAlertButtonToTitle = true;
      alertScreen.scene.appear();
    } else if(empire.happiness < 0){
      alertScreen.text.obj.setText("国民の暴動が起きました...\n帝国は滅亡しました...");
      variable.pushAlertButtonToTitle = true;
      alertScreen.scene.appear();
    }
  }
  chooseShopItem(){
    for(var i = 0; i < 40; i++){
      variable.shopItemArray[i] = 0;
    }
    var temp = variable.shopItemNum > 40 ? 40 : variable.shopItemNum;
    for(var i = 0; i < temp; i++){
      variable.shopItemArray[i] = getRandomInt(BUILDING_VAR - 3) + 3;
    }
    if(empire.year == 1){
      variable.shopItemArray[0] = 42;
      variable.shopItemArray[1] = 43;
      variable.shopItemArray[2] = 44;
      variable.shopItemArray[3] = 45;
    }
  }
  randomEvent(){
    var rnd = getRandomInt(100);
    if(empire.population >= 10000 && variable.conglaturation == false){
      alertScreen.text.obj.setText("人口が10000人を超えました。\nこれで立派な帝国ですね。\nおめでとうございます！");
      variable.conglaturation = true;
      alertScreen.scene.appear();
    }else if(rnd < 10){
      empire.population *= 1.1;
      system.empireStatusFloor();
      alertScreen.text.obj.setText("ベビーブームが起こりました！\n人口が1割増加しました！");
      alertScreen.scene.appear();
    }else if(rnd < 20){
      empire.money *= 1.1;
      system.empireStatusFloor();
      alertScreen.text.obj.setText("好景気が起こりました！\n所持金が1割増加しました！");
      alertScreen.scene.appear();
    }else if(rnd < 30){
      empire.food *= 1.1;
      system.empireStatusFloor();
      alertScreen.text.obj.setText("大豊作の年でした！\n食料が1割増加しました！");
      alertScreen.scene.appear();
    }else if(rnd < 40){
      empire.happiness *= 1.1;
      system.empireStatusFloor();
      alertScreen.text.obj.setText("国王感謝祭が行われました！\n幸福が1割増加しました！");
      alertScreen.scene.appear();
    }else if(rnd < 50 && empire.force <= 3){
      empire.population *= 0.7;
      empire.food *= 0.7;
      system.empireStatusFloor();
      alertScreen.text.obj.setText("《軍事が3以下で発生》\n他国からの侵略を受けました……\n人口と食料が3割低下しました……");
      alertScreen.scene.appear();
    }else if(rnd < 60 && empire.politics <= 3){
      empire.money *= 0.8;
      empire.happiness *= 0.8;
      system.empireStatusFloor();
      alertScreen.text.obj.setText("《政治が3以下で発生》\n国内の官僚が汚職を働きました……\n所持金と幸福が2割低下しました……");
      alertScreen.scene.appear();
    }else if(rnd < 75 && empire.politics <= 3 && empire.force <= 3){
      empire.population *= 0.8;
      empire.happiness *= 0.8;
      empire.sightseeing -= 1;
      system.empireStatusFloor();
      alertScreen.text.obj.setText("《政治と軍事が3以下で発生》\n国内で他国によるテロ事件がおきました……\n人口と幸福が2割低下、観光が-1に……");
      alertScreen.scene.appear();
    }else{
      alertScreen.text.obj.setText("今年も無事に年を越すことができました。");
      alertScreen.scene.appear();
    }
  }
}
class Variable{
  constructor(){
    this.debugArray = [];
    this.buildingArray = [];
    this.builtBuildingArray = [];
    this.drawedBuildingArray = [];
    this.shopItemArray = [];
    this.pushAlertButtonToTitle = false;
    this.shopItemNum = 4;
    this.conglaturation = false;
    this.phase;
  }
}
class Building{
  constructor(i,n,ico,e,fn,bfn,sfn,p){
    this.id = i;
    this.name = n;
    this.iconNum = ico;
    this.explain = e;
    this.functionNum = fn;
    this.buyFunctionNum = bfn;
    this.sellFunctionNum = sfn;
    this.price = p;
  }
}
class Empire{
  constructor(){
    this.population; this.money; this.food; this.science;
  }
}
class BuildingFunc{
  constructor(){

  }
  timeSkip(num){
    switch(num){
      case 1:
        empire.population += 1;
      break;
      case 2:
        empire.population += 1;
        empire.food -= empire.population * 0.01;
      break;
      case 3:
        empire.food += 5;
        empire.money -= 5;
      break;
      case 4:
        empire.happiness += 5;
        empire.money -= 5;
      break;
      case 5:
        empire.population -= 5;
        empire.happiness += 3;
        empire.money += 3;
      break;
      case 6:
        empire.money += 10;
        empire.happiness *= 0.9;
      break;
      case 7:
        empire.money += 20;
        empire.happiness *= 0.9;
        empire.population *= 0.9;
      break;
      case 8:
        empire.money += empire.science;
        empire.happiness *= 0.95;
      break;
      case 9:
        empire.money += empire.science;
        empire.food += empire.science;
        empire.happiness *= 0.93;
      break;
      case 10:
        if(empire.happiness >= 50){
          empire.food += 1;
          empire.money += 1;
        }
      break;
      case 11:
        if(empire.happiness >= 75){
          empire.food += 5;
          empire.money += 5;
        }
      break;
      case 12:
        empire.food += empire.force;
        empire.population += empire.force;
        empire.happiness *= 0.9;
      break;
      case 13:
        empire.food *= 0.8;
        empire.population *= 0.8;
        empire.money += empire.force * 2;
      break;
      case 14:
        empire.happiness += empire.culture;
        empire.money += empire.culture;
      break;
      case 15:
        empire.happiness += empire.religion;
        empire.population += empire.religion;
        empire.food -= empire.religion;
      break;
      case 16:
        empire.money -= 1;
      break;
      case 17:
        var temp = empire.population * 0.2;
        empire.population += temp;
        empire.food -= temp;
      break;
      case 18:
        var temp = empire.population * 0.1;
        empire.population += temp;
        empire.money -= temp;
      break;
      case 19:
        empire.happiness += empire.force;
      break;
      case 20:
        empire.food += empire.food * empire.politics / 100;
      break;
      case 21:
        empire.money += empire.money * empire.sightseeing / 100;
      break;
      case 22:
        empire.population *= 0.99;
      break;
      case 23:
        empire.population += empire.year / 10;
      break;
      case 24:
        if(empire.year % 10 == 0){
          empire.science += 1;
        }
      break;
      case 25:
        empire.money -= 10;
      break;
      case 26:
        empire.population += empire.science * empire.religion;
      break;
      case 27:
        if(empire.year % 20 == 0){
          empire.religion += 1;
        }
      break;
      case 29:
        empire.food += empire.population * 0.5;
        empire.happiness -= empire.happiness * 0.1 + 5;
      break;
      case 30:
        empire.population *= 0.9;
      break;
      case 32:
        if(empire.sciene <= 5 && empire.culture >= 5){
          empire.happiness += empire.happiness * empire.religion / 100;
        }
      break;
      case 33:
        empire.population *= 0.95;
        empire.happiness *= 0.95;
      break;
      case 34:
        empire.population -= 10;
      break;
      case 35:
        empire.happiness += empire.happiness * empire.force / 100;
      break;
      case 36:
        empire.population += empire.population * empire.force / 100;
        empire.religion *= 0;
        empire.culture *= 0;
      break;
      case 37:
        empire.money += 60;
      break;
    }
  }
  buyFunc(num){
    switch(num){
      case 1:
        variable.shopItemNum += 1;
      break;
      case 2:
        empire.science += 1;
      break;
      case 3:
        empire.force += 1;
      break;
      case 4:
        empire.culture += 1;
      break;
      case 5:
        empire.religion += 1;
      break;
      case 6:
        empire.sightseeing += 1;
      break;
      case 7:
        empire.politics += 1;
      break;
      case 8:
        empire.money += 100;
      break;
      case 9:
        var temp = empire.happiness;
        empire.happiness = empire.population;
        empire.population = temp;
      break;
      case 10:
        empire.force += 1;
      break;
      case 11:
        empire.force += 1;
        empire.science += 1;
      break;
      case 25:
        empire.money += 500;
      break;
      case 27:
        empire.religion += 1;
      break;
      case 28:
        empire.money += 100;
        variable.shopItemNum += 2;
      break;
      case 31:
        empire.population = 100;
        empire.food = 100;
        empire.happiness = 100;
        empire.money = 100;
      break;
      case 33:
        empire.happiness *= 2;
      break;
      case 34:
        empire.force += 2;
      break;
      case 35:
        empire.population -= 100;
      break;
      case 36:
        empire.force += 1;
      break;
      case 37:
        empire.sightseeing -= 1;
        variable.shopItemNum += 4;
      break;
    }
  }
  sellFunc(num){
    switch(num){
      case 1:
        variable.shopItemNum -= 1;
      break;
      case 2:
        empire.science -= 1;
      break;
      case 3:
        empire.force -= 1;
      break;
      case 4:
        empire.culture -= 1;
      break;
      case 5:
        empire.religion -= 1;
      break;
      case 6:
        empire.sightseeing -= 1;
      break;
      case 7:
        empire.politics -= 1;
      break;
      case 8:
        empire.money -= 100;
      break;
      case 9:
        empire.force -= 1;
      break;
      case 10:
        empire.force -= 1;
        empire.science -= 1;
      break;
      case 25:
        empire.money -= 600;
      break;
      case 28:
        empire.happiness *= 0.1;
      break;
      case 33:
        empire.happiness *= 0.05;
      break;
      case 34:
        empire.force -= 1;
      break;
      case 35:
        empire.force -= 3;
      break;
      case 36:
        empire.force -= 2;
      break;
      case 37:
        variable.shopItemNum -= 4;
      break;
    }
  }
}
class Sound{
  constructor(){
    this.piano37; this.buy; this.button; this.shutter;
  }
  create(scene){
    this.piano37 = new PHASER_OZ.Sound(scene, "piano37", {volume: 0.1, loop: true});
    this.buy = new PHASER_OZ.Sound(scene, "register");
    this.button = new PHASER_OZ.Sound(scene, "button");
    this.shutter = new PHASER_OZ.Sound(scene, "shutter");
  }
}

var titleScreen = new TitleScreen();
var mainScreen = new MainScreen();
var alertScreen = new AlertScreen();
var system = new System();
var variable = new Variable();
var sound = new Sound();

var empire = new Empire();
var buildingFunc = new BuildingFunc();

var game = new Phaser.Game(config);
var gameScene;

function preload (){
  this.load.json("loadMaterial","./assets/loadMaterial.json");
  this.load.json("buildingData","./assets/buildingData.json");
  this.load.spritesheet("icon","./assets/icon.png",{frameWidth: 24, frameHeight: 24});
  this.load.audio("piano37","./assets/piano37.mp3");
  this.load.audio("register","./assets/register.mp3");
  this.load.audio("shutter","./assets/shutter.mp3");
  this.load.audio("button","./assets/button.wav");
}
function create (){
  gameScene = this;
  var json = this.cache.json.get("loadMaterial");
  PHASER_OZ.loadImageFromJson(this,json);
  PHASER_OZ.loadSpriteFromJson(this,json);
  this.load.once("complete",()=>{system.materialLoadEnd();});
  this.load.start();
  var data = this.cache.json.get("buildingData");
  for(var i = 0; i < BUILDING_VAR; i ++){
    variable.buildingArray[i] = new Building(data.building[i].id,data.building[i].name,data.building[i].iconNum,data.building[i].explain,data.building[i].functionNum,data.building[i].buyFunctionNum,data.building[i].sellFunctionNum,data.building[i].price);
  }
}
function update (){

}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
