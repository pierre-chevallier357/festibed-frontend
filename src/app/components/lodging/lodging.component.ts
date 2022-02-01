import { Etablissement } from './../../models/etablissement';
import { Festival } from './../../models/festival';
import { FestivalService } from 'src/app/services/festival/festival.service';
import { LodgingService } from './../../services/lodging/lodging.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'lodging',
  templateUrl: './lodging.component.html',
  styleUrls: ['./lodging.component.scss'],
})
export class LodgingComponent implements OnInit, OnDestroy {
  lodgingList: any[] = [];
  lodgingListSubscription: Subscription = new Subscription();
  filteredLodgingListSubscription: Subscription = new Subscription();
  selectedFestival: any;

  constructor(
    private lodgingService: LodgingService,
    private festivalService: FestivalService
  ) {}

  ngOnInit() {
    let selectedFestival: Festival = this.festivalService.savedFestival;
    this.selectedFestival = selectedFestival;
    this.lodgingListSubscription = this.lodgingService
      .getLodgingsByCity(selectedFestival.idFestival, selectedFestival.commune)
      .subscribe((lodgingList) => (this.lodgingList = lodgingList));
    this.filteredLodgingListSubscription = this.lodgingService.lodgingSource
      .asObservable()
      .subscribe((lodgingList) => {
        this.lodgingList = lodgingList;
      });
  }

  ngOnDestroy() {
    this.lodgingListSubscription.unsubscribe();
    this.filteredLodgingListSubscription.unsubscribe();
  }

  addProductToShoppingCart(lodging: Etablissement) {
    console.log('Festival: ' + this.selectedFestival.nom);
    console.log('Lodging: ' + lodging.nom);
  }
}
