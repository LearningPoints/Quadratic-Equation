import { Template } from 'meteor/templating';

import './components/help.tpl.jade';

Template.help.events({
    'click #help'(event) {
        $('#helpModal').openModal(); 
    } 
});

