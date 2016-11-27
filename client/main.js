import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.jade';
import './components/plotForm.tpl.jade';

Template.plotForm.onCreated(function plotFormOnCreated() {
    msg = new ReactiveVar();
    gameOptions = new ReactiveVar();
    gameOptions.set(10);
});

Template.plotForm.helpers({
    gameRunning() {
        if (gameOptions.get() != 10) {
            return true
        }
    },
    outputMsg() {
        let text = "";
        const sysMsg = [
            "",
            "O valor de A deve ser diferente de 0, caso contrário será uma equação linear.",
            "Errado! Valor de A menor que 0, concavidade voltada para baixo.",
            "Errado! Valor de A maior que 0, concavidade voltada para cima",
            "Errado! Teste editar os valores de A e B.",
            "Correto! Valor de A maior que 0, concavidade voltada para cima.",
            "Correto! Valor de A menor que 0, concavidade voltada para baixo",
            "Correto! Valor de A maior que 0 e B menor que 0. Concavidade voltada para cima e à direita de Y.",
            "Correto! Valor de A maior que 0 e B maior que 0. Concavidade voltada para cima e à esquerda de Y.",
            "Correto! Valor de A menor que 0 e B maior que 0. Concavidade voltada para baixo e à direita de Y.",
            "Correto! Valor de A menor que 0 e B menor que 0. Concavidade voltada para baixo e à esquerda de Y."
        ];
        const gameMsg = [
            "Desafio! Crie uma concavidade voltada para cima.",
            "Desafio! Crie uma concavidade voltada para baixo.",
            "Desafio! Crie uma concavidade voltada para cima à direita de Y.",
            "Desafio! Crie uma concavidade voltada para cima à esquerda de Y.",
            "Desafio! Crie uma concavidade voltada para baixo à direita de Y.",
            "Desafio! Crie uma concavidade voltada para baixo à esquerda de Y.",
        ];

        //System messages
        if(msg.get() != 0) {
            text = sysMsg[msg.get()];
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
        event.preventDefault();
        msg.set(0);
        gameOptions.set(Math.floor(Math.random() * 6));
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
            let aux = -20;
            for (let i = 1; i<=411; i++) {
                x[i] = aux;
                y[i] = a*Math.pow(x[i],2)+((1*b)*x[i])+(1*c);
                aux += 0.1;
            }

            const layout = {
                yaxis: {
                    title: "Eixo Y",
                    autorange: true
                },
                xaxis: {
                    title: "Eixo X",
                    range: [-20,20]
                },
            };

            const data = [
                {
                    x: x,
                    y: y,
                    type: 'scatter',
                    mode: 'lines'
                }
            ];

            if (gameOptions.get() == 0) {
                gameOptions.set(10);
                if (a > 0)
                    msg.set(5);
                else
                    msg.set(2);
            }
            if (gameOptions.get() == 1) {
                gameOptions.set(10);
                if (a < 0)
                    msg.set(6);
                else
                    msg.set(3);
            }
            if (gameOptions.get() == 2) {
                gameOptions.set(10);
                if (a > 0 && b < 0)
                    msg.set(7);
                else
                    msg.set(4);
            }
            if (gameOptions.get() == 3) {
                gameOptions.set(10);
                if (a > 0 && b > 0)
                    msg.set(8);
                else
                    msg.set(4);
            }
            if (gameOptions.get() == 4) {
                gameOptions.set(10);
                if (a < 0 && b > 0)
                    msg.set(9);
                else
                    msg.set(4);
            }
            if (gameOptions.get() == 5) {
                gameOptions.set(10);
                if (a < 0 && b < 0)
                    msg.set(10);
                else
                    msg.set(4);
            }
            
            Plotly.newPlot('plot',data,layout,{modeBarButtonsToRemove: ['toImage','sendDataToCloud'], displaylogo:false});
        }else{
            msg.set(1);
            gameOptions.set(10);
        }  
    },
});
