import { Component, Input, AfterViewInit, EventEmitter, Output, ElementRef } from "@angular/core";

// this is very importnant
// (to work this line: this.modalEl.modal('show')) - don't do this
// (because this override jQuery which was changed by bootstrap,
// included in main html-body template):
// let $ = require('../../../../../node_modules/jquery/dist/jquery.min.js');
declare var $: any;


@Component({
  selector: "app-play-finished",
  templateUrl: "./play-finished.component.html",
  styleUrls: ["./play-finished.component.css"]
})
export class PlayFinishedComponent implements AfterViewInit {

    @Input() text: string;
    @Input() title: string;
    @Input() showClose: boolean;

    // tslint:disable-next-line:no-output-on-prefix
    @Output() onClose: EventEmitter<any> = new EventEmitter();

    modalElement = null;
    modalId: string = uniqueId("modal_");

    constructor(private _rootNode: ElementRef) {}

    open() {
        this.modalElement.modal("show");
    }

    closeInternal() {
        this.modalElement.modal("hide");
    }

    close() { // close modal when click on times button in up-right corner
        this.onClose.next(null); // emit event
        this.closeInternal();
    }

    ngAfterViewInit() {
        this.modalElement = $(this._rootNode.nativeElement).find("div.modal");
    }
}

let modalId = 0;
export function uniqueId(prefix: string): string {
    return prefix + ++modalId;
}
