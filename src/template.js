class Template {
  list = [];
  _num = 0;
  subscribers = [];

  add(newRow) {
    this.list.push({ id: this._num++, text: newRow });
    this._notificate();
  }

  remove(id) {
    const index = this.list.findIndex((item) => item.id == id);
    if (index !== -1) {
      this.list.splice(index, 1);
      this._notificate();
    }
  }

  edit(id, text) {
    this.list.find((item) => item.id == id).text = text;
    this._notificate();
  }

  subscribe(func) {
    this.subscribers.push(func);
  }

  unsubscribe(func) {
    this.subscribers.splice(this.subscribers.indexOf(func), 1);
  }

  _notificate() {
    this.subscribers.forEach((subFunc) => subFunc());
  }
}

export const template = new Template();
