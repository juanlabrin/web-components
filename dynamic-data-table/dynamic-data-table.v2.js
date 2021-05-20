const template = document.createElement('template');
template.innerHTML = `
<style>
@import "/css/bootstrap.min.css";
@import "/css/all.css";
</style>
<div class="alert alert-info d-none">
    <span id="alert-content"></span>
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
    </button>
</div>
<table class="table table-sm w-100"></table>
`;

class DynamicDataTable extends HTMLElement {

    static get observedAttributes() {
        return ['route', 'data-url', 'columns'];
    }

    constructor() {
        super();
        this._componentName = 'Dynamic Data Table 2.0';
        this._componentAuthor = 'Codigo Web SpA';
        this._componentVersion = '2.0.1';
        this._componentUrl = 'https://codigoweb.cl/web-components/dynamic-data-table';

        this._shadowRoot = this.attachShadow({ mode: 'open' });
        this._shadowRoot.appendChild(template.content.cloneNode(true));

        this.$dynamicTable = this._shadowRoot.querySelector('table');
        this.$messageBox = this._shadowRoot.querySelector('.alert');
        this.$messageBoxContent = this._shadowRoot.querySelector('#alert-content');
        this.$messageBoxBtnClose = this._shadowRoot.querySelector('.close');

        this.$messageBoxBtnClose.addEventListener('click', this._messageBoxClose.bind(this));

        this.$columns = [];
        this.$route = 'default';
    }

    _messageBoxClose() {
        this.$messageBoxContent.innerHTML = '';
        this.$messageBox.classList.add('d-none');
    }

    _autoClose() {
        setTimeout(() => {
            this.$messageBoxContent.innerHTML = '';
            this.$messageBox.classList.add('d-none');
        }, 5000);
    }

    _drawTable(data) {
        console.log(data);      

        data.forEach((element, key) => {
            // console.log(element, key);
            var row = this.$dynamicTable.insertRow(key);
            this.$columns.forEach((column, key) => {
                row.insertCell(key).innerHTML = element[column];
            });
            row.insertCell().innerHTML = '<div class="btn-group"><a class="btn btn-sm btn-primary" href="/'+this.$route+'/'+element['_id']+'/info"><i class="fas fa-info-circle"></i></a><a class="btn btn-sm btn-success" href="/'+this.$route+'/'+element['_id']+'/edit"><i class="fas fa-edit"></i></a></div>';
        });

        const head = this.$dynamicTable.createTHead().insertRow(0);
        this.$columns.forEach((column, i) => {
            head.insertCell(i).outerHTML = '<th>' + column.toUpperCase() + '</th>';
        });
        head.insertCell(this.$columns.length).outerHTML = '<th>ACTIONS</th>';
    }

    _loadData(url) {
        console.log(url);
        fetch(url)
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
            })
            .then(json => {
                // console.log(json);
                if (json.success) {
                    this._drawTable(json.data);
                } else {
                    this.$messageBoxContent.innerHTML = json.message;
                    this.$messageBox.classList.remove('d-none');
                    this._autoClose();
                }
            });
    }

    get dataUrl() {
        return this.getAttribute('data-url');
    }

    set dataUrl(newDataUrl) {
        this.setAttribute('data-url', newDataUrl);
    }

    get columns(){
        return this.getAttribute('columns');
    }

    set columns(newColumns){
        this.setAttribute('columns', newColumns);
    }

    get route(){
        return this.getAttribute('route');
    }

    set route(newRoute){
        this.setAttribute('route', newRoute);
    }

    connectedCallback() {
        // console.log(this._componentName + ' connected!');
        if (this.hasAttribute('data-url')) {
            // console.log(this.dataUrl);
            this._loadData(this.dataUrl);
        }
        if(this.hasAttribute('columns')){
            // console.log(JSON.parse(this.columns));
            this.$columns = JSON.parse(this.columns);
        }
        if(this.hasAttribute('route')){
            // console.log(JSON.parse(this.route));
            this.$route = this.route;
        }
    }

    disconnectedCallback() {
        // console.log(this._componentName + 'removed from page.');
    }

    adoptedCallback() {
        // console.log(this._componentName + 'moved to new page.');
    }

    attributeChangedCallback(name, oldValue, newValue) {
        // console.log(`Attribute: ${name} changed!`);
    }

    refresh() {
        console.log(this._componentName + ' refresh!')
    }

}
customElements.define('dynamic-data-table', DynamicDataTable);