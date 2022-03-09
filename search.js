class Moke {
    constructor(name,detail) {
        this.name =  name;
        this.details = detail;
    }
}

class UI {
    addMokeToList(moke) {
        const list = document.getElementById('moke-list');
        // Create tr element
        const row = document.createElement('tr');
        // Insert columns

        row.innerHTML = `<td>${moke.title}</td>
<td>${moke.name}</td>
<td>${moke.detail}</td>
<td><a href="#" class="delete">X</a></td>`

        list.appendChild(row);
    }

    showAlert(message, className) {
        // Create div
        const div = document.createElement('div');
        // Add classes
        div.className = `alert ${className}`;
        // Add text
        div.appendChild(document.createTextNode(message));
        // Get parent
        const container = document.querySelector('.container');
        // Get form
        const form = document.querySelector('#moke-form');

        //Insert alert
        container.insertBefore(div, form);

        // Timeout after 3 sec
        setTimeout(function () {
            document.querySelector('.alert').remove();
        }, 3000);

    }

    deleteBook(target) {
        if (target.className === 'delete') {
            target.parentElement.parentElement.remove();
        }
    }

    clearFields() {
        document.getElementById('name').value = '';
        document.getElementById('details').value = '';
    }
}