/*

phaserOZ.js
ver 0.0.2
@oz4point5

import { PHASER_OZ } from "./assets/phaserOZ.js";
if (typeof PHASER_OZ === "undefined"){
  PHASER_OZ = {};
}

*/

export var PHASER_OZ = {};

const DEFAULT_X = -1000;
const DEFAULT_Y = -1000;
const DEFAULT_TXT = "DefaultText";
const DEFAULT_FONT_FAMILY = "Yu Gothic , 游ゴシック, YuGothic, 游ゴシック体 , ヒラギノ角ゴ Pro W3 , メイリオ , sans-serif";
const DEFAULT_KEY = "KEY";
const DEFAULT_FRAME = 0;
const DEFAULT_WIDTH = 48;
const DEFAULT_HEIGHT = 48;
const DEFAULT_FRAME_X = 16;
const DEFAULT_FRAME_Y = 16;
const DEFAULT_DEFAULT_Y = -2;
const DEFAULT_OVER_Y = -1;
const DEFAULT_PUSH_Y = 1;
const DEFAULT_COLOR = 0xffffff;
const DEFAULT_GAME_WIDTH = 480;
const DEFAULT_GAME_HEIGHT = 480;

PHASER_OZ.Object = class Object{
  constructor(){
    this.obj;
    this.scene = arguments[0];
  }
  setXY(x,y){
    this.obj.setX(x);
    this.obj.setY(y);
  }
  moveXY(x,y){
    this.setXY(this.obj.x + x, this.obj.y + y);
  }
  hide(){
    this.setXY(DEFAULT_X,DEFAULT_Y);
  }
}
PHASER_OZ.Text = class Text extends PHASER_OZ.Object{
  constructor(){
    var args = Array.from(arguments);
    super(args[0]);
    args[1] = args[1] == undefined ? DEFAULT_X : args[1];
    args[2] = args[2] == undefined ? DEFAULT_Y : args[2];
    args[3] = args[3] == undefined ? DEFAULT_TXT : args[3];
    args[4] = args[4] == undefined ? DEFAULT_FONT_FAMILY : args[4];
    this.obj = args[0].add.text(args[1],args[2],args[3],args[4]);
    this.obj.setOrigin(0.5,0.5);
    this.obj.setAlign("center");
    this.obj.setPadding(5);
    this.obj.setLineSpacing(5);
  }
}
PHASER_OZ.Image = class Image extends PHASER_OZ.Object{
  constructor(){
    var args = Array.from(arguments);
    super(args[0]);
    args[1] = args[1] == undefined ? DEFAULT_X : args[1];
    args[2] = args[2] == undefined ? DEFAULT_Y : args[2];
    args[3] = args[3] == undefined ? DEFAULT_KEY : args[3];
    args[4] = args[4] == undefined ? DEFAULT_FRAME : args[4];
    this.obj = args[0].add.image(args[1],args[2],args[3],args[4]);
  }
}
PHASER_OZ.Sprite = class Sprite extends PHASER_OZ.Object{
  constructor(){
    var args = Array.from(arguments);
    super(args[0]);
    args[1] = args[1] == undefined ? DEFAULT_X : args[1];
    args[2] = args[2] == undefined ? DEFAULT_Y : args[2];
    args[3] = args[3] == undefined ? DEFAULT_KEY : args[3];
    args[4] = args[4] == undefined ? DEFAULT_FRAME : args[4];
    this.obj = args[0].add.sprite(args[1],args[2],args[3],args[4]);
  }
}
PHASER_OZ.Sound = class Sound extends PHASER_OZ.Object{
  constructor(){
    var args = Array.from(arguments);
    super(args[0]);
    args[1] = args[1] == undefined ? DEFAULT_KEY : args[1];
    args[2] = args[2] == undefined ? {} : args[2];
    this.obj = args[0].sound.add(args[1],args[2]);
  }
}
PHASER_OZ.Rectangle = class Rectangle extends PHASER_OZ.Object{
  constructor(){
    var args = Array.from(arguments);
    super(args[0]);
    args[1] = args[1] == undefined ? DEFAULT_X : args[1];
    args[2] = args[2] == undefined ? DEFAULT_Y : args[2];
    args[3] = args[3] == undefined ? DEFAULT_WIDTH : args[3];
    args[4] = args[4] == undefined ? DEFAULT_HEIGHT : args[4];
    args[5] = args[5] == undefined ? DEFAULT_COLOR : args[5];
    args[6] = args[6] == undefined ? 1 : args[6];
    this.obj = args[0].add.rectangle(args[1],args[2],args[3],args[4],args[5],args[6]);
  }
}
PHASER_OZ.Veil = class Veil extends PHASER_OZ.Rectangle{
  constructor(){
    var args = Array.from(arguments);
    super(args[0],args[1],args[2],DEFAULT_GAME_WIDTH,DEFAULT_GAME_HEIGHT,args[3],args[4]);
    this.obj.setInteractive();
  }
}
PHASER_OZ.AnimatedObject = class AnimatedObject extends PHASER_OZ.Sprite{
  constructor(){
    var args = Array.from(arguments);
    super(args[0],args[1],args[2],args[3],args[4]);
  }
  addAnimation(k,s,e,f,r){
    this.scene.anims.create({
        key: k,
        frames: this.scene.anims.generateFrameNumbers(this.obj.texture.key, { start: s, end: e }),
        frameRate: f,
        repeat: r
    });
  }
}
PHASER_OZ.ObjectGroup = class ObjectGroup{
  constructor(){
    var args = Array.from(arguments);
    this.group = [];
    this.centerX = args[0] == undefined ? DEFAULT_X : args[0];
    this.centerY = args[1] == undefined ? DEFAULT_Y : args[1];
  }
  setXY(x,y){
    var diffX = x - this.centerX;
    var diffY = y - this.centerY;
    this.centerX = x;
    this.centerY = y;
    for(var i = 0; i < this.group.length; i ++){
      this.group[i].setXY(this.group[i].obj.x + diffX, this.group[i].obj.y + diffY);
    }
  }
  moveXY(x,y){
    this.setXY(this.centerX + x, this.centerY + y);
  }
  hide(){
    this.setXY(DEFAULT_X,DEFAULT_Y);
  }
  setInteractive(){
    for(var i = 0; i < this.group.length; i ++){
      this.group[i].obj.setInteractive();
    }
  }
  on(str,f){
    this.setInteractive();
    for(var i = 0; i < this.group.length; i ++){
      this.group[i].obj.on(str,f);
    }
  }
}
PHASER_OZ.Window = class Window extends PHASER_OZ.ObjectGroup{
  constructor(){
    var args = Array.from(arguments);
    //scene,x,y,key,width,height,text
    args[1] = args[1] == undefined ? DEFAULT_X : args[1];
    args[2] = args[2] == undefined ? DEFAULT_Y : args[2];
    args[3] = args[3] == undefined ? DEFAULT_KEY : args[3];
    args[4] = args[4] == undefined ? DEFAULT_WIDTH : args[4];
    args[5] = args[5] == undefined ? DEFAULT_HEIGHT : args[5];
    args[6] = args[6] == undefined ? DEFAULT_TXT : args[6];
    args[7] = args[7] == undefined ? DEFAULT_FRAME : args[7];
    args[8] = args[8] == undefined ? DEFAULT_FRAME_X : args[8];
    args[9] = args[9] == undefined ? DEFAULT_FRAME_Y : args[9];
    super(args[1],args[2]);
    this.group[0] = new PHASER_OZ.Sprite(args[0], args[1] - args[4] / 2 + args[8] / 2, args[2] - args[5] / 2 + args[9] / 2, args[3], args[7]);
    this.group[1] = new PHASER_OZ.Sprite(args[0], args[1], args[2] - args[5] / 2 + args[9] / 2, args[3], args[7] + 1);
    this.group[1].obj.setScale(args[4] / args[8] - 2,1);
    this.group[2] = new PHASER_OZ.Sprite(args[0], args[1] + args[4] / 2 - args[8] / 2, args[2] - args[5] / 2 + args[9] / 2, args[3], args[7] + 2);
    this.group[3] = new PHASER_OZ.Sprite(args[0], args[1] - args[4] / 2 + args[8] / 2, args[2], args[3], args[7] + 3);
    this.group[3].obj.setScale(1,args[5] / args[9] - 2);
    this.group[4] = new PHASER_OZ.Sprite(args[0], args[1], args[2], args[3], args[7] + 4);
    this.group[4].obj.setScale(args[4] / args[8] - 2,args[5] / args[9] - 2);
    this.group[5] = new PHASER_OZ.Sprite(args[0], args[1] + args[4] / 2 - args[8] / 2, args[2], args[3], args[7] + 5);
    this.group[5].obj.setScale(1,args[5] / args[9] - 2);
    this.group[6] = new PHASER_OZ.Sprite(args[0], args[1] - args[4] / 2 + args[8] / 2, args[2] + args[5] / 2 - args[9] / 2, args[3], args[7] + 6);
    this.group[7] = new PHASER_OZ.Sprite(args[0], args[1], args[2] + args[5] / 2 - args[9] / 2, args[3], args[7] + 7);
    this.group[7].obj.setScale(args[4] / args[8] - 2,1);
    this.group[8] = new PHASER_OZ.Sprite(args[0], args[1] + args[4] / 2 - args[8] / 2, args[2] + args[5] / 2 - args[9] / 2, args[3], args[7] + 8);
    this.group[9] = new PHASER_OZ.Text(args[0],args[1],args[2],args[6]);
  }
}
PHASER_OZ.Button = class Button extends PHASER_OZ.Window{
  constructor(){
    var args = Array.from(arguments);
    super(args[0],args[1],args[2],args[3],args[4],args[5],args[6],args[7],args[8],args[9]);
    args[10] = args[10] == undefined ? DEFAULT_DEFAULT_Y : args[10];
    args[11] = args[11] == undefined ? DEFAULT_OVER_Y : args[11];
    args[12] = args[12] == undefined ? DEFAULT_PUSH_Y : args[12];
    this.group[9].moveXY(0,args[10]);
    this.on("pointerout",()=>{this.pointer(args[10],0);});
    this.on("pointerover",()=>{this.pointer(args[11],9);});
    this.on("pointerdown",()=>{this.pointer(args[12],18);});
    this.on("pointerup",()=>{this.pointer(args[11],9);});
  }
  pointer(n,s){
      for(var i = 0; i < 9; i ++){
        this.group[i].obj.setFrame(i + s);
      }
      this.group[9].setXY(this.centerX,this.centerY + n);
  }
}
PHASER_OZ.Scene = class Scene{
  constructor(){
    this.group = [];
    this.childX = [];
    this.childY = [];
  }
  add(i,x,y){
    this.group[this.group.length] = i;
    this.childX[this.group.length - 1] = x;
    this.childY[this.group.length - 1] = y;
  }
  appear(){
    for(var i = 0; i < this.group.length; i ++){
      this.group[i].setXY(this.childX[i],this.childY[i]);
    }
  }
  hide(){
    for(var i = 0; i < this.group.length; i ++){
      this.group[i].setXY(DEFAULT_X,DEFAULT_Y);
    }
  }
}
PHASER_OZ.loadImageFromJson = function loadImageFromJson(scene,json){
  for(var i = 0; i < json.image.length; i ++){
    scene.load.image(json.image[i].key,json.image[i].path);
  }
}
PHASER_OZ.loadSpriteFromJson = function loadSpriteFromJson(scene,json){
  for(var i = 0; i < json.spritesheet.length; i ++){
    scene.load.spritesheet(json.spritesheet[i].key,json.spritesheet[i].path,{frameWidth: 16, frameHeight: 16});
  }
}
