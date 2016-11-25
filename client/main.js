import { Template } from 'meteor/templating';

import './main.jade';
import './components/plotForm.tpl.jade';

Template.plotForm.onCreated(function plotFormOnCreated() {

});

Template.plotForm.helpers({
    
});

Template.plotForm.events({
    'submit .equation'(event) {

        event.preventDefault();

        const target = event.target;
        const a = target.varA.value;
        const b = target.varB.value;
        const c = target.varC.value;
        let delta = 0;
        const x = [];
        const y = [];

        if (a != 0) {
            delta = +Math.pow(b,2) - 4*a*c;
        }

        let aux = -10;
        for (let i = 1; i<=21; i++) {
            x[i] = aux;
            y[i] = a*Math.pow(x[i],2)+((1*b)*x[i])+(1*c);
            aux += 1;
        }

        const layout = {
            yaxis: {
                title: "X",
            },
            xaxis: {
                title: "Y",
                range: [-10,10]
            },
        };

        const data = [
            {
                x: x,
                y: y,
                type: 'scatter',
                mode: 'lines+markers'
            }
        ];

        Plotly.newPlot('plot',data,layout,{modeBarButtonsToRemove: ['toImage','sendDataToCloud'], displaylogo:false});

    },
});
