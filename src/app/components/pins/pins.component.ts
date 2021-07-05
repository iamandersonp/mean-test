import { Component, ViewEncapsulation } from "@angular/core";
import { RepositoryService } from "src/app/services/repository.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { PinsService } from "./pins.service";
import { filter } from "rxjs/operators";
import { FormBuilder } from "@angular/forms";
import { Subscription } from "rxjs";
import { Router } from "@angular/router";

export interface Pin {
	id?: number;
	title?: string;
	description?: string;
}

@Component({
	selector: "app-pins",
	templateUrl: "./pins.component.html",
	styleUrls: ["./pins.component.scss"],
	encapsulation: ViewEncapsulation.None,
})
export class PinsComponent {
	public step = 0;
	public pins = [];
	public selectedPin: Pin;
	private currentSubscription: Subscription;
	displayedColumns: string[] = ["id", "title", "description"];
	dataSource: Pin[] = [];

	constructor(
		private repository: RepositoryService,
		private snackBar: MatSnackBar,
		private pinsService: PinsService,
		private formBuilder: FormBuilder,
		private router: Router
	) {}

	ngOnInit() {
		this.repository.getPins().subscribe((pins) => {
			this.pins = pins.map((pin) => {
				this.dataSource = pins;
				return this.dataSource;
			});
		});
	}

	onRowSelect(rowtData: Pin) {
		this.selectedPin = rowtData;
		this.router.navigateByUrl(`app/edit/${this.selectedPin.id}`);
	}
}
