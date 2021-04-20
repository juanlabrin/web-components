const template = document.createElement('template');
template.innerHTML = `
<style></style>
<form></form>
`;

class DynamicStagesForm extends HTMLElement {
    constructor(){
        super();
    }
}

customElements.define('dynamic-stage-form', DynamicStagesForm);