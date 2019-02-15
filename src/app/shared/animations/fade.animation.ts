import { trigger, transition, style, animate } from '@angular/animations';


export const fadeTrigger = trigger('fadeBlock', [
    transition(':enter', [
        style({
        opacity: 0
        }),
        animate(500)
    ]),
    transition(':leave', animate(1000, style({
        opacity: 0
    })))
]);
