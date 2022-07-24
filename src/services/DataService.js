export default class DataService {
  _classes = [];
  _maxClassId = 0;
  _decks = [];
  _maxDeckId = 0;
  _cards = [];
  _maxCardId = 0;
  _loadedDeckId = 0;
  constructor() {
    this._classes = this.checkCreateGetTable("classes");
    this._decks = this.checkCreateGetTable("decks");
  }
  getData(type, filter) {
    if (type == "classes") return this._classes;
    if (type == "decks") return this.getDeck(filter);
    return this.getCards(filter);
  }
  getClasses() {
    return this._classes;
  }
  getClass(id) {
    return this._classes.find((x) => x.id == id);
  }
  getDecks(classId) {
    let filtered = this._decks?.filter((x) => x.number1 == classId);
    if (!filtered) filtered = [];
    return filtered;
  }
  getDeck(id) {
    return this._decks.find((x) => x.id == id);
  }
  getCards(deckId) {
    if (deckId != this._loadedDeckId) {
      this._cards = this.checkCreateGetTable("deck-" + deckId);
      this._maxCardId = this.findMaxId(this._cards);
      this._loadedDeckId = parseInt(deckId);
    }
    return this._cards;
  }
  getCard(id) {
    return this._cards.find((x) => x.id == id);
  }
  addClass(title, detail) {
    this._maxClassId++;
    let item = {
      id: this._maxClassId,
      title: title,
      detail: detail,
      number2: 0,
    };
    this._classes.push(item);
    this.saveTable("classes", this._classes);
    return item;
  }
  addDeck(title, detail, classId) {
    this._maxDeckId++;
    let item = {
      id: this._maxDeckId,
      title: title,
      detail: detail,
      number1: parseInt(classId),
      number2: 0,
    };
    this._decks.push(item);
    this.saveTable("decks", this._decks);
    return item;
  }
  addCard(title, detail) {
    this._maxCardId++;
    let item = {
      id: this._maxCardId,
      title: title,
      detail: detail,
      number1: this._loadedDeckId,
      number2: -1,
    };
    this._cards.push(item);
    this.saveCards();
  }
  saveCards() {
    let a = this._loadedDeckId;
    let changingDeck = this._decks.find((x) => x.id == a);
    let changingClass = this._classes.find((x) => x.id == changingDeck.number1);
    changingClass.number2 -= changingDeck.number2;
    changingClass.number2 += this._cards.length;
    changingDeck.number2 = this._cards.length;
    this.saveTable("classes", this._classes);
    this.saveTable("decks", this._decks);
    this.saveTable("deck-" + this._loadedDeckId, this._cards);
  }
  saveTable(tableName, tableData) {
    localStorage.setItem(tableName, JSON.stringify(tableData));
  }
  deleteDeck(id) {
    let item = this.getDeck(id);
    if (item.number2 != 0) return false;
    localStorage.removeItem("deck-" + item.id);
    this._maxDeckId = this.findMaxId(this._decks);
    return this.remove("decks", this._decks, item);
  }
  deleteClass(id) {
    let item = this.getClass(id);
    if (item.number2 != 0) return false;
    if (this._decks.find((x) => x.number1 == item.id)) return false;
    this._maxClassId = this.findMaxId(this._classes);
    return this.remove("classes", this._classes, item);
  }
  deleteCard(id) {
    let item = this._cards.find((x) => x.id == id);
    this._cards.splice(this._cards.indexOf(item), 1);
    this._maxCardId = this.findMaxId(this._cards);
    this.saveCards();
    return true;
  }
  remove(tableName, tableData, item) {
    tableData.splice(tableData.indexOf(item), 1);
    this.saveTable(tableName);
    return true;
  }
  checkCreateGetTable(tableName) {
    let a = localStorage.getItem(tableName);
    if (a != null && a != "undefined") return JSON.parse(a);
    localStorage.setItem(tableName, JSON.stringify([]));
    return [];
  }
  findMaxId(tableData) {
    if (!tableData) return 0;
    let max = 0;
    let length = tableData.length;
    console.log(tableData);
    debugger;
    if (length > 0) max = tableData[length - 1].id;
    return max;
  }
}
