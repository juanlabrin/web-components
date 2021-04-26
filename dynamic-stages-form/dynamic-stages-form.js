import './dsf-stage.js';

const template = document.createElement('template');
template.innerHTML = `
<style>
.d-none{
    display: none;
}
</style>
<form></form>
`;

class DynamicStagesForm extends HTMLElement {

    static get observedAttributes() {
        return ['stages', 'stageSettings'];
    }

    constructor() {
        super();
        this._componentName = 'Dynamic Stages Form 1.0';
        this._componentAuthor = 'Juan Paulo Labrin (codigoweb.cl)';
        this._componentVersion = '1.0.1';
        this._componentUrl = 'https://codigoweb.cl/web-components/dynamic-stages-form';

        this._shadowRoot = this.attachShadow({ mode: 'open' });
        this._shadowRoot.appendChild(template.content.cloneNode(true));

        this.$form = this._shadowRoot.querySelector('form');

        this.$stages = [];
    }

    _drawStage(id, stageSettings) {
        var sroot = this._shadowRoot;
        var stage = document.createElement('dsf-stage');

        if (id < this.$stages.length - 1) {
            stage.$stageButton.setAttribute('next', id + 1);
            stage.$stageButton.innerHTML = 'Next';
            stage.$stageButton.addEventListener('click', function (e) {
                e.preventDefault();
                stage.classList.add('d-none');
                var next = 'stage-' + this.getAttribute('next');
                sroot.getElementById(next).classList.remove('d-none');
            });
        } else {
            stage.$stageButton.setAttribute('save', true);
            stage.$stageButton.innerHTML = 'Save';
            stage.$stageButton.addEventListener('click', function (e) {
                e.preventDefault();
                console.log(this.getAttribute('save'));
                alert('Form saved: ' + this.getAttribute('save'));
            });
        }

        stage.$stageSettings = stageSettings;
        stage.setAttribute('id', 'stage-' + id);

        if (id != 0)
            stage.classList.add('d-none');

        return stage;
    }

    _addStages(stages) {
        for (var s = 0; s < stages; s++) {
            // console.log(this.$stages[s]);         
            this.$form.append(this._drawStage(s, this.$stages[s]));
        }
    }

    get stages() {
        return this.$stages;
    }

    set stages(values) {
        this.$stages = values;
        this._addStages(this.$stages.length);
    }

    connectedCallback() {
        console.log('DSF Connected!');
    }

}

customElements.define('dynamic-stages-form', DynamicStagesForm);