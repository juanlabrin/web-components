const template = document.createElement('template');
template.innerHTML = `
<style>
stage{
    display: block;
    padding: 25px;
    margin: 25px;
    border: 1px solid #CCC;
}
stage button{
    position: relative;
    float: right;
    bottom: 10px;
}
.d-none{
    display: none;
}
</style>
<form></form>
`;

class DynamicStagesForm extends HTMLElement {

    static get observedAttributes(){
        return ['stages'];
    }

    constructor(){
        super();
        this._componentName = 'Dynamic Stages Form 1.0';
        this._componentAuthor = 'Juan Paulo Labrin (codigoweb.cl)';
        this._componentVersion = '1.0.1';
        this._componentUrl = 'https://codigoweb.cl/web-components/dynamic-stages-form';

        this._shadowRoot = this.attachShadow({ mode: 'open' });
        this._shadowRoot.appendChild(template.content.cloneNode(true));

        this.$form = this._shadowRoot.querySelector('form');

        this.$stages;
    }

    _drawStage(id){
        var stage = document.createElement('stage');
        var nextButton = document.createElement('button');
        var span = document.createElement('span');

        span.innerHTML = 'Stage '+id;

        if(id < this.$stages-1){
            nextButton.innerHTML = 'Next';
            nextButton.setAttribute('next', id+1);
            nextButton.addEventListener('click', function(e){
                e.preventDefault();
                console.log(this.getAttribute('next'));
            });
        } else {
            nextButton.innerHTML = 'Save';
            nextButton.setAttribute('save', true);
            nextButton.addEventListener('click', function(e){
                e.preventDefault();
                console.log(this.getAttribute('save'));
            });            
        }
        
        stage.setAttribute('id', id);
        stage.appendChild(nextButton);
        stage.appendChild(span);

        if(id!=0)
            stage.classList.add('d-none');

        return stage;
    }

    _addStages(stages){ 
        for(var s=0; s<stages; s++){            
            this.$form.append(this._drawStage(s));
        }    
    }

    get stages(){
        return this.getAttribute('stages');
    }

    set stages(newStages){
            this.setAttribute('stages', newStages);
    }

    connectedCallback(){
        if(this.hasAttribute('stages')){
            this.$stages = parseInt(this.stages);
            this._addStages(this.$stages);
        }
    }

    
}

customElements.define('dynamic-stages-form', DynamicStagesForm);