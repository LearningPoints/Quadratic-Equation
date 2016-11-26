import { Template } from 'meteor/templating';

import './components/footer.tpl.jade';

Template.footer.events({
    'click #help'(event) {
        $('#helpModal').openModal(); 
    } 
});

