"use strict";

class FilterSelect {
  constructor(root, label, options, onChange) {
    this.root = root;
    this.options = options;
    this.onChange = onChange;
    this.selected = 0;
    this.active = 0;
    this.typed = "";
    const id = root.id;
    root.innerHTML = `
      <span id="${id}-label" class="sr-only"></span>
      <button id="${id}-trigger" class="filter-trigger" type="button" role="combobox"
        aria-haspopup="listbox" aria-expanded="false" aria-controls="${id}-options"
        aria-labelledby="${id}-label ${id}-value">
        <span id="${id}-value" class="filter-value"></span>
        <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="m4 6 4 4 4-4" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </button>
      <ul id="${id}-options" class="filter-options" role="listbox" aria-labelledby="${id}-label" hidden></ul>`;
    root.querySelector(".sr-only").textContent = label;
    this.trigger = root.querySelector("button");
    this.display = root.querySelector(".filter-value");
    this.list = root.querySelector("ul");
    this.items = options.map(([,title],index) => {
      const item = document.createElement("li");
      item.id = `${id}-option-${index}`;
      item.setAttribute("role","option");
      item.dataset.index = index;
      item.textContent = title;
      this.list.append(item);
      return item;
    });
    this.update();
    this.trigger.addEventListener("click",() => this.list.hidden ? this.open() : this.close());
    this.trigger.addEventListener("keydown",event => this.handleKey(event));
    document.addEventListener("focusin",event => {
      if (!root.contains(event.target)) this.close();
    });
    this.list.addEventListener("pointerdown",event => {
      if (event.pointerType === "mouse" && event.target.closest("[role=option]")) event.preventDefault();
    });
    this.list.addEventListener("click",event => {
      const item = event.target.closest("[role=option]");
      if (item) this.choose(Number(item.dataset.index));
    });
    document.addEventListener("pointerdown",event => {
      if (!root.contains(event.target)) this.close();
    });
  }

  get value() {
    return this.options[this.selected][0];
  }

  update() {
    this.display.textContent = this.options[this.selected][1];
    this.root.classList.toggle("has-value",Boolean(this.value));
    this.items.forEach((item,index) => item.setAttribute("aria-selected",String(index === this.selected)));
  }

  reset() {
    this.selected = 0;
    this.close();
    this.update();
  }

  open(index = this.selected) {
    this.list.hidden = false;
    this.trigger.setAttribute("aria-expanded","true");
    this.move(index);
  }

  close() {
    this.list.hidden = true;
    this.trigger.setAttribute("aria-expanded","false");
    this.trigger.removeAttribute("aria-activedescendant");
    this.typed = "";
  }

  move(index) {
    this.items[this.active].classList.remove("is-active");
    this.active = Math.max(0,Math.min(index,this.items.length - 1));
    const item = this.items[this.active];
    item.classList.add("is-active");
    this.trigger.setAttribute("aria-activedescendant",item.id);
    const itemRect = item.getBoundingClientRect();
    const listRect = this.list.getBoundingClientRect();
    if (itemRect.top < listRect.top) this.list.scrollTop += itemRect.top - listRect.top;
    if (itemRect.bottom > listRect.bottom) this.list.scrollTop += itemRect.bottom - listRect.bottom;
  }

  choose(index) {
    const changed = index !== this.selected;
    this.selected = index;
    this.update();
    this.close();
    this.trigger.focus();
    if (changed) this.onChange();
  }

  handleKey(event) {
    const {key} = event;
    const open = !this.list.hidden;
    if (key === "Tab") {
      this.close();
      return;
    }
    if (key === "Escape" && open) {
      event.preventDefault();
      this.close();
      return;
    }
    if (["Enter"," ","ArrowDown","ArrowUp","Home","End"].includes(key)) {
      event.preventDefault();
      if (key === "Enter" || key === " ") {
        if (open) this.choose(this.active);
        else this.open();
        return;
      }
      const index = key === "Home" ? 0 : key === "End" ? this.items.length - 1
        : open ? this.active + (key === "ArrowDown" ? 1 : -1) : this.selected;
      if (open) this.move(index);
      else this.open(index);
      return;
    }
    if (key.length !== 1 || event.ctrlKey || event.metaKey || event.altKey) return;
    event.preventDefault();
    if (!open) this.open();
    const now = Date.now();
    this.typed = now - this.lastTyped < 650 ? this.typed + key.toLowerCase() : key.toLowerCase();
    this.lastTyped = now;
    const repeated = [...this.typed].every(letter => letter === this.typed[0]);
    const query = repeated ? this.typed[0] : this.typed;
    const start = this.active + (repeated ? 1 : 0);
    for (let offset = 0; offset < this.options.length; offset++) {
      const index = (start + offset) % this.options.length;
      if (this.options[index][1].toLowerCase().startsWith(query)) {
        this.move(index);
        break;
      }
    }
  }
}
