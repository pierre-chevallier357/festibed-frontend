import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UserService } from './../user/user.service';
import { Injectable } from '@angular/core';
import { Etablissement } from 'src/app/models/etablissement';
import { Festival } from 'src/app/models/festival';
import { Produit } from 'src/app/models/produit';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  restApiUrl: string = 'http://129.88.210.2:4200/panier';
  numberOfPeople: number = 1;

  constructor(
    private userService: UserService,
    private httpClient: HttpClient,
    private router: Router
  ) {}

  addProductToShoppingCart(festival: Festival, lodging: Etablissement) {
    let url: string = this.restApiUrl + '/add-product/';
    console.log('Nombre de pass: ', this.numberOfPeople);
    let produit =
      this.userService.userId +
      '&' +
      festival.idFestival +
      '&' +
      lodging.idetab +
      '&' +
      this.numberOfPeople;
    console.log(url + produit);
    let res = this.httpClient.get<boolean>(url + produit);
    res.subscribe((value) => console.log('Réservation possible: ' + value));
    if (res) {
      this.router.navigateByUrl('/shopping-cart');
    }
    return res;
    /*
    return this.http.post<CV>(url, updatedCv)

    return this.httpClient.post<Produit>(
      this.restApiUrl + '/add-product/' + this.userService.userId + '&',
      produit
    );
    */
  }

  getUserShoppingCart(): Observable<Produit[]> {
    console.log(
      'getUserShoppingCart: ' +
        this.restApiUrl +
        '/get-panier/' +
        this.userService.userId
    );
    return this.httpClient.get<Produit[]>(
      this.restApiUrl + '/get-panier/' + this.userService.userId
    );
  }

  emptyShoppingCart() {
    this.httpClient
      .get<boolean>(
        this.restApiUrl + '/empty-panier/' + this.userService.userId
      )
      .subscribe((value) => {
        console.log('Empty shopping cart: ' + value);
      });
  }

  updateNumberOfPeople(nb: number) {
    this.numberOfPeople = nb;
  }
}
