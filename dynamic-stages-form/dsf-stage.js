const template = document.createElement('template');
template.innerHTML = `
<style>
.stage-content{
    display: block;
    padding: 25px;
    margin: 25px;
    border: 1px solid #CCC;
}
.stage-content button{
    position: relative;
    float: right;
    bottom: 10px;
}
</style>
<div class="stage-content">
<button></button>
</div>
`;

class DSFStage extends HTMLElement {
    constructor(){
        super();
        this._componentName = 'Stage for DSF 1.0';
        this._componentAuthor = 'Juan Paulo Labrin (codigoweb.cl)';
        this._componentVersion = '1.0.1';
        this._componentUrl = 'https://codigoweb.cl/web-components/dynamic-stages-form';

        this._shadowRoot = this.attachShadow({ mode: 'open' });
        this._shadowRoot.appendChild(template.content.cloneNode(true));

        this.$stageContent = this._shadowRoot.querySelector('div');
        this.$stageButton = this._shadowRoot.querySelector('button');

        this.$stageSettings = [];
    }

    _renderStage(settings){
        console.log(settings);
        var label = document.createElement('label')
        var element = document.createElement(settings.element);

        label.setAttribute('for', settings.name);
        label.innerHTML = settings.label;
        
        element.setAttribute('type', settings.type);
        element.setAttribute('name', settings.name);

        this.$stageContent.appendChild(label);
        this.$stageContent.appendChild(element);
    }

    connectedCallback() {
        console.log('Stage Connected !');
        this._renderStage(this.$stageSettings);
    }

}

customElements.define('dsf-stage', DSFStage);