import { QtiRenderer } from '../renderer';
import { ValueElement } from '../types';

export class DebugView {
  private renderer: QtiRenderer;
  private container: HTMLElement | null = null;
  private button: HTMLElement | null = null;
  private panel: HTMLElement | null = null;
  private isOpen: boolean = false;

  constructor(renderer: QtiRenderer) {
    this.renderer = renderer;
  }

  mount(target: HTMLElement) {
    // Create styles
    const styleId = 'qti-debug-styles';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = `
        .qti-debug-btn {
          position: fixed;
          bottom: 20px;
          right: 20px;
          width: 2.5rem;
          height: 2.5rem;
          border-radius: 50%;
          background: #333333;
          color: white;
          border: none;
          cursor: pointer;
          z-index: 9999;
          box-shadow: 0 2px 10px rgba(0,0,0,0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          transition: transform 0.2s;
        }
        .qti-debug-btn:hover {
          transform: scale(1.1);
        }
        .qti-debug-panel {
          position: fixed;
          bottom: 80px;
          right: 20px;
          width: 400px;
          max-height: 60vh;
          background: white;
          border: 1px solid #ddd;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          z-index: 9999;
          display: none;
          flex-direction: column;
          font-family: monospace;
          font-size: 12px;
        }
        .qti-debug-panel.open {
          display: flex;
        }
        .qti-debug-header {
          padding: 10px;
          background: #f5f5f5;
          border-bottom: 1px solid #ddd;
          font-weight: bold;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .qti-debug-close {
          border: none;
          background: none;
          cursor: pointer;
          font-size: 16px;
          color: #666;
        }
        .qti-debug-content {
          padding: 10px;
          overflow-y: auto;
        }
        .qti-debug-section {
          margin-bottom: 15px;
        }
        .qti-debug-section-title {
          font-weight: bold;
          color: #666;
          margin-bottom: 5px;
          border-bottom: 1px solid #eee;
          padding-bottom: 2px;
        }
        .qti-debug-item {
          margin-left: 10px;
          margin-bottom: 4px;
          display: flex;
          align-items: flex-start;
          flex-wrap: wrap;
        }
        .qti-debug-key {
          color: #d63384;
          margin-right: 5px;
          white-space: nowrap;
          font-weight: bold;
        }
        .qti-debug-val-container {
          display: flex;
          flex-direction: column;
          flex: 1;
        }
        .qti-debug-val {
          color: #0d6efd;
          word-break: break-all;
        }
        .qti-debug-meta {
          color: #888;
          font-size: 0.85em;
          margin-top: 2px;
        }
      `;
      document.head.appendChild(style);
    }

    this.container = document.createElement('div');
    this.container.className = 'qti-debug-container';

    this.button = document.createElement('button');
    this.button.className = 'qti-debug-btn';
    this.button.innerHTML = '{}';
    this.button.style.fontFamily = 'monospace';
    this.button.style.fontSize = '1rem';
    this.button.style.fontWeight = 'bold';
    this.button.title = 'QTI Debug';
    this.button.onclick = () => this.toggle();

    this.panel = document.createElement('div');
    this.panel.className = 'qti-debug-panel';
    this.panel.innerHTML = `
      <div class="qti-debug-header">
        <span>Debug State</span>
        <button class="qti-debug-close">✕</button>
      </div>
      <div class="qti-debug-content"></div>
    `;

    const closeBtn = this.panel.querySelector('.qti-debug-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.toggle());
    }

    this.container.appendChild(this.button);
    this.container.appendChild(this.panel);
    target.appendChild(this.container);

    this.update();
  }

  toggle() {
    this.isOpen = !this.isOpen;
    if (this.panel) {
      this.panel.classList.toggle('open', this.isOpen);
      if (this.isOpen) {
        this.update();
      }
    }
  }

  update() {
    if (!this.panel || !this.isOpen) return;

    const content = this.panel.querySelector('.qti-debug-content');
    if (!content) return;

    content.innerHTML = `
      ${this.renderSection('Outcome Values', this.renderer.getOutcomeValues())}
      ${this.renderSection('Variables', this.renderer.getVariables())}
      ${this.renderSection('Correct Responses', this.renderer.getCorrectResponses())}
    `;
  }

  private renderSection(title: string, map: Map<string, ValueElement>): string {
    let items = '';
    map.forEach((value, key) => {
      items += `
        <div class="qti-debug-item">
          <span class="qti-debug-key">${key}:</span>
          <div class="qti-debug-val-container">
            ${this.formatValue(value)}
          </div>
        </div>`;
    });

    if (map.size === 0) {
      items = '<div class="qti-debug-item" style="color:#999">Empty</div>';
    }

    return `
      <div class="qti-debug-section">
        <div class="qti-debug-section-title">${title}</div>
        ${items}
      </div>
    `;
  }

  private formatValue(valueElement: ValueElement): string {
    const { value, cardinality, valueType } = valueElement;

    let formattedValue = '';

    if (value === undefined) {
      formattedValue = 'undefined';
    } else if (value === null) {
      formattedValue = 'null';
    } else if (value instanceof Map) {
      formattedValue = JSON.stringify(Object.fromEntries(value));
    } else if (value instanceof Set) {
      formattedValue = JSON.stringify(Array.from(value));
    } else {
      try {
        formattedValue = JSON.stringify(value);
      } catch (e) {
        formattedValue = String(value);
      }
    }

    const typeInfo = `[${cardinality}:${valueType}]`;

    return `
      <span class="qti-debug-val">${formattedValue}</span>
      <span class="qti-debug-meta" title="Cardinality: ${cardinality}, Type: ${valueType}">${typeInfo}</span>
    `;
  }
}
