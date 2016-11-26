import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.jade';
import './components/plotForm.tpl.jade';


Template.plotForm.onCreated(function plotFormOnCreated() {
    msg = new ReactiveVar();
    gameOptions = new ReactiveVar();
});

Template.plotForm.helpers({
    outputMsg() {
        let text = "";
        const gameMsg = [
            "Desafio! Crie uma concavidade voltada para cima.",
            "Desafio! Crie uma concavidade voltada para baixo.",
            "Desafio! Crie uma concavidade voltada para cima no 1º Quadrante.",
            "Desafio! Crie uma concavidade voltada para baixo no 1º Quadrante.",
            "Desafio! Crie uma concavidade voltada para cima no 2º Quadrante.",
            "Desafio! Crie uma concavidade voltada para baixo no 2º Quadrante.",
            "Desafio! Crie uma concavidade voltada para cima no 3º Quadrante.",
            "Desafio! Crie uma concavidade voltada para baixo no 3º Quadrante.",
            "Desafio! Crie uma concavidade voltada para cima no 4º Quadrante.",
            "Desafio! Crie uma concavidade voltada para baixo no 4º Quadrante."
        ];

        //System messages
        if(msg.get() == 0) {
            text = "";
        }
        if(msg.get() == 1) {
            text = "O valor de A deve ser diferente de 0.";
        }

        //Game Messages
        if(gameOptions.get() != 10) {
            text = gameMsg[gameOptions.get()];
        }
        return text;        
    }
});

Template.plotForm.events({
    'click .gameMode'(event) {
        gameOptions.set(Math.floor(Math.random() * 10));
    },
    'submit .equation'(event) {

        event.preventDefault();
        msg.set(0);

        const target = event.target;
        const a = target.varA.value;
        const b = target.varB.value;
        const c = target.varC.value;
        let delta = 0;
        const x = [];
        const y = [];

        if (a != 0) {
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
        }else{
            msg.set(1);
            gameOptions.set(10);
        }  
    },
});
