import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup, Validators, FormArray } from "@angular/forms";
import { RepositoryService } from "src/app/services/repository.service";
import { NavigationService } from "src/app/services/navigation.service";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
	selector: "app-form",
	templateUrl: "./form.component.html",
	styleUrls: ["./form.component.scss"],
	encapsulation: ViewEncapsulation.None,
})
export class FormComponent implements OnInit {
	isLinear = false;
	firstFormGroup: FormGroup;

	constructor(
		private _formBuilder: FormBuilder,
		private repository: RepositoryService,
		private navigate: NavigationService,
		private snackBar: MatSnackBar
	) {}

	ngOnInit() {
		this.firstFormGroup = this._formBuilder.group({
			title: ["", Validators.required],
			description: [""],
		});
	}

	public savePin() {
		const model = {
			...this.firstFormGroup.value,
		};

		this.repository.savePins(model).subscribe((response) => {
			this.snackBar
				.open("Your pin is saved, Redirecting ...", "Cool!", {
					duration: 2000,
				})
				.afterDismissed()
				.subscribe(() => {
					this.navigate.goToPins();
				});
		});
	}
}
