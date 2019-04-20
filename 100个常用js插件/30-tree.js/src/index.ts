interface Options {
  el: string;
  nodes?: Tree[];
  checkbox?: boolean;
  accordion?: boolean;
  onCheck?(e: MouseEvent): void;
  onExpand?(e: MouseEvent): void;
}

interface Tree {
  value: string;
  label: string;
  checked?: boolean;
  expanded?: boolean;
  children?: Tree[];
}

interface Configs extends Tree {
  inputTarget?: HTMLElement;
  path?: string;
  children?: Configs[];
}

import './index.scss';
import {
  insertHtml,
  removeElement,
  hasClass,
  toggleClass,
  removeClass,
  closest
} from './utils';

class Tree {
  private options: Options;
  private configs: Configs[];
  private containerEl: HTMLElement;
  private treeEl: HTMLElement;

  private constructor(options: Options) {
    this.options = {
      ...Tree.DEFAULTS,
      ...options
    };

    this.containerEl = document.querySelector(options.el);
    this._eventBind = this._eventBind.bind(this);
    this._init();
  }

  static get DEFAULTS(): Options {
    return {
      el: '',
      nodes: [],
      checkbox: true,
      accordion: true,
      onCheck: function() {},
      onExpand: function() {}
    };
  }

  private _init(): this {
    this.configs = this._setPath(this.options.nodes);
    this._creatDom();
    this.configs = this._getPath(this.configs);
    this.treeEl.addEventListener('click', this._eventBind);
    return this;
  }

  private _creatDom(): void {
    let self = this;
    let htmlStr = (function getStr(tree: Configs[]): string {
      return tree
        .map(item => {
          return `
          <li class="tree-parent${item.expanded ? ' expanded' : ''}">
            <div class="tree-text">
              ${
                item.children && item.children.length > 0
                  ? '<span class="tree-expanded"></span>'
                  : ''
              }
              ${
                self.options.checkbox
                  ? `
                <span class="tree-checked">
                  <input class="tree-checkbox" type="checkbox" data-tree-path="${
                    item.path
                  }" value="${item.value}" ${item.checked ? ' checked' : ''}>
                </span>
                `
                  : ''
              }
              <span class="tree-label">${item.label}</span>
            </div>
            ${
              item.children && item.children.length > 0
                ? `<ol> ${getStr(item.children)} </ol>`
                : ''
            }
          </li>
        `;
        })
        .join('');
    })(this.configs);
    insertHtml(
      this.containerEl,
      'beforeend',
      `<ol class="tree-el"> ${htmlStr} </ol>`
    );
    this.treeEl = this.containerEl.querySelector('.tree-el');
  }

  private _eventBind(e: MouseEvent): void {
    const target = e.target;
    if (hasClass(<Element>target, 'tree-expanded')) {
      this._expandedEvent(e);
      this.options.onExpand(e);
    } else if (hasClass(<Element>target, 'tree-checkbox')) {
      this._checkedEvent(e);
      this.options.onCheck(e);
    }
  }

  private _expandedEvent(e: MouseEvent): void {
    const liParent = closest(<Element>e.target, '.tree-parent');
    toggleClass(liParent, 'expanded');
    if (this.options.accordion) {
      const olParent = closest(<Element>e.target, 'ol');
      Array.from(olParent.children)
        .filter(children => children !== liParent)
        .forEach(tree => removeClass(tree, 'expanded'));
    }
  }

  private _checkedEvent(e: MouseEvent): void {
    const target = <HTMLInputElement>e.target;
    const checked = target.checked;
    const path: number[] = target.dataset.treePath.split('.').map(Number);
    let currentConfig = this._getCurrentConfig(path);

    // 向下传播
    (function spreadDown(config: Configs): void {
      if (config.children && config.children.length > 0) {
        config.children.forEach(item => {
          (<HTMLInputElement>item.inputTarget).checked = checked;
          (<HTMLInputElement>item.inputTarget).indeterminate = false;
          spreadDown(item);
        });
      }
    })(currentConfig);

    // 向上传播
    let pathCopy = [...path];
    let self = this;
    (function spreadUp(): void {
      if (pathCopy.length <= 1) return;
      pathCopy.pop();
      let parentConfig = self._getCurrentConfig(pathCopy);
      let checkboxsLength = parentConfig.children.length;
      let checkboxsCheckedLength = parentConfig.children.filter(
        item => (<HTMLInputElement>item.inputTarget).checked
      ).length;
      let checkboxsIndeterminateLength = parentConfig.children.filter(
        item => (<HTMLInputElement>item.inputTarget).indeterminate
      ).length;
      (<HTMLInputElement>parentConfig.inputTarget).indeterminate =
        (checkboxsLength > checkboxsCheckedLength &&
          checkboxsCheckedLength !== 0) ||
        checkboxsIndeterminateLength > 0;
      (<HTMLInputElement>parentConfig.inputTarget).checked =
        checkboxsLength === checkboxsCheckedLength;
      spreadUp();
    })();
  }

  private _getCurrentConfig(path: number[]): Configs {
    let currentConfig = this.configs[path[0]];
    if (path.length === 1) return currentConfig;
    for (let index = 1; index < path.length; index++) {
      currentConfig = currentConfig.children[path[index]];
    }
    return currentConfig;
  }

  private _setPath(tree: Tree[], deep?: string): Configs[] {
    return (function setPath(tree, deep): Configs[] {
      return tree.map((item, index) => {
        let path = `${deep ? deep + '.' : ''}${index}`;
        return Object.assign({}, item, {
          path: path,
          children: item.children ? setPath(item.children, path) : []
        });
      });
    })(tree, deep);
  }

  private _getPath(configs: Configs[]): Configs[] {
    let self = this;
    return (function getPath(configs): Configs[] {
      return configs.map(item => {
        return Object.assign({}, item, {
          inputTarget: self.containerEl.querySelector(
            `[data-tree-path='${item.path}']`
          ),
          children: item.children ? getPath(item.children) : []
        });
      });
    })(configs);
  }

  public getChecked(): string[] {
    let checkedList: string[] = [];
    (function getChecked(configs: Configs[]) {
      configs.forEach(item => {
        if ((<HTMLInputElement>item.inputTarget).checked) {
          checkedList.push(item.value);
        }
        item.children && getChecked(item.children);
      });
    })(this.configs);
    return checkedList;
  }

  public destroy(): this {
    this.containerEl.removeEventListener('click', this._eventBind);
    removeElement(this.treeEl);
    return this;
  }
}

(<any>window).Tree = Tree;
export default Tree;
